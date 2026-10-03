import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. AIConnect's Chief Digital Officer builds an AI-based control system for customer
 * retention with a limited budget, uncertain data quality and high time pressure, and makes a technology decision despite an unclear
 * success forecast. Every figure is a Case assumption (the plan gives the role, the situation and the constraints, not numbers). Model
 * values are used only by the checks, the answer keys and the worked answers. (Identifiers keep Day 7's names: a "source" is a
 * technology, a "component" is a KPI candidate, a "situation" is a test result.)
 */
export const R2_BUDGET = 220000;
export const R2_MONTHS = 6;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of an AI-based retention system */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("One KPI system everyone steers by", "Ein KPI-System, nach dem alle steuern"), means: t("The same few KPIs, defined the same way, from the board to each team: one outcome, a few drivers, a guardrail.", "Dieselben wenigen KPIs, gleich definiert, vom Vorstand bis zu jedem Team: ein Outcome, wenige Treiber, eine Guardrail.") },
  rules: { id: "rules" as PrincipleId, name: t("Every technology serves a named KPI and is tested before it is scaled", "Jede Technologie dient einem benannten KPI und wird getestet, bevor sie skaliert wird"), means: t("No tool is bought for itself: it names the KPI it should move and proves it against a control group first.", "Kein Werkzeug wird um seiner selbst willen gekauft: Es nennt den KPI, den es bewegen soll, und belegt es zuerst gegen eine Kontrollgruppe.") },
  owners: { id: "owners" as PrincipleId, name: t("Every KPI has an owner who can move it", "Jeder KPI hat einen Owner, der ihn bewegen kann"), means: t("Someone answers for each number and has the means to change it.", "Jemand steht für jede Zahl ein und hat die Mittel, sie zu ändern.") },
  review: { id: "review" as PrincipleId, name: t("Every quarter, results are compared with forecasts and the rules adjusted", "Jedes Quartal werden Ergebnisse mit Prognosen verglichen und die Regeln angepasst"), means: t("A forecast that is never checked against the outcome can never get better.", "Eine Prognose, die nie mit dem Ergebnis abgeglichen wird, kann nie besser werden.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Buy the most advanced AI platform first; the use cases will follow", "Zuerst die fortschrittlichste KI-Plattform kaufen; die Anwendungsfälle kommen dann"), means: t("The more powerful the tool, the more it will find to do.", "Je stärker das Werkzeug, desto mehr wird es zu tun finden.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Let the AI set prices and offers on its own, without limits", "Die KI Preise und Angebote allein setzen lassen, ohne Grenzen"), means: t("The system optimises every offer by itself; nobody needs to explain or cap it.", "Das System optimiert jedes Angebot selbst; niemand muss es erklären oder begrenzen.") },
});
/** An AI-based control system needs both: one KPI system (so everyone steers by the same numbers) and the test-before-scale rule (so technology serves those numbers). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · selection of relevant technologies */

export type SourceId = "reco" | "trigger" | "abtest" | "chatbot" | "pricing" | "nba" | "social" | "voice";
export const SOURCE_IDS: SourceId[] = ["reco", "trigger", "abtest", "chatbot", "pricing", "nba", "social", "voice"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Select now", "Jetzt auswählen"), later: t("Data first: fix the data, then pilot", "Erst die Daten: Daten verbessern, dann pilotieren"), leave: t("Not now", "Jetzt nicht") });
/** `decision` is the KPI the technology moves (null when it moves none); `complete` is the share of the data it needs that is ready. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "reco" as SourceId, name: t("Recommendation engine", "Recommendation Engine"), decision: t("Conversion rate of offers", "Conversion Rate der Angebote"), complete: 92, cost: 60000 },
  { id: "trigger" as SourceId, name: t("Behaviour-triggered e-mails", "Verhaltensbasierte Trigger-E-Mails"), decision: t("Engagement: weekly active customers", "Engagement: wöchentlich aktive Kunden"), complete: 95, cost: 30000 },
  { id: "abtest" as SourceId, name: t("A/B testing tool", "A/B-Test-Tool"), decision: t("Which measures to scale (every KPI)", "Welche Maßnahmen skaliert werden (jeder KPI)"), complete: 99, cost: 15000 },
  { id: "chatbot" as SourceId, name: t("Chatbot for first contact", "Chatbot für den Erstkontakt"), decision: t("Response time and questions solved", "Antwortzeit und gelöste Fragen"), complete: 55, cost: 40000 },
  { id: "pricing" as SourceId, name: t("Dynamic pricing engine", "Dynamic-Pricing-Engine"), decision: t("Revenue per order", "Umsatz pro Bestellung"), complete: 40, cost: 50000 },
  { id: "nba" as SourceId, name: t("AI next-best-action for account managers", "KI-Next-Best-Action für Account Manager"), decision: t("Renewal rate of key accounts", "Verlängerungsrate der Key Accounts"), complete: 45, cost: 55000 },
  { id: "social" as SourceId, name: t("AI social media listening", "KI-Social-Media-Listening"), decision: null, complete: 70, cost: 25000 },
  { id: "voice" as SourceId, name: t("Voice assistant for the hotline", "Sprachassistent für die Hotline"), decision: null, complete: 30, cost: 45000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: no KPI it moves → not now; a KPI and its data ready → select now; a KPI but the data not ready → data first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for management */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with revenue or with customers kept?", "Bewegt er sich mit Umsatz oder mit gehaltenen Kunden?"), low: t("It counts our activity or reach.", "Er zählt unsere Aktivität oder Reichweite."), high: t("It is, or leads directly to, revenue or customers kept.", "Er ist Umsatz oder gehaltene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the result is lost?", "Wie früh zeigt er eine Veränderung, bevor das Ergebnis verloren ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr.") , high: t("Weekly or faster.", "Wöchentlich oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer?", "Deckt er jeden Kunden ab?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand.") , high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
/** `explains` = linked to value; `costShape`: one-off = counted by the systems, per customer = a survey, per analysis = collected by hand. */
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("weekly or daily", "wöchentlich oder täglich"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Conversion rate of offers", "Conversion Rate der Angebote"), what: t("Orders ÷ offers delivered, per channel.", "Bestellungen ÷ zugestellte Angebote, pro Kanal."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result the brief names, counted weekly for every customer by the shop and the CRM.", "Das Ergebnis, das der Auftrag nennt, wöchentlich für jeden Kunden vom Shop und vom CRM gezählt.") },
  { id: "cv" as CompId, name: t("Customer value", "Kundenwert"), what: t("Revenue per customer, rolling twelve months.", "Umsatz pro Kunde, rollierend über zwölf Monate."), explains: true, cadence: "monthly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 2, reach: 3, scale: 3 }, note: t("The outcome the board steers by; it moves monthly, so it confirms rather than warns.", "Das Outcome, nach dem der Vorstand steuert; es bewegt sich monatlich, bestätigt also eher, als dass es warnt.") },
  { id: "engage" as CompId, name: t("Engagement: weekly active customers", "Engagement: wöchentlich aktive Kunden"), what: t("Share of customers who use the portal at least once a week.", "Anteil der Kunden, die das Portal mindestens einmal pro Woche nutzen."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The earliest driver: use falls weeks before a renewal is lost.", "Der früheste Treiber: Die Nutzung fällt Wochen, bevor eine Verlängerung verloren geht.") },
  { id: "nps" as CompId, name: t("Recommendation score from a survey", "Weiterempfehlungswert aus einer Befragung"), what: t("How likely customers say they are to recommend AIConnect; about 25% answer.", "Wie wahrscheinlich Kunden AIConnect nach eigener Aussage weiterempfehlen; etwa 25 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value and it says why, but only twice a year and only for those who answer.", "Mit dem Wert verbunden, und er sagt das Warum, aber nur zweimal im Jahr und nur für die, die antworten.") },
  { id: "churn" as CompId, name: t("Churn rate", "Churn Rate"), what: t("Share of customers who cancelled in the quarter.", "Anteil der Kunden, die im Quartal gekündigt haben."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after it is too late to act.", "Zählt den Verlust genau, wenn es zu spät zum Handeln ist.") },
  { id: "emails" as CompId, name: t("E-mails sent", "Versendete E-Mails"), what: t("Offer and newsletter e-mails sent per month.", "Versendete Angebots- und Newsletter-E-Mails pro Monat."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Fast and automatic, and it says nothing about what customers did.", "Schnell und automatisch, und sie sagt nichts darüber, was Kunden taten.") },
  { id: "followers" as CompId, name: t("Social media followers", "Social-Media-Follower"), what: t("Followers of AIConnect's company pages.", "Follower der Unternehmensseiten von AIConnect."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever follows, not the behaviour of customers.", "Reichweite bei denen, die folgen, nicht das Verhalten von Kunden.") },
  { id: "stories" as CompId, name: t("Account managers' success stories", "Erfolgsgeschichten der Account Manager"), what: t("Each month, account managers report the deals they won with the new tools.", "Jeden Monat berichten Account Manager die Abschlüsse, die sie mit den neuen Werkzeugen gewonnen haben."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but it counts the wins someone chose to tell, without a comparison.", "Anschaulich, aber sie zählt die Erfolge, die jemand erzählen wollte, ohne Vergleich.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "engage", "cv"];
export const MODEL_GREATEST: CompId = "conv";
/** The limit a rating must not exceed, from the printed facts of the KPI (Materi B3). */
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
/** An early KPI shows a change before the result is lost (weekly or monthly). */
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · continuous optimisation: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
/** intervene = roll out, watch = keep testing, none = stop. */
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Marketing", "Marketing"), sales: t("Sales", "Vertrieb"), data: t("Data team", "Datenteam"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
/** `lift` = uplift in % over the control group; `cases` = conversions in the smaller group; `revenue` = extra revenue a year if rolled out. */
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("Recommended add-on in offer e-mails (second run)", "Empfohlenes Add-on in Angebots-E-Mails (zweiter Durchlauf)"), lift: 55, cases: 210, revenue: 390000, note: t("Unsubscribes unchanged.", "Abmeldungen unverändert.") },
  { id: "renewal" as SitId, signal: t("Renewal e-mail timed to the customer's budget month", "Verlängerungs-E-Mail im Budgetmonat des Kunden"), lift: 18, cases: 40, revenue: 80000, note: t("Few renewals fell in the test weeks.", "In die Testwochen fielen wenige Verlängerungen.") },
  { id: "botname" as SitId, signal: t("Chatbot greets customers by name", "Chatbot begrüßt Kunden mit Namen"), lift: 2, cases: 400, revenue: 10000, note: t("Many chats, almost no difference.", "Viele Chats, fast kein Unterschied.") },
  { id: "subject" as SitId, signal: t("Subject line names the customer's company", "Betreffzeile nennt das Unternehmen des Kunden"), lift: 6, cases: 300, revenue: 45000, note: t("A small, steady difference.", "Ein kleiner, stabiler Unterschied.") },
  { id: "price" as SitId, signal: t("Dynamic price for the add-on bundle", "Dynamischer Preis für das Add-on-Bundle"), lift: -4, cases: 150, revenue: -20000, note: t("Two complaints about changing prices.", "Zwei Beschwerden über wechselnde Preise.") },
  { id: "winback" as SitId, signal: t("E-mail after 21 days without a login", "E-Mail nach 21 Tagen ohne Login"), lift: 30, cases: 120, revenue: 150000, note: t("Guardrail: complaints unchanged.", "Guardrail: Beschwerden unverändert.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
/** The rule of Materi B4: a clear uplift on enough conversions → roll out; a smaller uplift, or one on too few conversions → keep testing; no real uplift → stop. */
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["csm"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["csm"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation architecture */

export type ArchId = "foundation" | "reco" | "trigger" | "abtest" | "training" | "quality" | "suite" | "pricing";
export const ARCH_IDS: ArchId[] = ["foundation", "reco", "trigger", "abtest", "training", "quality", "suite", "pricing"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("KPI system and data foundation", "KPI-System und Datenbasis"), what: t("Shared KPI definitions, and shop, CRM, e-mail and portal data joined in one place.", "Gemeinsame KPI-Definitionen, und Shop-, CRM-, E-Mail- und Portaldaten an einem Ort verbunden."), cost: 45000, weeks: 6, blackBox: false },
  { id: "reco" as ArchId, name: t("Recommendation engine", "Recommendation Engine"), what: t("Next-add-on suggestions in offer e-mails and the portal, with the reason shown.", "Vorschläge für das nächste Add-on in Angebots-E-Mails und im Portal, mit angezeigtem Grund."), cost: 60000, weeks: 8, blackBox: false },
  { id: "trigger" as ArchId, name: t("Behaviour-triggered e-mails", "Verhaltensbasierte Trigger-E-Mails"), what: t("E-mails on adding users, on 21 days without a login and before the budget month.", "E-Mails beim Hinzufügen von Nutzern, nach 21 Tagen ohne Login und vor dem Budgetmonat."), cost: 30000, weeks: 6, blackBox: false },
  { id: "abtest" as ArchId, name: t("A/B testing routine and dashboard", "A/B-Test-Routine und Dashboard"), what: t("Every measure against a control group, with its uplift and guardrails on one page.", "Jede Maßnahme gegen eine Kontrollgruppe, mit Uplift und Guardrails auf einer Seite."), cost: 20000, weeks: 4, blackBox: false },
  { id: "training" as ArchId, name: t("KPI literacy for sales and marketing", "KPI-Kompetenz für Vertrieb und Marketing"), what: t("How to read a rate, an uplift and a guardrail, and when a result is too small to trust.", "Wie man eine Rate, einen Uplift und eine Guardrail liest, und wann ein Ergebnis zu klein ist, um ihm zu trauen."), cost: 20000, weeks: 3, blackBox: false },
  { id: "quality" as ArchId, name: t("Knowledge base and price data clean-up", "Bereinigung von Wissensbasis und Preisdaten"), what: t("Cleans the data the chatbot and pricing would need, so they can be piloted later.", "Bereinigt die Daten, die Chatbot und Pricing bräuchten, damit sie später pilotiert werden können."), cost: 20000, weeks: 6, blackBox: false },
  { id: "suite" as ArchId, name: t("Full AI marketing suite licence", "Lizenz für eine komplette KI-Marketing-Suite"), what: t("A vendor platform that personalises every channel; its models and results are not shown.", "Eine Anbieterplattform, die jeden Kanal personalisiert; ihre Modelle und Ergebnisse werden nicht gezeigt."), cost: 90000, weeks: 14, blackBox: true },
  { id: "pricing" as ArchId, name: t("Dynamic pricing engine", "Dynamic-Pricing-Engine"), what: t("Prices for add-ons that change with demand and order size.", "Preise für Add-ons, die sich mit Nachfrage und Bestellmenge ändern."), cost: 50000, weeks: 10, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;

/* ------------------------------------------------------------------ 3.6 · a technology decision despite an unclear success forecast */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Buy the full AI suite now", "Die komplette KI-Suite jetzt kaufen"), detail: t("License the vendor's platform for every channel from month 1 and let it personalise everything.", "Die Plattform des Anbieters ab Monat 1 für jeden Kanal lizenzieren und alles personalisieren lassen."), why: t("Fast and complete, and it defends only if the vendor's forecast holds for AIConnect's customers.", "Schnell und vollständig, und nur vertretbar, wenn die Prognose des Anbieters für die Kunden von AIConnect zutrifft."), rejected: t("Most of the budget is spent on a system whose effect nobody at AIConnect can measure or explain.", "Der Großteil des Budgets geht in ein System, dessen Wirkung bei AIConnect niemand messen oder erklären kann.") },
  { id: "stage" as DecisionId, label: t("Decide now, build in stages, and watch one figure", "Jetzt entscheiden, stufenweise bauen, und eine Zahl beobachten"), detail: t("Start with the KPI system and the A/B routine, then the engines on the data that is ready, and scale only if the figure you watch moves.", "Mit KPI-System und A/B-Routine starten, dann die Engines auf den bereiten Daten, und nur skalieren, wenn sich die Zahl bewegt, die Sie beobachten."), why: t("It makes the technology decision the brief asks for, with the one technology that has a pilot behind it, and measures before it scales.", "Es trifft die Technologieentscheidung, die der Auftrag verlangt, mit der einen Technologie, hinter der ein Pilot steht, und misst, bevor es skaliert."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait until the success forecast is clear", "Warten, bis die Erfolgsprognose klar ist"), detail: t("Run more studies for six months before any technology is chosen.", "Sechs Monate weitere Studien durchführen, bevor irgendeine Technologie gewählt wird."), why: t("", ""), rejected: t("The brief asks for a decision despite an unclear forecast. Waiting keeps the impersonal standard communication for six more months, and no study makes the forecast clear without a test.", "Der Auftrag verlangt eine Entscheidung trotz unklarer Prognose. Warten behält die unpersönliche Standardkommunikation sechs weitere Monate bei, und keine Studie macht die Prognose ohne Test klar.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Conversion rate of offers", "Conversion Rate der Angebote"), unit: "%", baseline: 3, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Weekly active customers", "Wöchentlich aktive Kunden"), unit: "%", baseline: 41, better: "up" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Customer value (revenue per customer a year)", "Kundenwert (Umsatz pro Kunde und Jahr)"), unit: "€", baseline: 9600, better: "up" as const, behaviour: true },
  { id: "dashboards" as KpiId, label: t("Dashboards in use", "Genutzte Dashboards"), unit: t("dashboards", "Dashboards"), baseline: 3, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("E-mails sent per month", "Versendete E-Mails pro Monat"), unit: t("e-mails", "E-Mails"), baseline: 60000, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
