import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1 and 2.2. Four kinds of metric (Materi A5) and twelve metrics AIConnect reports today, each with whether it moved
 * together with customer value last year. (The identifiers keep the names of the Day 7 pattern board this file was built from: a
 * "pattern" is a kind of metric, a "record" is one metric, and the outcome "left" means "moved with customer value".) Every figure is
 * a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3; the outcome carries the lesson:
 * results and drivers move with value, vanity metrics never do.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: orders, revenue, customers kept. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: Bestellungen, Umsatz, gehaltene Kunden. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, orders or customers won or kept?", "Ist es Geld, Bestellungen oder gewonnene oder gehaltene Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("A customer behaviour that comes before the result and that a team can move this month: active use, clicks on offers, replies.", "Ein Kundenverhalten, das vor dem Ergebnis kommt und das ein Team in diesem Monat bewegen kann: aktive Nutzung, Klicks auf Angebote, Antworten."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Does it measure what customers do before they buy or stay, and can a team change it?", "Misst es, was Kunden tun, bevor sie kaufen oder bleiben, und kann ein Team es ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you push the result: complaints, unsubscribes, questions a chatbot fails.", "Etwas, das nicht schlechter werden darf, während Sie das Ergebnis vorantreiben: Beschwerden, Abmeldungen, Fragen, an denen ein Chatbot scheitert."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop a measure if this got worse, even while sales rise?", "Würden Sie eine Maßnahme stoppen, wenn das schlechter wird, auch wenn der Umsatz steigt?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts our own activity or reach: e-mails sent, followers, dashboards built. Looks like progress, decides nothing.", "Zählt unsere eigene Aktivität oder Reichweite: versendete E-Mails, Follower, gebaute Dashboards. Sieht nach Fortschritt aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what we did, rather than what customers did?", "Zählt es, was wir getan haben, statt was Kunden getan haben?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, orders, customers kept) or a behaviour that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, Bestellungen, gehaltene Kunden) oder ein Verhalten, das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("Ask who acted. A driver counts what customers did; a vanity metric counts what we did or how many could see us.", "Fragen Sie, wer gehandelt hat. Ein Treiber zählt, was Kunden taten; eine Vanity Metric zählt, was wir taten oder wie viele uns sehen konnten.") },
  { pair: t("Guardrail or outcome?", "Guardrail oder Outcome?"), test: t("An outcome is pushed up; a guardrail is only watched so that it does not get worse. You would never set a target to raise complaints.", "Ein Outcome wird nach oben getrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, Beschwerden zu erhöhen.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Conversion rate of offer e-mails: orders ÷ e-mails delivered.", "Conversion Rate der Angebots-E-Mails: Bestellungen ÷ zugestellte E-Mails."), truth: "outcome" as PatternId, clue: t("Does it count orders, or something that comes before an order?", "Zählt es Bestellungen, oder etwas, das vor einer Bestellung kommt?"), why: t("It counts orders, the result AIConnect is paid for: an outcome KPI.", "Es zählt Bestellungen, das Ergebnis, für das AIConnect bezahlt wird: ein Outcome-KPI."), rejected: { driver: t("A click comes before an order; this one counts the order itself.", "Ein Klick kommt vor einer Bestellung; dieser zählt die Bestellung selbst.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Customer value: revenue per customer per year.", "Kundenwert: Umsatz pro Kunde und Jahr."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue per customer is money: an outcome KPI, and it moves last.", "Umsatz pro Kunde ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue per customer this month directly; it follows the drivers.", "Niemand kann den Umsatz pro Kunde in diesem Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("Retention rate: share of customers who renew their contract.", "Retention Rate: Anteil der Kunden, die ihren Vertrag verlängern."), truth: "outcome" as PatternId, clue: t("Customers kept: result or behaviour on the way?", "Gehaltene Kunden: Ergebnis oder Verhalten auf dem Weg dorthin?"), why: t("Customers kept is a result: an outcome KPI.", "Gehaltene Kunden sind ein Ergebnis: ein Outcome-KPI."), rejected: { guardrail: t("Retention is pushed up, not only watched; it is a goal, not a fence.", "Retention wird nach oben getrieben, nicht nur beobachtet; es ist ein Ziel, kein Zaun.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Engagement: share of customers who use the portal at least once a week.", "Engagement: Anteil der Kunden, die das Portal mindestens einmal pro Woche nutzen."), truth: "driver" as PatternId, clue: t("Who acts here, customers or AIConnect? And does it come before or after the renewal?", "Wer handelt hier, Kunden oder AIConnect? Und kommt es vor oder nach der Verlängerung?"), why: t("Weekly use is a customer behaviour that comes before renewals, and service can move it: a driver KPI.", "Wöchentliche Nutzung ist ein Kundenverhalten, das vor Verlängerungen kommt, und der Service kann es bewegen: ein Treiber-KPI."), rejected: { outcome: t("Use is not yet money or a renewal; it leads to them.", "Nutzung ist noch kein Geld und keine Verlängerung; sie führt dazu.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Click rate on recommended add-ons in the portal.", "Klickrate auf empfohlene Add-ons im Portal."), truth: "driver" as PatternId, clue: t("A click is a customer action. Is it the order itself?", "Ein Klick ist eine Kundenhandlung. Ist er die Bestellung selbst?"), why: t("Customers act, before they order, and the recommendation can be improved: a driver KPI.", "Kunden handeln, bevor sie bestellen, und die Empfehlung lässt sich verbessern: ein Treiber-KPI."), rejected: { vanity: t("It counts what customers did, not what AIConnect did.", "Es zählt, was Kunden taten, nicht was AIConnect tat.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of new customers who use a second module within 90 days.", "Anteil der Neukunden, die innerhalb von 90 Tagen ein zweites Modul nutzen."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose behaviour is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Verhalten ist es?"), why: t("A customer behaviour early in the relationship that onboarding can move: a driver KPI. It did not move with value last year, which is a finding, not a different kind.", "Ein Kundenverhalten früh in der Beziehung, das das Onboarding bewegen kann: ein Treiber-KPI. Es bewegte sich letztes Jahr nicht mit dem Wert; das ist ein Befund, keine andere Art."), rejected: { vanity: t("Customers do this, not AIConnect; that makes it more than activity.", "Kunden tun das, nicht AIConnect; das macht es zu mehr als Aktivität.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Unsubscribe rate from AIConnect's e-mails.", "Abmelderate von den E-Mails von AIConnect."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("It must not get worse while more e-mails are personalised and sent: a guardrail.", "Sie darf nicht schlechter werden, während mehr E-Mails personalisiert und verschickt werden: eine Guardrail."), rejected: { driver: t("Nobody pushes unsubscribes up; you watch them as a limit.", "Niemand treibt Abmeldungen nach oben; man beobachtet sie als Grenze.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Complaints about the chatbot per 1,000 chats.", "Beschwerden über den Chatbot pro 1.000 Chats."), truth: "guardrail" as PatternId, clue: t("If this rose while the chatbot saved money, would you stop?", "Würden Sie stoppen, wenn das stiege, während der Chatbot Geld spart?"), why: t("A limit on automation: if complaints rise, the chatbot hurts the experience it should help. A guardrail.", "Eine Grenze für die Automatisierung: Steigen die Beschwerden, schadet der Chatbot dem Erlebnis, dem er helfen soll. Eine Guardrail."), rejected: { outcome: t("It is not the result AIConnect is paid for; it is what must not get worse.", "Es ist nicht das Ergebnis, für das AIConnect bezahlt wird; es ist, was nicht schlechter werden darf.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Share of chats handed to a person without an answer.", "Anteil der Chats, die ohne Antwort an einen Menschen übergeben werden."), truth: "guardrail" as PatternId, clue: t("Is this a result, a behaviour you push, or a limit you watch?", "Ist das ein Ergebnis, ein Verhalten, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("A limit on the chatbot: when too many chats fail, the customer waits twice. A guardrail.", "Eine Grenze für den Chatbot: Scheitern zu viele Chats, wartet der Kunde doppelt. Eine Guardrail."), rejected: { vanity: t("It says something about customers' experience, not about AIConnect's activity.", "Es sagt etwas über das Erlebnis der Kunden, nicht über die Aktivität von AIConnect.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("E-mails sent per month.", "Versendete E-Mails pro Monat."), truth: "vanity" as PatternId, clue: t("Who acted: customers, or AIConnect?", "Wer hat gehandelt: Kunden oder AIConnect?"), why: t("It counts AIConnect's own activity: a vanity metric.", "Es zählt die eigene Aktivität von AIConnect: eine Vanity Metric."), rejected: { driver: t("Sending is what AIConnect does; a driver counts what customers do.", "Versenden ist, was AIConnect tut; ein Treiber zählt, was Kunden tun.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Followers of AIConnect's LinkedIn page.", "Follower der LinkedIn-Seite von AIConnect."), truth: "vanity" as PatternId, clue: t("Does a follower buy, use or stay?", "Kauft, nutzt oder bleibt ein Follower?"), why: t("Reach, not behaviour: a vanity metric.", "Reichweite, kein Verhalten: eine Vanity Metric."), rejected: { driver: t("Following a page is not what customers do before they buy or renew.", "Einer Seite zu folgen ist nicht, was Kunden tun, bevor sie kaufen oder verlängern.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Number of dashboards the data team has built.", "Anzahl der Dashboards, die das Datenteam gebaut hat."), truth: "vanity" as PatternId, clue: t("Does it count customers' behaviour or the team's output?", "Zählt es das Verhalten von Kunden oder den Output des Teams?"), why: t("It counts the team's output: a vanity metric.", "Es zählt den Output des Teams: eine Vanity Metric."), rejected: { outcome: t("A dashboard is a tool, not a result a customer pays for.", "Ein Dashboard ist ein Werkzeug, kein Ergebnis, für das ein Kunde bezahlt.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ outcome: 0, driver: 0, guardrail: 0, vanity: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to value, what each kind tells management, how to use it */

/** The link of a kind of metric to customer value, from the learner's own tally. (The type keeps its Day 7 name, "risk".) */
export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
/** The rule of Materi A5, applied to the learner's own tally: share of a kind's metrics that moved with customer value last year. */
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to customer value from last year: half or more of the kind's metrics moved with customer value = Strong; some did = Partial; none did = None.", "Verbindung zum Kundenwert aus dem letzten Jahr: Die Hälfte oder mehr der Kennzahlen dieser Art bewegte sich mit dem Kundenwert = Stark; einige = Teilweise; keine = Keine.") });

export type MeaningId = "result" | "early" | "limit" | "activity";
export const MEANINGS = bi([
  { id: "result" as MeaningId, label: t("The result we are paid for; it moves last", "Das Ergebnis, für das wir bezahlt werden; es bewegt sich zuletzt") },
  { id: "early" as MeaningId, label: t("An early customer behaviour that a team can move now", "Ein frühes Kundenverhalten, das ein Team jetzt bewegen kann") },
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we push the result", "Eine Grenze: Sie darf nicht schlechter werden, während wir das Ergebnis vorantreiben") },
  { id: "activity" as MeaningId, label: t("Our own activity; it says nothing about customers", "Unsere eigene Aktivität; sie sagt nichts über Kunden") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the team that can move it and review it every week", "Es dem Team geben, das es bewegen kann, und es jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a test or a rollout when it is crossed", "Eine Grenze setzen, die einen Test oder Rollout stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("A pilot with 60 and 96 orders can still be partly luck; a second run would confirm it", "Ein Pilot mit 60 und 96 Bestellungen kann noch teilweise Zufall sein; ein zweiter Durchlauf würde ihn bestätigen"), real: true, why: t("With under 100 orders per group, a few orders more or less move the uplift a lot. The result is promising, not proven (Materi A6).", "Mit unter 100 Bestellungen pro Gruppe verschieben ein paar Bestellungen mehr oder weniger den Uplift stark. Das Ergebnis ist vielversprechend, nicht bewiesen (Materi A6).") },
  { id: "cause" as UncId, label: t("Something else that changed in the same weeks could explain part of the difference", "Etwas anderes, das sich in denselben Wochen änderte, könnte einen Teil des Unterschieds erklären"), real: true, why: t("A random split in the same weeks protects against most of this; a before-and-after comparison does not.", "Eine zufällige Aufteilung in denselben Wochen schützt vor dem meisten davon; ein Vorher-Nachher-Vergleich nicht.") },
  { id: "missing" as UncId, label: t("Orders placed by phone after the e-mail are not counted as conversions", "Bestellungen, die nach der E-Mail telefonisch eingehen, werden nicht als Conversion gezählt"), real: true, why: t("What is not recorded cannot be counted: the true effect may be larger, or differ between the groups.", "Was nicht erfasst wird, kann nicht gezählt werden: Der wahre Effekt kann größer sein oder sich zwischen den Gruppen unterscheiden.") },
  { id: "shift" as UncId, label: t("The pilot list may not be like all customers", "Die Pilotliste ist vielleicht nicht wie alle Kunden"), real: true, why: t("If the pilot ran on the most active customers, the uplift for everyone may be smaller.", "Lief der Pilot mit den aktivsten Kunden, ist der Uplift für alle vielleicht kleiner.") },
  { id: "objective" as UncId, label: t("A KPI is a number, so it cannot be read wrongly", "Ein KPI ist eine Zahl, also kann er nicht falsch gelesen werden"), real: false, why: t("A number can be read against the wrong baseline, on too few cases, or as a cause when it is only a link.", "Eine Zahl kann gegen die falsche Basis gelesen werden, auf zu wenigen Fällen, oder als Ursache, wenn sie nur ein Zusammenhang ist.") },
  { id: "highsafe" as UncId, label: t("If conversion rises, the customer experience must have improved too", "Wenn die Conversion steigt, muss auch das Kundenerlebnis besser geworden sein"), real: false, why: t("A discount or pressure can raise conversion while complaints and unsubscribes rise. That is why guardrails exist.", "Ein Rabatt oder Druck kann die Conversion heben, während Beschwerden und Abmeldungen steigen. Dafür gibt es Guardrails.") },
  { id: "moredata" as UncId, label: t("The more KPIs we track, the better we measure success", "Je mehr KPIs wir verfolgen, desto besser messen wir den Erfolg"), real: false, why: t("Many KPIs hide the few that matter. A small KPI system (one outcome, a few drivers, a guardrail) is easier to steer by (Materi A5).", "Viele KPIs verdecken die wenigen, die zählen. Ein kleines KPI-System (ein Outcome, wenige Treiber, eine Guardrail) lässt sich leichter steuern (Materi A5).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only the offer: a recommended add-on instead of the standard offer", "Nur das Angebot: ein empfohlenes Add-on statt des Standardangebots"), right: true, clue: t("", "") },
      { id: "three", label: t("The offer, the subject line and the send day, all at once", "Angebot, Betreffzeile und Versandtag, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("An e-mail for the variant, a phone call for the standard group", "Eine E-Mail für die Variante, ein Anruf für die Standardgruppe"), right: false, clue: t("How many things differ between the two groups here: only the offer, or also the channel and the effort?", "Wie viele Dinge unterscheiden sich hier zwischen den Gruppen: nur das Angebot, oder auch Kanal und Aufwand?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Who gets the standard offer, to compare against.", "Wer das Standardangebot bekommt, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the same list, in the same weeks", "Eine zufällige Hälfte derselben Liste, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last year's campaign in the same month", "Die Kampagne vom letzten Jahr im selben Monat"), right: false, clue: t("Are these the same customers, at the same time, under the same conditions?", "Sind das dieselben Kunden, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Customers who did not open the variant e-mail", "Kunden, die die Varianten-E-Mail nicht geöffnet haben"), right: false, clue: t("Who chose to be in this group: chance, or the customers themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Kunden selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Conversion rate: orders ÷ e-mails delivered, within 14 days", "Conversion Rate: Bestellungen ÷ zugestellte E-Mails, innerhalb von 14 Tagen"), right: true, clue: t("", "") },
      { id: "opens", label: t("Open rate of the e-mail", "Öffnungsrate der E-Mail"), right: false, clue: t("The problem in the brief is low conversion. Does an opened e-mail tell you whether more customers ordered?", "Das Problem im Auftrag ist niedrige Conversion. Sagt eine geöffnete E-Mail, ob mehr Kunden bestellt haben?") },
      { id: "sent", label: t("Number of e-mails sent", "Anzahl der versendeten E-Mails"), right: false, clue: t("Which kind of metric counts what AIConnect did rather than what customers did?", "Welche Art von Kennzahl zählt, was AIConnect tat, statt was Kunden taten?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 orders, and at least two full weeks", "Vorab festgelegt: bis jede Gruppe etwa 100 Bestellungen hat, und mindestens zwei volle Wochen"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the variant is ahead", "Stoppen, sobald die Variante vorn liegt"), right: false, clue: t("Early on, a few orders swing the result. What happens if you stop at a lucky moment?", "Am Anfang kippen wenige Bestellungen das Ergebnis. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One day, for a fast answer", "Einen Tag, für eine schnelle Antwort"), right: false, clue: t("How many orders arrive in one day, and are Mondays like Fridays?", "Wie viele Bestellungen kommen an einem Tag an, und sind Montage wie Freitage?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … then/will … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);
