"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { FORECAST, PILOT } from "@/data/forecast";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, TASK1_MINUTES } from "@/lib/routes";

const CORE_MIN = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["1.3"] + BLOCK_MINUTES["2.1"] + BLOCK_MINUTES["2.4"];

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: AIConnect Solutions GmbH", "Der Fall: AIConnect Solutions GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "AIConnect Solutions GmbH sells collaboration and IT security software to the Mittelstand as a subscription, with add-ons such as backup, archive and admin training. It has a lot of customer data: every order, every login, every opened e-mail. Yet every customer gets the same monthly newsletter and the same offer e-mail, few offers turn into orders, and nobody can say which of the company's measures actually work.",
            "AIConnect Solutions GmbH verkauft dem Mittelstand Collaboration- und IT-Sicherheitssoftware im Abonnement, mit Add-ons wie Backup, Archiv und Admin-Schulung. Es hat viele Kundendaten: jede Bestellung, jedes Login, jede geöffnete E-Mail. Trotzdem bekommt jeder Kunde denselben monatlichen Newsletter und dieselbe Angebots-E-Mail, wenige Angebote werden zu Bestellungen, und niemand kann sagen, welche Maßnahmen des Unternehmens tatsächlich wirken.",
          )}
        </Gloss>
      </p>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first sign: last quarter AIConnect tried a recommended add-on in its offer e-mail on half of a mailing list. Each group got ${num(PILOT.control.sent)} e-mails. The standard group produced ${PILOT.control.orders} orders (a conversion rate of ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}%), the recommended group ${PILOT.variant.orders} (${num(FORECAST.f1, { maximumFractionDigits: 1 })}%). That is promising, but it is a small base.`,
            `Ein erstes Zeichen: Im letzten Quartal probierte AIConnect bei der Hälfte einer Verteilerliste ein empfohlenes Add-on in der Angebots-E-Mail aus. Jede Gruppe bekam ${num(PILOT.control.sent)} E-Mails. Die Standardgruppe brachte ${PILOT.control.orders} Bestellungen (eine Conversion Rate von ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} %), die empfohlene Gruppe ${PILOT.variant.orders} (${num(FORECAST.f1, { maximumFractionDigits: 1 })} %). Das ist vielversprechend, aber eine kleine Basis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine ideas from AIConnect's teams (Block 1.1).", "Neun Ideen aus den Teams von AIConnect (Block 1.1).")}</li>
            <li>{tt("Eight contact situations (Block 1.3); last quarter's pilot (optional Block 1.2).", "Acht Kontaktsituationen (Block 1.3); den Pilot des letzten Quartals (optionaler Block 1.2).")}</li>
            <li>{tt("Twelve metrics AIConnect reports today (Block 2.1) and nine measures it could fund (Block 2.4).", "Zwölf Kennzahlen, die AIConnect heute berichtet (Block 2.1), und neun Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost and weeks of every measure are printed in Block 2.4.", "Kosten und Wochen jeder Maßnahme stehen in Block 2.4.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · four core blocks, about ${CORE_MIN} min`, `So läuft die Aufgabe · vier Kernblöcke, ca. ${CORE_MIN} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine ideas into recommendation, communication or automation, and name an opportunity of your own (Level 1).", "Block 1.1: neun Ideen in Empfehlung, Kommunikation oder Automatisierung sortieren und eine eigene Chance nennen (Level 1).")}</li>
            <li>{tt("Block 1.3: decide which contacts to automate and which stay with a person, and weigh advantages against risks (Level 1).", "Block 1.3: entscheiden, welche Kontakte automatisiert werden und welche bei einem Menschen bleiben, und Vorteile gegen Risiken abwägen (Level 1).")}</li>
            <li>{tt("Block 2.1: tag twelve metrics by kind and name your three KPIs (Level 2).", "Block 2.1: zwölf Kennzahlen nach Art zuordnen und Ihre drei KPIs nennen (Level 2).")}</li>
            <li>{tt("Block 2.4: choose three measures, score them and defend the order (Level 2).", "Block 2.4: drei Maßnahmen wählen, bewerten und die Reihenfolge begründen (Level 2).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Four more blocks (about ${TASK1_MINUTES - CORE_MIN} min) are optional and folded.`, `Vier weitere Blöcke (ca. ${TASK1_MINUTES - CORE_MIN} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt(
            "The brief says: lots of customer data, standardised communication and little differentiation; customer communication impersonal, a low conversion rate and measures not measurable; €200,000 and six months. Everything else is made up for this exercise: the products, the pilot, the metrics, the rates and the costs.",
            "Der Auftrag sagt: viele Kundendaten, standardisierte Kommunikation und wenig Differenzierung; unpersönliche Kundenkommunikation, eine niedrige Conversion Rate und nicht messbare Maßnahmen; 200.000 € und sechs Monate. Alles andere ist für diese Übung erfunden: die Produkte, der Pilot, die Kennzahlen, die Raten und die Kosten.",
          )}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-ai-measurement-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · four core blocks, optional blocks folded`, `Task 1 · vier Kernblöcke, optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("AI and Measurement: personalise, automate, measure", "AI and Measurement: personalisieren, automatisieren, messen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Personalise and automate with sense", "Sinnvoll personalisieren und automatisieren")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the pilot: two rates side by side", "Block 1.2 · Den Pilot lesen: zwei Raten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one result without being fooled by it (a promising rate on a small base); the choices of Block 2.4 do not need it.", "Übt, ein Ergebnis zu lesen, ohne sich davon täuschen zu lassen (eine vielversprechende Rate auf kleiner Basis); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <Block13 />
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the AI and Measurement File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die AI and Measurement File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each kind of metric is worth, and the uncertainties", "Block 2.2 · Was jede Art von Kennzahl wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads what each kind of metric tells management, from your tags in Block 2.1, and what can mislead a measurement; Block 2.4 can be answered without it.", "Liest, was jede Art von Kennzahl dem Management sagt, aus Ihren Zuordnungen in Block 2.1, und was eine Messung in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a second run of the pilot; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf einen zweiten Durchlauf des Piloten an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your AI and Measurement File", "Vorschau Ihrer AI and Measurement File")}
        exportLabel={tt("Export the AI and Measurement File", "AI and Measurement File exportieren")}
        docTitle="AI and Measurement File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
