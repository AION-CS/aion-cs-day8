import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { COMP_BY_ID, MODEL_ARCH, MODEL_COMPS, MODEL_GREATEST, MODEL_START, MODEL_TRIGGER, MODEL_TRIPWIRE, OWNER_ACCEPT, OWNER_ACCEPT_LOGIC, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import type { Criterion, LogicRow, OwnerId, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["reco", "kpi", "trigger"];

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "Customers who add users but never open the admin settings are new admins, so AIConnect could send them the admin training offer and a short setup guide instead of the general newsletter.",
      "Kunden, die Nutzer hinzufügen, aber nie die Admin-Einstellungen öffnen, sind neue Admins, also könnte AIConnect ihnen das Angebot für die Admin-Schulung und eine kurze Einrichtungsanleitung schicken statt des allgemeinen Newsletters.",
    ),
    fig: { F1: String(FORECAST.f1), F2: String(FORECAST.f2), F3: String(FORECAST.f3) },
    meaning: tt(
      `The personalised offer converted ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times the standard rate. Across ${num(PILOT.yearly)} offer e-mails that would be about ${euro(FORECAST.f3)} a year, so AIConnect should run a larger second test before rolling it out, because ${PILOT.control.orders} and ${PILOT.variant.orders} orders are still a small base.`,
      `Das personalisierte Angebot konvertierte mit ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} %, das ${num(FORECAST.f2)}-Fache der Standardrate. Über ${num(PILOT.yearly)} Angebots-E-Mails wären das etwa ${euro(FORECAST.f3)} pro Jahr, also sollte AIConnect vor dem Rollout einen größeren zweiten Test fahren, weil ${PILOT.control.orders} und ${PILOT.variant.orders} Bestellungen noch eine kleine Basis sind.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "reco" as Basis, text: tt("Recommendations show customers the add-on that firms like theirs actually use, which saves them searching, but if a suggestion is wrong or pushy it looks like selling instead of help.", "Empfehlungen zeigen Kunden das Add-on, das Firmen wie ihre tatsächlich nutzen, was ihnen Suchen erspart, aber ist ein Vorschlag falsch oder aufdringlich, wirkt es wie Verkaufen statt Hilfe.") },
      { basis: "comm" as Basis, text: tt("Messages that follow what a customer did arrive when they are useful, for example in the budget month, but too much tracking can feel like surveillance and needs a lawful basis under the GDPR.", "Nachrichten, die dem folgen, was ein Kunde tat, kommen an, wenn sie nützlich sind, etwa im Budgetmonat, aber zu viel Tracking kann sich wie Überwachung anfühlen und braucht eine Rechtsgrundlage nach der DSGVO.") },
      { basis: "auto" as Basis, text: tt("A chatbot answers password questions at night, so customers wait minutes instead of a day, but if it cannot hand hard cases to a person, customers feel stuck with a machine.", "Ein Chatbot beantwortet Passwortfragen nachts, sodass Kunden Minuten statt einen Tag warten, aber kann er schwierige Fälle nicht an einen Menschen übergeben, fühlen sich Kunden bei einer Maschine festgehalten.") },
    ],
    reflect: {
      interpret: tt("AI adds value where it answers a problem we can measure: the recommended add-on raised conversion in the pilot. A full AI suite bought first, with no KPI behind it, is technology without strategy.", "KI bringt Mehrwert, wo sie ein Problem beantwortet, das wir messen können: Das empfohlene Add-on hob im Pilot die Conversion. Eine komplette KI-Suite, zuerst gekauft und ohne KPI dahinter, ist Technologie ohne Strategie."),
      causation: tt("Automating the key account that says it may cancel would make it worse: the customer would feel processed at the moment it needs a person, and AIConnect could lose a whole contract to save one phone call.", "Den Key Account zu automatisieren, der eine Kündigung andeutet, würde es verschlechtern: Der Kunde fühlte sich abgefertigt, genau wenn er einen Menschen braucht, und AIConnect könnte einen ganzen Vertrag verlieren, um einen Anruf zu sparen."),
      decider: tt("They would check that both groups ran in the same weeks and that 60 and 96 orders are enough, not yet conclude that 4.8% holds for every customer, and run a larger second test with a fixed size and a guardrail on unsubscribes before rolling out.", "Sie würde prüfen, dass beide Gruppen in denselben Wochen liefen und ob 60 und 96 Bestellungen reichen, noch nicht schließen, dass 4,8 % für jeden Kunden gelten, und vor dem Rollout einen größeren zweiten Test mit fester Größe und einer Guardrail für Abmeldungen fahren."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Conversion rate of offer e-mails (outcome), from the shop and the mailing tool, target 4% by month 6 against 3% today. 2) Weekly active customers (driver), from portal logins, target 50%. 3) Unsubscribe rate (guardrail), from the mailing tool, must stay below 0.5%.",
      "1) Conversion Rate der Angebots-E-Mails (Outcome), aus Shop und Mailing-Tool, Ziel 4 % bis Monat 6 gegenüber 3 % heute. 2) Wöchentlich aktive Kunden (Treiber), aus den Portal-Logins, Ziel 50 %. 3) Abmelderate (Guardrail), aus dem Mailing-Tool, muss unter 0,5 % bleiben.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If we replace the standard offer with the recommended add-on, then the conversion rate rises, because customers see a product that similar firms actually bought.", "Wenn wir das Standardangebot durch das empfohlene Add-on ersetzen, dann steigt die Conversion Rate, weil Kunden ein Produkt sehen, das ähnliche Firmen tatsächlich gekauft haben."),
      rule: tt("Roll out if the conversion rate is at least 10% higher than the control group with 100 orders per group and unsubscribes stay below 0.5%; keep testing if it is 3 to 10% higher; stop if it is less than 3% higher.", "Ausrollen, wenn die Conversion Rate bei 100 Bestellungen pro Gruppe mindestens 10 % über der Kontrollgruppe liegt und die Abmeldungen unter 0,5 % bleiben; weiter testen bei 3 bis 10 % darüber; stoppen bei weniger als 3 % darüber."),
    },
    chosen: [...MODEL_MEASURES],
    aims: Object.fromEntries(MODEL_MEASURES.map((id) => [id, [...MEASURE_BY_ID[id].targets]])) as Record<string, ProblemId[]>,
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    order: [...MODEL_ORDER],
    why: tt(
      "The recommendation engine goes first: it scores 27, answers both impersonal communication and low conversion, and the pilot showed 1.6 times the standard rate, worth about €388,800 a year. The KPI dashboard and testing routine comes second and starts alongside it, so the engine is measured from its first week. The triggered e-mails come third. The three cost €125,000 of the €200,000; the chatbot and dynamic pricing wait, because they answer none of the problems or cannot yet be measured.",
      "Die Recommendation Engine kommt zuerst: Sie erzielt 27, beantwortet unpersönliche Kommunikation und niedrige Conversion, und der Pilot zeigte das 1,6-Fache der Standardrate, etwa 388.800 € pro Jahr. Das KPI-Dashboard mit Test-Routine kommt als Zweites und startet gleichzeitig, damit die Engine ab ihrer ersten Woche gemessen wird. Die Trigger-E-Mails kommen als Drittes. Die drei kosten 125.000 € von 200.000 €; Chatbot und Dynamic Pricing warten, weil sie keines der Probleme beantworten oder noch nicht messbar sind.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("The board, marketing and sales steer by the same three KPIs (conversion, engagement, customer value) with one definition each, so a success in one team is a success on the board's page too.", "Vorstand, Marketing und Vertrieb steuern nach denselben drei KPIs (Conversion, Engagement, Kundenwert) mit je einer Definition, damit ein Erfolg in einem Team auch auf der Seite des Vorstands ein Erfolg ist."),
      rules: tt("No tool is bought because it is advanced: each names the KPI it should move and runs against a control group first, which answers “measures not measurable”.", "Kein Werkzeug wird gekauft, weil es fortschrittlich ist: Jedes nennt den KPI, den es bewegen soll, und läuft zuerst gegen eine Kontrollgruppe, was „Maßnahmen nicht messbar“ beantwortet."),
      review: tt("Every quarter we compare each measure's uplift with its forecast and change the rules that do not hold, so the system gets better instead of only bigger.", "Jedes Quartal vergleichen wir den Uplift jeder Maßnahme mit ihrer Prognose und ändern die Regeln, die nicht halten, damit das System besser wird statt nur größer."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "Conversion rate of offers is the result the brief names as low. It is linked to value and counted weekly for every customer by the systems, so every technology can be judged by it within weeks.",
      "Die Conversion Rate der Angebote ist das Ergebnis, das der Auftrag als niedrig nennt. Sie ist mit dem Wert verbunden und wird wöchentlich für jeden Kunden von den Systemen gezählt, sodass jede Technologie innerhalb von Wochen daran gemessen werden kann.",
    ),
    logic,
    alloc: Object.fromEntries(MODEL_ARCH.map((id) => [id, true])),
    start: { ...MODEL_START } as Record<string, number>,
    owner: Object.fromEntries(MODEL_ARCH.map((id) => [id, OWNER_ACCEPT[id][0]])) as Record<string, OwnerId>,
    trigger: Object.fromEntries(MODEL_ARCH.map((id) => [id, MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER]])) as Record<string, string>,
    postponed: tt(
      "The full AI suite (€90,000) is left out: the six funded items cost €195,000 of the €220,000, the suite would push the plan €65,000 over, and nobody at AIConnect could explain or measure what it does. Dynamic pricing (€50,000) waits, because its price data is only 40% ready.",
      "Die komplette KI-Suite (90.000 €) bleibt draußen: Die sechs finanzierten Punkte kosten 195.000 € von 220.000 €, die Suite brächte den Plan 65.000 € über das Budget, und niemand bei AIConnect könnte erklären oder messen, was sie tut. Dynamic Pricing (50.000 €) wartet, weil seine Preisdaten erst zu 40 % bereit sind.",
    ),
    pickup: tt(
      "If the conversion rate of the recommended offer reaches 4% by month 5, we pilot dynamic pricing on one product in month 6.",
      "Erreicht die Conversion Rate des empfohlenen Angebots bis Monat 5 4 %, pilotieren wir in Monat 6 Dynamic Pricing an einem Produkt.",
    ),
    decision: "stage",
    assumptions: [
      tt("The pilot's uplift holds for all customers, not only the pilot list. This is wrong if the second run shows less than 1.2 times the control rate on 100 orders per group by month 4.", "Der Uplift des Piloten gilt für alle Kunden, nicht nur für die Pilotliste. Das ist falsch, wenn der zweite Durchlauf bis Monat 4 bei 100 Bestellungen pro Gruppe weniger als das 1,2-Fache der Kontrollrate zeigt."),
      tt("Customers accept more personal e-mails. This is wrong if the unsubscribe rate rises above 0.5% in any month.", "Kunden akzeptieren persönlichere E-Mails. Das ist falsch, wenn die Abmelderate in einem Monat über 0,5 % steigt."),
      tt("Shop, CRM and portal data can be joined for almost every customer. This is wrong if fewer than 95% of active customers have all three KPIs filled by month 2.", "Shop-, CRM- und Portaldaten lassen sich für fast jeden Kunden verbinden. Das ist falsch, wenn bis Monat 2 weniger als 95 % der aktiven Kunden alle drei KPIs gefüllt haben."),
    ],
    tripKpi: MODEL_TRIPWIRE.kpi,
    tripThreshold: String(MODEL_TRIPWIRE.threshold),
    tripMonth: MODEL_TRIPWIRE.month,
    tripAction: "adjust",
    challenge: tt(
      "I keep the programme and change one thing. 3.0% to 3.4% is an uplift of about 13% and the engine is still learning, so I check it against the control group on 100 orders per group before judging it. The rise in unsubscribes crosses our guardrail, so marketing pauses the trigger with the most unsubscribes this month. Buying the suite would replace a measured tool with one nobody can measure, and stopping would throw away the only measured gain. The tripwire at 4% in month 5 decides.",
      "Ich behalte das Programm und ändere eine Sache. 3,0 % zu 3,4 % ist ein Uplift von etwa 13 %, und die Engine lernt noch, also prüfe ich sie bei 100 Bestellungen pro Gruppe gegen die Kontrollgruppe, bevor ich urteile. Der Anstieg der Abmeldungen überschreitet unsere Guardrail, also pausiert das Marketing in diesem Monat den Trigger mit den meisten Abmeldungen. Die Suite zu kaufen hieße, ein gemessenes Werkzeug durch eines zu ersetzen, das niemand messen kann, und Stoppen würde den einzigen gemessenen Gewinn wegwerfen. Der Tripwire bei 4 % in Monat 5 entscheidet.",
    ),
  };
}
