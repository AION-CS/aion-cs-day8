import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at AIConnect with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "Today the marketing report and the sales report give two different conversion rates. With the foundation, the board, marketing and sales open one page that shows the same three KPIs, each counted the same way from joined data.",
      "Heute nennen der Marketing-Bericht und der Vertriebsbericht zwei verschiedene Conversion Rates. Mit der Datenbasis öffnen Vorstand, Marketing und Vertrieb eine Seite, die dieselben drei KPIs zeigt, jeden gleich gezählt aus verbundenen Daten.",
    ),
  },
  reco: {
    scene: t(
      "A customer who bought the reporting module gets an offer e-mail that suggests the add-on similar customers bought next, with the reason in one line. The sales team sees which suggestion was opened and which ended in an order.",
      "Ein Kunde, der das Reporting-Modul gekauft hat, erhält eine Angebots-E-Mail, die das Add-on vorschlägt, das ähnliche Kunden als Nächstes gekauft haben, mit dem Grund in einer Zeile. Das Vertriebsteam sieht, welcher Vorschlag geöffnet wurde und welcher zu einer Bestellung führte.",
    ),
  },
  trigger: {
    scene: t(
      "A customer who has not logged in for 21 days gets one short e-mail with the feature they used most. Marketing sets the rules; the customer notices only a helpful message at the right moment.",
      "Ein Kunde, der sich seit 21 Tagen nicht eingeloggt hat, erhält eine kurze E-Mail mit dem Feature, das er am meisten genutzt hat. Das Marketing legt die Regeln fest; der Kunde bemerkt nur eine hilfreiche Nachricht zum richtigen Zeitpunkt.",
    ),
  },
  abtest: {
    scene: t(
      "Before the next newsletter goes to everyone, marketing holds back a random tenth of the customers. A week later one page shows how much better the group that got it converted.",
      "Bevor der nächste Newsletter an alle geht, hält das Marketing eine zufällige Zehntel der Kunden zurück. Eine Woche später zeigt eine Seite, wie viel besser die Gruppe konvertiert hat, die ihn bekam.",
    ),
  },
  training: {
    scene: t(
      "In the weekly sales meeting, an account manager reads an uplift and a guardrail on the dashboard and says why a result on 40 orders is too small to trust. The customer gets an offer based on a number, not a hunch.",
      "Im wöchentlichen Vertriebsmeeting liest ein Account Manager einen Uplift und eine Guardrail im Dashboard und sagt, warum ein Ergebnis bei 40 Bestellungen zu klein ist, um ihm zu trauen. Der Kunde erhält ein Angebot, das auf einer Zahl beruht, nicht auf einem Bauchgefühl.",
    ),
  },
  quality: {
    scene: t(
      "Someone checks that every FAQ answer and every price row the chatbot or the pricing engine would read is complete and current, and fills the gaps. Customers notice nothing yet; the later pilots learn from clean data.",
      "Jemand prüft, dass jede FAQ-Antwort und jede Preiszeile, die der Chatbot oder die Pricing-Engine lesen würde, vollständig und aktuell ist, und füllt die Lücken. Kunden bemerken noch nichts; die späteren Piloten lernen aus sauberen Daten.",
    ),
  },
  suite: {
    scene: t(
      "A vendor platform picks the offer and the channel for every customer by itself. The customer gets a different message from the neighbour and nobody at AIConnect can say why.",
      "Eine Anbieterplattform wählt Angebot und Kanal für jeden Kunden selbst. Der Kunde erhält eine andere Nachricht als der Nachbar, und niemand bei AIConnect kann sagen, warum.",
    ),
  },
  pricing: {
    scene: t(
      "The price of an add-on bundle changes with demand and order size. The customer sees a different price from last month, so the sales team has to be able to say why.",
      "Der Preis eines Add-on-Bundles ändert sich mit Nachfrage und Bestellmenge. Der Kunde sieht einen anderen Preis als im Vormonat, also muss der Vertrieb sagen können, warum.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 5, engage: 53, cv: 10800 };
