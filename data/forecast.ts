import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2, and the worked example of Materi A4: reading a pilot (an A/B test) with three KPI figures. The method is
 *
 *   conversion rate            = orders ÷ e-mails delivered × 100
 *   uplift (how many times)    = conversion rate of the personalised variant ÷ conversion rate of the standard offer
 *   extra revenue a year       = offer e-mails a year × (variant rate − standard rate, as a share of one) × average order value
 *
 * Every input is a Case assumption from AIConnect's pilot last quarter. Rates are printed as counts, so the learner divides first; the
 * difference of the two rates enters F3 as a share of one. Results are rounded to two decimals. (FORECAST keeps its Day 7 name.)
 */
export const PILOT = {
  control: { sent: 2000, orders: 60 },
  variant: { sent: 2000, orders: 96 },
  yearly: 24000,
  order: 900,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

export type FigureId = "F1" | "F2" | "F3";
export const FIGURE_IDS: FigureId[] = ["F1", "F2", "F3"];

export const FIGURES = bi({
  F1: {
    id: "F1" as FigureId,
    label: t("F1 · Conversion rate of the personalised offer, %", "F1 · Conversion Rate des personalisierten Angebots, %"),
    question: t("Of the e-mails with the personalised offer, what share led to an order?", "Welcher Anteil der E-Mails mit dem personalisierten Angebot führte zu einer Bestellung?"),
    unit: "%",
    example: "2.5",
    answer: FORECAST.f1,
    formula: t("Conversion rate = orders ÷ e-mails delivered × 100. Use the two rows of the personalised offer.", "Conversion Rate = Bestellungen ÷ zugestellte E-Mails × 100. Nutzen Sie die zwei Zeilen des personalisierten Angebots."),
    taughtIn: "A4" as const,
    clue: t("Did you divide the orders by the e-mails of the same offer, and multiply by 100?", "Haben Sie die Bestellungen durch die E-Mails desselben Angebots geteilt und mit 100 multipliziert?"),
    sources: [
      { label: t("Pilot · personalised offer · e-mails delivered", "Pilot · personalisiertes Angebot · zugestellte E-Mails"), value: "2,000", target: "fc-var-sent" },
      { label: t("Pilot · personalised offer · orders", "Pilot · personalisiertes Angebot · Bestellungen"), value: "96", target: "fc-var-orders" },
    ],
  },
  F2: {
    id: "F2" as FigureId,
    label: t("F2 · Uplift: how many times the standard rate", "F2 · Uplift: wie viel Mal die Standardrate"),
    question: t("How many times higher is the conversion rate of the personalised offer than that of the standard offer?", "Wie viel Mal höher ist die Conversion Rate des personalisierten Angebots als die des Standardangebots?"),
    unit: "×",
    example: "1.2",
    answer: FORECAST.f2,
    formula: t("Uplift = conversion rate of the personalised offer ÷ conversion rate of the standard offer. Work out the standard rate from its rows first.", "Uplift = Conversion Rate des personalisierten Angebots ÷ Conversion Rate des Standardangebots. Berechnen Sie die Standardrate zuerst aus ihren Zeilen."),
    taughtIn: "A4" as const,
    clue: t("You need two rates from two pairs of rows. Is the second one worked out from the standard offer's rows, the same way as F1?", "Sie brauchen zwei Raten aus zwei Zeilenpaaren. Ist die zweite aus den Zeilen des Standardangebots berechnet, genauso wie F1?"),
    sources: [
      { label: t("Your F1 (conversion rate, personalised offer)", "Ihr F1 (Conversion Rate, personalisiertes Angebot)"), value: "F1", target: "fig-F1" },
      { label: t("Pilot · standard offer · e-mails delivered", "Pilot · Standardangebot · zugestellte E-Mails"), value: "2,000", target: "fc-ctl-sent" },
      { label: t("Pilot · standard offer · orders", "Pilot · Standardangebot · Bestellungen"), value: "60", target: "fc-ctl-orders" },
    ],
  },
  F3: {
    id: "F3" as FigureId,
    label: t("F3 · Extra revenue a year, €", "F3 · Zusätzlicher Umsatz pro Jahr, €"),
    question: t("If every offer e-mail next year carried the personalised offer and customers behaved as in the pilot, how much extra revenue would it bring in a year?", "Wenn jede Angebots-E-Mail im nächsten Jahr das personalisierte Angebot trüge und die Kunden sich wie im Pilot verhielten: Wie viel zusätzlichen Umsatz brächte das in einem Jahr?"),
    unit: "€",
    example: "12500",
    answer: FORECAST.f3,
    formula: t("Extra revenue = offer e-mails a year × (conversion rate of the personalised offer − conversion rate of the standard offer, as a share of one) × average order value.", "Zusätzlicher Umsatz = Angebots-E-Mails pro Jahr × (Conversion Rate des personalisierten Angebots − Conversion Rate des Standardangebots, als Anteil von eins) × durchschnittlicher Bestellwert."),
    taughtIn: "A4" as const,
    clue: t("Only the difference between the two rates is extra, and it has to be a share of one (1 point = 0.01) before you multiply.", "Nur der Unterschied zwischen den beiden Raten ist zusätzlich, und er muss ein Anteil von eins sein (1 Punkt = 0,01), bevor Sie multiplizieren."),
    sources: [
      { label: t("Next year · offer e-mails a year", "Nächstes Jahr · Angebots-E-Mails pro Jahr"), value: "24,000", target: "fc-yearly" },
      { label: t("Your F1 (conversion rate, personalised offer)", "Ihr F1 (Conversion Rate, personalisiertes Angebot)"), value: "F1", target: "fig-F1" },
      { label: t("Pilot · standard offer · e-mails and orders (its rate)", "Pilot · Standardangebot · E-Mails und Bestellungen (seine Rate)"), value: "60 ÷ 2,000", target: "fc-ctl-orders" },
      { label: t("All orders · average order value", "Alle Bestellungen · durchschnittlicher Bestellwert"), value: t("€900", "900 €"), target: "fc-order" },
    ],
  },
});

/** The worked example of Materi A4: a different provider (Mosel Software), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 1500, orders: 30 }, variant: { sent: 1500, orders: 45 }, yearly: 10000, order: 600 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight contact situations */

/**
 * Eight situations in which customers contact AIConnect. (The type keeps its Day 7 name, "customer".) The rule of Materi A3:
 * automate fully when the answer is the same every time, little is at stake and the volume is high (100 a month or more);
 * keep a person when a lot is at stake or the customer is upset; everything between: let automation assist a person.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Routine = "yes" | "partly" | "no";
export type Stakes = "low" | "mid" | "high";
export type Customer = { id: CustId; name: string; volume: number; routine: Routine; stakes: Stakes };
export const ROUTINE_LABEL = bi({ yes: t("Yes", "Ja"), partly: t("Partly", "Teilweise"), no: t("No", "Nein") });
export const STAKES_LABEL = bi({ low: t("Low", "Gering"), mid: t("Mid: a price or a bill", "Mittel: ein Preis oder eine Rechnung"), high: t("High: a contract, or an upset customer", "Hoch: ein Vertrag oder ein verärgerter Kunde") });
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Password reset or new user access", "Passwort zurücksetzen oder neuer Nutzerzugang"), volume: 900, routine: "yes" as Routine, stakes: "low" as Stakes },
  { id: "c2" as CustId, name: t("“Where is my order or my ticket?”", "„Wo ist meine Bestellung oder mein Ticket?“"), volume: 600, routine: "yes" as Routine, stakes: "low" as Stakes },
  { id: "c3" as CustId, name: t("Technical question outside office hours", "Technische Frage außerhalb der Bürozeiten"), volume: 200, routine: "partly" as Routine, stakes: "low" as Stakes },
  { id: "c4" as CustId, name: t("Price for five extra licences", "Preis für fünf zusätzliche Lizenzen"), volume: 150, routine: "yes" as Routine, stakes: "mid" as Stakes },
  { id: "c5" as CustId, name: t("Question about upgrading to the next plan", "Frage zum Wechsel in den nächsthöheren Tarif"), volume: 120, routine: "partly" as Routine, stakes: "mid" as Stakes },
  { id: "c6" as CustId, name: t("“Our invoice looks wrong”", "„Unsere Rechnung sieht falsch aus“"), volume: 60, routine: "partly" as Routine, stakes: "mid" as Stakes },
  { id: "c7" as CustId, name: t("A key account says it may cancel", "Ein Key Account sagt, er kündigt vielleicht"), volume: 5, routine: "no" as Routine, stakes: "high" as Stakes },
  { id: "c8" as CustId, name: t("Complaint after data was lost", "Beschwerde nach Datenverlust"), volume: 8, routine: "no" as Routine, stakes: "high" as Stakes },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = 100;
/** Hand fully to automation: the same answer every time, low stakes, 100 or more a month (Materi A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** Keep with a person: a contract at stake, or an upset customer (Materi A3). */
export const CHURN_TRUTH: CustId[] = ["c7", "c8"];
export const PICK_WHY = bi({
  c1: t("The same answer every time, nothing at stake, 900 a month: automate fully.", "Jedes Mal dieselbe Antwort, nichts steht auf dem Spiel, 900 im Monat: voll automatisieren."),
  c2: t("A status the system already knows, low stakes, 600 a month: automate fully.", "Ein Status, den das System schon kennt, geringer Einsatz, 600 im Monat: voll automatisieren."),
  c3: t("Only partly routine: a chatbot can answer the known issues at night and hand the rest to a person in the morning. Assist, not full automation.", "Nur teilweise Routine: Ein Chatbot kann nachts die bekannten Probleme beantworten und den Rest morgens an einen Menschen übergeben. Unterstützen, nicht voll automatisieren."),
  c4: t("Routine, but a price is a commitment: the system can propose it, a person confirms it. Assist.", "Routine, aber ein Preis ist eine Zusage: Das System kann ihn vorschlagen, ein Mensch bestätigt ihn. Unterstützen."),
  c5: t("Partly routine and it touches the contract: automation prepares the comparison, a person advises. Assist.", "Teilweise Routine, und es berührt den Vertrag: Die Automatisierung bereitet den Vergleich vor, ein Mensch berät. Unterstützen."),
  c6: t("Money is involved and each case differs a little: the system pulls the invoice data, a person answers. Assist.", "Es geht um Geld, und jeder Fall ist etwas anders: Das System holt die Rechnungsdaten, ein Mensch antwortet. Unterstützen."),
  c7: t("A whole contract at stake and no standard answer: a person, fast. A chatbot here would confirm the customer's doubt.", "Ein ganzer Vertrag steht auf dem Spiel, und es gibt keine Standardantwort: ein Mensch, schnell. Ein Chatbot würde hier den Zweifel des Kunden bestätigen."),
  c8: t("An upset customer after a real loss: only a person can take responsibility and rebuild trust.", "Ein verärgerter Kunde nach einem echten Verlust: Nur ein Mensch kann Verantwortung übernehmen und Vertrauen wieder aufbauen."),
});

/* ------------------------------------------------------------------ Block 1.3b · three advantages, each with its risk */

/** The three kinds of technology from Block 1.1; each advantage rests on a different one. (The type keeps its Day 7 name, "basis".) */
export type Basis = "reco" | "comm" | "auto";
export const BASES = bi([
  { id: "reco" as Basis, label: t("Recommendation system", "Recommendation System"), short: t("Recommendation", "Empfehlung") },
  { id: "comm" as Basis, label: t("Individualised communication", "Individualisierte Kommunikation"), short: t("Communication", "Kommunikation") },
  { id: "auto" as Basis, label: t("Automation (chatbot, dynamic pricing, adaptive system)", "Automatisierung (Chatbot, Dynamic Pricing, adaptives System)"), short: t("Automation", "Automatisierung") },
]);
export const BASIS_LABEL = bi({ reco: t("Recommendation system", "Recommendation System"), comm: t("Individualised communication", "Individualisierte Kommunikation"), auto: t("Automation", "Automatisierung") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[The technology] gives customers [what advantage], but [the risk it brings].", "[Die Technologie] gibt Kunden [welchen Vorteil], aber [das Risiko, das sie mitbringt].") });
/** True when the sentence names a risk or a limit. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(but|risk|risks|however|unless|although|danger|if|aber|risiko|jedoch|allerdings|gefahr|wenn|sofern|solange)\b/i.test(s);
