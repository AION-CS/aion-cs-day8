import { LINES } from "@/data/ladder";
import { INSIGHT_MIN, PICK, hasSoWhat } from "@/data/forecast";
import { AB, AB_PARTS, PATTERNS, PATTERN_IDS, RECORDS } from "@/data/patterns";
import { CHOOSE, MEASURE_BY_ID } from "@/data/measures";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, COMP_CHOOSE, CRIT_IDS, PRINCIPLES, R2_BUDGET, SIT_BY_ID, SIT_IDS, SOURCES } from "@/data/route2";
import { archOver, citesForecastFigure, funded, hasNumber } from "@/lib/checks";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { parseAmount } from "@/lib/parseAmount";
import { euro, tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  participant: "participant-strip",
  line: (id: string) => `line-${id}`,
  figure: (id: string) => `fig-${id}`,
  extraInsight: "extra-insight",
  meaning: "meaning-field",
  valuable: "valuable-field",
  churners: "churners-field",
  insight: (i: number) => `insight-${i}`,
  reflect: (k: string) => `reflect-${k}`,
  rec: (id: string) => `rec-${id}`,
  unc: "unc-field",
  row: (p: string) => `row-${p}`,
  misread: "misread-field",
  abPart: (k: string) => `ab-${k}`,
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  order: "order-field",
  why: "why-field",
  principlePick: "principle-pick",
  principle: (id: string) => `principle-${id}`,
  source: (id: string) => `source-${id}`,
  compPick: "comp-pick",
  comp: (id: string) => `comp-${id}`,
  greatest: "greatest-field",
  greatestWhy: "greatest-why",
  logic: (id: string) => `logic-${id}`,
  arch: (id: string) => `arch-${id}`,
  archTotal: "arch-total",
  postponed: "postponed-field",
  pickup: "pickup-field",
  decision: "decision-field",
  assumption: (i: number) => `assumption-${i}`,
  trip: "trip-field",
  challenge: "challenge-field",
} as const;

export type MissingEntry = { id: string; label: string };
const short = (s: string, n = 44) => (s.length > n ? `${s.slice(0, n)}…` : s);

export function participantMissing(p: Persisted): MissingEntry[] {
  return p.participant.name.trim() ? [] : [{ id: IDS.participant, label: tt("Your full name is needed for the file name.", "Ihr vollständiger Name wird für den Dateinamen gebraucht.") }];
}

export function l1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { l1 } = p;
  const e = (id: string, label: string) => out.push({ id, label });
  for (const r of LINES) if (l1.sort[r.id] === null) e(IDS.line(r.id), tt(`Block 1.1: “${short(r.text)}” is not tagged as recommendation, communication or automation.`, `Block 1.1: „${short(r.text)}“ ist nicht als Empfehlung, Kommunikation oder Automatisierung zugeordnet.`));
  if (l1.extraInsight.trim().length < MIN_LINE) e(IDS.extraInsight, tt(`Block 1.1: name one personalisation opportunity of your own (at least ${MIN_LINE} characters).`, `Block 1.1: Nennen Sie eine eigene Chance zur Personalisierung (mindestens ${MIN_LINE} Zeichen).`));
  for (const f of ["F1", "F2", "F3"] as const) if (parseAmount(l1.fig[f]) === null) e(IDS.figure(f), tt(`Block 1.2: ${f} has no figure.`, `Block 1.2: ${f} hat keinen Wert.`));
  const w = l1.meaning.trim();
  if (!w) e(IDS.meaning, tt("Block 1.2: the sentence on what the pilot means is empty.", "Block 1.2: Der Satz dazu, was der Pilot bedeutet, ist leer."));
  else if (w.length < MIN_SENTENCE) e(IDS.meaning, tt(`Block 1.2: the sentence needs at least ${MIN_SENTENCE} characters.`, `Block 1.2: Der Satz braucht mindestens ${MIN_SENTENCE} Zeichen.`));
  else if (!citesForecastFigure(w)) e(IDS.meaning, tt("Block 1.2: the sentence states none of your pilot figures.", "Block 1.2: Der Satz nennt keinen Ihrer Pilotwerte."));
  if (l1.valuable.length !== PICK) e(IDS.valuable, tt(`Block 1.3: choose the ${PICK} situations to hand fully to automation (you have ${l1.valuable.length}).`, `Block 1.3: Wählen Sie die ${PICK} Situationen, die voll automatisiert werden können (Sie haben ${l1.valuable.length}).`));
  if (l1.churners.length !== PICK) e(IDS.churners, tt(`Block 1.3: choose the ${PICK} situations that must stay with a person (you have ${l1.churners.length}).`, `Block 1.3: Wählen Sie die ${PICK} Situationen, die bei einem Menschen bleiben müssen (Sie haben ${l1.churners.length}).`));
  l1.insights.forEach((a, i) => {
    const n = i + 1;
    if (!a.basis) e(IDS.insight(i), tt(`Block 1.3: advantage ${n} names no technology.`, `Block 1.3: Vorteil ${n} nennt keine Technologie.`));
    else if (l1.insights.findIndex((b) => b.basis === a.basis) !== i) e(IDS.insight(i), tt(`Block 1.3: advantage ${n} repeats a technology. Use a different one for each.`, `Block 1.3: Vorteil ${n} wiederholt eine Technologie. Nutzen Sie für jeden eine andere.`));
    const t = a.text.trim();
    if (!t) e(IDS.insight(i), tt(`Block 1.3: advantage ${n} is empty.`, `Block 1.3: Vorteil ${n} ist leer.`));
    else if (t.length < INSIGHT_MIN) e(IDS.insight(i), tt(`Block 1.3: advantage ${n} needs at least ${INSIGHT_MIN} characters.`, `Block 1.3: Vorteil ${n} braucht mindestens ${INSIGHT_MIN} Zeichen.`));
    else if (!hasSoWhat(t)) e(IDS.insight(i), tt(`Block 1.3: advantage ${n} names no risk. Add “but …”.`, `Block 1.3: Vorteil ${n} nennt kein Risiko. Ergänzen Sie „aber …“.`));
  });
  const rf: [keyof typeof l1.reflect, string, string][] = [
    ["interpret", "when AI brings real added value", "wann KI echten Mehrwert bringt"],
    ["causation", "where automating a contact would make the experience worse", "wo ein automatisierter Kontakt das Erlebnis verschlechtern würde"],
    ["decider", "how a data-driven decision-maker would read the pilot", "wie eine datengetriebene Entscheiderin den Pilot lesen würde"],
  ];
  for (const [k, en, de] of rf) if (l1.reflect[k].trim().length < MIN_LINE) e(IDS.reflect(k), tt(`Block 1.4: say ${en} (at least ${MIN_LINE} characters).`, `Block 1.4: Sagen Sie, ${de} (mindestens ${MIN_LINE} Zeichen).`));
  for (const r of RECORDS) if (l1.tags[r.id] === null) e(IDS.rec(r.id), tt(`Block 2.1: ${r.code} has no kind.`, `Block 2.1: ${r.code} hat keine Art.`));
  if (l1.unc.length < 2) e(IDS.unc, tt("Block 2.2: choose at least two uncertainties in measuring the pilot.", "Block 2.2: Wählen Sie mindestens zwei Unsicherheiten in der Messung des Piloten."));
  for (const x of PATTERN_IDS) {
    const r = l1.rows[x];
    const n = PATTERNS[x].label;
    if (!r.risk) e(IDS.row(x), tt(`Block 2.2: give ${n} a link to customer value.`, `Block 2.2: Geben Sie ${n} eine Verbindung zum Kundenwert.`));
    if (!r.meaning) e(IDS.row(x), tt(`Block 2.2: say what ${n} tells management.`, `Block 2.2: Sagen Sie, was ${n} dem Management sagt.`));
    if (!r.measure) e(IDS.row(x), tt(`Block 2.2: choose how to use ${n}.`, `Block 2.2: Wählen Sie, wie ${n} genutzt wird.`));
  }
  if (l1.misread.trim().length < MIN_SENTENCE) e(IDS.misread, tt(`Block 2.2: name your three KPIs, with source and target (at least ${MIN_SENTENCE} characters).`, `Block 2.2: Nennen Sie Ihre drei KPIs, mit Quelle und Ziel (mindestens ${MIN_SENTENCE} Zeichen).`));
  if (l1.ab.hyp.trim().length < MIN_LINE) e(IDS.abPart("hyp"), tt(`Block 2.3: write the hypothesis (at least ${MIN_LINE} characters).`, `Block 2.3: Schreiben Sie die Hypothese (mindestens ${MIN_LINE} Zeichen).`));
  for (const k of AB_PARTS) if (!l1.ab[k]) e(IDS.abPart(k), tt(`Block 2.3: choose “${AB[k].label}”.`, `Block 2.3: Wählen Sie „${AB[k].label}“.`));
  if (l1.ab.rule.trim().length < MIN_LINE) e(IDS.abPart("rule"), tt(`Block 2.3: write the decision rule (at least ${MIN_LINE} characters).`, `Block 2.3: Schreiben Sie die Entscheidungsregel (mindestens ${MIN_LINE} Zeichen).`));
  else if (!/\d/.test(l1.ab.rule)) e(IDS.abPart("rule"), tt("Block 2.3: the decision rule names no number.", "Block 2.3: Die Entscheidungsregel nennt keine Zahl."));
  if (l1.chosen.length !== CHOOSE) e(IDS.measurePick, tt(`Block 2.4: choose exactly ${CHOOSE} measures (you have ${l1.chosen.length}).`, `Block 2.4: Wählen Sie genau ${CHOOSE} Maßnahmen (Sie haben ${l1.chosen.length}).`));
  for (const id of l1.chosen) {
    const name = MEASURE_BY_ID[id].name;
    if (l1.aims[id] === undefined) e(IDS.measure(id), tt(`Block 2.4: “${name}” names no problem it answers (or “none”).`, `Block 2.4: „${name}“ nennt kein Problem, das sie beantwortet (oder „keines“).`));
    if (!l1.exp[id] || !l1.fea[id] || !l1.eff[id]) e(IDS.measure(id), tt(`Block 2.4: “${name}” is not fully scored (effect, measurability, scalability).`, `Block 2.4: „${name}“ ist nicht vollständig bewertet (Wirkung, Messbarkeit, Skalierbarkeit).`));
  }
  if (l1.chosen.length === CHOOSE) {
    if (l1.order.length !== CHOOSE || !l1.chosen.every((id) => l1.order.includes(id))) e(IDS.order, tt("Block 2.4: put your three measures in a priority order.", "Block 2.4: Bringen Sie Ihre drei Maßnahmen in eine Reihenfolge."));
    if (l1.why.trim().length < 60) e(IDS.why, tt("Block 2.4: say why your first priority goes first (at least 60 characters).", "Block 2.4: Begründen Sie, warum Ihre erste Priorität zuerst kommt (mindestens 60 Zeichen)."));
  }
  return out;
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p;
  const e = (id: string, label: string) => out.push({ id, label });
  if (r2.principles.length !== 3) e(IDS.principlePick, tt(`Block 3.1: choose exactly 3 principles (you have ${r2.principles.length}).`, `Block 3.1: Wählen Sie genau 3 Prinzipien (Sie haben ${r2.principles.length}).`));
  for (const c of r2.principles) if ((r2.principleText[c] ?? "").trim().length < MIN_LINE) e(IDS.principle(c), tt(`Block 3.1: say what “${PRINCIPLES[c].name}” means for AIConnect (at least ${MIN_LINE} characters).`, `Block 3.1: Sagen Sie, was „${PRINCIPLES[c].name}“ für AIConnect bedeutet (mindestens ${MIN_LINE} Zeichen).`));
  for (const s of SOURCES) if (!r2.sources[s.id]) e(IDS.source(s.id), tt(`Block 3.2: decide what to do with “${short(s.name, 40)}”.`, `Block 3.2: Entscheiden Sie, was mit „${short(s.name, 40)}“ geschieht.`));
  if (r2.comps.length !== COMP_CHOOSE) e(IDS.compPick, tt(`Block 3.3: choose exactly ${COMP_CHOOSE} KPIs (you have ${r2.comps.length}).`, `Block 3.3: Wählen Sie genau ${COMP_CHOOSE} KPIs (Sie haben ${r2.comps.length}).`));
  for (const id of r2.comps) if (!CRIT_IDS.every((c) => !!r2.rate[`${id}.${c}`])) e(IDS.comp(id), tt(`Block 3.3: “${COMP_BY_ID[id].name}” is not rated on all four tests.`, `Block 3.3: „${COMP_BY_ID[id].name}“ ist nicht nach allen vier Tests bewertet.`));
  if (!r2.greatest) e(IDS.greatest, tt("Block 3.3: name the KPI with the greatest leverage.", "Block 3.3: Nennen Sie den KPI mit der größten Hebelwirkung."));
  if (r2.greatestWhy.trim().length < 40) e(IDS.greatestWhy, tt("Block 3.3: say why it has the greatest leverage (at least 40 characters).", "Block 3.3: Begründen Sie, warum er die größte Hebelwirkung hat (mindestens 40 Zeichen)."));
  for (const s of SIT_IDS) {
    const r = r2.logic[s];
    const n = short(SIT_BY_ID[s].signal, 40);
    if (!r?.action) e(IDS.logic(s), tt(`Block 3.4: choose what happens with “${n}”.`, `Block 3.4: Wählen Sie, was mit „${n}“ passiert.`));
    if (!r?.owner) e(IDS.logic(s), tt(`Block 3.4: choose who acts on “${n}”.`, `Block 3.4: Wählen Sie, wer bei „${n}“ handelt.`));
  }
  const f = funded(r2);
  if (f.length === 0) e(IDS.archTotal, tt("Block 3.5: fund at least one item.", "Block 3.5: Finanzieren Sie mindestens einen Punkt."));
  if (archOver(r2) > 0) e(IDS.archTotal, tt(`Block 3.5: the funded items are ${euro(archOver(r2))} over the ${euro(R2_BUDGET)} budget.`, `Block 3.5: Die finanzierten Punkte liegen ${euro(archOver(r2))} über dem Budget von ${euro(R2_BUDGET)}.`));
  for (const id of f) {
    const name = ARCH_BY_ID[id].name;
    if (r2.start[id] == null) e(IDS.arch(id), tt(`Block 3.5: “${name}” has no start month.`, `Block 3.5: „${name}“ hat keinen Startmonat.`));
    if (!r2.owner[id]) e(IDS.arch(id), tt(`Block 3.5: “${name}” has no owner.`, `Block 3.5: „${name}“ hat keinen Owner.`));
    const t = (r2.trigger[id] ?? "").trim();
    if (t.length < 20) e(IDS.arch(id), tt(`Block 3.5: “${name}” needs a trigger (at least 20 characters).`, `Block 3.5: „${name}“ braucht einen Trigger (mindestens 20 Zeichen).`));
    else if (!hasNumber(t)) e(IDS.arch(id), tt(`Block 3.5: the trigger of “${name}” names no number.`, `Block 3.5: Der Trigger von „${name}“ nennt keine Zahl.`));
  }
  if (!ARCH_IDS.every((id) => r2.alloc[id])) {
    if (r2.postponed.trim().length < MIN_LINE) e(IDS.postponed, tt("Block 3.5: say what you leave out and why.", "Block 3.5: Sagen Sie, was Sie weglassen und warum."));
    if (r2.pickup.trim().length < 15 || !hasNumber(r2.pickup)) e(IDS.pickup, tt("Block 3.5: give the pickup point: the number and the date at which you look at it again.", "Block 3.5: Nennen Sie den Pickup Point: die Zahl und den Zeitpunkt, zu dem Sie es wieder prüfen."));
  }
  if (!r2.decision) e(IDS.decision, tt("Block 3.6: choose your technology decision.", "Block 3.6: Wählen Sie Ihre Technologieentscheidung."));
  r2.assumptions.forEach((a, i) => {
    if (a.trim().length < MIN_LINE) e(IDS.assumption(i), tt(`Block 3.6: assumption ${i + 1} is missing (at least ${MIN_LINE} characters).`, `Block 3.6: Annahme ${i + 1} fehlt (mindestens ${MIN_LINE} Zeichen).`));
  });
  if (!r2.tripKpi) e(IDS.trip, tt("Block 3.6: choose the metric of your tripwire.", "Block 3.6: Wählen Sie die Kennzahl Ihres Tripwires."));
  if (parseAmount(r2.tripThreshold) === null) e(IDS.trip, tt("Block 3.6: give the tripwire a threshold.", "Block 3.6: Geben Sie dem Tripwire einen Schwellenwert."));
  if (!r2.tripMonth) e(IDS.trip, tt("Block 3.6: give the tripwire a month.", "Block 3.6: Geben Sie dem Tripwire einen Monat."));
  if (!r2.tripAction) e(IDS.trip, tt("Block 3.6: say what you do if the tripwire is missed.", "Block 3.6: Sagen Sie, was Sie tun, wenn der Tripwire verfehlt wird."));
  if (r2.challenge.trim().length < 60) e(IDS.challenge, tt("Block 3.6: answer the board's challenge (at least 60 characters).", "Block 3.6: Beantworten Sie die Frage des Vorstands (mindestens 60 Zeichen)."));
  return out;
}
