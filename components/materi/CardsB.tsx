"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all. */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("An AI-based retention system is not a collection of tools. It is a few KPIs everyone steers by, technology that must prove it moves them before it is scaled, owners who can move each number, and a regular loop that compares results with forecasts.", "Ein KI-gestütztes Bindungssystem ist keine Sammlung von Werkzeugen. Es sind wenige KPIs, nach denen alle steuern, Technologie, die belegen muss, dass sie diese bewegt, bevor sie skaliert wird, Owner, die jede Zahl bewegen können, und eine regelmäßige Schleife, die Ergebnisse mit Prognosen vergleicht.")}
      reasoning={[
        tt("One KPI system comes first: if every tool reports its own success, nobody can steer. The same few KPIs, defined the same way, from the board to each team.", "Ein KPI-System kommt zuerst: Berichtet jedes Werkzeug seinen eigenen Erfolg, kann niemand steuern. Dieselben wenigen KPIs, gleich definiert, vom Vorstand bis zu jedem Team."),
        tt("Every technology names the KPI it should move and is tested against a control group before it is scaled. This is what turns “measures not measurable” into a managed system.", "Jede Technologie nennt den KPI, den sie bewegen soll, und wird gegen eine Kontrollgruppe getestet, bevor sie skaliert wird. Das macht aus „Maßnahmen nicht messbar“ ein gesteuertes System."),
        tt("A named owner per KPI and a quarterly comparison of results with forecasts keep the system honest; both are good additions to the two foundations.", "Ein benannter Owner pro KPI und ein quartalsweiser Abgleich von Ergebnissen mit Prognosen halten das System ehrlich; beides sind gute Ergänzungen zu den zwei Fundamenten."),
        tt("Buying the most advanced AI platform first and finding uses later is technology without strategy: money spent before any KPI says what it should achieve.", "Zuerst die fortschrittlichste KI-Plattform zu kaufen und die Anwendungen später zu suchen, ist Technologie ohne Strategie: Geld, ausgegeben, bevor ein KPI sagt, was es erreichen soll."),
        tt("Letting AI set prices and offers on its own, without limits or explanation, is not a control system: nobody can check it, customers may find it unfair, and the GDPR limits decisions about people made only by automated processing.", "KI Preise und Angebote allein setzen zu lassen, ohne Grenzen oder Erklärung, ist kein Steuerungssystem: Niemand kann es prüfen, Kunden finden es vielleicht unfair, und die DSGVO begrenzt Entscheidungen über Menschen, die nur auf automatisierter Verarbeitung beruhen."),
      ]}
      sources={["davenport2018", "tetlock2015", "gdpr2016"]}
    >
      <p className={p}>
        {tt(
          "Davenport and Ronanki (2018) found that companies got more from AI when they built it around business processes and measured projects than when they bought a platform and looked for uses. Tetlock and Gardner (2015) show that forecasts improve only in organisations that keep score: every forecast is compared with the outcome, and the method is adjusted.",
          "Davenport und Ronanki (2018) fanden, dass Unternehmen mehr aus KI holten, wenn sie sie um Geschäftsprozesse und gemessene Projekte bauten, als wenn sie eine Plattform kauften und nach Anwendungen suchten. Tetlock und Gardner (2015) zeigen, dass Prognosen nur in Organisationen besser werden, die Buch führen: Jede Prognose wird mit dem Ergebnis verglichen, und die Methode wird angepasst.",
        )}
      </p>
      <Diagram label={tt("Four stages towards a control system · a worked example on Spree Systems", "Vier Stufen zu einem Steuerungssystem · ein Beispiel mit Spree Systems")} caption={tt("Click a stage and read what changes for the company at that stage.", "Klicken Sie eine Stufe an und lesen Sie, was sich auf dieser Stufe für das Unternehmen ändert.")}>
        <DataStages />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Start from the KPI, not from the tool. A technology is relevant when it would move a KPI of your system; it is ready to select when the data it needs is ready. Cost decides later, in the budget.", "Gehen Sie vom KPI aus, nicht vom Werkzeug. Eine Technologie ist relevant, wenn sie einen KPI Ihres Systems bewegen würde; sie ist bereit zur Auswahl, wenn die Daten bereit sind, die sie braucht. Die Kosten entscheiden später, im Budget.")}
      reasoning={[
        tt("It moves no KPI of the system → not now, however modern or cheap.", "Sie bewegt keinen KPI des Systems → jetzt nicht, egal wie modern oder günstig."),
        tt(`It moves a KPI and at least ${QUALITY_BAR}% of the data it needs is ready → select now, and test it against a control group.`, `Sie bewegt einen KPI, und mindestens ${QUALITY_BAR} % der nötigen Daten sind bereit → jetzt auswählen, und gegen eine Kontrollgruppe testen.`),
        tt(`It moves a KPI but less than ${QUALITY_BAR}% of its data is ready → data first: clean the data, then pilot. A model trained on gaps learns the gaps.`, `Sie bewegt einen KPI, aber weniger als ${QUALITY_BAR} % ihrer Daten sind bereit → erst die Daten: bereinigen, dann pilotieren. Ein Modell, das auf Lücken trainiert wird, lernt die Lücken.`),
        tt("Cost and how advanced a tool sounds are not the test. A cheap tool that moves no KPI is still waste; an expensive one that does may be worth it, if the budget allows.", "Kosten und wie fortschrittlich ein Werkzeug klingt, sind nicht der Test. Ein günstiges Werkzeug, das keinen KPI bewegt, bleibt Verschwendung; ein teures, das es tut, kann es wert sein, wenn das Budget es zulässt."),
      ]}
      sources={["hubbard2014", "davenport2020"]}
    >
      <p className={p}>
        {tt(
          "Hubbard (2014) argues that anything is worth measuring, and buying, only to the extent that it could change a decision. Davenport and colleagues (2020) add that AI in marketing needs data of good quality to learn from: the same tool that works on clean purchase data fails on half-empty records.",
          "Hubbard (2014) argumentiert, dass etwas nur so weit messens- und kaufenswert ist, wie es eine Entscheidung ändern könnte. Davenport und Kollegen (2020) ergänzen, dass KI im Marketing Daten guter Qualität braucht, um daraus zu lernen: Dasselbe Werkzeug, das auf sauberen Kaufdaten funktioniert, scheitert an halb leeren Datensätzen.",
        )}
      </p>
      <Diagram label={tt("Spree Systems' candidate technologies, sorted by KPI and data readiness", "Kandidaten-Technologien von Spree Systems, nach KPI und Datenbereitschaft sortiert")} caption={tt("Click a technology to read where it goes and why.", "Klicken Sie eine Technologie an, um zu lesen, wohin sie gehört und warum.")}>
        <SourceGrid />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A KPI system for management needs a few KPIs that pass four tests: linked to value, early, covering every customer, and measured automatically. Rate each candidate, capped by its printed facts, and choose the ones that are high on most.", "Ein KPI-System für das Management braucht wenige KPIs, die vier Tests bestehen: mit dem Wert verbunden, früh, jeden Kunden abdeckend und automatisch gemessen. Bewerten Sie jeden Kandidaten, gedeckelt durch seine gedruckten Fakten, und wählen Sie die, die bei den meisten hoch sind.")}
      reasoning={[
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low", "Niedrig")}: ${c.low} ${tt("High", "Hoch")}: ${c.high}`),
        tt("The printed facts cap the ratings: not linked to value → link Low; after the customer has left or twice a year → early Low, monthly → at most Mid; only some customers → reach at most Mid; by a survey → measured automatically at most Mid, collected by hand → Low.", "Die gedruckten Fakten deckeln die Bewertungen: nicht mit dem Wert verbunden → Verbindung Niedrig; nachdem der Kunde gegangen ist oder zweimal im Jahr → früh Niedrig, monatlich → höchstens Mittel; nur einige Kunden → Reichweite höchstens Mittel; über eine Befragung → automatisch gemessen höchstens Mittel, von Hand gesammelt → Niedrig."),
        tt("A management system needs most of its KPIs to show a change early (weekly or monthly). A number that counts the loss afterwards is for learning, not for steering.", "Ein Managementsystem braucht die meisten KPIs so, dass sie eine Veränderung früh zeigen (wöchentlich oder monatlich). Eine Zahl, die den Verlust hinterher zählt, dient dem Lernen, nicht dem Steuern."),
        tt("The KPI with the greatest leverage is usually the result the problem is about, if it is also early and automatic: every measure can be judged by it within weeks.", "Der KPI mit der größten Hebelwirkung ist meist das Ergebnis, um das es beim Problem geht, wenn er zugleich früh und automatisch ist: Jede Maßnahme lässt sich innerhalb von Wochen daran messen."),
      ]}
      sources={["kaplan1992", "ries2011"]}
    >
      <p className={p}>
        {tt(
          "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Ries (2011) warned that numbers which rise whatever you do, such as page views or e-mails sent, flatter a team and decide nothing.",
          "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Ries (2011) warnte, dass Zahlen, die steigen, egal was man tut, etwa Seitenaufrufe oder versendete E-Mails, einem Team schmeicheln und nichts entscheiden.",
        )}
      </p>
      <Diagram label={tt("Four KPI candidates of Spree Systems on four tests", "Vier KPI-Kandidaten von Spree Systems nach vier Tests")} caption={tt("Choose a candidate and compare its profile with the printed facts under it.", "Wählen Sie einen Kandidaten und vergleichen Sie sein Profil mit den gedruckten Fakten darunter.")}>
        <CompProfile />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("Continuous optimisation means every test ends in a decision: roll out, keep testing or stop, and who acts. Two numbers decide it: the uplift over the control group, and how many conversions it rests on.", "Laufende Optimierung heißt, dass jeder Test in einer Entscheidung endet: ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Uplift gegenüber der Kontrollgruppe und auf wie vielen Conversions er beruht.")}
      reasoning={[
        tt(`Roll out when the uplift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} conversions: the gain is clear and proven.`, `Ausrollen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} Conversions hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the uplift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} conversions, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%: promising, or too small to be worth a rollout yet.`, `Weiter testen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} Conversions beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt: vielversprechend, oder noch zu klein für einen Rollout.`),
        tt(`Stop when the uplift is below ${LIFT_WATCH}% or negative. Many conversions do not rescue a tiny uplift: they prove it is tiny.`, `Stoppen, wenn der Uplift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Conversions retten keinen winzigen Uplift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if complaints or unsubscribes rise, the uplift is not rolled out until the cause is fixed.", "Eine Guardrail kann einen Gewinner stoppen: Steigen Beschwerden oder Abmeldungen, wird der Uplift nicht ausgerollt, bis die Ursache behoben ist."),
        tt("Who acts follows from what the test is about: a rollout goes to the team that owns the channel (marketing for e-mails and the portal, sales for offers made by people); keep testing belongs to the data team; a stopped test has no owner.", "Wer handelt, folgt daraus, worum es im Test geht: Ein Rollout geht an das Team, dem der Kanal gehört (Marketing für E-Mails und Portal, Vertrieb für Angebote durch Menschen); Weitertesten gehört dem Datenteam; ein gestoppter Test hat keinen Owner."),
        tt("The extra revenue at stake sets the priority among the tests you roll out; it does not turn a weak result into a strong one.", "Der zusätzliche Umsatz, um den es geht, setzt die Priorität unter den Tests, die Sie ausrollen; er macht aus einem schwachen Ergebnis kein starkes."),
      ]}
      sources={["kohavi2020", "ries2011"]}
    >
      <p className={p}>
        {tt(
          "Kohavi, Tang and Xu (2020) describe how companies that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Ries (2011) calls this the build–measure–learn loop.",
          "Kohavi, Tang und Xu (2020) beschreiben, wie Unternehmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Ries (2011) nennt das die Build-Measure-Learn-Schleife.",
        )}
      </p>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of conversions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Conversions ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <DataTable
        head={[tt("Spree test", "Test bei Spree"), tt("Uplift", "Uplift"), tt("Conversions", "Conversions"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
        rows={[
          [tt("Upgrade offer in the portal", "Upgrade-Angebot im Portal"), "+40%", "180", tt("Roll out", "Ausrollen"), tt("Marketing", "Marketing")],
          [tt("Renewal call script", "Gesprächsleitfaden zur Verlängerung"), "+25%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
          [tt("Emoji in the subject line", "Emoji in der Betreffzeile"), "+1%", "500", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
        ]}
        caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
      />
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("Nobody can forecast the success of a new technology before it runs. Decide now with the technology that has evidence behind it, build in stages, and agree on the result that makes you change course. Give every funded item a start, one owner and a trigger.", "Niemand kann den Erfolg einer neuen Technologie vorhersagen, bevor sie läuft. Entscheiden Sie jetzt mit der Technologie, hinter der Evidenz steht, bauen Sie in Stufen, und vereinbaren Sie das Ergebnis, bei dem Sie den Kurs ändern. Geben Sie jedem finanzierten Punkt einen Start, einen Owner und einen Trigger.")}
      reasoning={[
        tt("Waiting until the forecast is clear is also a decision: no study makes it clear without a test, and the customer keeps the impersonal standard in the meantime. The brief asks for a decision despite an unclear forecast.", "Zu warten, bis die Prognose klar ist, ist auch eine Entscheidung: Keine Studie macht sie ohne Test klar, und der Kunde behält in der Zwischenzeit den unpersönlichen Standard. Der Auftrag verlangt eine Entscheidung trotz unklarer Prognose."),
        tt("Buying everything at once is fast, but most of the budget is spent before any KPI shows what works. Staging decides now and spends in the order the evidence arrives.", "Alles auf einmal zu kaufen ist schnell, aber der Großteil des Budgets ist ausgegeben, bevor irgendein KPI zeigt, was wirkt. Stufenweise entscheidet jetzt und gibt in der Reihenfolge aus, in der die Evidenz kommt."),
        tt("Measurement first: the KPI system starts no later than the first other item, because every other item is measured by it.", "Messung zuerst: Das KPI-System startet nicht später als der erste andere Punkt, weil jeder andere Punkt daran gemessen wird."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a black box cannot be steered.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Black Box lässt sich nicht steuern."),
        tt("Owner test: who can change the item without asking anyone else? Trigger test: a metric, a number, a date and an action.", "Owner-Test: Wer kann den Punkt ändern, ohne jemanden zu fragen? Trigger-Test: eine Kennzahl, eine Zahl, ein Datum und eine Aktion."),
        tt("A tripwire measures how customers behave (conversion, weekly active customers, customer value), not your own output (dashboards, e-mails sent), and its threshold is better than today.", "Ein Tripwire misst, wie Kunden sich verhalten (Conversion, wöchentlich aktive Kunden, Kundenwert), nicht Ihren eigenen Output (Dashboards, versendete E-Mails), und sein Schwellenwert ist besser als heute."),
        tt("When early results fall short of the pilot, look at the numbers before you change the system: is it a real but smaller uplift, and did a guardrail break? Fix the one thing that broke; do not swap a measured tool for an unmeasured one.", "Wenn frühe Ergebnisse hinter dem Pilot zurückbleiben, schauen Sie auf die Zahlen, bevor Sie das System ändern: Ist es ein echter, aber kleinerer Uplift, und ist eine Guardrail gerissen? Beheben Sie das eine, was kaputt ist; tauschen Sie kein gemessenes Werkzeug gegen ein ungemessenes."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("Three funded items over six months · a worked example on Spree Systems", "Drei finanzierte Punkte über sechs Monate · ein Beispiel mit Spree Systems")} caption={tt("Click a row to read its owner, its trigger and why it starts when it does.", "Klicken Sie eine Zeile an, um Owner, Trigger und den Grund für den Start zu lesen.")}>
        <ArchExample />
      </Diagram>
      <Bul
        items={[
          tt("Stage it: the no-regret items (the KPI system, the one technology with a pilot behind it) first, the rest when the first results are in.", "Stufenweise: die No-regret-Punkte (das KPI-System, die eine Technologie mit einem Pilot dahinter) zuerst, der Rest, wenn die ersten Ergebnisse da sind."),
          tt("Premortem: imagine the programme failed after a year, and write down why. Those reasons are your assumptions to watch.", "Premortem: Stellen Sie sich vor, das Programm sei nach einem Jahr gescheitert, und schreiben Sie auf, warum. Diese Gründe sind die Annahmen, die Sie beobachten."),
          tt("What does not fit gets a pickup point: the number and the date at which you look at it again.", "Was nicht passt, bekommt einen Pickup Point: die Zahl und das Datum, zu dem Sie es wieder ansehen."),
        ]}
      />
      <Callout label={tt("Unclear is not the same as unknowable", "Unklar ist nicht dasselbe wie unerkennbar")} tone="signal">
        <p>{tt("An unclear success forecast means you do not know yet. A staged decision with a tripwire turns “we do not know” into “we will know by month 5”, at a fraction of the cost of betting everything now.", "Eine unklare Erfolgsprognose heißt, dass Sie es noch nicht wissen. Eine gestufte Entscheidung mit Tripwire macht aus „wir wissen es nicht“ ein „wir wissen es bis Monat 5“, zu einem Bruchteil der Kosten, jetzt alles zu setzen.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
