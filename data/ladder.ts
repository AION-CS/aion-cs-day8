import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Nine ideas from AIConnect's teams for using its customer data. The learner tags each with the kind of technology
 * it is (Materi A2 and A3): a recommendation system, individualised communication, or automation. (The identifiers keep the names of the
 * Day 7 sort board this file was built from: a "line" is one idea, a "level tag" is its kind.) `truth` is never shown outside the
 * mentor answer key.
 */
export type LevelTag = "reco" | "comm" | "auto";
export const LEVEL_TAGS = bi([
  { id: "reco" as LevelTag, label: t("Recommendation system", "Recommendation System"), hint: t("The system chooses which product or content to suggest, from what similar customers bought or used.", "Das System wählt, welches Produkt oder welcher Inhalt vorgeschlagen wird, aus dem, was ähnliche Kunden gekauft oder genutzt haben.") },
  { id: "comm" as LevelTag, label: t("Individualised communication", "Individualisierte Kommunikation"), hint: t("What we say, when and on which channel is adapted to what this customer did.", "Was wir sagen, wann und über welchen Kanal, wird an das angepasst, was dieser Kunde getan hat.") },
  { id: "auto" as LevelTag, label: t("Automation", "Automatisierung"), hint: t("A system does a step of the sale or the service by itself, without a person: it answers, sets a price or changes an offer.", "Ein System erledigt einen Schritt im Verkauf oder Service selbst, ohne Menschen: Es antwortet, setzt einen Preis oder ändert ein Angebot.") },
]);
export const LEVEL_LABEL = bi({ reco: t("Recommendation system", "Recommendation System"), comm: t("Individualised communication", "Individualisierte Kommunikation"), auto: t("Automation", "Automatisierung") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("On the licence page, show “Customers who use the backup module also bought the archive add-on”.", "Auf der Lizenzseite anzeigen: „Kunden, die das Backup-Modul nutzen, kauften auch das Archiv-Add-on“."),
    truth: "reco" as LevelTag,
    clue: t("What does the idea decide: which product to show, how to talk, or who does the work?", "Was entscheidet die Idee: welches Produkt gezeigt wird, wie gesprochen wird, oder wer die Arbeit macht?"),
    why: t("It picks a product to suggest from what other customers bought together: the classic “customers also bought” recommendation.", "Sie wählt ein Produkt zum Vorschlagen aus dem, was andere Kunden zusammen kauften: die klassische Empfehlung „Kunden kauften auch“."),
    rejected: { auto: t("A page shows a suggestion; no step of the sale is done by a machine instead of a person.", "Eine Seite zeigt einen Vorschlag; kein Verkaufsschritt wird von einer Maschine statt von einem Menschen erledigt.") },
  },
  {
    id: "l2" as LineId,
    source: t("Product", "Produkt"),
    text: t("After a customer adds 20 users, suggest the admin training package that most customers of that size bought next.", "Wenn ein Kunde 20 Nutzer hinzufügt, das Admin-Schulungspaket vorschlagen, das die meisten Kunden dieser Größe als Nächstes kauften."),
    truth: "reco" as LevelTag,
    clue: t("It is triggered by behaviour. But is the point the timing, or which product to offer?", "Sie wird durch Verhalten ausgelöst. Aber geht es um den Zeitpunkt, oder darum, welches Produkt angeboten wird?"),
    why: t("The choice of product comes from what similar customers bought next: a recommendation, even though a behaviour triggers it.", "Die Wahl des Produkts kommt aus dem, was ähnliche Kunden als Nächstes kauften: eine Empfehlung, auch wenn ein Verhalten sie auslöst."),
    rejected: { comm: t("The message is not adapted in tone or timing; the product in it is chosen from other customers' purchases.", "Die Nachricht wird nicht in Ton oder Zeitpunkt angepasst; das Produkt darin wird aus den Käufen anderer Kunden gewählt.") },
  },
  {
    id: "l3" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("Rank the three add-ons each account manager should offer a customer, from what similar customers bought after their first year.", "Die drei Add-ons ranken, die jeder Account Manager einem Kunden anbieten sollte, aus dem, was ähnliche Kunden nach ihrem ersten Jahr kauften."),
    truth: "reco" as LevelTag,
    clue: t("A person still makes the offer. What does the system contribute?", "Ein Mensch macht das Angebot weiterhin. Was steuert das System bei?"),
    why: t("The system suggests which products; the account manager still sells. A recommendation that helps a person, not automation.", "Das System schlägt vor, welche Produkte; der Account Manager verkauft weiterhin. Eine Empfehlung, die einem Menschen hilft, keine Automatisierung."),
    rejected: { auto: t("Nothing is done without a person: the account manager makes the offer.", "Nichts geschieht ohne Menschen: Der Account Manager macht das Angebot.") },
  },
  {
    id: "l4" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("Send the monthly newsletter in three versions, for admins, for managers and for finance, depending on which topics each reader opens.", "Den monatlichen Newsletter in drei Versionen schicken, für Admins, Führungskräfte und Finanzen, je nachdem, welche Themen jeder Leser öffnet."),
    truth: "comm" as LevelTag,
    clue: t("Is a product being chosen, or is the message adapted to the reader?", "Wird ein Produkt ausgewählt, oder wird die Nachricht an den Leser angepasst?"),
    why: t("The content of the message follows what each reader reads: individualised communication.", "Der Inhalt der Nachricht folgt dem, was jeder Leser liest: individualisierte Kommunikation."),
    rejected: { reco: t("No product is suggested from other customers' purchases; the newsletter itself is tailored.", "Kein Produkt wird aus Käufen anderer Kunden vorgeschlagen; der Newsletter selbst wird zugeschnitten.") },
  },
  {
    id: "l5" as LineId,
    source: t("Service", "Service"),
    text: t("When a customer has not logged in for 21 days, send a short e-mail from their own contact person with the two features they used most.", "Wenn sich ein Kunde 21 Tage nicht angemeldet hat, eine kurze E-Mail von seiner eigenen Ansprechperson schicken, mit den zwei Funktionen, die er am meisten nutzte."),
    truth: "comm" as LevelTag,
    clue: t("The e-mail may be sent by a system. What is the idea really about: the product, or the message to this customer?", "Die E-Mail wird vielleicht von einem System geschickt. Worum geht es wirklich: um das Produkt oder um die Nachricht an diesen Kunden?"),
    why: t("Timing, sender and content follow this customer's own behaviour: individualised communication. The sending may be automated; the idea is about what is said.", "Zeitpunkt, Absender und Inhalt folgen dem eigenen Verhalten dieses Kunden: individualisierte Kommunikation. Der Versand kann automatisiert sein; die Idee betrifft, was gesagt wird."),
    rejected: { auto: t("Sending an e-mail on a trigger is not the point; the message is built from this customer's use.", "Eine E-Mail auf einen Auslöser zu schicken, ist nicht der Kern; die Nachricht wird aus der Nutzung dieses Kunden gebaut.") },
  },
  {
    id: "l6" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("Time the renewal e-mail to the month in which the customer usually approves budgets, instead of 60 days before the end for everyone.", "Die Verlängerungs-E-Mail auf den Monat legen, in dem der Kunde üblicherweise Budgets freigibt, statt für alle 60 Tage vor Vertragsende."),
    truth: "comm" as LevelTag,
    clue: t("What changes for the customer: the product, or when they hear from us?", "Was ändert sich für den Kunden: das Produkt, oder wann er von uns hört?"),
    why: t("Only the timing changes, and it follows this customer's own rhythm: individualised communication.", "Nur der Zeitpunkt ändert sich, und er folgt dem eigenen Rhythmus dieses Kunden: individualisierte Kommunikation."),
    rejected: { reco: t("The renewal is the same product for everyone; only when it is sent is adapted.", "Die Verlängerung ist für alle dasselbe Produkt; nur der Versandzeitpunkt wird angepasst.") },
  },
  {
    id: "l7" as LineId,
    source: t("Service", "Service"),
    text: t("A chatbot on the help page answers password and licence questions at any hour and hands anything else to a person.", "Ein Chatbot auf der Hilfeseite beantwortet Passwort- und Lizenzfragen zu jeder Uhrzeit und übergibt alles andere an einen Menschen."),
    truth: "auto" as LevelTag,
    clue: t("Who does the answering here?", "Wer antwortet hier?"),
    why: t("A machine takes over a step a person did before (first answers): automation, with a hand-over for the rest.", "Eine Maschine übernimmt einen Schritt, den vorher ein Mensch machte (erste Antworten): Automatisierung, mit Übergabe für den Rest."),
    rejected: { comm: t("It is not about adapting a message; it is about who answers.", "Es geht nicht darum, eine Nachricht anzupassen, sondern darum, wer antwortet.") },
  },
  {
    id: "l8" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("The price of the add-on bundle in the web shop adjusts to the order size and the season, within a band sales has set.", "Der Preis des Add-on-Bundles im Webshop passt sich der Bestellmenge und der Saison an, innerhalb einer Spanne, die der Vertrieb festgelegt hat."),
    truth: "auto" as LevelTag,
    clue: t("Who sets the price at the moment of the order?", "Wer setzt den Preis im Moment der Bestellung?"),
    why: t("The system sets the price by itself from behaviour and demand: dynamic pricing, a form of automation.", "Das System setzt den Preis selbst aus Verhalten und Nachfrage: Dynamic Pricing, eine Form der Automatisierung."),
    rejected: { reco: t("No product is suggested; the same product gets a price set by a machine.", "Kein Produkt wird vorgeschlagen; dasselbe Produkt bekommt einen Preis, den eine Maschine setzt.") },
  },
  {
    id: "l9" as LineId,
    source: t("Product", "Produkt"),
    text: t("The start page of the customer portal rearranges its tiles by itself, putting first the functions each user opens most.", "Die Startseite des Kundenportals ordnet ihre Kacheln selbst neu und stellt die Funktionen nach vorn, die jeder Nutzer am meisten öffnet."),
    truth: "auto" as LevelTag,
    clue: t("It is personal, but who changes the page, and when?", "Es ist persönlich, aber wer ändert die Seite, und wann?"),
    why: t("The system adapts what it offers by itself, all the time, without anyone deciding each change: an adaptive system, a form of automation.", "Das System passt sein Angebot selbst an, fortlaufend, ohne dass jemand jede Änderung entscheidet: ein adaptives System, eine Form der Automatisierung."),
    rejected: { reco: t("It does not suggest a product from other customers' purchases; it reorders this user's own functions by itself.", "Es schlägt kein Produkt aus Käufen anderer Kunden vor; es ordnet die eigenen Funktionen dieses Nutzers selbst neu.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A2 and A3 for each kind, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Recommendation system", "Recommendation System"), test: t("Does it choose which product or content to suggest, from what similar customers bought or used?", "Wählt es, welches Produkt oder welcher Inhalt vorgeschlagen wird, aus dem, was ähnliche Kunden kauften oder nutzten?") },
  { name: t("Individualised communication", "Individualisierte Kommunikation"), test: t("Does it adapt what we say, when, or on which channel, to what this customer did?", "Passt es an, was wir sagen, wann oder über welchen Kanal, je nachdem, was dieser Kunde getan hat?") },
  { name: t("Automation", "Automatisierung"), test: t("Does a system do a step by itself that a person did before: answer, set a price, change an offer?", "Erledigt ein System selbst einen Schritt, den vorher ein Mensch machte: antworten, einen Preis setzen, ein Angebot ändern?") },
  { name: t("Recommendation or communication?", "Empfehlung oder Kommunikation?"), test: t("Ask what changes between two customers. If it is the product suggested, it is a recommendation; if it is the message, its timing or its channel, it is communication.", "Fragen Sie, was sich zwischen zwei Kunden ändert. Ist es das vorgeschlagene Produkt, ist es eine Empfehlung; ist es die Nachricht, ihr Zeitpunkt oder ihr Kanal, ist es Kommunikation.") },
  { name: t("Communication or automation?", "Kommunikation oder Automatisierung?"), test: t("An e-mail sent on a trigger is still communication. It becomes automation when the machine does the work a person did: answering, pricing, rearranging the offer.", "Eine E-Mail auf einen Auslöser ist immer noch Kommunikation. Automatisierung wird es, wenn die Maschine die Arbeit eines Menschen macht: antworten, Preise setzen, das Angebot umstellen.") },
]);

/** The decisive phrase inside each idea's own text, for "Highlight the key words" (never which kind it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("also bought the archive add-on", "kauften auch das Archiv-Add-on"),
  l2: t("that most customers of that size bought next", "das die meisten Kunden dieser Größe als Nächstes kauften"),
  l3: t("from what similar customers bought after their first year", "aus dem, was ähnliche Kunden nach ihrem ersten Jahr kauften"),
  l4: t("depending on which topics each reader opens", "je nachdem, welche Themen jeder Leser öffnet"),
  l5: t("from their own contact person", "von seiner eigenen Ansprechperson"),
  l6: t("to the month in which the customer usually approves budgets", "auf den Monat legen, in dem der Kunde üblicherweise Budgets freigibt"),
  l7: t("answers password and licence questions at any hour", "beantwortet Passwort- und Lizenzfragen zu jeder Uhrzeit"),
  l8: t("adjusts to the order size and the season", "passt sich der Bestellmenge und der Saison an"),
  l9: t("rearranges its tiles by itself", "ordnet ihre Kacheln selbst neu"),
});
