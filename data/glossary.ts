import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or German word that the
 * material or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone
 * who is NOT an expert: short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with the German
 * plural or genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An
 * all-capitals match ("CRM") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  // --- AI, personalisation, automation ------------------------------------------------
  {
    id: "ai",
    title: "AI (artificial intelligence)",
    match: ["AI", "AI-based"],
    plain: "Software that learns patterns from data and uses them to predict or choose: which offer fits, which request is routine. Useful when its results can be measured; risky when nobody can say what it does.",
    from: "Davenport et al. 2020",
    de: { title: "KI (künstliche Intelligenz)", match: ["KI", "KI-gestützt", "KI-gestützte", "KI-gestützten", "KI-gestütztes"], plain: "Software, die Muster aus Daten lernt und damit vorhersagt oder auswählt: welches Angebot passt, welche Anfrage Routine ist. Nützlich, wenn man ihre Ergebnisse messen kann; riskant, wenn niemand sagen kann, was sie tut." },
  },
  {
    id: "tech-without-strategy",
    title: "Technology without strategy",
    match: ["technology without strategy"],
    plain: "Buying a tool first and looking for uses later. It produces activity (e-mails sent, features switched on) but nobody can say whether it moved a result, because no KPI was named before the money was spent.",
    from: "Davenport & Ronanki 2018",
    de: { title: "Technologie ohne Strategie", match: ["Technologie ohne Strategie"], plain: "Zuerst ein Werkzeug kaufen und später Anwendungen suchen. Das erzeugt Aktivität (versendete E-Mails, eingeschaltete Funktionen), aber niemand kann sagen, ob es ein Ergebnis bewegt hat, weil vor der Ausgabe kein KPI benannt wurde." },
  },
  {
    id: "personalisation",
    title: "Personalisation",
    match: ["personalisation", "personalised", "personalise", "personalising", "personalization", "personalized"],
    plain: "Treating customers differently from what each one does: showing a different product, sending a different message, or writing at a different moment. The opposite of one standard e-mail for everyone.",
    from: "Peppers & Rogers 1993",
    de: { title: "Personalisierung", match: ["Personalisierung", "personalisiert", "personalisierte", "personalisierten", "personalisiertes", "personalisieren"], plain: "Kunden verschieden behandeln, je nachdem, was jeder tut: ein anderes Produkt zeigen, eine andere Nachricht schicken oder zu einem anderen Zeitpunkt schreiben. Das Gegenteil einer Standard-E-Mail für alle." },
  },
  {
    id: "recommendation",
    title: "Recommendation system",
    match: ["recommendation system", "recommendation systems", "recommendation engine", "recommender", "recommendations", "recommendation"],
    plain: "Software that suggests which product to show a customer, from what similar customers bought or used. The classic form is “customers who bought this also bought that”.",
    example: "Of 60 customers with Security, 33 also bought the training: Security buyers are shown the training.",
    from: "Linden et al. 2003",
    de: { title: "Recommendation System", match: ["Recommendation System", "Recommendation Systems", "Recommendation Engine", "Empfehlung", "Empfehlungen"], plain: "Software, die vorschlägt, welches Produkt einem Kunden gezeigt wird, aus dem, was ähnliche Kunden kauften oder nutzten. Die klassische Form ist „Kunden, die das kauften, kauften auch“.", example: "Von 60 Kunden mit Security kauften 33 auch die Schulung: Security-Käufern wird die Schulung gezeigt." },
  },
  {
    id: "individual-comm",
    title: "Individualised communication",
    match: ["individualised communication", "individualized communication", "individual communication"],
    plain: "Changing what you say, when you say it, or on which channel, from what this customer did. The product may stay the same; the message fits the person.",
    from: "Peppers & Rogers 1993",
    de: { title: "Individualisierte Kommunikation", match: ["individualisierte Kommunikation", "individualisierten Kommunikation"], plain: "Ändern, was Sie sagen, wann Sie es sagen oder über welchen Kanal, aus dem, was dieser Kunde getan hat. Das Produkt kann gleich bleiben; die Nachricht passt zur Person." },
  },
  {
    id: "automation",
    title: "Automation",
    match: ["automation", "automate", "automated", "automating"],
    plain: "A system does a step by itself that a person did before: it answers a question, sets a price or rearranges an offer. Full automation needs no person; assisted automation prepares the step and a person decides.",
    from: "Huang & Rust 2021",
    de: { title: "Automatisierung", match: ["Automatisierung", "automatisieren", "automatisiert", "automatisierte", "automatisierter"], plain: "Ein System erledigt selbst einen Schritt, den vorher ein Mensch machte: Es beantwortet eine Frage, setzt einen Preis oder ordnet ein Angebot neu. Volle Automatisierung braucht keinen Menschen; unterstützende Automatisierung bereitet den Schritt vor, und ein Mensch entscheidet." },
  },
  {
    id: "chatbot",
    title: "Chatbot",
    match: ["chatbot", "chatbots", "bot"],
    plain: "A program that answers customers in a chat window, day and night. Good for routine questions; it always needs a way to hand the conversation to a person.",
    from: "Adam et al. 2021",
    de: { title: "Chatbot", match: ["Chatbot", "Chatbots", "Bot"], plain: "Ein Programm, das Kunden in einem Chatfenster antwortet, Tag und Nacht. Gut für Routinefragen; es braucht immer einen Weg, das Gespräch an einen Menschen zu übergeben." },
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic pricing",
    match: ["dynamic pricing", "dynamic price"],
    plain: "Prices set by a system that changes them with demand, order size, season or behaviour. In business sales it needs limits set by people, because customers compare invoices.",
    from: "den Boer 2015",
    de: { title: "Dynamic Pricing", match: ["Dynamic Pricing", "Dynamic-Pricing", "dynamischer Preis", "dynamische Preise"], plain: "Preise, die ein System mit Nachfrage, Bestellmenge, Saison oder Verhalten ändert. Im Geschäftskundenvertrieb braucht es Grenzen, die Menschen setzen, weil Kunden Rechnungen vergleichen." },
  },
  {
    id: "adaptive",
    title: "Adaptive system",
    match: ["adaptive system", "adaptive systems"],
    plain: "A system that keeps adjusting what it offers by itself, without anyone deciding each change: a start page that puts first the functions a user opens most.",
    de: { title: "Adaptives System", match: ["adaptives System", "adaptive Systeme", "adaptiven Systeme"], plain: "Ein System, das sein Angebot fortlaufend selbst anpasst, ohne dass jemand jede Änderung entscheidet: eine Startseite, die die Funktionen nach vorn stellt, die ein Nutzer am meisten öffnet." },
  },
  {
    id: "assist",
    title: "Assist (automation that prepares)",
    match: ["assist"],
    exactCase: true,
    plain: "The middle way between a machine and a person: the system finds the data, proposes an answer or a price, and a person checks and decides.",
    de: { title: "Unterstützen", match: ["unterstützen", "Unterstützen"], plain: "Der Mittelweg zwischen Maschine und Mensch: Das System sucht die Daten, schlägt eine Antwort oder einen Preis vor, und ein Mensch prüft und entscheidet." },
  },
  {
    id: "add-on",
    title: "Add-on",
    match: ["add-on", "add-ons"],
    plain: "An extra product a customer can buy on top of the main subscription, such as backup, an archive or a training.",
    de: { title: "Add-on", match: ["Add-on", "Add-ons"], plain: "Ein Zusatzprodukt, das ein Kunde zum Hauptabonnement kaufen kann, etwa Backup, ein Archiv oder eine Schulung." },
  },
  {
    id: "portal",
    title: "Customer portal",
    match: ["portal"],
    plain: "The website where a customer logs in to manage their subscription, users and settings. What customers do there is data about how they use the product.",
    de: { title: "Kundenportal", match: ["Portal", "Kundenportal", "Portaldaten", "Portal-Logins"], plain: "Die Website, auf der sich ein Kunde anmeldet, um Abonnement, Nutzer und Einstellungen zu verwalten. Was Kunden dort tun, sind Daten darüber, wie sie das Produkt nutzen." },
  },

  // --- measuring success ---------------------------------------------------------------
  {
    id: "kpi",
    title: "KPI — key performance indicator",
    match: ["KPI", "KPIs"],
    plain: "One number that shows whether something is working. A good KPI measures what customers do (buy, use, stay), not your own activity.",
    from: "Kaplan & Norton 1992",
    de: { match: ["KPI", "KPIs", "KPI-System", "KPI-Kandidat", "KPI-Kandidaten"], plain: "Eine Zahl, die zeigt, ob etwas funktioniert. Ein guter KPI misst, was Kunden tun (kaufen, nutzen, bleiben), nicht Ihre eigene Aktivität." },
  },
  {
    id: "conversion",
    title: "Conversion rate",
    match: ["conversion rate", "conversion", "conversions", "converted"],
    plain: "The share of contacts that led to the result you wanted, usually an order: orders ÷ e-mails delivered × 100.",
    example: "96 orders from 2,000 e-mails: 96 ÷ 2,000 × 100 = 4.8%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Conversion Rate", match: ["Conversion Rate", "Conversion", "Conversions", "konvertierte", "konvertierte"], plain: "Der Anteil der Kontakte, die zum gewünschten Ergebnis führten, meist einer Bestellung: Bestellungen ÷ zugestellte E-Mails × 100.", example: "96 Bestellungen aus 2.000 E-Mails: 96 ÷ 2.000 × 100 = 4,8 %." },
  },
  {
    id: "uplift",
    title: "Uplift",
    match: ["uplift", "uplifts"],
    plain: "How much better the new version did than the old one. As a multiple: new rate ÷ old rate; as a percentage: how much more that is.",
    example: "4.8% against 3%: 1.6 times the standard rate, an uplift of 60%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Uplift", match: ["Uplift", "Uplifts"], plain: "Wie viel besser die neue Version abschnitt als die alte. Als Vielfaches: neue Rate ÷ alte Rate; in Prozent: wie viel mehr das ist.", example: "4,8 % gegenüber 3 %: das 1,6-Fache der Standardrate, ein Uplift von 60 %." },
  },
  {
    id: "pilot",
    title: "Pilot",
    match: ["pilot", "pilots"],
    plain: "A small first run of a new measure on part of the customers, to see whether it works before it reaches everyone.",
    de: { title: "Pilot", match: ["Pilot", "Piloten", "pilotieren", "Pilotwerte", "Pilotwerten"], plain: "Ein kleiner erster Durchlauf einer neuen Maßnahme mit einem Teil der Kunden, um zu sehen, ob sie wirkt, bevor sie alle erreicht." },
  },
  {
    id: "ab-test",
    title: "A/B test",
    match: ["A/B test", "A/B tests", "A/B testing", "A/B-testing"],
    plain: "Two versions shown at the same time to two groups chosen by chance: A gets the old version, B the new one. The difference in a KPI shows what the change did.",
    from: "Kohavi et al. 2020",
    de: { title: "A/B-Test", match: ["A/B-Test", "A/B-Tests", "A/B-Testing", "A/B-Testergebnisse"], plain: "Zwei Versionen, gleichzeitig an zwei zufällig gewählte Gruppen gezeigt: A bekommt die alte Version, B die neue. Der Unterschied in einem KPI zeigt, was die Änderung bewirkt hat." },
  },
  {
    id: "control-group",
    title: "Control group",
    match: ["control group", "control groups", "control"],
    exactCase: true,
    plain: "The group in a test that keeps the old version. Without it you cannot tell whether a change caused a difference or something else did.",
    de: { title: "Kontrollgruppe", match: ["Kontrollgruppe", "Kontrollgruppen", "Kontrollrate"], plain: "Die Gruppe in einem Test, die die alte Version behält. Ohne sie lässt sich nicht sagen, ob eine Änderung einen Unterschied verursacht hat oder etwas anderes." },
  },
  {
    id: "hypothesis",
    title: "Hypothesis",
    match: ["hypothesis"],
    plain: "What you expect a test to show, written before it starts: if we change this, then that KPI rises, because of this reason.",
    de: { title: "Hypothese", match: ["Hypothese"], plain: "Was ein Test zeigen soll, vor dem Start aufgeschrieben: Wenn wir dies ändern, steigt jener KPI, aus diesem Grund." },
  },
  {
    id: "sample",
    title: "Sample, sample size",
    match: ["sample", "small sample", "sample size"],
    plain: "The customers or orders a result rests on. With few of them, chance can move the result a lot; about 100 conversions per group is a common minimum before reading a test.",
    de: { title: "Stichprobe", match: ["Stichprobe", "Stichprobengröße", "Mindeststichprobe"], plain: "Die Kunden oder Bestellungen, auf denen ein Ergebnis beruht. Bei wenigen kann der Zufall das Ergebnis stark verschieben; etwa 100 Conversions pro Gruppe sind ein übliches Minimum, bevor man einen Test liest." },
  },
  {
    id: "outcome-kpi",
    title: "Outcome KPI",
    match: ["outcome KPI", "outcome KPIs", "outcome", "outcomes"],
    exactCase: true,
    plain: "A KPI that is the result itself: orders, revenue, customers kept. It moves last and is what management is judged by.",
    from: "Kaplan & Norton 1992",
    de: { title: "Outcome-KPI", match: ["Outcome-KPI", "Outcome-KPIs", "Outcome", "Outcomes"], plain: "Ein KPI, der das Ergebnis selbst ist: Bestellungen, Umsatz, gehaltene Kunden. Er bewegt sich zuletzt, und das Management wird an ihm gemessen." },
  },
  {
    id: "driver-kpi",
    title: "Driver KPI",
    match: ["driver KPI", "driver KPIs", "driver", "drivers"],
    exactCase: true,
    plain: "A customer behaviour that comes before the result and that a team can move this month: weekly use, clicks on offers, a second module in use.",
    from: "Kaplan & Norton 1992",
    de: { title: "Treiber-KPI", match: ["Treiber-KPI", "Treiber-KPIs", "Treiber"], plain: "Ein Kundenverhalten, das vor dem Ergebnis kommt und das ein Team in diesem Monat bewegen kann: wöchentliche Nutzung, Klicks auf Angebote, ein zweites Modul in Gebrauch." },
  },
  {
    id: "guardrail",
    title: "Guardrail",
    match: ["guardrail", "guardrails"],
    plain: "A metric that must not get worse while you push the result, such as complaints or unsubscribes. If it is crossed, a test or rollout stops.",
    from: "Kohavi et al. 2020",
    de: { title: "Guardrail (Leitplanke)", match: ["Guardrail", "Guardrails", "Guardrail-Kennzahlen"], plain: "Eine Kennzahl, die nicht schlechter werden darf, während Sie das Ergebnis vorantreiben, etwa Beschwerden oder Abmeldungen. Wird sie überschritten, stoppt ein Test oder Rollout." },
  },
  {
    id: "vanity",
    title: "Vanity metric",
    match: ["vanity metric", "vanity metrics", "vanity"],
    plain: "A number that looks like progress but counts your own activity or reach (e-mails sent, followers, dashboards built) and decides nothing.",
    from: "Ries 2011",
    de: { title: "Vanity Metric", match: ["Vanity Metric", "Vanity Metrics", "Vanity"], plain: "Eine Zahl, die nach Fortschritt aussieht, aber die eigene Aktivität oder Reichweite zählt (versendete E-Mails, Follower, gebaute Dashboards) und nichts entscheidet." },
  },
  {
    id: "engagement",
    title: "Engagement",
    match: ["engagement"],
    plain: "How actively customers use the product, for example the share who log in at least once a week. A driver: it falls before customers leave.",
    de: { title: "Engagement", match: ["Engagement"], plain: "Wie aktiv Kunden das Produkt nutzen, etwa der Anteil, der sich mindestens einmal pro Woche anmeldet. Ein Treiber: Es fällt, bevor Kunden gehen." },
  },
  {
    id: "customer-value",
    title: "Customer value",
    match: ["customer value"],
    plain: "What a customer brings in, here revenue per customer per year. An outcome KPI.",
    de: { title: "Kundenwert", match: ["Kundenwert", "Kundenwerts"], plain: "Was ein Kunde einbringt, hier der Umsatz pro Kunde und Jahr. Ein Outcome-KPI." },
  },
  {
    id: "retention-rate",
    title: "Retention rate",
    match: ["retention rate"],
    plain: "The share of customers who stay, for example who renew their contract. The mirror of the churn rate.",
    de: { title: "Retention Rate", match: ["Retention Rate"], plain: "Der Anteil der Kunden, die bleiben, etwa ihren Vertrag verlängern. Das Spiegelbild der Churn Rate." },
  },
  {
    id: "unsubscribe",
    title: "Unsubscribe rate",
    match: ["unsubscribe rate", "unsubscribes", "unsubscribe"],
    plain: "The share of recipients who opt out of your e-mails. A guardrail for personalised and triggered e-mails: if it rises, you are writing too much or the wrong thing.",
    de: { title: "Abmelderate", match: ["Abmelderate", "Abmeldungen"], plain: "Der Anteil der Empfänger, die sich von Ihren E-Mails abmelden. Eine Guardrail für personalisierte und ausgelöste E-Mails: Steigt sie, schreiben Sie zu viel oder das Falsche." },
  },
  {
    id: "rollout",
    title: "Rollout",
    match: ["rollout", "roll out", "rolled out"],
    plain: "Giving a tested version to all customers, not just the test group.",
    de: { title: "Rollout", match: ["Rollout", "ausrollen", "ausgerollt"], plain: "Eine getestete Version allen Kunden geben, nicht nur der Testgruppe." },
  },
  {
    id: "ems",
    title: "Effect, measurability, scalability",
    match: ["Effect", "Measurability", "Scalability", "measurability", "scalability"],
    exactCase: true,
    plain: "The plan's three tests for a measure, each Low (1) to High (3), multiplied. Effect: how much it moves the result. Measurability: how its success is measured. Scalability: whether it reaches every customer without extra cost.",
    example: "Effect 3 × measurability 3 × scalability 2 = 18.",
    de: { title: "Wirkung, Messbarkeit, Skalierbarkeit", match: ["Wirkung", "Messbarkeit", "Skalierbarkeit"], plain: "Die drei Tests des Plans für eine Maßnahme, jeweils Niedrig (1) bis Hoch (3), multipliziert. Wirkung: wie stark sie das Ergebnis bewegt. Messbarkeit: wie ihr Erfolg gemessen wird. Skalierbarkeit: ob sie jeden Kunden ohne Zusatzkosten erreicht.", example: "Wirkung 3 × Messbarkeit 3 × Skalierbarkeit 2 = 18." },
  },
  {
    id: "black-box",
    title: "Black box",
    match: ["black box", "black-box"],
    plain: "A system whose results you see but whose reasons you cannot. It may be right, but nobody can check it, explain it or measure what it did.",
    de: { title: "Black Box", match: ["Black Box", "Black-Box"], plain: "Ein System, dessen Ergebnisse man sieht, dessen Gründe aber nicht. Es kann stimmen, aber niemand kann es prüfen, erklären oder messen, was es bewirkt hat." },
  },
  {
    id: "gdpr",
    title: "GDPR",
    match: ["GDPR"],
    plain: "The EU's data protection law. Personal data needs a lawful basis, customers may object to direct marketing, and decisions with significant effects on a person may not be left to a machine alone.",
    from: "GDPR 2016",
    de: { title: "DSGVO (Datenschutz-Grundverordnung)", match: ["DSGVO"], plain: "Das Datenschutzgesetz der EU. Personenbezogene Daten brauchen eine Rechtsgrundlage, Kunden können der Direktwerbung widersprechen, und Entscheidungen mit erheblicher Wirkung auf eine Person dürfen nicht allein einer Maschine überlassen werden." },
  },
  {
    id: "data-driven",
    title: "Data-driven",
    match: ["data-driven", "data-based"],
    plain: "Deciding from what the records show about customers, not only from memory or feeling. Experience still matters, for the cases the data cannot explain.",
    de: { title: "Datengetrieben", match: ["datengetrieben", "datengetriebene", "datengetriebenen", "datengetriebener", "datenbasiert", "datenbasierte", "datenbasierten"], plain: "Aus dem entscheiden, was die Daten über Kunden zeigen, nicht nur aus Gedächtnis oder Gefühl. Erfahrung zählt weiter, für die Fälle, die die Daten nicht erklären." },
  },
  {
    id: "data-quality",
    title: "Data quality, data ready",
    match: ["data quality", "data ready"],
    plain: "How far data can be trusted and used. “Data ready” here is the share of the data a technology needs that is complete and clean; a model trained on gaps learns the gaps.",
    de: { title: "Datenqualität, Daten bereit", match: ["Datenqualität", "Daten bereit"], plain: "Wie weit man Daten trauen und sie nutzen kann. „Daten bereit“ ist hier der Anteil der Daten, die eine Technologie braucht, der vollständig und sauber ist; ein Modell, das auf Lücken trainiert wird, lernt die Lücken." },
  },
  {
    id: "cdo",
    title: "CDO — Chief Digital Officer",
    match: ["CDO", "Chief Digital Officer"],
    plain: "The manager who answers for how a company uses digital technology, data and AI, and who has to show what they achieve.",
    de: { match: ["CDO", "Chief Digital Officer"], plain: "Die Führungskraft, die dafür verantwortlich ist, wie ein Unternehmen digitale Technologie, Daten und KI nutzt, und die zeigen muss, was sie erreichen." },
  },

  // --- general terms kept from the course ------------------------------------------
  {
    id: "churn",
    title: "Churn, churn rate",
    match: ["churn", "churn rate", "churn rates", "churned"],
    plain: "Churn means customers leaving. The churn rate is the share who leave in a period.",
    example: "400 customers and 32 cancellations in a year: a churn rate of 8%.",
    de: { title: "Churn, Churn Rate (Abwanderungsquote)", match: ["Churn", "Churn Rate", "Churn Rates", "Abwanderung"], plain: "Churn heißt, dass Kunden gehen. Die Churn Rate ist der Anteil, der in einem Zeitraum geht.", example: "400 Kunden und 32 Kündigungen in einem Jahr: eine Churn Rate von 8 %." },
  },
  {
    id: "crm",
    title: "CRM — customer relationship management system",
    match: ["CRM"],
    plain: "The software in which a sales team records every customer and deal: contacts, notes, orders, next steps.",
    de: { title: "CRM — Customer Relationship Management", match: ["CRM", "CRM-Daten", "CRM-Notizen"], plain: "Die Software, in der ein Vertriebsteam jeden Kunden und jeden Deal festhält: Kontakte, Notizen, Bestellungen, nächste Schritte." },
  },
  {
    id: "mittelstand",
    title: "Mittelstand (mid-sized companies)",
    match: ["Mittelstand"],
    exactCase: true,
    plain: "The German word for mid-sized, often family-owned companies, the backbone of the German economy. Many have a small IT team or none.",
    de: { title: "Mittelstand", match: ["Mittelstand", "Mittelstandsunternehmen", "Mittelständler"], plain: "Mittelgroße, oft familiengeführte Unternehmen, das Rückgrat der deutschen Wirtschaft. Viele haben ein kleines oder gar kein IT-Team." },
  },
  {
    id: "onboarding",
    title: "Onboarding",
    match: ["onboarding"],
    plain: "The first weeks of a new customer, in which they set up the product and start using it. A second module in use in this time is a good sign.",
    de: { title: "Onboarding", match: ["Onboarding"], plain: "Die ersten Wochen eines neuen Kunden, in denen er das Produkt einrichtet und zu nutzen beginnt. Ein zweites Modul in dieser Zeit ist ein gutes Zeichen." },
  },
  {
    id: "tripwire",
    title: "Tripwire",
    match: ["tripwire"],
    plain: "A result agreed in advance that makes you change course: a metric, a threshold, a date and an action.",
    example: "If the conversion rate is below 4% by month 5, one rule is adjusted.",
    de: { title: "Tripwire", match: ["Tripwire", "Tripwires"], plain: "Ein vorab vereinbartes Ergebnis, bei dem Sie den Kurs ändern: eine Kennzahl, ein Schwellenwert, ein Datum und eine Aktion.", example: "Liegt die Conversion Rate bis Monat 5 unter 4 %, wird eine Regel angepasst." },
  },
  {
    id: "staged",
    title: "Staged decision",
    match: ["staged", "stage it", "in stages"],
    plain: "Deciding the direction now, but committing money in steps, each released only when a checkpoint is met.",
    from: "Courtney et al. 1997",
    de: { title: "Gestufte Entscheidung", match: ["stufenweise", "gestufte", "in Stufen"], plain: "Die Richtung jetzt entscheiden, das Geld aber in Schritten binden, die jeweils erst freigegeben werden, wenn ein Kontrollpunkt erreicht ist." },
  },
  {
    id: "baseline",
    title: "Baseline",
    match: ["baseline", "baselines"],
    plain: "The value of a metric before you change anything. Without it you cannot tell whether a measure made a difference.",
    de: { title: "Baseline (Ausgangswert)", match: ["Baseline", "Ausgangswert", "Ausgangswerte"], plain: "Der Wert einer Kennzahl, bevor Sie etwas ändern. Ohne ihn können Sie nicht sagen, ob eine Maßnahme etwas bewirkt hat." },
  },
  {
    id: "owner",
    title: "Owner",
    match: ["owner", "owners"],
    plain: "The one person who can change a measure without asking anyone else, and who must act when its trigger fires.",
    de: { title: "Owner", match: ["Owner"], plain: "Die eine Person, die eine Maßnahme ändern kann, ohne jemanden zu fragen, und die handeln muss, wenn ihr Trigger auslöst." },
  },
  {
    id: "trigger",
    title: "Trigger",
    match: ["trigger", "triggers", "triggered"],
    plain: "Two uses. For an e-mail: the customer behaviour that sends it (adding users, 21 days without a login). For a funded item: a written rule that says when the owner must act, with a metric, a number, a date and an action.",
    de: { title: "Trigger", match: ["Trigger", "Trigger-E-Mails"], plain: "Zwei Bedeutungen. Bei einer E-Mail: das Kundenverhalten, das sie auslöst (Nutzer hinzufügen, 21 Tage ohne Login). Bei einem finanzierten Punkt: eine schriftliche Regel, die sagt, wann der Owner handeln muss, mit Kennzahl, Zahl, Datum und Aktion." },
  },
  {
    id: "pickup",
    title: "Pickup point",
    match: ["pickup point"],
    plain: "The number and the date at which you look again at something you postponed. It turns “later” into a decision.",
    de: { title: "Pickup Point", match: ["Pickup Point"], plain: "Die Zahl und das Datum, zu dem Sie etwas Zurückgestelltes wieder ansehen. So wird aus „später“ eine Entscheidung." },
  },
  {
    id: "premortem",
    title: "Premortem",
    match: ["premortem"],
    plain: "Before a plan starts, imagine it has failed and write down why. It brings hidden assumptions into the open.",
    from: "Klein 2007",
    de: { title: "Premortem", match: ["Premortem"], plain: "Bevor ein Plan startet, stellt man sich vor, er sei gescheitert, und schreibt auf, warum. So kommen versteckte Annahmen ans Licht." },
  },
  {
    id: "no-regret",
    title: "No-regret move",
    match: ["no-regret", "no-regret move", "no-regret items"],
    plain: "A step that is right whatever the uncertain facts turn out to be. You can take it now, while you wait for the rest of the evidence.",
    example: "A KPI system helps whichever technology proves strongest later.",
    from: "Courtney et al. 1997",
    de: { title: "No-regret-Schritt", match: ["No-regret", "No-regret-Punkte", "No-regret-Schritt"], plain: "Ein Schritt, der richtig ist, egal wie die unsicheren Fakten ausfallen. Sie können ihn jetzt gehen, während Sie auf den Rest der Evidenz warten.", example: "Ein KPI-System hilft jeder Technologie, die sich später als stärkste erweist." },
  },
  {
    id: "cost-of-waiting",
    title: "Cost of waiting",
    match: ["cost of waiting", "costs of waiting"],
    plain: "What it costs to leave something out for now: the item's price divided by what one customer kept is worth in a year, rounded up, is the number of customers who must leave before waiting has cost as much as the item.",
    example: "An app costs €36,000 and a customer kept is worth €12,000 a year: 36,000 ÷ 12,000 = 3 customers.",
    de: { title: "Kosten des Wartens", match: ["Kosten des Wartens", "Kosten des Wartens"], plain: "Was es kostet, etwas vorerst wegzulassen: der Preis des Punkts geteilt durch das, was ein gehaltener Kunde im Jahr wert ist, aufgerundet, ist die Zahl der Kunden, die gehen müssen, bevor das Warten so viel gekostet hat wie der Punkt.", example: "Eine App kostet 36.000 € und ein gehaltener Kunde ist 12.000 € im Jahr wert: 36.000 ÷ 12.000 = 3 Kunden." },
  },
  {
    id: "halfway",
    title: "Halfway between today and the aim",
    match: ["halfway", "halfway mark", "halfway between today and the aim"],
    plain: "A number found by taking today's figure and adding half the gap to the aim (or to the limit still accepted). It is the least that shows a real change, so it is a sensible line for a trigger or a tripwire.",
    example: "Today 70%, aim 80%: 70 + (80 − 70) ÷ 2 = 75%.",
    de: { title: "Hälfte des Weges zwischen heute und Ziel", match: ["Hälfte des Weges", "Hälfte des Weges zwischen heute und Ziel"], plain: "Eine Zahl, die man findet, indem man zum heutigen Wert die Hälfte des Abstands zum Ziel (oder zur noch akzeptierten Grenze) addiert. Sie ist das Mindeste, das eine echte Veränderung zeigt, also eine sinnvolle Linie für einen Trigger oder Tripwire.", example: "Heute 70 %, Ziel 80 %: 70 + (80 − 70) ÷ 2 = 75 %." },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    match: ["dashboard", "dashboards"],
    plain: "One screen that shows the few numbers a team steers by, updated by the systems, so nobody has to ask for a report.",
    example: "A sales dashboard shows the conversion rate, the open offers and the complaints on one page.",
    de: { title: "Dashboard", match: ["Dashboard", "Dashboards"], plain: "Ein Bildschirm, der die wenigen Zahlen zeigt, nach denen ein Team steuert, von den Systemen aktualisiert, sodass niemand einen Bericht anfordern muss.", example: "Ein Vertriebs-Dashboard zeigt Conversion Rate, offene Angebote und Beschwerden auf einer Seite." },
  },
  {
    id: "renewal",
    title: "Renewal",
    match: ["renewal", "renewals", "renew", "renews"],
    plain: "When a customer extends the contract for another period instead of ending it. The renewal rate is the share of contracts that are extended.",
    example: "Of 100 contracts that end this year, 80 are extended: the renewal rate is 80%.",
    de: { title: "Renewal (Vertragsverlängerung)", match: ["Renewal", "Renewals", "Verlängerung", "Verlängerungen", "verlängern", "verlängert"], plain: "Wenn ein Kunde den Vertrag für einen weiteren Zeitraum verlängert, statt ihn zu beenden. Die Verlängerungsquote ist der Anteil der Verträge, die verlängert werden.", example: "Von 100 Verträgen, die dieses Jahr enden, werden 80 verlängert: Die Verlängerungsquote ist 80 %." },
  },
  {
    id: "architecture",
    title: "Architecture (of a system)",
    match: ["architecture", "implementation architecture", "architectures"],
    plain: "Not a list of tools but how they fit together: what is built first, what depends on what, who can see what. A good one is built in order, so every tool above can be trusted because the base below it is there.",
    example: "A KPI system first, then a test routine, then a recommendation engine on data that is ready.",
    de: { title: "Architektur (eines Systems)", match: ["Architektur", "Umsetzungsarchitektur", "Architekturen"], plain: "Keine Liste von Werkzeugen, sondern wie sie zusammenpassen: was zuerst gebaut wird, was wovon abhängt, wer was sehen kann. Eine gute wird der Reihe nach gebaut, sodass man jedem Werkzeug oben trauen kann, weil die Basis darunter steht.", example: "Zuerst ein KPI-System, dann eine Test-Routine, dann eine Recommendation Engine auf bereiten Daten." },
  },
  {
    id: "engine",
    title: "Engine",
    match: ["engine", "engines"],
    plain: "A tool that does something to customers: it picks the offer, sends the e-mail or sets the price. The recommendation engine, the triggered e-mails and dynamic pricing are engines. Because they act on customers, each one needs a base that measures what it did.",
    de: { title: "Engine", match: ["Engine", "Engines"], plain: "Ein Werkzeug, das etwas mit Kunden tut: Es wählt das Angebot, verschickt die E-Mail oder setzt den Preis. Die Recommendation Engine, die Trigger-E-Mails und Dynamic Pricing sind Engines. Weil sie auf Kunden wirken, braucht jede eine Basis, die misst, was sie bewirkt hat." },
  },
  {
    id: "kpi-system",
    title: "KPI system",
    match: ["KPI system", "KPI-System", "KPI system and data foundation", "data foundation"],
    plain: "The base of the architecture: a few KPIs, each defined once and counted the same way from joined data, so the board, marketing and sales read the same numbers. Everything else is measured by it, so it starts first.",
    example: "One page that shows conversion rate, weekly active customers and customer value for every team.",
    de: { title: "KPI-System", match: ["KPI-System", "KPI-System und Datenbasis", "Datenbasis"], plain: "Die Basis der Architektur: wenige KPIs, jeder einmal definiert und gleich aus verbundenen Daten gezählt, sodass Vorstand, Marketing und Vertrieb dieselben Zahlen lesen. Alles andere wird daran gemessen, also startet es zuerst.", example: "Eine Seite, die Conversion Rate, wöchentlich aktive Kunden und Kundenwert für jedes Team zeigt." },
  },
  {
    id: "ab-routine",
    title: "A/B routine",
    match: ["A/B routine", "test routine", "A/B testing routine"],
    plain: "A habit, not a one-off test: every new measure runs against a control group first, and its uplift and guardrails show on one page. It lets you say whether a tool worked before you spend more on it.",
    de: { title: "A/B-Routine", match: ["A/B-Routine", "Test-Routine"], plain: "Eine Gewohnheit, kein einmaliger Test: Jede neue Maßnahme läuft zuerst gegen eine Kontrollgruppe, und ihr Uplift und ihre Guardrails stehen auf einer Seite. So können Sie sagen, ob ein Werkzeug gewirkt hat, bevor Sie mehr dafür ausgeben." },
  },
  {
    id: "data-cleanup",
    title: "Data clean-up",
    match: ["data clean-up", "clean-up", "data foundation clean-up"],
    plain: "Filling the gaps and fixing the errors in the data a tool would learn from. A tool that learns from gaps learns the gaps, so the clean-up comes before it.",
    example: "Every price row complete and current before dynamic pricing reads it.",
    de: { title: "Datenbereinigung", match: ["Datenbereinigung", "Bereinigung"], plain: "Die Lücken füllen und die Fehler in den Daten beheben, aus denen ein Werkzeug lernen würde. Ein Werkzeug, das aus Lücken lernt, lernt die Lücken, also kommt die Bereinigung davor.", example: "Jede Preiszeile vollständig und aktuell, bevor Dynamic Pricing sie liest." },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
