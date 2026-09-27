"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { TASK1_MINUTES } from "@/lib/routes";

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
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine ideas from AIConnect's teams (Block 1.1).", "Neun Ideen aus den Teams von AIConnect (Block 1.1).")}</li>
            <li>{tt("Last quarter's pilot and eight contact situations (Blocks 1.2 and 1.3).", "Den Pilot des letzten Quartals und acht Kontaktsituationen (Blöcke 1.2 und 1.3).")}</li>
            <li>{tt("Twelve metrics AIConnect reports today (Block 2.1).", "Zwölf Kennzahlen, die AIConnect heute berichtet (Block 2.1).")}</li>
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
          <p className="smallcaps">{tt(`How the task runs · about ${TASK1_MINUTES} min`, `So läuft die Aufgabe · ca. ${TASK1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("See where personalisation and automation help, read a pilot, and weigh advantages and risks (Level 1).", "Sehen, wo Personalisierung und Automatisierung helfen, einen Pilot lesen und Vorteile und Risiken abwägen (Level 1).")}</li>
            <li>{tt("Define KPIs and design a fair A/B test (Level 2).", "KPIs festlegen und einen fairen A/B-Test entwerfen (Level 2).")}</li>
            <li>{tt("Choose three measures and defend the order.", "Drei Maßnahmen wählen und die Reihenfolge begründen.")}</li>
          </ol>
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
        <p className="smallcaps text-accent">{tt(`Task 1 · about ${TASK1_MINUTES} minutes`, `Task 1 · ca. ${TASK1_MINUTES} Minuten`)}</p>
        <h2 id="task1-h">{tt("AI and Measurement: personalise, automate, measure", "AI and Measurement: personalisieren, automatisieren, messen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Personalise and automate with sense", "Sinnvoll personalisieren und automatisieren")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <Block12 />
      <Block13 />
      <Block14 />
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <Block22 />
      <Block23 />
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
