import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { MODEL_TIER } from "@/data/route2Panel";
import { num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["reco", "kpi", "trigger"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, scalability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  reco: () =>
    tt(
      "Effect 3: it changes what every customer sees, the add-on that similar firms bought, and its effect can be proven against a control group. Scalability 3: once built it serves every customer at no extra cost, in the 8 weeks printed on the card.",
      "Wirkung 3: Sie ändert, was jeder Kunde sieht, nämlich das Add-on, das ähnliche Firmen kauften, und ihre Wirkung lässt sich gegen eine Kontrollgruppe belegen. Skalierbarkeit 3: Einmal gebaut, dient sie jedem Kunden ohne Zusatzkosten, in den 8 Wochen, die auf der Karte stehen.",
    ),
  trigger: () =>
    tt(
      "Effect 2: it makes the contact personal, but its effect on orders is smaller than a recommendation's. Scalability 3: once the triggers exist the system sends them to every customer, and the card says 6 weeks.",
      "Wirkung 2: Sie macht den Kontakt persönlich, aber ihre Wirkung auf Bestellungen ist kleiner als die einer Empfehlung. Skalierbarkeit 3: Sobald die Trigger existieren, sendet das System sie an jeden Kunden, und die Karte nennt 6 Wochen.",
    ),
  kpi: () =>
    tt(
      "Effect 2: it raises no sale by itself, but without it no other measure can be proven or improved. Scalability 3: one dashboard and one routine serve every future measure, for 6 weeks of work.",
      "Wirkung 2: Sie steigert selbst keinen Verkauf, aber ohne sie lässt sich keine andere Maßnahme belegen oder verbessern. Skalierbarkeit 3: Ein Dashboard und eine Routine dienen jeder künftigen Maßnahme, für 6 Wochen Arbeit.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "Customers who add users but never open the admin settings are new admins, so AIConnect could send them the admin training offer and a short setup guide instead of the general newsletter.",
      "Kunden, die Nutzer hinzufügen, aber nie die Admin-Einstellungen öffnen, sind neue Admins, also könnte AIConnect ihnen das Angebot für die Admin-Schulung und eine kurze Einrichtungsanleitung schicken statt des allgemeinen Newsletters.",
    ),
    meaning: tt(
      `The personalised offer converted ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times the standard rate, so it looks promising, but AIConnect should run a larger second test before rolling it out, because ${PILOT.control.orders} and ${PILOT.variant.orders} orders are still a small base.`,
      `Das personalisierte Angebot konvertierte mit ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} %, das ${num(FORECAST.f2)}-Fache der Standardrate, es sieht also vielversprechend aus, aber AIConnect sollte vor dem Rollout einen größeren zweiten Test fahren, weil ${PILOT.control.orders} und ${PILOT.variant.orders} Bestellungen noch eine kleine Basis sind.`,
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
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
    order: [...MODEL_ORDER],
    why: tt(
      "The recommendation engine goes first: it scores 27, answers both impersonal communication and low conversion, and the pilot in the brief showed 1.6 times the standard rate. The KPI dashboard and testing routine comes second and starts alongside it, so the engine is measured from its first week. The triggered e-mails come third. The three cost €125,000 of the €200,000; the chatbot and dynamic pricing wait, because they answer none of the problems or cannot yet be measured.",
      "Die Recommendation Engine kommt zuerst: Sie erzielt 27, beantwortet unpersönliche Kommunikation und niedrige Conversion, und der Pilot im Auftrag zeigte das 1,6-Fache der Standardrate. Das KPI-Dashboard mit Test-Routine kommt als Zweites und startet gleichzeitig, damit die Engine ab ihrer ersten Woche gemessen wird. Die Trigger-E-Mails kommen als Drittes. Die drei kosten 125.000 € von 200.000 €; Chatbot und Dynamic Pricing warten, weil sie keines der Probleme beantworten oder noch nicht messbar sind.",
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
    tier: { ...MODEL_TIER },
    vision: tt(
      "AIConnect steers its customer retention by three KPIs that every team reads from one place, and every new technology has to move one of them before it grows. Customers get offers and e-mails that fit what they do, and the company can show which measure sold more.",
      "AIConnect steuert seine Kundenbindung über drei KPIs, die jedes Team an einem Ort liest, und jede neue Technologie muss einen davon bewegen, bevor sie wächst. Kunden erhalten Angebote und E-Mails, die zu dem passen, was sie tun, und das Unternehmen kann zeigen, welche Maßnahme mehr verkauft hat.",
    ),
    giveUp: tt(
      "The plan gives me one KPI system, a control group for every measure, and two engines that are measured on data that is ready. It costs me dynamic pricing, whose data is only 40% ready, and the full AI suite, which nobody could explain or measure. €25,000 stay unspent. If the data turns out weaker, the recommendation engine rests on data below 80%, so I watch it first.",
      "Der Plan gibt mir ein KPI-System, eine Kontrollgruppe für jede Maßnahme und zwei Engines, die auf bereiten Daten gemessen werden. Er kostet mich Dynamic Pricing, dessen Daten erst zu 40 % bereit sind, und die komplette KI-Suite, die niemand erklären oder messen könnte. 25.000 € bleiben ungenutzt. Fallen die Daten schwächer aus, beruht die Recommendation Engine auf Daten unter 80 %, also beobachte ich sie zuerst.",
    ),
    decision: "stage",
    decisionWhy: tt(
      "It makes the technology decision the brief asks for, with the engines that have a pilot behind them, and measures before it scales. The KPI system and the A/B routine start in month 1, so every engine is measured from its first week, and the suite stays out because nobody could explain it.",
      "Es trifft die Technologieentscheidung, die der Auftrag verlangt, mit den Engines, hinter denen ein Pilot steht, und misst, bevor es skaliert. KPI-System und A/B-Routine starten in Monat 1, damit jede Engine ab ihrer ersten Woche gemessen wird, und die Suite bleibt draußen, weil niemand sie erklären könnte.",
    ),
    watch: tt(
      "I watch the conversion rate of offers: today it is 3%, and if it is not clearly above that by month 4 on enough orders, I stop the recommendation engine's rollout and keep the KPI system and the A/B routine. I also watch the data behind the engine: if it stays below 80%, I pause it until it is cleaned.",
      "Ich beobachte die Conversion Rate der Angebote: Heute liegt sie bei 3 %, und liegt sie bis Monat 4 bei genug Bestellungen nicht deutlich darüber, stoppe ich den Rollout der Recommendation Engine und behalte KPI-System und A/B-Routine. Ich beobachte auch die Daten hinter der Engine: Bleiben sie unter 80 %, pausiere ich sie, bis sie bereinigt sind.",
    ),
  };
}
