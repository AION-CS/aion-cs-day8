"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
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
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and Ronanki (2018) found that companies got more from AI when they built it around business processes and measured projects than when they bought a platform and looked for uses. Tetlock and Gardner (2015) show that forecasts improve only in organisations that keep score: every forecast is compared with the outcome, and the method is adjusted.",
            "Davenport und Ronanki (2018) fanden, dass Unternehmen mehr aus KI holten, wenn sie sie um Geschäftsprozesse und gemessene Projekte bauten, als wenn sie eine Plattform kauften und nach Anwendungen suchten. Tetlock und Gardner (2015) zeigen, dass Prognosen nur in Organisationen besser werden, die Buch führen: Jede Prognose wird mit dem Ergebnis verglichen, und die Methode wird angepasst.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Hubbard (2014) argues that anything is worth measuring, and buying, only to the extent that it could change a decision. Davenport and colleagues (2020) add that AI in marketing needs data of good quality to learn from: the same tool that works on clean purchase data fails on half-empty records.",
            "Hubbard (2014) argumentiert, dass etwas nur so weit messens- und kaufenswert ist, wie es eine Entscheidung ändern könnte. Davenport und Kollegen (2020) ergänzen, dass KI im Marketing Daten guter Qualität braucht, um daraus zu lernen: Dasselbe Werkzeug, das auf sauberen Kaufdaten funktioniert, scheitert an halb leeren Datensätzen.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Ries (2011) warned that numbers which rise whatever you do, such as page views or e-mails sent, flatter a team and decide nothing.",
            "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Ries (2011) warnte, dass Zahlen, die steigen, egal was man tut, etwa Seitenaufrufe oder versendete E-Mails, einem Team schmeicheln und nichts entscheiden.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how companies that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Ries (2011) calls this the build–measure–learn loop.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Unternehmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Ries (2011) nennt das die Build-Measure-Learn-Schleife.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of conversions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Conversions ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Spree test", "Test bei Spree"), tt("Uplift", "Uplift"), tt("Conversions", "Conversions"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("Upgrade offer in the portal", "Upgrade-Angebot im Portal"), "+40%", "180", tt("Roll out", "Ausrollen"), tt("Marketing", "Marketing")],
            [tt("Renewal call script", "Gesprächsleitfaden zur Verlängerung"), "+25%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
            [tt("Emoji in the subject line", "Emoji in der Betreffzeile"), "+1%", "500", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("An architecture is built in order: the base first, then measurement, then the data, then the engines on ready data, and the rest held back. Four tests tell you whether it holds. Decide now, in stages, and say what you will watch and when you would stop.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis, dann die Messung, dann die Daten, dann die Engines auf bereiten Daten, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob sie hält. Entscheiden Sie jetzt, in Stufen, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.")}
      reasoning={[
        tt("Build in this order. The base first: the KPI system, with the data it joins. Then measurement: the A/B routine. Then the data an engine needs, cleaned. Then the engines that move a named KPI, on data that is ready. Hold back the rest.", "Bauen Sie in dieser Reihenfolge. Zuerst die Basis: das KPI-System mit den Daten, die es verbindet. Dann die Messung: die A/B-Routine. Dann die Daten, die eine Engine braucht, bereinigt. Dann die Engines, die einen benannten KPI bewegen, auf bereiten Daten. Den Rest halten Sie zurück."),
        tt("Four tests check an architecture. Measurement first: the KPI system and the A/B routine start no later than the first engine. Every funded item has a purpose: it moves a named KPI or makes one measurable; a black box does neither. Data ready: an engine starts on data that is at least 80% ready. It fits: inside the budget and in use by month 6.", "Vier Tests prüfen eine Architektur. Messung zuerst: KPI-System und A/B-Routine starten nicht später als die erste Engine. Jeder finanzierte Punkt hat einen Zweck: Er bewegt einen benannten KPI oder macht einen messbar; eine Black Box tut keines von beidem. Daten bereit: Eine Engine startet auf Daten, die zu mindestens 80 % bereit sind. Es passt: innerhalb des Budgets und bis Monat 6 im Einsatz."),
        tt("Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After data is ready item starts in the month the data clean-up is in use, so the clean-up has to be Now itself.", "Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn die Daten bereit sind“ startet in dem Monat, in dem die Datenbereinigung im Einsatz ist, die Datenbereinigung muss also selbst auf Jetzt stehen."),
        tt("Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured and whose data is ready) and Risk (the share on a black box or on data below 80%). Measurable and Risk are ranges, because the data may be weaker than the brief says: a plan that holds at both ends is the safer one.", "Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden und deren Daten bereit sind) und Risiko (der Anteil auf einer Black Box oder auf Daten unter 80 %). Messbar und Risiko sind Spannen, weil die Daten schwächer sein können, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere."),
        tt("Waiting until the forecast is clear is also a decision: no study makes it clear without a test, and the customer keeps the impersonal standard in the meantime. The brief asks for a decision despite an unclear forecast.", "Zu warten, bis die Prognose klar ist, ist auch eine Entscheidung: Keine Studie macht sie ohne Test klar, und der Kunde behält in der Zwischenzeit den unpersönlichen Standard. Der Auftrag verlangt eine Entscheidung trotz unklarer Prognose."),
        tt("Buying everything at once is fast, but most of the budget is spent before any KPI shows what works. Staging decides now and spends in the order the evidence arrives.", "Alles auf einmal zu kaufen ist schnell, aber der Großteil des Budgets ist ausgegeben, bevor irgendein KPI zeigt, was wirkt. Stufenweise entscheidet jetzt und gibt in der Reihenfolge aus, in der die Evidenz kommt."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a black box cannot be steered.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Black Box lässt sich nicht steuern."),
        tt("What you will watch is one figure about customers (conversion, weekly active customers, customer value), not your own output (dashboards, e-mails sent), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.", "Was Sie beobachten, ist eine Zahl über Kunden (Conversion, wöchentlich aktive Kunden, Kundenwert), nicht Ihr eigener Output (Dashboards, versendete E-Mails), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern."),
        tt("Every plan gives something and costs something. Say what it gives (measured, ready, inside the budget) and what it leaves open (an item not now, data below 80% if the data is weaker, budget left unspent). A plan that differs from this order can still be argued: say why.", "Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, bereit, im Budget) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Daten unter 80 %, wenn die Daten schwächer sind, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("A recommender and its base · a worked example on Spree Systems", "Eine Empfehlung und ihre Basis · ein Beispiel mit Spree Systems")} caption={tt("Change when measurement starts and how ready the data is, and watch the links.", "Ändern Sie, wann die Messung startet und wie bereit die Daten sind, und beobachten Sie die Verbindungen.")}>
        <ArchExample />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Spree's figures", "Zahlen von Spree"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("Month in use: starts in month 1, needs 6 weeks", "Monat im Einsatz: startet in Monat 1, braucht 6 Wochen"), "1 + 6 ÷ 4 = 1 + 2", tt("month 3", "Monat 3")],
            [tt("After data is ready: the clean-up is in use in month 3, the item needs 8 weeks", "Wenn die Daten bereit sind: Die Bereinigung ist in Monat 3 im Einsatz, der Punkt braucht 8 Wochen"), "3 + 8 ÷ 4 = 3 + 2", tt("starts month 3, in use month 5", "Start Monat 3, im Einsatz Monat 5")],
            [tt("Data ready: the recommender's data is 92% ready, the bar is 80%", "Daten bereit: Die Daten der Empfehlung sind zu 92 % bereit, die Grenze ist 80 %"), "92 ≥ 80", tt("ready", "bereit")],
            [tt("The same recommender when the data is 15 points weaker", "Dieselbe Empfehlung, wenn die Daten 15 Punkte schwächer sind"), "92 − 15 = 77 < 80", tt("not ready", "nicht bereit")],
            [tt("Money: three funded items against Spree's €170,000", "Geld: drei finanzierte Punkte gegen Sprees 170.000 €"), "45,000 + 60,000 + 20,000", tt("€125,000, €45,000 left", "125.000 €, 45.000 € übrig")],
          ]}
          caption={tt("Spree's numbers (Case assumption). The panel in the task does this for you and says what it means.", "Zahlen von Spree (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.")}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Stage it: the no-regret items first (the KPI system, the A/B routine), the engines when the data is ready.", "Stufenweise: die No-regret-Punkte zuerst (das KPI-System, die A/B-Routine), die Engines, wenn die Daten bereit sind."),
            tt("Premortem: imagine the plan failed after a year, and write down why. Those reasons are what you watch.", "Premortem: Stellen Sie sich vor, der Plan sei nach einem Jahr gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie."),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: Unclear is not the same as unknowable", "Zeigen: Unklar ist nicht dasselbe wie unerkennbar")}>
        <Callout label={tt("Unclear is not the same as unknowable", "Unklar ist nicht dasselbe wie unerkennbar")} tone="signal">
          <p>{tt("An unclear success forecast means you do not know yet. A staged decision with a sentence on what you watch turns “we do not know” into “we will know by month 4”, at a fraction of the cost of betting everything now.", "Eine unklare Erfolgsprognose heißt, dass Sie es noch nicht wissen. Eine gestufte Entscheidung mit einem Satz dazu, was Sie beobachten, macht aus „wir wissen es nicht“ ein „wir wissen es bis Monat 4“, zu einem Bruchteil der Kosten, jetzt alles zu setzen.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
