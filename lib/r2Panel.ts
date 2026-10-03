import { ARCH_BY_ID, ARCH_IDS, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { AB_ID, CLEAN_ID, ENGINE_IDS, KPI_SYSTEM_ID, PANEL, READY_BAR, WEAK_POINTS } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Route 2 control panel (CLAUDE.md #47): one place that turns the learner's choices (when each item happens) into what the
 * diagram, the three bars, the tests, the reading of the plan, the export and the mentor's worked answer all say. Nothing here is a verdict:
 * every line is a fact about the plan and, where something is open, the rule and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived, not asked for: *Now* items start in month 1; *After data is ready* items start in the month the data clean-up is in use (so
 * the clean-up must itself be Now); an item is in use in month = start + weeks ÷ 4, rounded up (the rule Materi B5 teaches).
 */
export type Scn = 0 | 1;
type HasTier = { tier: Record<string, Tier> };

const NEVER = R2_MONTHS + 1;

export const tierOf = (r2: HasTier, id: ArchId): Tier => r2.tier[id] ?? "not";
export const isFunded = (r2: HasTier, id: ArchId) => tierOf(r2, id) !== "not";
export const fundedIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => isFunded(r2, id));
export const nowIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => tierOf(r2, id) === "now");
export const monthsOf = (id: ArchId) => Math.ceil(ARCH_BY_ID[id].weeks / 4);
const readyOf = (id: ArchId, scn: Scn) => (PANEL[id].data === null ? null : PANEL[id].data! - scn * WEAK_POINTS);

/** The month an item starts: 1 for Now, the month the clean-up is in use for After data (the clean-up must be Now), null when not funded. */
export function startOf(r2: HasTier, id: ArchId): number | null {
  const tier = tierOf(r2, id);
  if (tier === "not") return null;
  if (tier === "now") return 1;
  return tierOf(r2, CLEAN_ID) === "now" ? 1 + monthsOf(CLEAN_ID) : NEVER;
}
export function inUseOf(r2: HasTier, id: ArchId): number | null {
  const s = startOf(r2, id);
  return s === null ? null : s + monthsOf(id);
}

/** Measurement comes first: the KPI system (and, for everything but the KPI system, the A/B routine) starts no later than the item. */
export function measOk(r2: HasTier, id: ArchId): boolean {
  if (id === KPI_SYSTEM_ID) return true;
  const s = startOf(r2, id);
  if (s === null) return false;
  const f = startOf(r2, KPI_SYSTEM_ID);
  if (f === null || f > s) return false;
  if (id === AB_ID) return true;
  const a = startOf(r2, AB_ID);
  return a !== null && a <= s;
}

/** The data an item needs is at least READY_BAR percent ready when it starts (the clean-up lifts the data of the items it prepares). */
export function dataOk(r2: HasTier, id: ArchId, scn: Scn): boolean {
  const v = readyOf(id, scn);
  if (v === null || v >= READY_BAR) return true;
  if (PANEL[id].cleaned && tierOf(r2, CLEAN_ID) === "now") {
    const s = startOf(r2, id);
    const q = inUseOf(r2, CLEAN_ID);
    if (s !== null && q !== null && q <= s) return true;
  }
  return false;
}

export type ItemView = { id: ArchId; tier: Tier; start: number | null; inUse: number | null; measOk: boolean; dataOk: boolean; late: boolean; never: boolean; notes: string[] };
export type Bars = { spent: number; over: number; left: number; meas: number | null; risk: number | null };
export type TestId = "measure" | "purpose" | "data" | "budget";
export type OpenDetail = { fact: string; rule: string; ways: string[] };
export type TestView = { id: TestId; name: string; rule: string; applies: boolean; holds: boolean; open: OpenDetail[] };
export type PlanView = { items: Record<ArchId, ItemView>; funded: ArchId[]; nowCount: number; bars: Bars; tests: TestView[]; holding: number; applicable: number };

const nm = (id: ArchId) => PANEL[id].short;

function itemView(r2: HasTier, id: ArchId, scn: Scn): ItemView {
  const tier = tierOf(r2, id);
  const start = startOf(r2, id);
  const inUse = inUseOf(r2, id);
  const funded = tier !== "not";
  const never = funded && start === NEVER;
  const m = measOk(r2, id);
  const d = dataOk(r2, id, scn);
  const late = funded && !never && inUse !== null && inUse > R2_MONTHS;
  const notes: string[] = [];
  if (funded) {
    if (never) notes.push(tt("never starts: the data clean-up it waits for is not planned", "startet nie: Die Datenbereinigung, auf die es wartet, ist nicht eingeplant"));
    if (!m && !never) notes.push(id === AB_ID ? tt("starts before the KPI system is in place", "startet, bevor das KPI-System steht") : tt("starts before the KPI system and the A/B routine are in place", "startet, bevor KPI-System und A/B-Routine stehen"));
    if (!d && !never) notes.push(tt(`the data it needs is ${readyOf(id, scn)}% ready, below ${READY_BAR}%, when it starts`, `die Daten sind zu ${readyOf(id, scn)} % bereit, unter ${READY_BAR} %, wenn es startet`));
    if (PANEL[id].blackBox) notes.push(tt("black box: nobody can see inside", "Black Box: Niemand kann hineinsehen"));
    if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  }
  return { id, tier, start, inUse, measOk: m, dataOk: d, late, never, notes };
}

function barsOf(r2: HasTier, scn: Scn): Bars {
  const f = fundedIds(r2);
  const spent = f.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  let meas = 0;
  let risk = 0;
  for (const id of f) {
    const c = ARCH_BY_ID[id].cost;
    if (PANEL[id].measured && measOk(r2, id) && dataOk(r2, id, scn) && !PANEL[id].blackBox) meas += c;
    if (PANEL[id].blackBox || !dataOk(r2, id, scn)) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, meas: spent ? Math.round((meas / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The Measurable and Risk bars are ranges across the two data scenarios: [as the brief says, weaker data]. */
export function rangeOf(r2: HasTier): { meas: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = barsOf(r2, 0);
  const w = barsOf(r2, 1);
  return { meas: [a.meas, w.meas], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<TestId, () => string> = {
  measure: () => tt("Measurement comes first", "Messung kommt zuerst"),
  purpose: () => tt("Every funded item has a purpose", "Jeder finanzierte Punkt hat einen Zweck"),
  data: () => tt(`Data is ready when an engine starts`, "Die Daten sind bereit, wenn eine Engine startet"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<TestId, () => string> = {
  measure: () => tt("The KPI system and the A/B routine start no later than the first engine, so every engine is measured from its first week.", "KPI-System und A/B-Routine starten nicht später als die erste Engine, damit jede Engine ab ihrer ersten Woche gemessen wird."),
  purpose: () => tt("A funded item moves a named KPI or makes one measurable. A black box does neither: nobody can see what it does.", "Ein finanzierter Punkt bewegt einen benannten KPI oder macht einen messbar. Eine Black Box tut keines von beidem: Niemand sieht, was sie tut."),
  data: () => tt(`An engine starts on data that is at least ${READY_BAR}% ready. Data that is not ready teaches the engine its gaps.`, `Eine Engine startet auf Daten, die zu mindestens ${READY_BAR} % bereit sind. Daten, die nicht bereit sind, lehren die Engine ihre Lücken.`),
  budget: () => tt(`The funded items stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}.`, `Die finanzierten Punkte bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz.`),
};
export const TEST_IDS: TestId[] = ["measure", "purpose", "data", "budget"];

function testsOf(r2: HasTier, scn: Scn, items: Record<ArchId, ItemView>, bars: Bars): TestView[] {
  const f = fundedIds(r2);
  const engines = ENGINE_IDS.filter((id) => isFunded(r2, id));
  const view = (id: TestId, applies: boolean, open: OpenDetail[]): TestView => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });

  // 1 · measurement first
  const mOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never || v.measOk) continue;
    const f0 = startOf(r2, KPI_SYSTEM_ID);
    const a0 = startOf(r2, AB_ID);
    const parts: string[] = [];
    if (f0 === null) parts.push(tt("the KPI system is not funded", "das KPI-System ist nicht finanziert"));
    else if (f0 > v.start!) parts.push(tt(`the KPI system starts in month ${f0}`, `das KPI-System startet in Monat ${f0}`));
    if (a0 === null) parts.push(tt("the A/B routine is not funded", "die A/B-Routine ist nicht finanziert"));
    else if (a0 > v.start!) parts.push(tt(`the A/B routine starts in month ${a0}`, `die A/B-Routine startet in Monat ${a0}`));
    mOpen.push({
      fact: tt(`${nm(id)}: starts in month ${v.start}, but ${parts.join(" and ")}.`, `${nm(id)}: startet in Monat ${v.start}, aber ${parts.join(" und ")}.`),
      rule: TEST_RULE.measure(),
      ways: [
        tt("Set the KPI system and the A/B routine to Now: they start in month 1, before any engine.", "Setzen Sie KPI-System und A/B-Routine auf „Jetzt“: Sie starten in Monat 1, vor jeder Engine."),
        tt(`Or set ${nm(id)} to Not now until they are in place.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“, bis sie stehen.`),
      ],
    });
  }
  if (isFunded(r2, AB_ID) && !items[AB_ID].measOk && !items[AB_ID].never) {
    mOpen.push({
      fact: tt(`The A/B routine starts in month ${items[AB_ID].start}, before the KPI system, so it has no KPIs to read.`, `Die A/B-Routine startet in Monat ${items[AB_ID].start}, vor dem KPI-System, hat also keine KPIs zum Lesen.`),
      rule: TEST_RULE.measure(),
      ways: [tt("Set the KPI system to Now.", "Setzen Sie das KPI-System auf „Jetzt“."), tt("Or set the A/B routine to Not now until the KPI system is in place.", "Oder setzen Sie die A/B-Routine auf „Jetzt nicht“, bis das KPI-System steht.")],
    });
  }

  // 2 · every funded item has a purpose
  const pOpen: OpenDetail[] = f
    .filter((id) => !PANEL[id].named && !PANEL[id].enabler)
    .map((id) => ({
      fact: tt(`${nm(id)} names no KPI it moves, and its results are not shown.`, `${nm(id)} nennt keinen KPI, den es bewegt, und seine Ergebnisse werden nicht gezeigt.`),
      rule: TEST_RULE.purpose(),
      ways: [
        tt(`Set it to Not now and use the ${euro(ARCH_BY_ID[id].cost)} on an item that moves a named KPI.`, `Setzen Sie es auf „Jetzt nicht“ und nutzen Sie die ${euro(ARCH_BY_ID[id].cost)} für einen Punkt, der einen benannten KPI bewegt.`),
        tt("Or keep it, and say in your reasons how AIConnect will explain what it does and measure its effect.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, wie AIConnect erklären wird, was es tut, und seine Wirkung misst."),
      ],
    }));

  // 3 · data ready when an engine starts
  const dOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never) {
      dOpen.push({
        fact: tt(`${nm(id)}: waits for data, but the data clean-up it waits for is not set to Now, so it never starts.`, `${nm(id)}: wartet auf die Daten, aber die Datenbereinigung, auf die es wartet, steht nicht auf „Jetzt“, also startet es nie.`),
        rule: TEST_RULE.data(),
        ways: [tt("Set the data clean-up to Now.", "Setzen Sie die Datenbereinigung auf „Jetzt“."), tt(`Or set ${nm(id)} to Not now.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“.`)],
      });
      continue;
    }
    if (v.dataOk) continue;
    const val = readyOf(id, scn);
    if (PANEL[id].cleaned) {
      dOpen.push({
        fact: tt(`${nm(id)}: starts in month ${v.start} on data ${val}% ready, below ${READY_BAR}%. The data clean-up is ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `in use only in month ${inUseOf(r2, CLEAN_ID)}` : "not set to Now"}.`, `${nm(id)}: startet in Monat ${v.start} auf Daten, die zu ${val} % bereit sind, unter ${READY_BAR} %. Die Datenbereinigung ist ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `erst in Monat ${inUseOf(r2, CLEAN_ID)} im Einsatz` : "nicht auf „Jetzt“ gesetzt"}.`),
        rule: TEST_RULE.data(),
        ways: [
          tt(`Set the data clean-up to Now and ${nm(id)} to After data is ready: it then starts in month ${1 + monthsOf(CLEAN_ID)}, when the clean-up is in use.`, `Setzen Sie die Datenbereinigung auf „Jetzt“ und ${nm(id)} auf „Wenn die Daten bereit sind“: Es startet dann in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung im Einsatz ist.`),
          tt(`Or set ${nm(id)} to Not now.`, `Oder setzen Sie ${nm(id)} auf „Jetzt nicht“.`),
        ],
      });
    } else {
      dOpen.push({
        fact: tt(`${nm(id)}: starts on data ${val}% ready, below ${READY_BAR}%. The data clean-up does not prepare this data.`, `${nm(id)}: startet auf Daten, die zu ${val} % bereit sind, unter ${READY_BAR} %. Die Datenbereinigung bereitet diese Daten nicht vor.`),
        rule: TEST_RULE.data(),
        ways: [
          tt(`Set ${nm(id)} to Not now until the data is better.`, `Setzen Sie ${nm(id)} auf „Jetzt nicht“, bis die Daten besser sind.`),
          tt("Or keep it, and say in your reasons what you will do if the data stays below 80%.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was Sie tun, wenn die Daten unter 80 % bleiben."),
        ],
      });
    }
  }

  // 4 · budget and the six months
  const bOpen: OpenDetail[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`The funded items cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Die finanzierten Punkte kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      rule: TEST_RULE.budget(),
      ways: [
        tt("Set the item with the weakest case to Not now (every card prints its cost).", "Setzen Sie den Punkt mit der schwächsten Begründung auf „Jetzt nicht“ (jede Karte druckt ihre Kosten)."),
        tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe, und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."),
      ],
    });
  for (const id of f) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (${monthsOf(id)} months to build, starting in month ${v.start}).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (${monthsOf(id)} Monate Aufbau, Start in Monat ${v.start}).`),
      rule: TEST_RULE.budget(),
      ways: [
        v.tier === "later" ? tt(`Set ${nm(id)} to Now: it then starts in month 1.`, `Setzen Sie ${nm(id)} auf „Jetzt“: Es startet dann in Monat 1.`) : tt(`Set ${nm(id)} to Not now.`, `Setzen Sie ${nm(id)} auf „Jetzt nicht“.`),
        tt("Or keep it, and say in your reasons what the plan does without it before month 7.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat 7 tut."),
      ],
    });
  }

  const any = f.length > 0;
  return [view("measure", engines.length > 0 || isFunded(r2, AB_ID), mOpen), view("purpose", any, pOpen), view("data", engines.length > 0, dOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one data scenario. */
export function planOf(r2: HasTier, scn: Scn): PlanView {
  const items = Object.fromEntries(ARCH_IDS.map((id) => [id, itemView(r2, id, scn)])) as Record<ArchId, ItemView>;
  const bars = barsOf(r2, scn);
  const tests = testsOf(r2, scn, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, funded: fundedIds(r2), nowCount: nowIds(r2).length, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}

/* ------------------------------------------------------------------ the reading of the plan */

export type Reading = { gives: string[]; costs: string[] };

/** What the plan gives, and what it costs or leaves open: two lists of facts, never a grade (CLAUDE.md #47). */
export function readingOf(r2: HasTier, scn: Scn): Reading {
  const plan = planOf(r2, scn);
  const gives: string[] = [];
  const costs: string[] = [];
  for (const id of ARCH_IDS) {
    const v = plan.items[id];
    const p = PANEL[id];
    const cost = ARCH_BY_ID[id].cost;
    if (v.tier === "not") {
      if (p.blackBox) gives.push(tt(`${nm(id)} not bought: ${euro(cost)} is not spent on a black box.`, `${nm(id)} nicht gekauft: ${euro(cost)} werden nicht für eine Black Box ausgegeben.`));
      else if (p.named) costs.push(tt(`${nm(id)} not now: does not move ${p.moves}.`, `${nm(id)} jetzt nicht: bewegt ${p.moves} nicht.`));
      else if (id === KPI_SYSTEM_ID) costs.push(tt("KPI system not funded: each team keeps counting the KPIs its own way.", "KPI-System nicht finanziert: Jedes Team zählt die KPIs weiter auf seine Weise."));
      else if (id === AB_ID) costs.push(tt("A/B routine not funded: no measure can be compared with a control group.", "A/B-Routine nicht finanziert: Keine Maßnahme lässt sich mit einer Kontrollgruppe vergleichen."));
      else if (id === "training") costs.push(tt("KPI literacy not now: people may misread the numbers they are given.", "KPI-Kompetenz jetzt nicht: Menschen können die Zahlen, die sie bekommen, falsch lesen."));
      else if (id === CLEAN_ID) costs.push(tt("Data clean-up not now: the data dynamic pricing would need stays as it is.", "Datenbereinigung jetzt nicht: Die Daten, die Dynamic Pricing bräuchte, bleiben, wie sie sind."));
      continue;
    }
    if (v.never) {
      costs.push(tt(`${nm(id)}: waits for a data clean-up that is not planned, so it never starts.`, `${nm(id)}: wartet auf eine Datenbereinigung, die nicht eingeplant ist und startet daher nie.`));
      continue;
    }
    if (p.blackBox) {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on results nobody can see or stop.`, `${nm(id)}: ${euro(cost)} für Ergebnisse, die niemand sehen oder stoppen kann.`));
    } else if (id === KPI_SYSTEM_ID) {
      gives.push(tt("KPI system: every KPI is defined once and counted from joined data.", "KPI-System: Jeder KPI wird einmal definiert und aus verbundenen Daten gezählt."));
    } else if (id === AB_ID) {
      if (v.measOk) gives.push(tt("A/B routine: any measure can be compared with a control group.", "A/B-Routine: Jede Maßnahme lässt sich mit einer Kontrollgruppe vergleichen."));
      else costs.push(tt("A/B routine starts before the KPI system, so it has no KPIs to read.", "Die A/B-Routine startet vor dem KPI-System und hat daher keine KPIs zum Lesen."));
    } else if (id === "training") {
      gives.push(tt("KPI literacy: sales and marketing can tell a real uplift from noise.", "KPI-Kompetenz: Vertrieb und Marketing können einen echten Uplift von Rauschen unterscheiden."));
    } else if (id === CLEAN_ID) {
      gives.push(cleanGives(r2));
    } else {
      const ready = readyOf(id, scn);
      if (v.measOk && v.dataOk)
        gives.push(tt(`${nm(id)}: moves ${p.moves}, is measured, and the data it needs is ready${ready !== null ? ` (${ready}%)` : ""}${v.tier === "later" ? `; it starts in month ${v.start}, when the data clean-up is in use` : ""}.`, `${nm(id)}: bewegt ${p.moves}, wird gemessen, und die Daten sind bereit${ready !== null ? ` (${ready} %)` : ""}${v.tier === "later" ? `; startet in Monat ${v.start}, wenn die Datenbereinigung im Einsatz ist` : ""}.`));
      if (!v.measOk) costs.push(tt(`${nm(id)}: nothing measures it when it starts, so its effect on ${p.moves} cannot be shown.`, `${nm(id)}: Nichts misst es, wenn es startet, seine Wirkung auf ${p.moves} lässt sich also nicht zeigen.`));
      if (!v.dataOk) costs.push(tt(`${nm(id)}: the data it needs is ${ready}% ready, below ${READY_BAR}%, when it starts.`, `${nm(id)}: Die Daten sind zu ${ready} % bereit, unter ${READY_BAR} %, wenn es startet.`));
    }
    if (v.late) costs.push(tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months.`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten.`));
  }
  const b = plan.bars;
  if (plan.funded.length === 0) costs.unshift(tt("Nothing is built: the three problems in the brief stay as they are.", "Nichts wird gebaut: Die drei Probleme des Auftrags bleiben, wie sie sind."));
  else if (b.over > 0) costs.push(tt(`${euro(b.over)} over the budget. Keep it only with a reason.`, `${euro(b.over)} über dem Budget. Behalten Sie es nur mit einer Begründung.`));
  else if (b.left > 0) costs.push(tt(`${euro(b.left)} of the budget stays unspent. Say what it is for, or why you hold it back.`, `${euro(b.left)} des Budgets bleiben ungenutzt. Sagen Sie, wofür es gedacht ist oder warum Sie es zurückhalten.`));
  if (plan.funded.length > 0) {
    const top = plan.funded.filter((id) => !PANEL[id].blackBox).reduce((a, id) => (ARCH_BY_ID[id].cost > ARCH_BY_ID[a].cost ? id : a), plan.funded[0]);
    if (b.spent > 0 && ARCH_BY_ID[top].cost / b.spent >= 0.35 && !PANEL[top].blackBox) costs.push(tt(`${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)}% of the money rides on one item: ${nm(top)}.`, `${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)} % des Geldes hängen an einem Punkt: ${nm(top)}.`));
  }
  if (gives.length === 0) gives.push(tt("Nothing yet. Set at least one item to Now.", "Noch nichts. Setzen Sie mindestens einen Punkt auf „Jetzt“."));
  return { gives, costs };
}

/** What the data clean-up gives, depending on whether dynamic pricing is part of the plan. */
function cleanGives(r2: HasTier): string {
  return isFunded(r2, "pricing")
    ? tt("Data clean-up: the data dynamic pricing needs is cleaned before it is used.", "Datenbereinigung: Die Daten, die Dynamic Pricing braucht, werden bereinigt, bevor es sie nutzt.")
    : tt("Data clean-up: a later pilot of pricing or a chatbot would not learn the gaps.", "Datenbereinigung: Ein späterer Pilot von Pricing oder Chatbot würde die Lücken nicht lernen.");
}

/* ------------------------------------------------------------------ Step B: the decision against Step A */

/** One plain hint when the Step B decision and the Step A plan point in different directions; null when they agree. */
export function decisionHint(r2: HasTier & { decision: string | null }): string | null {
  const n = nowIds(r2).length;
  if (r2.decision === "wait" && n > 0) return tt("Step B says wait until the forecast is clear, while Step A builds " + n + (n === 1 ? " item" : " items") + " now. Say in your reason how the two fit together.", "Schritt B sagt, warten, bis die Prognose klar ist, während Schritt A jetzt " + n + (n === 1 ? " Punkt" : " Punkte") + " baut. Sagen Sie in Ihrer Begründung, wie beides zusammenpasst.");
  if (r2.decision === "commit" && !isFunded(r2, "suite")) return tt("Step B says buy the full AI suite now, while Step A leaves it out. Say in your reason which of the two you stand behind.", "Schritt B sagt, die komplette KI-Suite jetzt zu kaufen, während Schritt A sie weglässt. Sagen Sie in Ihrer Begründung, zu welchem von beiden Sie stehen.");
  if (r2.decision === "stage" && isFunded(r2, "suite") && tierOf(r2, "suite") === "now") return tt("Step B says build in stages, while Step A starts the full AI suite now, all at once. Say in your reason how that is staged.", "Schritt B sagt, in Stufen zu bauen, während Schritt A die komplette KI-Suite jetzt auf einmal startet. Sagen Sie in Ihrer Begründung, wie das gestuft ist.");
  return null;
}

/* ------------------------------------------------------------------ three internal categories (CLAUDE.md #47) */

/**
 * 1 · safe: the base is mapped and measured before the engines and every applicable test holds (there can be several such plans).
 * 2 · fair: a base exists but a fundamental is missing or a better approach is available.
 * 3 · clearly wrong: tools or AI are bought without the base (an engine or the suite with no KPI system), or nothing is built.
 * Used only to choose what the reading says and for the mentor's understanding; the learner never sees it and it is never exported.
 */
export type Category = 1 | 2 | 3;
const AI_IDS: ArchId[] = ["reco", "trigger", "pricing", "suite"];

export function categoryOf(r2: HasTier, scn: Scn = 0): { cat: Category; why: string } {
  const f = fundedIds(r2);
  if (f.length === 0) return { cat: 3, why: "Nothing is built: the task asks for an architecture." };
  const ai = f.filter((id) => AI_IDS.includes(id));
  const base = isFunded(r2, KPI_SYSTEM_ID);
  if (ai.length > 0 && !base) return { cat: 3, why: `${ai.map((id) => PANEL[id].short).join(", ")} funded with no KPI system: tools are bought before the base exists.` };
  const plan = planOf(r2, scn);
  const open = plan.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  if (!base) return { cat: 2, why: "No KPI system yet, so nothing can be measured; no tool is bought without it." };
  if (open.length === 0) return { cat: 1, why: "The KPI system is funded and every applicable test holds." };
  return { cat: 2, why: `The KPI system is funded, but these tests are open: ${open.join("; ")}.` };
}

export type Change = { id: ArchId; to: Tier; text: string };

const CUT_ORDER: ArchId[] = ["suite", "pricing", "training", "quality", "trigger", "reco"];

/** The changes that put the plan on the safe side, as information: which item to which tier and why, and what the plan looks like after them. */
export function changesFor(r2: HasTier, scn: Scn): { changes: Change[]; after: PlanView } {
  const t: Record<string, Tier> = { ...r2.tier };
  const cur = (id: ArchId): Tier => t[id] ?? "not";
  const changes: Change[] = [];
  const set = (id: ArchId, to: Tier, text: string) => {
    if (cur(id) === to) return;
    t[id] = to;
    changes.push({ id, to, text });
  };
  const any = () => ARCH_IDS.some((id) => cur(id) !== "not");
  const anyEngine = () => ENGINE_IDS.some((id) => cur(id) !== "not");
  const baseText = tt("Set the KPI system and data foundation to Now: the base comes first, and it starts in month 1, no later than any engine.", "Setzen Sie KPI-System und Datenbasis auf „Jetzt“: Die Basis kommt zuerst, und sie startet in Monat 1, nicht später als jede Engine.");
  const abText = tt("Set the A/B routine to Now: every engine is then compared with a control group from its first week.", "Setzen Sie die A/B-Routine auf „Jetzt“: Jede Engine wird dann ab ihrer ersten Woche mit einer Kontrollgruppe verglichen.");

  if (!any()) {
    set(KPI_SYSTEM_ID, "now", baseText);
    set(AB_ID, "now", abText);
    set("reco", "now", tt(`Add the recommendation engine, set to Now: its data is ${PANEL.reco.data}% ready and it moves the conversion rate, a named customer KPI.`, `Fügen Sie die Recommendation Engine hinzu, auf „Jetzt“: Ihre Daten sind zu ${PANEL.reco.data} % bereit, und sie bewegt die Conversion Rate, einen benannten Kunden-KPI.`));
  }
  if (any() && cur(KPI_SYSTEM_ID) !== "now") set(KPI_SYSTEM_ID, "now", baseText);
  if ((anyEngine() || cur("suite") !== "not") && cur(AB_ID) !== "now") set(AB_ID, "now", abText);
  if (cur("suite") !== "not") set("suite", "not", tt("Set the full AI suite to Not now: it names no KPI it moves and nobody can see inside it, so it can be neither explained nor measured.", "Setzen Sie die komplette KI-Suite auf „Jetzt nicht“: Sie nennt keinen KPI, den sie bewegt, und niemand kann hineinsehen, also lässt sie sich weder erklären noch messen."));
  const spent = () => ARCH_IDS.filter((id) => cur(id) !== "not").reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const cut = () => {
    for (const id of CUT_ORDER) {
      if (spent() <= R2_BUDGET) return;
      if (cur(id) === "not") continue;
      set(id, "not", tt(`Set ${PANEL[id].short} to Not now: the plan is ${euro(spent() - R2_BUDGET)} over the budget and this is the item with the weakest case.`, `Setzen Sie ${PANEL[id].short} auf „Jetzt nicht“: Der Plan liegt ${euro(spent() - R2_BUDGET)} über dem Budget, und dies ist der Punkt mit der schwächsten Begründung.`));
    }
  };
  cut();
  if (cur("pricing") !== "not") {
    if (cur(CLEAN_ID) !== "now") set(CLEAN_ID, "now", tt("Set the data clean-up to Now: it prepares the price data dynamic pricing needs.", "Setzen Sie die Datenbereinigung auf „Jetzt“: Sie bereitet die Preisdaten vor, die Dynamic Pricing braucht."));
    if (!dataOk({ tier: t }, "pricing", scn)) set("pricing", "later", tt(`Set dynamic pricing to After data is ready: its data is ${PANEL.pricing.data}% ready, so it starts in month ${1 + monthsOf(CLEAN_ID)}, when the clean-up is in use.`, `Setzen Sie Dynamic Pricing auf „Wenn die Daten bereit sind“: Seine Daten sind zu ${PANEL.pricing.data} % bereit, also startet es in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung im Einsatz ist.`));
    cut();
  }
  return { changes, after: planOf({ tier: t }, scn) };
}

/* ------------------------------------------------------------------ how the system reads the plan (wording by category) */

/** One paragraph on how the plan stands, worded by category; it never names the category. */
export function standingOf(r2: HasTier, scn: Scn): string {
  const { cat } = categoryOf(r2, scn);
  const f = fundedIds(r2);
  const ai = f.filter((id) => AI_IDS.includes(id));
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  if (cat === 3) {
    return f.length === 0
      ? tt("Nothing is built, so the three problems in the brief stay as they are. The task asks for an architecture. Below are the changes that put the base first.", "Nichts wird gebaut, also bleiben die drei Probleme des Auftrags, wie sie sind. Die Aufgabe verlangt eine Architektur. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.")
      : tt(`${ai.map((id) => PANEL[id].short).join(", ")} ${ai.length === 1 ? "is" : "are"} funded, but there is no KPI system. Without it nothing can say whether the tools work, and an engine on data that is not mapped learns its gaps. Below are the changes that put the base first.`, `${ai.map((id) => PANEL[id].short).join(", ")} ${ai.length === 1 ? "ist" : "sind"} finanziert, aber es gibt kein KPI-System. Ohne es kann nichts sagen, ob die Werkzeuge wirken, und eine Engine auf Daten, die nicht erfasst sind, lernt deren Lücken. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.`);
  }
  if (cat === 2) {
    const open = brief.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
    return open.length
      ? tt(`The base is there, but ${open.length} of ${brief.applicable} tests are open with the brief's data: ${open.join("; ")}. Each is explained in the panel; below are the changes that make the plan hold.`, `Die Basis ist da, aber ${open.length} von ${brief.applicable} Tests sind bei den Daten des Auftrags offen: ${open.join("; ")}. Jeder ist im Panel erklärt; unten stehen die Änderungen, mit denen der Plan hält.`)
      : tt("There is no KPI system yet, so nothing can be measured. Below are the changes that put the base first.", "Es gibt noch kein KPI-System, also lässt sich nichts messen. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.");
  }
  const watch = weak.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  return tt(
    `The base comes before the engines and every test holds with the brief's data: the KPI system and the A/B routine start no later than the first engine, every funded item has a purpose, the engines start on data that is ready, and the plan fits the budget and the six months. Other plans can hold too.${watch.length ? ` With the data ${WEAK_POINTS} points weaker, ${watch.length === 1 ? "this test opens" : "these tests open"}: ${watch.join("; ")}. That is what the sentence “what you will watch” in Step B is for.` : ""}`,
    `Die Basis kommt vor den Engines, und jeder Test stimmt bei den Daten des Auftrags: KPI-System und A/B-Routine starten nicht später als die erste Engine, jeder finanzierte Punkt hat einen Zweck, die Engines starten auf bereiten Daten, und der Plan passt ins Budget und in die sechs Monate. Auch andere Pläne können halten.${watch.length ? ` Bei um ${WEAK_POINTS} Punkte schwächeren Daten ${watch.length === 1 ? "öffnet sich dieser Test" : "öffnen sich diese Tests"}: ${watch.join("; ")}. Dafür ist der Satz „Was Sie beobachten“ in Schritt B da.` : ""}`,
  );
}

export type DecisionReading = { cat: Category; why: string; text: string; change: string };

/** How the system reads the Step B decision against the Step A plan; null until a decision is chosen. The category is for the mentor only. */
export function decisionReading(r2: HasTier & { decision: string | null }, scn: Scn): DecisionReading | null {
  if (!r2.decision) return null;
  const plan = categoryOf(r2, scn);
  const base = isFunded(r2, KPI_SYSTEM_ID);
  const firstMoves = euro(ARCH_BY_ID[KPI_SYSTEM_ID].cost + ARCH_BY_ID[AB_ID].cost);
  if (r2.decision === "stage") {
    const clause =
      plan.cat === 1
        ? tt(" Your Step A is that staged plan.", " Ihr Schritt A ist dieser gestufte Plan.")
        : plan.cat === 2
          ? tt(" Step A still has open tests, so the staging is not complete yet: see what to change under Step A.", " Schritt A hat noch offene Tests, die Stufung ist also noch nicht vollständig: Siehe, was Sie unter Schritt A ändern können.")
          : tt(" Step A buys tools before the base exists, so the staging is not real yet: put the base first (see Step A).", " Schritt A kauft Werkzeuge, bevor die Basis steht, die Stufung ist also noch nicht echt: Setzen Sie die Basis an die erste Stelle (siehe Schritt A).");
    return {
      cat: 1,
      why: "Staging is the decision the brief asks for: decide now, measure before scaling.",
      text: tt("Deciding now and building in stages is what the brief asks for: it makes the decision and tests before it scales.", "Jetzt zu entscheiden und stufenweise zu bauen ist, was der Auftrag verlangt: Es trifft die Entscheidung und testet, bevor es skaliert.") + clause,
      change: plan.cat === 1 ? tt("Nothing to change in the decision. What is left is the sentence on what you will watch.", "An der Entscheidung ist nichts zu ändern. Es bleibt der Satz dazu, was Sie beobachten.") : tt("Keep the decision and apply the changes from the reading under Step A.", "Behalten Sie die Entscheidung und setzen Sie die Änderungen aus dem Lesen unter Schritt A um."),
    };
  }
  if (r2.decision === "commit")
    return {
      cat: base ? 2 : 3,
      why: base ? "The suite is bought all at once although a base is funded." : "The suite is bought with no base: tools and AI without mapping.",
      text: tt(`Buying the full AI suite now spends ${euro(ARCH_BY_ID.suite.cost)} of ${euro(R2_BUDGET)} before any KPI shows what works, and it is a black box: nobody can see why it picks an offer, so it cannot be steered.`, `Die komplette KI-Suite jetzt zu kaufen gibt ${euro(ARCH_BY_ID.suite.cost)} von ${euro(R2_BUDGET)} aus, bevor ein KPI zeigt, was wirkt, und sie ist eine Black Box: Niemand sieht, warum sie ein Angebot wählt, also lässt sie sich nicht steuern.`),
      change: tt(`Choose “Decide now, build in stages, and watch one figure”: set the KPI system and the A/B routine to Now (together ${firstMoves}), then add the engines that move a named KPI on data that is ready.`, `Wählen Sie „Jetzt entscheiden, stufenweise bauen, und eine Zahl beobachten“: Setzen Sie KPI-System und A/B-Routine auf „Jetzt“ (zusammen ${firstMoves}), und fügen Sie dann die Engines hinzu, die einen benannten KPI auf bereiten Daten bewegen.`),
    };
  return {
    cat: 2,
    why: "Waiting keeps the standard communication and tests nothing; the brief asks for a decision despite an unclear forecast.",
    text: tt("Waiting until the forecast is clear keeps the impersonal standard communication for six more months, and no study makes the forecast clear without a test.", "Zu warten, bis die Prognose klar ist, behält die unpersönliche Standardkommunikation sechs weitere Monate bei, und keine Studie macht die Prognose ohne Test klar."),
    change: tt(`Choose “Decide now, build in stages, and watch one figure”: the safest first move is cheap, the KPI system and the A/B routine in month 1 (together ${firstMoves}). They test the forecast instead of waiting for it.`, `Wählen Sie „Jetzt entscheiden, stufenweise bauen, und eine Zahl beobachten“: Der sicherste erste Schritt ist günstig, KPI-System und A/B-Routine in Monat 1 (zusammen ${firstMoves}). Sie testen die Prognose, statt auf sie zu warten.`),
  };
}
