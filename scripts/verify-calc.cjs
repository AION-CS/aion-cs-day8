/**
 * Re-derives every figure and every rule the day rests on, from the same data files the site uses, and compares them with the
 * results briefed in the README. Run: npm run verify:calc. A failed line prints FAIL and the process exits with code 1.
 *
 * The data files are TypeScript with "@/" imports, so a tiny loader transpiles them on the fly (no test framework, no extra dependency).
 */
const path = require("path");
const fs = require("fs");
const Module = require("module");
const ts = require(path.join(process.cwd(), "node_modules", "typescript"));

const root = process.cwd();
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    const base = path.join(root, request.slice(2));
    for (const ext of [".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext)) return base + ext;
  }
  return origResolve.call(this, request, ...rest);
};
for (const ext of [".ts", ".tsx"])
  require.extensions[ext] = function (module, filename) {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    });
    module._compile(out.outputText, filename);
  };

let failed = 0;
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!cond) failed++;
};
const eq = (name, a, b) => ok(name, JSON.stringify(a) === JSON.stringify(b), `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);

const lang = require("@/lib/lang");
const fc = require("@/data/forecast");
const ld = require("@/data/ladder");
const pt = require("@/data/patterns");
const meas = require("@/data/measures");
const r2 = require("@/data/route2");
const key = require("@/data/mentorKey");
const checks = require("@/lib/checks");
const calc = require("@/lib/calcBuilder");
const missing = require("@/lib/missing");
const progress = require("@/lib/progress");
const store = require("@/store/useStore");

// --- Block 1.2 --------------------------------------------------------------------
eq("F1 conversion rate, personalised offer", fc.FORECAST.f1, 4.8);
eq("conversion rate of the standard offer", fc.FORECAST.controlRate, 3);
eq("F2 uplift", fc.FORECAST.f2, 1.6);
eq("F3 extra revenue a year", fc.FORECAST.f3, 388800);
for (const f of ["F1", "F2", "F3"]) {
  const b = calc.FIGURE_BUILDERS[f];
  const parts = calc.modelParts({ [f]: b });
  eq(`builder ${f} reproduces the answer`, calc.builderResult(b, f, parts), calc.figAnswer(f));
  eq(`builder ${f} flags nothing on model parts`, calc.wrongParts(b, f, parts), []);
}
const w1 = { ...calc.modelParts({ F1: calc.FIGURE_BUILDERS.F1 }), "F1.sent": "24000" };
eq("builder F1 flags exactly the wrong part", calc.wrongParts(calc.FIGURE_BUILDERS.F1, "F1", w1), ["F1.sent"]);
const w3 = { ...calc.modelParts({ F3: calc.FIGURE_BUILDERS.F3 }), "F3.yearly": "2000" };
eq("builder F3 flags exactly the wrong part", calc.wrongParts(calc.FIGURE_BUILDERS.F3, "F3", w3), ["F3.yearly"]);
const w3b = { ...calc.modelParts({ F3: calc.FIGURE_BUILDERS.F3 }), "F3.order": "9600" };
eq("builder F3 flags the order value", calc.wrongParts(calc.FIGURE_BUILDERS.F3, "F3", w3b), ["F3.order"]);
eq("Mosel worked example", [fc.MOSEL_RESULT.rate, fc.MOSEL_RESULT.other, fc.MOSEL_RESULT.lift, fc.MOSEL_RESULT.extra], [3, 2, 1.5, 60000]);
ok("worked example uses other numbers than the task", fc.MOSEL.order !== fc.PILOT.order && fc.MOSEL.yearly !== fc.PILOT.yearly && fc.MOSEL_RESULT.rate !== fc.FORECAST.f1);
ok("sentence check accepts “4.8%”", checks.citesForecastFigure("The personalised offer converted 4.8% of e-mails."));
ok("sentence check accepts “4,8 %”", checks.citesForecastFigure("Das Angebot konvertierte 4,8 % der E-Mails."));
ok("sentence check accepts “1.6 times”", checks.citesForecastFigure("It sold 1.6 times as often."));
ok("sentence check accepts “€388,800”", checks.citesForecastFigure("About €388,800 a year."));
ok("sentence check rejects a sentence with no figure", !checks.citesForecastFigure("Personalisation seems to work for us."));

// --- Block 1.1 / 1.3 ----------------------------------------------------------------
const lvl = ld.LINES.reduce((o, r) => ({ ...o, [r.truth]: (o[r.truth] || 0) + 1 }), {});
eq("ideas: three per kind", lvl, { reco: 3, comm: 3, auto: 3 });
const autoRule = fc.CUSTOMERS.filter((c) => c.routine === "yes" && c.stakes === "low" && c.volume >= fc.AUTO_MIN_VOLUME).map((c) => c.id);
eq("automate fully = routine, low stakes, 100+ a month", [...autoRule].sort(), [...fc.VALUABLE_TRUTH].sort());
const humanRule = fc.CUSTOMERS.filter((c) => c.stakes === "high").map((c) => c.id);
eq("keep a person = high stakes", [...humanRule].sort(), [...fc.CHURN_TRUTH].sort());
ok("the routine price quote is not full automation", !fc.VALUABLE_TRUTH.includes("c4"));
ok("the night question is not full automation", !fc.VALUABLE_TRUTH.includes("c3"));
ok("advantage check needs a risk word", fc.hasSoWhat("Customers get answers at night, but a bot can feel cold.") && !fc.hasSoWhat("Customers get answers at night and faster help."));

// --- Block 2.1 / 2.2 / 2.3 ------------------------------------------------------------
eq("metrics per kind", pt.TRUTH_COUNTS, { outcome: 3, driver: 3, guardrail: 3, vanity: 3 });
eq("moved with value per kind", pt.TRUTH_LEFT, { outcome: 3, driver: 2, guardrail: 1, vanity: 0 });
eq("model link per kind", pt.PATTERN_IDS.map((x) => pt.riskOf(pt.TRUTH_LEFT[x], pt.TRUTH_COUNTS[x])), ["high", "high", "mid", "low"]);
eq("real uncertainties", pt.UNCERTAINTIES.filter((w) => w.real).map((w) => w.id), ["sample", "cause", "missing", "shift"]);
ok("every kind has its own use", new Set(Object.values(pt.MEASURE_TRUTH)).size === 4);
ok("the bonus fits no kind", !Object.values(pt.MEASURE_TRUTH).includes("bonus"));
ok("each A/B part has exactly one fair option", pt.AB_PARTS.every((k) => pt.AB[k].options.filter((o) => o.right).length === 1));
eq("model A/B card flags nothing", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "If we show the add-on, then conversion rises, because it fits.", rule: "Roll out at 10% uplift." }), []);
eq("A/B card flags a wrong part", checks.abFlagsOf({ ...pt.AB_MODEL, control: "lastyear", hyp: "", rule: "" }), ["control"]);
eq("A/B card flags a rule without a number", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "", rule: "Roll out if it wins." }), ["rule"]);

// --- Block 2.4 --------------------------------------------------------------------
const scores = Object.fromEntries(meas.MEASURES.map((m) => [m.id, meas.modelScore(m.id)]));
eq("model scores", scores, { reco: 27, trigger: 18, kpi: 18, chatbot: 6, pricing: 6, roles: 6, suite: 4, discount: 6, manual: 2 });
eq("model three cost", meas.MODEL_COST, 125000);
ok("model three fit the budget", meas.MODEL_COST <= meas.BUDGET);
eq("model three are the three highest scores", [...meas.MEASURES].sort((a, b) => meas.modelScore(b.id) - meas.modelScore(a.id)).slice(0, 3).map((m) => m.id).sort(), [...meas.MODEL_MEASURES].sort());
ok("the model three answer all three problems", meas.PROBLEM_IDS.every((p) => meas.MODEL_MEASURES.some((id) => meas.MEASURE_BY_ID[id].targets.includes(p))));
ok("the chatbot answers no problem of the brief", meas.MEASURE_BY_ID.chatbot.targets.length === 0);

// --- Route 2 --------------------------------------------------------------------
eq("technology decisions by the rule", r2.SOURCES.map((s) => r2.useOf(s)), ["core", "core", "core", "later", "later", "later", "leave", "leave"]);
eq("test decisions by the rule", r2.SITUATIONS.map((s) => r2.actionOf(s)), ["intervene", "watch", "none", "watch", "none", "intervene"]);
for (const c of r2.COMPS) for (const k of r2.CRIT_IDS) ok(`model rating within the printed limit (${c.id}.${k})`, c.model[k] <= r2.maxRating(c.id, k));
ok("model KPIs all show a change early", checks.earlyCount(r2.MODEL_COMPS) === r2.MODEL_COMPS.length);
const archCost = r2.MODEL_ARCH.reduce((s, id) => s + r2.ARCH_BY_ID[id].cost, 0);
eq("model architecture cost", archCost, 195000);
ok("model architecture inside the budget", archCost <= r2.R2_BUDGET);
ok("adding the AI suite breaks the budget", archCost + r2.ARCH_BY_ID.suite.cost > r2.R2_BUDGET);
ok("the tripwire is better than today's baseline", r2.MODEL_TRIPWIRE.threshold > r2.KPI_BY_ID[r2.MODEL_TRIPWIRE.kpi].baseline);

// --- the mentor fill, in both languages --------------------------------------------
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  const l1 = { ...store.emptyL1(), ...key.KEY_L1(), parts: calc.modelParts(calc.FIGURE_BUILDERS) };
  const rr = { ...store.emptyR2(), ...key.KEY_R2() };
  const p = { participant: { name: "Mentor Check" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: l }, l1, r2: rr };
  eq(`[${l}] mentor fill leaves Route 1 missing list empty`, missing.l1Missing(p).map((m) => m.label), []);
  eq(`[${l}] mentor fill leaves Route 2 missing list empty`, missing.r2Missing(p).map((m) => m.label), []);
  const tb = progress.taskBlocks(p);
  eq(`[${l}] every task block complete after the fill`, Object.values(tb).every(Boolean), true);
  eq(`[${l}] model sort all hold`, checks.sortHolds(l1.sort), { holds: 9, placed: 9 });
  eq(`[${l}] model picks all hold`, checks.pickHolds(l1), { holds: 4, total: 4 });
  eq(`[${l}] model insights pass the floor`, checks.insightFlags(l1), []);
  ok(`[${l}] model sentence cites a figure`, checks.citesForecastFigure(l1.meaning));
  eq(`[${l}] model tags all hold`, checks.tagHolds(l1.tags), { holds: 12, placed: 12 });
  eq(`[${l}] model uncertainties all real`, checks.uncHolds(l1.unc), { holds: 4, chosen: 4 });
  eq(`[${l}] model A/B card flags nothing`, checks.abFlagsOf(l1.ab), []);
  const rc = checks.rowChecks(l1);
  eq(`[${l}] model kind rows hold`, [rc.holds, rc.total, rc.flags], [12, 12, []]);
  for (const id of l1.chosen) ok(`[${l}] model problems and measurability hold (${id})`, checks.aimsHold(id, l1.aims[id]) && checks.expHolds(id, l1.exp[id]));
  eq(`[${l}] model order has no inversion`, checks.orderInversions(l1), []);
  eq(`[${l}] model principles hold`, checks.principlesHold(rr), { defs: true, rules: true });
  eq(`[${l}] model sources hold`, checks.sourceHolds(rr), { holds: 8, total: 8 });
  eq(`[${l}] model ratings flag nothing`, checks.ratingFlags(rr), []);
  eq(`[${l}] model decision logic holds`, checks.logicHolds(rr), { holds: 12, total: 12 });
  eq(`[${l}] model architecture holds all rules`, checks.seqRules(rr), { baseline: true, budget: true, explainable: true, hasBaseline: true });
  eq(`[${l}] model tripwire flags nothing`, checks.tripFlagsOf(rr), []);
}
lang.setCurrentLang("en");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
