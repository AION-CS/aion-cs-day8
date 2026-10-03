"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { AutomationGrid, FairTest, KpiTree, PilotExample, RecoBasket, ScoreExample, ToolOrProblem } from "@/components/materi/diagramsA";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EXPLAIN_RULE } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all. */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("AI adds value in customer retention when it answers a problem you can name and measure. Bought first and aimed later, it becomes technology without strategy: it produces activity, not results.", "KI bringt in der Kundenbindung Mehrwert, wenn sie ein Problem beantwortet, das man benennen und messen kann. Zuerst gekauft und später ausgerichtet, wird sie zu Technologie ohne Strategie: Sie erzeugt Aktivität, keine Ergebnisse.")}
      reasoning={[
        tt("Start from the problem, then the KPI, then the technology. If you cannot name the KPI an AI idea should move, it is not ready to fund.", "Beginnen Sie mit dem Problem, dann dem KPI, dann der Technologie. Können Sie den KPI nicht nennen, den eine KI-Idee bewegen soll, ist sie nicht reif für Geld."),
        tt("AI adds real value where there are many similar decisions, enough data about them, and a result that can be measured: which offer to show, when to write, which request is routine.", "KI bringt echten Mehrwert, wo es viele ähnliche Entscheidungen, genug Daten darüber und ein messbares Ergebnis gibt: welches Angebot gezeigt wird, wann geschrieben wird, welche Anfrage Routine ist."),
        tt("AI adds little where decisions are rare, each one is different, or trust and responsibility matter most: a key account that wants to leave, a complaint after a loss.", "KI bringt wenig, wo Entscheidungen selten sind, jede anders ist, oder Vertrauen und Verantwortung am meisten zählen: ein Key Account, der gehen will, eine Beschwerde nach einem Schaden."),
        tt("Automation is not the same as customer experience. A faster answer helps only if it is the right answer; a machine where the customer expects a person makes the experience worse.", "Automatisierung ist nicht dasselbe wie Kundenerlebnis. Eine schnellere Antwort hilft nur, wenn sie die richtige ist; eine Maschine, wo der Kunde einen Menschen erwartet, verschlechtert das Erlebnis."),
        tt("A data-driven decision-maker tests an AI idea small, against a control group, before scaling it, and reads the KPI, not the activity report.", "Eine datengetriebene Entscheiderin testet eine KI-Idee klein, gegen eine Kontrollgruppe, bevor sie sie ausweitet, und liest den KPI, nicht den Aktivitätsbericht."),
        tt("A suite whose success only its vendor reports, or any tool bought before the problem and the KPI are named, is technology without strategy: leave it out, or run it small against a control group first.", "Eine Suite, deren Erfolg nur der Anbieter berichtet, oder jedes Werkzeug, das gekauft wird, bevor Problem und KPI benannt sind, ist Technologie ohne Strategie: Lassen Sie es weg, oder fahren Sie es zuerst klein gegen eine Kontrollgruppe."),
      ]}
      sources={["davenport2020", "davenport2018"]}
    >
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and colleagues (2020) show that AI in marketing and sales pays off in narrow, well-defined tasks first: predicting which offer fits, personalising a message, answering a routine request. Davenport and Ronanki (2018) found that firms which started with small projects tied to a business problem got further than those which started with the most ambitious technology.",
            "Davenport und Kollegen (2020) zeigen, dass KI in Marketing und Vertrieb sich zuerst bei engen, klar umrissenen Aufgaben auszahlt: vorhersagen, welches Angebot passt, eine Nachricht personalisieren, eine Routineanfrage beantworten. Davenport und Ronanki (2018) fanden, dass Firmen, die mit kleinen Projekten an einem Geschäftsproblem anfingen, weiter kamen als jene, die mit der ehrgeizigsten Technologie anfingen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Tool first or problem first · a worked example on Mosel Software", "Werkzeug zuerst oder Problem zuerst · ein Beispiel mit Mosel Software")} caption={tt("Switch between the two starting points and compare what Mosel can say after six months.", "Wechseln Sie zwischen den beiden Ausgangspunkten und vergleichen Sie, was Mosel nach sechs Monaten sagen kann.")}>
        <ToolOrProblem />
      </Diagram>
      <ShowMore id="A1" part="extra" label={tt("Show: What AI does not change", "Zeigen: Was KI nicht ändert")}>
        <Callout label={tt("What AI does not change", "Was KI nicht ändert")} tone="rust">
          <p>{tt("The GDPR still applies: personal data needs a lawful basis (Art. 6), customers may object to direct marketing (Art. 21), and decisions with significant effects on a person may not be left to automation alone (Art. 22).", "Die DSGVO gilt weiter: Personenbezogene Daten brauchen eine Rechtsgrundlage (Art. 6), Kunden können der Direktwerbung widersprechen (Art. 21), und Entscheidungen mit erheblicher Wirkung auf eine Person dürfen nicht allein der Automatisierung überlassen werden (Art. 22).")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A recommendation system suggests which product to offer, from what similar customers bought or used. Individualised communication changes what you say, when and on which channel, from what this customer did. Both personalise; they personalise different things.", "Ein Recommendation System schlägt vor, welches Produkt angeboten wird, aus dem, was ähnliche Kunden kauften oder nutzten. Individualisierte Kommunikation ändert, was Sie sagen, wann und über welchen Kanal, aus dem, was dieser Kunde tat. Beide personalisieren; sie personalisieren verschiedene Dinge.")}
      reasoning={[
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("A personalisation opportunity names a group of customers, what the data shows about them, and what is tailored for them: the product, the message, the timing or the channel.", "Eine Chance zur Personalisierung nennt eine Gruppe von Kunden, was die Daten über sie zeigen, und was für sie zugeschnitten wird: das Produkt, die Nachricht, der Zeitpunkt oder der Kanal."),
      ]}
      sources={["linden2003", "peppers1993"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Linden, Smith and York (2003) described how “customers who bought this also bought” works: for each product, count how many customers bought it together with every other product, and show the most frequent partner. Peppers and Rogers (1993) had argued earlier that a firm should treat different customers differently, from what each one does. Recommendations decide the what; individualised communication decides the how and the when.",
            "Linden, Smith und York (2003) beschrieben, wie „Kunden, die das kauften, kauften auch“ funktioniert: Für jedes Produkt wird gezählt, wie viele Kunden es zusammen mit jedem anderen Produkt kauften, und der häufigste Partner wird gezeigt. Peppers und Rogers (1993) hatten schon früher gefordert, dass ein Unternehmen verschiedene Kunden verschieden behandelt, aus dem, was jeder tut. Empfehlungen entscheiden das Was; individualisierte Kommunikation entscheidet das Wie und das Wann.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("“Customers also bought” · a worked example on Mosel Software", "„Kunden kauften auch“ · ein Beispiel mit Mosel Software")} caption={tt("Choose the product a customer is looking at, read which product the system would suggest, then try the worked sort below it.", "Wählen Sie das Produkt, das ein Kunde ansieht, lesen Sie, welches Produkt das System vorschlagen würde, und probieren Sie dann die Beispielsortierung darunter.")}>
        <RecoBasket />
      </Diagram>
      <ShowMore id="A2" part="table" label={tt("Show the table: three things personalisation can change", "Tabelle zeigen: Drei Dinge, die Personalisierung ändern kann")}>
        <DataTable
          head={[tt("What is personalised", "Was personalisiert wird"), tt("Kind", "Art"), tt("Example at Mosel", "Beispiel bei Mosel")]}
          rows={[
            [tt("The product suggested", "Das vorgeschlagene Produkt"), tt("Recommendation system", "Recommendation System"), tt("Training shown to Security buyers", "Schulung für Security-Käufer")],
            [tt("The content of the message", "Der Inhalt der Nachricht"), tt("Individualised communication", "Individualisierte Kommunikation"), tt("Release notes for admins, invoices for finance", "Release Notes für Admins, Rechnungen für Finanzen")],
            [tt("The moment of contact", "Der Moment des Kontakts"), tt("Individualised communication", "Individualisierte Kommunikation"), tt("Renewal e-mail in the customer's budget month", "Verlängerungs-E-Mail im Budgetmonat des Kunden")],
          ]}
          caption={tt("Three things personalisation can change", "Drei Dinge, die Personalisierung ändern kann")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Automation lets a system do a step by itself: a chatbot answers, dynamic pricing sets a price, an adaptive system rearranges an offer. Automate fully only what is routine, low-stakes and frequent; let automation assist a person in between; keep a person where a contract or an upset customer is at stake.", "Automatisierung lässt ein System einen Schritt selbst erledigen: Ein Chatbot antwortet, Dynamic Pricing setzt einen Preis, ein adaptives System ordnet ein Angebot neu. Voll automatisieren Sie nur, was Routine, geringen Einsatz und hohe Häufigkeit hat; dazwischen unterstützt die Automatisierung einen Menschen; ein Mensch bleibt, wo ein Vertrag oder ein verärgerter Kunde auf dem Spiel steht.")}
      reasoning={[
        tt("Automate fully when all three hold: the answer is the same every time, little is at stake, and the request comes 100 times a month or more.", "Voll automatisieren, wenn alle drei gelten: Die Antwort ist jedes Mal dieselbe, wenig steht auf dem Spiel, und die Anfrage kommt 100-mal im Monat oder öfter."),
        tt("Keep a person when a contract is at stake or the customer is upset, whatever the volume. A machine there confirms the customer's doubt.", "Einen Menschen behalten, wenn ein Vertrag auf dem Spiel steht oder der Kunde verärgert ist, egal wie häufig. Eine Maschine bestätigt dort den Zweifel des Kunden."),
        tt("Everything between is assist: the system prepares (finds the invoice, proposes a price within a band, answers the known part), a person decides or confirms.", "Alles dazwischen ist Unterstützen: Das System bereitet vor (findet die Rechnung, schlägt einen Preis in einer Spanne vor, beantwortet den bekannten Teil), ein Mensch entscheidet oder bestätigt."),
        tt("A price is a commitment, even when the request is routine: dynamic pricing may propose it inside limits sales has set, not decide it freely.", "Ein Preis ist eine Zusage, auch wenn die Anfrage Routine ist: Dynamic Pricing darf ihn innerhalb von Grenzen vorschlagen, die der Vertrieb gesetzt hat, nicht frei entscheiden."),
        tt("A chatbot always needs a hand-over to a person for what it cannot answer; a bot with no way out is automation against the customer.", "Ein Chatbot braucht immer eine Übergabe an einen Menschen für das, was er nicht beantworten kann; ein Bot ohne Ausweg ist Automatisierung gegen den Kunden."),
        tt("Advantages for customers: faster answers at any hour, offers that fit, contact at the right moment. Risks: wrong or pushy suggestions, feeling watched, feeling stuck with a machine, prices that seem unfair.", "Vorteile für Kunden: schnellere Antworten zu jeder Uhrzeit, passende Angebote, Kontakt im richtigen Moment. Risiken: falsche oder aufdringliche Vorschläge, das Gefühl, beobachtet zu werden, bei einer Maschine festzustecken, Preise, die unfair wirken."),
      ]}
      sources={["huang2021", "adam2021", "denboer2015"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Huang and Rust (2021) describe a division of work in service: machines take the mechanical, repeatable tasks, people keep the tasks that need feeling and judgement. Adam, Wessel and Benlian (2021) show that chatbots handle first contact well when they are designed for it and know their limits. den Boer (2015) reviews dynamic pricing: prices set by rules that learn from demand, which works best where prices are expected to move and least where customers compare invoices.",
            "Huang und Rust (2021) beschreiben eine Arbeitsteilung im Service: Maschinen übernehmen die mechanischen, wiederholbaren Aufgaben, Menschen behalten die, die Gefühl und Urteil brauchen. Adam, Wessel und Benlian (2021) zeigen, dass Chatbots den Erstkontakt gut bewältigen, wenn sie dafür gestaltet sind und ihre Grenzen kennen. den Boer (2015) gibt einen Überblick über Dynamic Pricing: Preise, die von Regeln gesetzt werden, die aus der Nachfrage lernen; das funktioniert am besten, wo Preisschwankungen erwartet werden, und am wenigsten, wo Kunden Rechnungen vergleichen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Automate, assist or keep a person · a worked example on Mosel Software", "Automatisieren, unterstützen oder Mensch behalten · ein Beispiel mit Mosel Software")} caption={tt("Choose a situation on the grid or in the list and read where it falls and why.", "Wählen Sie eine Situation im Raster oder in der Liste und lesen Sie, wo sie liegt und warum.")}>
        <AutomationGrid />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: three forms of automation in sales", "Tabelle zeigen: Drei Formen der Automatisierung im Vertrieb")}>
        <DataTable
          head={[tt("Form of automation", "Form der Automatisierung"), tt("What the system does by itself", "Was das System selbst tut"), tt("Where it fits", "Wo es passt")]}
          rows={[
            [tt("Chatbot", "Chatbot"), tt("Answers first contact and support questions", "Beantwortet Erstkontakt- und Supportfragen"), tt("Routine questions, with a hand-over to a person", "Routinefragen, mit Übergabe an einen Menschen")],
            [tt("Dynamic pricing", "Dynamic Pricing"), tt("Sets a price from behaviour and demand", "Setzt einen Preis aus Verhalten und Nachfrage"), tt("Within a band sales has set, where changing prices are accepted", "In einer Spanne, die der Vertrieb setzt, wo wechselnde Preise akzeptiert sind")],
            [tt("Adaptive system", "Adaptives System"), tt("Rearranges an offer or a page by itself, all the time", "Ordnet ein Angebot oder eine Seite fortlaufend selbst neu"), tt("Where many small changes help and none is a commitment", "Wo viele kleine Änderungen helfen und keine eine Zusage ist")],
          ]}
          caption={tt("Three forms of automation in sales", "Drei Formen der Automatisierung im Vertrieb")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("A pilot compares a new offer with the standard one on two groups. Three figures read it: the conversion rate of each group, the uplift (how many times the standard rate), and the extra revenue a year if everyone got the new offer.", "Ein Pilot vergleicht ein neues Angebot mit dem Standard in zwei Gruppen. Drei Werte lesen ihn: die Conversion Rate jeder Gruppe, der Uplift (wie viel Mal die Standardrate) und der zusätzliche Umsatz pro Jahr, wenn alle das neue Angebot bekämen.")}
      reasoning={[
        tt("Conversion rate = orders ÷ e-mails delivered × 100. Take both numbers from the same group's rows.", "Conversion Rate = Bestellungen ÷ zugestellte E-Mails × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Uplift = conversion rate of the new offer ÷ conversion rate of the standard offer. Work out the standard rate from its own rows first. An uplift of 1.5 means “1.5 times as often”, or 50% more.", "Uplift = Conversion Rate des neuen Angebots ÷ Conversion Rate des Standardangebots. Berechnen Sie die Standardrate zuerst aus ihren eigenen Zeilen. Ein Uplift von 1,5 heißt „1,5-mal so oft“, oder 50 % mehr."),
        tt("Extra revenue a year = offer e-mails a year × (new rate − standard rate, as a share of one) × average order value. Only the difference counts: the standard offer would have sold its share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = Angebots-E-Mails pro Jahr × (neue Rate − Standardrate, als Anteil von eins) × durchschnittlicher Bestellwert. Nur der Unterschied zählt: Das Standardangebot hätte seinen Anteil ohnehin verkauft. Ein Punkt ist 0,01."),
        tt("Use the e-mails of a whole year for the extra revenue, not the size of one pilot group.", "Nehmen Sie für den zusätzlichen Umsatz die E-Mails eines ganzen Jahres, nicht die Größe einer Pilotgruppe."),
        tt("A pilot is an estimate. With fewer than about 100 orders per group, say it as “promising” and plan a second run before a rollout (Materi A6).", "Ein Pilot ist eine Schätzung. Bei weniger als etwa 100 Bestellungen pro Gruppe sagen Sie „vielversprechend“ und planen einen zweiten Durchlauf vor dem Rollout (Materi A6)."),
        tt("A sentence about a pilot quotes at least one of its figures, says what to do next, and how sure it can be.", "Ein Satz über einen Pilot nennt mindestens einen seiner Werte, sagt, was als Nächstes zu tun ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "kohavi2020"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any result: compare the group that got something with the group that did not, and put a value on the difference. Kohavi, Tang and Xu (2020) describe the same logic for online tests. The worked example uses Mosel Software's pilot; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jedes Ergebnis zu lesen: die Gruppe, die etwas bekam, mit der Gruppe vergleichen, die es nicht bekam, und dem Unterschied einen Wert geben. Kohavi, Tang und Xu (2020) beschreiben dieselbe Logik für Online-Tests. Das Beispiel nutzt den Pilot von Mosel Software; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Reading a pilot · worked example on Mosel Software (Case assumption)", "Einen Pilot lesen · Beispiel mit Mosel Software (Fallannahme)")} caption={tt("Move the slider to change how many offer e-mails Mosel sends in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele Angebots-E-Mails Mosel pro Jahr verschickt.")}>
        <PilotExample />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Mosel Software", "Rechnung · Mosel Software"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Conversion rate, personalised offer", "1 · Conversion Rate, personalisiertes Angebot"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Conversion rate, standard offer", "2 · Conversion Rate, Standardangebot"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Uplift", "3 · Uplift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Not every number is a KPI. An outcome KPI is the result (orders, revenue, customers kept); a driver KPI is a customer behaviour that comes before it; a guardrail must not get worse; a vanity metric counts your own activity and decides nothing.", "Nicht jede Zahl ist ein KPI. Ein Outcome-KPI ist das Ergebnis (Bestellungen, Umsatz, gehaltene Kunden); ein Treiber-KPI ist ein Kundenverhalten, das davor kommt; eine Guardrail darf nicht schlechter werden; eine Vanity Metric zählt die eigene Aktivität und entscheidet nichts.")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a metric measures, not how it behaved last year: a driver that did not move with value is still a driver.", "Ordnen Sie zu, was eine Kennzahl misst, nicht wie sie sich letztes Jahr verhielt: Ein Treiber, der sich nicht mit dem Wert bewegte, ist trotzdem ein Treiber."),
        RISK_RULE.v,
        tt("How to use each kind: outcome → the target on the management dashboard; driver → the team that can move it, reviewed weekly; guardrail → a limit that stops a test or a rollout; vanity → stop reporting it as success. A bonus on a number rewards reporting it, not moving it.", "Wie man jede Art nutzt: Outcome → das Ziel im Management-Dashboard; Treiber → das Team, das ihn bewegen kann, wöchentlich geprüft; Guardrail → eine Grenze, die einen Test oder Rollout stoppt; Vanity → nicht mehr als Erfolg berichten. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("A good set of three KPIs has at least one outcome and one driver, each with where the number comes from, what you would aim for and why it is a KPI; a guardrail is a strong third.", "Ein gutes Set aus drei KPIs hat mindestens ein Outcome und einen Treiber, jeder mit Quelle der Zahl, dem, was Sie anstreben würden, und warum er ein KPI ist; eine Guardrail ist ein starker dritter."),
        tt("More KPIs do not measure better: a few linked ones are easier to steer by than many unrelated ones.", "Mehr KPIs messen nicht besser: Wenige verbundene lassen sich leichter steuern als viele unverbundene."),
      ]}
      sources={["kaplan1992", "ries2011"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) called the numbers that go up whatever you do “vanity metrics”, and asked for “actionable” ones that tell you what to do next. A KPI tree puts both ideas on one page.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nannte die Zahlen, die steigen, egal was man tut, „Vanity Metrics“, und verlangte „handlungsleitende“, die sagen, was als Nächstes zu tun ist. Ein KPI-Baum bringt beide Ideen auf eine Seite.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A KPI tree · a worked example on Mosel Software", "Ein KPI-Baum · ein Beispiel mit Mosel Software")} caption={tt("Choose a metric to read its kind, then show whether each moved with customer value last year.", "Wählen Sie eine Kennzahl, um ihre Art zu lesen, und zeigen Sie dann, ob sich jede letztes Jahr mit dem Kundenwert bewegte.")}>
        <KpiTree />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four kinds of metric", "Tabelle zeigen: Die vier Arten von Kennzahlen")}>
        <DataTable
          head={[tt("Kind", "Art"), tt("What it is", "Was es ist"), tt("Where it sits", "Wo es steht")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four kinds of metric", "Die vier Arten von Kennzahlen")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("An A/B test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed before the start. Even then, a small test tells you less than it seems: say what it cannot tell you.", "Ein A/B-Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vor dem Start feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint: Sagen Sie, was er nicht sagen kann.")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last month, or with customers who did not open the e-mail, lets something other than the offer explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem Vormonat oder mit Kunden, die die E-Mail nicht öffneten, lässt etwas anderes als das Angebot den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for low conversion: orders ÷ e-mails), not opens and not e-mails sent.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei niedriger Conversion: Bestellungen ÷ E-Mails), nicht Öffnungen und nicht versendete E-Mails."),
        tt("Fix the size before you start: about 100 conversions per group and at least two full weeks. Stopping as soon as the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 Conversions pro Gruppe und mindestens zwei volle Wochen. Sobald die Variante vorn liegt zu stoppen, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("Real uncertainties of a result: a small sample, something else that changed in the same weeks, orders that are not recorded (by phone), and a test group that is not like all customers. “A KPI cannot be read wrongly”, “higher conversion means a better experience” and “more KPIs measure better” are mistakes, not uncertainties.", "Echte Unsicherheiten eines Ergebnisses: eine kleine Stichprobe, etwas anderes, das sich in denselben Wochen änderte, Bestellungen, die nicht erfasst werden (per Telefon), und eine Testgruppe, die nicht wie alle Kunden ist. „Ein KPI kann nicht falsch gelesen werden“, „höhere Conversion heißt besseres Erlebnis“ und „mehr KPIs messen besser“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "ries2011"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics that must not get worse, and no peeking at the result to stop early. Ries (2011) made the same point for young companies: learn from experiments, not from activity.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen, die nicht schlechter werden dürfen, und kein vorzeitiges Hinschauen, um früh zu stoppen. Ries (2011) machte denselben Punkt für junge Unternehmen: aus Experimenten lernen, nicht aus Aktivität.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test, and how sure it is · a worked example on Mosel Software", "Ein fairer Test, und wie sicher er ist · ein Beispiel mit Mosel Software")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many conversions each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele Conversions jede Gruppe hat.")}>
        <FairTest />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: the test card, part by part", "Tabelle zeigen: Die Testkarte, Teil für Teil")}>
        <DataTable
          head={[tt("Part of the test card", "Teil der Testkarte"), tt("Fair", "Fair"), tt("What goes wrong otherwise", "Was sonst schiefgeht")]}
          rows={[
            [tt("What changes", "Was sich ändert"), tt("One thing only", "Nur eine Sache"), tt("A win cannot be put down to anything", "Ein Gewinn lässt sich nichts zuschreiben")],
            [tt("Control group", "Kontrollgruppe"), tt("Random half, same weeks", "Zufällige Hälfte, dieselben Wochen"), tt("Another month or self-chosen customers explain the difference", "Ein anderer Monat oder selbst gewählte Kunden erklären den Unterschied")],
            [tt("Success KPI", "Erfolgs-KPI"), tt("The result: orders ÷ e-mails", "Das Ergebnis: Bestellungen ÷ E-Mails"), tt("Opens rise and orders do not", "Öffnungen steigen, Bestellungen nicht")],
            [tt("Size and duration", "Größe und Dauer"), tt("Fixed: about 100 conversions per group, two full weeks", "Fest: etwa 100 Conversions pro Gruppe, zwei volle Wochen"), tt("A lucky early lead is taken for a result", "Ein glücklicher früher Vorsprung wird für ein Ergebnis gehalten")],
          ]}
          caption={tt("The test card, part by part", "Die Testkarte, Teil für Teil")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: effect (how much it moves the result), measurability (how its success is measured) and scalability (does it reach every customer without extra cost). Then check the budget and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Wirkung (wie stark sie das Ergebnis bewegt), Messbarkeit (wie ihr Erfolg gemessen wird) und Skalierbarkeit (erreicht sie jeden Kunden ohne Zusatzkosten). Prüfen Sie dann das Budget und welche Probleme Sie beantworten.")}
      reasoning={[
        EXPLAIN_RULE.v,
        tt("Effect: 3 if it moves the result the problem is about (orders, customers kept), 2 if it helps but moves the result less or indirectly, 1 if it saves cost or time but moves no result of the brief.", "Wirkung: 3, wenn sie das Ergebnis bewegt, um das es beim Problem geht (Bestellungen, gehaltene Kunden), 2, wenn sie hilft, das Ergebnis aber weniger oder indirekt bewegt, 1, wenn sie Kosten oder Zeit spart, aber kein Ergebnis des Auftrags bewegt."),
        tt("Scalability: 3 if, once built, it serves every customer at little extra cost; 2 if it grows with cost or needs a lot of set-up time; 1 if it depends on people's time per customer.", "Skalierbarkeit: 3, wenn sie, einmal gebaut, jedem Kunden mit wenig Zusatzkosten dient; 2, wenn sie mit den Kosten wächst oder viel Vorlaufzeit braucht; 1, wenn sie pro Kunde Personenzeit braucht."),
        tt("Match each measure to the problems it really answers from what it does: changing the message per customer answers impersonal communication; changing what customers buy answers low conversion; measuring other measures answers “not measurable”. A discount or a chatbot answers none of these by itself.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet, aus dem, was sie tut: Die Nachricht pro Kunde zu ändern, beantwortet unpersönliche Kommunikation; zu ändern, was Kunden kaufen, beantwortet niedrige Conversion; andere Maßnahmen zu messen, beantwortet „nicht messbar“. Ein Rabatt oder ein Chatbot beantwortet für sich keines davon."),
        tt("The label after the weeks says which kind of thing a measure is: recommendation, individualised communication, automation, measurement, or a price. The brief's three problems call for personalising what a customer sees or hears, for automation that works for every customer, and for measurement; a price cut is none of the kinds taught in Materi A2, A3 and A5.", "Das Etikett hinter den Wochen sagt, was für eine Art Ding eine Maßnahme ist: Empfehlung, individualisierte Kommunikation, Automatisierung, Messung oder ein Preis. Die drei Probleme des Auftrags verlangen, dass sich anpasst, was ein Kunde sieht oder hört, Automatisierung, die für jeden Kunden arbeitet, und Messung; eine Preissenkung ist keine der Arten aus Materi A2, A3 und A5."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for effect, what the customer sees or does differently; for scalability, whether it reaches every customer without more people, and the weeks it needs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Wirkung, was der Kunde anders sieht oder tut; bei der Skalierbarkeit, ob es jeden Kunden ohne mehr Personal erreicht, und die Wochen, die es braucht."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score; if you put a lower score first, say why (it makes the others measurable, or it needs the longest set-up).", "Ordnen Sie nach Wert; setzen Sie einen niedrigeren Wert nach vorn, sagen Sie warum (sie macht die anderen messbar, oder sie braucht die längste Vorlaufzeit)."),
      ]}
      sources={["hubbard2014", "davenport2018"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Hubbard (2014) advises measuring what would change a decision; a measure whose success nobody can measure cannot be improved or defended. Davenport and Ronanki (2018) add that the AI projects that scale are the ones built once and used across many customers. The plan names the evaluation for this day: effect × measurability × scalability.",
            "Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde; eine Maßnahme, deren Erfolg niemand messen kann, lässt sich weder verbessern noch verteidigen. Davenport und Ronanki (2018) ergänzen, dass die KI-Projekte skalieren, die einmal gebaut und über viele Kunden genutzt werden. Der Plan nennt die Bewertung für diesen Tag: Wirkung × Messbarkeit × Skalierbarkeit.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Mosel Software, scored", "Drei Maßnahmen von Mosel Software, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreExample />
      </Diagram>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Measurability is read from the “measured by” line, never guessed.", "Die Messbarkeit wird aus der Zeile „gemessen durch“ gelesen, nie geschätzt."),
            tt("A cheap, personal measure can still score low when nobody can measure it and it reaches only a few customers.", "Eine günstige, persönliche Maßnahme kann trotzdem niedrig punkten, wenn niemand sie messen kann und sie nur wenige Kunden erreicht."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
