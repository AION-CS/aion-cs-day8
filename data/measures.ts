import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Nine measures AIConnect could fund inside €200,000 and six months (the plan's framework). Costs and weeks are
 * Case assumptions. What each measure does is written without naming the problem it answers, so the learner has to match them
 * (Materi A7). The score is the plan's own evaluation: Effect × Measurability × Scalability. Measurability follows from the printed way
 * the measure's success is measured (against a control group, before and after, or not at all), so it is checkable; scalability and
 * effect are the learner's judgement. (Field names keep Day 7's: `exp` = Measurability, `fea` = Scalability, `eff` = Effect;
 * `targets` are the problems of the brief a measure answers.)
 */
export type MeasureId = "reco" | "trigger" | "kpi" | "chatbot" | "pricing" | "roles" | "suite" | "discount" | "manual";
export const BUDGET = 200000;
export const MONTHS = 6;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): which kind of thing from the theory of Materi A2, A3 and A5 a measure is. It is
 * a fact about the measure taken from those cards' own tests, never a score and never the problem it answers (that stays the
 * learner's job). One line above the list says which kinds the brief's three problems call for and which kind it does not.
 */
export type MeasureArea = "reco" | "comm" | "auto" | "meas" | "price";
export const MEASURE_AREA_LABEL = bi({
  reco: t("Recommendation", "Empfehlung"),
  comm: t("Individualised communication", "Individualisierte Kommunikation"),
  auto: t("Automation", "Automatisierung"),
  meas: t("Measurement", "Messung"),
  price: t("Price, not a technology", "Preis, keine Technologie"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems: impersonal communication, a low conversion rate and measures that cannot be measured. They call for personalising what a customer sees or hears, for automation that works for every customer, and for measurement. A price cut is none of the kinds taught in Materi A2, A3 and A5.",
    "Der Auftrag nennt drei Probleme: unpersönliche Kommunikation, eine niedrige Conversion Rate und Maßnahmen, die sich nicht messen lassen. Sie verlangen, dass sich anpasst, was ein Kunde sieht oder hört, Automatisierung, die für jeden Kunden arbeitet, und Messung. Eine Preissenkung ist keine der Arten aus Materi A2, A3 und A5.",
  ),
});

export type ProblemId = "impersonal" | "conversion" | "measure";
export const PROBLEM_IDS: ProblemId[] = ["impersonal", "conversion", "measure"];
export const PROBLEM_LABEL = bi({
  impersonal: t("Impersonal communication", "Unpersönliche Kommunikation"),
  conversion: t("Low conversion rate", "Niedrige Conversion Rate"),
  measure: t("Measures not measurable", "Maßnahmen nicht messbar"),
});

export type Evidence = "controlled" | "before" | "none";
export const EVIDENCE_LABEL = bi({
  controlled: t("a KPI measured against a control group", "ein KPI, gemessen gegen eine Kontrollgruppe"),
  before: t("a KPI compared before and after, without a control group", "ein KPI im Vorher-Nachher-Vergleich, ohne Kontrollgruppe"),
  none: t("no KPI, or only activity, a vendor report or impressions", "kein KPI, oder nur Aktivität, ein Anbieterbericht oder Eindrücke"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "controlled" ? 3 : e === "before" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Measurability follows from how a measure's success is measured: a KPI against a control group scores 3, a KPI compared before and after scores 2, no KPI (only activity, a vendor's report or impressions) scores 1.",
    "Die Messbarkeit folgt daraus, wie der Erfolg einer Maßnahme gemessen wird: ein KPI gegen eine Kontrollgruppe ergibt 3, ein KPI im Vorher-Nachher-Vergleich ergibt 2, kein KPI (nur Aktivität, ein Anbieterbericht oder Eindrücke) ergibt 1.",
  ),
});

export type Measure = {
  id: MeasureId;
  name: string;
  what: string;
  /** One concrete scene from AIConnect's day, and who does what (CLAUDE.md #46). */
  scene: string;
  who: string;
  area: MeasureArea;
  basis: string;
  evidence: Evidence;
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = bi([
  {
    id: "reco" as MeasureId,
    name: t("Recommendation engine for offers and the portal", "Recommendation Engine für Angebote und Portal"),
    what: t("Suggests the next add-on for each customer, in offer e-mails and in the portal, from what similar customers bought.", "Schlägt jedem Kunden das nächste Add-on vor, in Angebots-E-Mails und im Portal, aus dem, was ähnliche Kunden kauften."),
    scene: t("A customer who has just added 20 users opens the portal and sees the admin training package that most firms of that size bought next.", "Ein Kunde, der gerade 20 Nutzer hinzugefügt hat, öffnet das Portal und sieht das Admin-Schulungspaket, das die meisten Firmen dieser Größe als Nächstes kauften."),
    who: t("The product team builds it once; after that it runs by itself for every customer, and nobody has to pick the offer by hand.", "Das Produktteam baut sie einmal; danach läuft sie für jeden Kunden von selbst, und niemand muss das Angebot von Hand wählen."),
    area: "reco" as MeasureArea,
    basis: t("Measured by: conversion rate against a control group that keeps the standard offer.", "Gemessen durch: Conversion Rate gegen eine Kontrollgruppe, die das Standardangebot behält."),
    evidence: "controlled" as Evidence,
    cost: 60000,
    weeks: 8,
    targets: ["impersonal", "conversion"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("Once built it serves every customer at no extra cost, and the pilot showed 1.6 times the standard rate.", "Einmal gebaut, dient sie jedem Kunden ohne Zusatzkosten, und der Pilot zeigte das 1,6-Fache der Standardrate.") },
    verdict: t("A model measure: it answers the two problems the customer feels and its effect can be proven.", "Eine Modellmaßnahme: Sie beantwortet die beiden Probleme, die der Kunde spürt, und ihre Wirkung lässt sich belegen."),
  },
  {
    id: "trigger" as MeasureId,
    name: t("Behaviour-triggered e-mails", "Verhaltensbasierte Trigger-E-Mails"),
    what: t("E-mails sent when a customer does something (adds users, stops logging in), with content built from what they used.", "E-Mails, die verschickt werden, wenn ein Kunde etwas tut (Nutzer hinzufügt, sich nicht mehr anmeldet), mit Inhalten aus dem, was er nutzte."),
    scene: t("A customer has not logged in for 21 days and gets a short e-mail from its own contact person that names the two features it used most.", "Ein Kunde hat sich 21 Tage nicht angemeldet und bekommt eine kurze E-Mail seiner eigenen Ansprechperson, die die zwei Funktionen nennt, die er am meisten nutzte."),
    who: t("Marketing sets up the triggers once; the mailing system sends; the customer sees the name of its own account manager.", "Das Marketing richtet die Trigger einmal ein; das Mailing-System versendet; der Kunde sieht den Namen seines eigenen Account Managers."),
    area: "comm" as MeasureArea,
    basis: t("Measured by: reply and conversion rate against customers who only get the monthly newsletter.", "Gemessen durch: Antwort- und Conversion Rate gegen Kunden, die nur den monatlichen Newsletter bekommen."),
    evidence: "controlled" as Evidence,
    cost: 30000,
    weeks: 6,
    targets: ["impersonal"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("Cheap to scale once the triggers exist; it makes contact personal, and its effect on orders is smaller than the recommendations'.", "Günstig zu skalieren, sobald die Trigger existieren; sie macht den Kontakt persönlich, und ihre Wirkung auf Bestellungen ist kleiner als die der Empfehlungen.") },
    verdict: t("A model measure: it turns the standard newsletter into contact that follows what the customer did.", "Eine Modellmaßnahme: Sie macht aus dem Standard-Newsletter einen Kontakt, der dem folgt, was der Kunde tat."),
  },
  {
    id: "kpi" as MeasureId,
    name: t("KPI dashboard and A/B testing routine", "KPI-Dashboard und A/B-Test-Routine"),
    what: t("One dashboard with conversion, customer value and engagement, and a routine that tests every new measure against a control group.", "Ein Dashboard mit Conversion, Kundenwert und Engagement, und eine Routine, die jede neue Maßnahme gegen eine Kontrollgruppe testet."),
    scene: t("At the monthly meeting the dashboard shows, for each new measure, the conversion of the group that got it next to the group that did not.", "In der Monatsrunde zeigt das Dashboard für jede neue Maßnahme die Conversion der Gruppe, die sie bekam, neben der Gruppe, die sie nicht bekam."),
    who: t("A data analyst builds the dashboard; every measure owner must name a KPI and a control group before a launch.", "Ein Datenanalyst baut das Dashboard; jeder Maßnahmen-Owner muss vor einem Start einen KPI und eine Kontrollgruppe nennen."),
    area: "meas" as MeasureArea,
    basis: t("Measured by: every other measure's KPI against its control group; its own KPI is the share of measures that have one.", "Gemessen durch: den KPI jeder anderen Maßnahme gegen ihre Kontrollgruppe; der eigene KPI ist der Anteil der Maßnahmen, die eine haben."),
    evidence: "controlled" as Evidence,
    cost: 35000,
    weeks: 6,
    targets: ["measure"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It raises no sale by itself, but without it no other measure can be proven or improved.", "Sie steigert selbst keinen Verkauf, aber ohne sie lässt sich keine andere Maßnahme belegen oder verbessern.") },
    verdict: t("A model measure: it is the only one that answers “measures not measurable”.", "Eine Modellmaßnahme: Sie ist die einzige, die „Maßnahmen nicht messbar“ beantwortet."),
  },
  {
    id: "chatbot" as MeasureId,
    name: t("Chatbot for first contact and support", "Chatbot für Erstkontakt und Support"),
    what: t("Answers routine questions at any hour and hands the rest to a person.", "Beantwortet Routinefragen zu jeder Uhrzeit und übergibt den Rest an einen Menschen."),
    scene: t("At 10 p.m. a customer cannot reset a password; the bot answers within a minute and, when the question is about a contract, hands the chat to a person next morning.", "Um 22 Uhr kann ein Kunde sein Passwort nicht zurücksetzen; der Bot antwortet innerhalb einer Minute und übergibt die Frage am nächsten Morgen an einen Menschen, wenn es um einen Vertrag geht."),
    who: t("Support writes the answers; the bot talks to customers; support agents take over whatever it hands off.", "Der Support schreibt die Antworten; der Bot spricht mit den Kunden; Support-Mitarbeiter übernehmen, was er übergibt."),
    area: "auto" as MeasureArea,
    basis: t("Measured by: share of questions solved without a person, compared with the months before.", "Gemessen durch: Anteil der ohne Menschen gelösten Fragen, verglichen mit den Monaten davor."),
    evidence: "before" as Evidence,
    cost: 40000,
    weeks: 10,
    targets: [] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("Useful for service costs and speed, but it answers none of the three problems of the brief.", "Nützlich für Servicekosten und Tempo, beantwortet aber keines der drei Probleme des Auftrags.") },
    verdict: t("Not in the model three: 6 points. Worth it later for service, once the knowledge base is clean.", "Nicht unter den drei Modellmaßnahmen: 6 Punkte. Lohnt sich später für den Service, sobald die Wissensbasis sauber ist."),
  },
  {
    id: "pricing" as MeasureId,
    name: t("Dynamic pricing in the web shop", "Dynamic Pricing im Webshop"),
    what: t("Prices of add-ons change with demand, order size and season.", "Preise der Add-ons ändern sich mit Nachfrage, Bestellmenge und Saison."),
    scene: t("A customer ordering 50 licences in December sees a different price from one ordering five in July, and may compare invoices.", "Ein Kunde, der im Dezember 50 Lizenzen bestellt, sieht einen anderen Preis als einer, der im Juli fünf bestellt, und vergleicht vielleicht die Rechnungen."),
    who: t("Sales sets the price band; the web shop's system sets the price inside it at the moment of the order.", "Der Vertrieb legt die Preisspanne fest; das System des Webshops setzt den Preis darin im Moment der Bestellung."),
    area: "auto" as MeasureArea,
    basis: t("Measured by: revenue per order before and after the change.", "Gemessen durch: Umsatz pro Bestellung vor und nach der Änderung."),
    evidence: "before" as Evidence,
    cost: 50000,
    weeks: 8,
    targets: ["conversion"] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("It may lift revenue per order, but changing prices can cost trust with business customers who compare invoices.", "Er kann den Umsatz pro Bestellung heben, aber wechselnde Preise können Vertrauen bei Geschäftskunden kosten, die Rechnungen vergleichen.") },
    verdict: t("Rejected for now: 6 points. Test it on one product with a guardrail on complaints before any rollout.", "Vorerst verworfen: 6 Punkte. Erst an einem Produkt mit einer Guardrail für Beschwerden testen, bevor es ausgerollt wird."),
  },
  {
    id: "roles" as MeasureId,
    name: t("Three newsletter versions by role", "Drei Newsletter-Versionen nach Rolle"),
    what: t("Admins, managers and finance each get their own version of the monthly newsletter.", "Admins, Führungskräfte und Finanzen bekommen jeweils ihre eigene Version des monatlichen Newsletters."),
    scene: t("The finance director gets a newsletter about invoices and licence costs; the admin gets one about new features.", "Die Finanzleiterin bekommt einen Newsletter zu Rechnungen und Lizenzkosten; der Admin einen zu neuen Funktionen."),
    who: t("Marketing writes three texts and sorts the mailing list by role; the customer notices a more fitting newsletter, nothing else changes.", "Das Marketing schreibt drei Texte und sortiert die Verteilerliste nach Rolle; der Kunde merkt einen passenderen Newsletter, sonst ändert sich nichts."),
    area: "comm" as MeasureArea,
    basis: t("Measured by: open rate compared with last year's newsletter.", "Gemessen durch: Öffnungsrate im Vergleich zum Newsletter des letzten Jahres."),
    evidence: "before" as Evidence,
    cost: 15000,
    weeks: 3,
    targets: ["impersonal"] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("Cheap and a little more personal, but three versions are still three standard texts.", "Günstig und etwas persönlicher, aber drei Versionen sind immer noch drei Standardtexte.") },
    verdict: t("Not in the model three: 6 points. A small step that behaviour-triggered e-mails do better.", "Nicht unter den drei Modellmaßnahmen: 6 Punkte. Ein kleiner Schritt, den verhaltensbasierte E-Mails besser machen."),
  },
  {
    id: "suite" as MeasureId,
    name: t("Full AI marketing suite for all channels", "Komplette KI-Marketing-Suite für alle Kanäle"),
    what: t("A platform that personalises every channel automatically; the vendor configures it.", "Eine Plattform, die jeden Kanal automatisch personalisiert; der Anbieter konfiguriert sie."),
    scene: t("The vendor's consultant configures the platform for e-mail, web and social; AIConnect staff then read reports that nobody there can check.", "Der Berater des Anbieters konfiguriert die Plattform für E-Mail, Web und Social; die Mitarbeiter von AIConnect lesen danach Berichte, die dort niemand prüfen kann."),
    who: t("The vendor configures and runs it; AIConnect staff read the vendor's own success report.", "Der Anbieter konfiguriert und betreibt sie; die Mitarbeiter von AIConnect lesen den eigenen Erfolgsbericht des Anbieters."),
    area: "auto" as MeasureArea,
    basis: t("Measured by: the vendor's own success report.", "Gemessen durch: den eigenen Erfolgsbericht des Anbieters."),
    evidence: "none" as Evidence,
    cost: 120000,
    weeks: 16,
    targets: ["impersonal", "conversion"] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("It could personalise everything, but sixteen weeks and €120,000 leave little room, and no one outside the vendor can check its effect.", "Sie könnte alles personalisieren, aber sechzehn Wochen und 120.000 € lassen wenig Spielraum, und außer dem Anbieter kann niemand ihre Wirkung prüfen.") },
    verdict: t("Rejected: 4 points. Technology without strategy: the tool comes first and the measurement never.", "Verworfen: 4 Punkte. Technologie ohne Strategie: Das Werkzeug kommt zuerst und die Messung nie."),
  },
  {
    id: "discount" as MeasureId,
    name: t("10% discount code in every offer e-mail", "10 % Rabattcode in jeder Angebots-E-Mail"),
    what: t("Every offer e-mail carries a code for 10% off the next add-on.", "Jede Angebots-E-Mail enthält einen Code für 10 % Rabatt auf das nächste Add-on."),
    scene: t("Every offer e-mail in March carries a 10% code, including those to customers who would have bought anyway.", "Jede Angebots-E-Mail im März trägt einen 10-%-Code, auch die an Kunden, die ohnehin gekauft hätten."),
    who: t("Marketing adds the code to the template; finance pays the discount on every order that uses it.", "Das Marketing fügt den Code in die Vorlage ein; die Finanzabteilung zahlt den Rabatt bei jeder Bestellung, die ihn nutzt."),
    area: "price" as MeasureArea,
    basis: t("Measured by: orders during the campaign compared with the month before.", "Gemessen durch: Bestellungen während der Kampagne im Vergleich zum Vormonat."),
    evidence: "before" as Evidence,
    cost: 40000,
    weeks: 1,
    targets: ["conversion"] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("Easy, and it may raise orders for a month, but it pays every customer, is the same for everyone and trains them to wait for codes.", "Leicht, und er hebt vielleicht einen Monat lang die Bestellungen, aber er bezahlt jeden Kunden, ist für alle gleich und gewöhnt sie daran, auf Codes zu warten.") },
    verdict: t("Rejected: 6 points. It is the opposite of personalisation.", "Verworfen: 6 Punkte. Er ist das Gegenteil von Personalisierung."),
  },
  {
    id: "manual" as MeasureId,
    name: t("Account managers write each offer by hand", "Account Manager schreiben jedes Angebot von Hand"),
    what: t("Each account manager personalises the offers for their top 20 customers from experience.", "Jeder Account Manager personalisiert die Angebote für seine Top-20-Kunden aus Erfahrung."),
    scene: t("An account manager spends a Friday afternoon writing 20 offers by hand for her top customers.", "Eine Account Managerin schreibt an einem Freitagnachmittag 20 Angebote von Hand für ihre Top-Kunden."),
    who: t("Each account manager writes the offers; nobody else sees how they went, so nothing is measured.", "Jeder Account Manager schreibt die Angebote; niemand sonst sieht, wie sie liefen, also wird nichts gemessen."),
    area: "comm" as MeasureArea,
    basis: t("Measured by: account managers report how it went.", "Gemessen durch: Account Manager berichten, wie es lief."),
    evidence: "none" as Evidence,
    cost: 25000,
    weeks: 2,
    targets: ["impersonal"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Personal for a few customers, but it does not scale beyond the top accounts and nobody can measure it.", "Persönlich für wenige Kunden, aber es skaliert nicht über die Top-Accounts hinaus, und niemand kann es messen.") },
    verdict: t("Rejected: 2 points. It covers a small share of customers and stays unmeasurable.", "Verworfen: 2 Punkte. Es deckt einen kleinen Teil der Kunden ab und bleibt unmessbar."),
  },
]);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["reco", "kpi", "trigger"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
