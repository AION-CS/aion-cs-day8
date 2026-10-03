"use client";

import { useState } from "react";
import { Block31, Block32, Block33, Block34 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { Panel } from "@/components/task2/Panel";
import { StepA } from "@/components/task2/StepA";
import { StepB } from "@/components/task2/StepB";
import { TodayTable } from "@/components/task2/Kits";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { MEASURE_BY_ID } from "@/data/measures";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import type { Scn } from "@/lib/r2Panel";
import { BLOCK_MINUTES, TASK2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && chosen.length > 0;
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Digital Officer", "Die Lage: Sie sind Chief Digital Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · ca. 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "AIConnect's first pilot showed that a personalised offer can sell more. You now answer for how the whole company uses AI and automation to keep customers, and how it steers them. There is a lot of data but little use of it, measures are not measurable, and the automation potential lies idle. The budget is limited, the data quality is uncertain and time is short. The board wants a manageable system instead of single measures, and a technology decision now, although nobody can forecast its success.",
            "Der erste Pilot von AIConnect hat gezeigt, dass ein personalisiertes Angebot mehr verkaufen kann. Sie verantworten jetzt, wie das ganze Unternehmen KI und Automatisierung nutzt, um Kunden zu halten, und wie es sie steuert. Es gibt viele Daten, aber wenig Nutzung, Maßnahmen sind nicht messbar, und das Automatisierungspotenzial liegt brach. Das Budget ist begrenzt, die Datenqualität unsicher und die Zeit knapp. Der Vorstand will ein steuerbares System statt einzelner Maßnahmen, und eine Technologieentscheidung jetzt, obwohl niemand ihren Erfolg vorhersagen kann.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Fallannahme)")}
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${R2_MONTHS} months`, `${R2_MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The items and their costs are in Step A; the numbers today are in the table below.", "Die Punkte und ihre Kosten stehen in Schritt A; die Zahlen heute stehen in der Tabelle darunter.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt(`What you build · about ${TASK2_MINUTES} min`, `Was Sie bauen · ca. ${TASK2_MINUTES} Min.`)}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("The target vision of an AI-based customer retention system", "Das Zielbild eines KI-gestützten Kundenbindungssystems")}</li>
            <li>{tt("The selection of relevant technologies", "Die Auswahl relevanter Technologien")}</li>
            <li>{tt("A KPI system for management", "Ein KPI-System für das Management")}</li>
            <li>{tt("A continuous optimisation process (A/B testing)", "Einen kontinuierlichen Optimierungsprozess (A/B-Testing)")}</li>
            <li>{tt("A prioritised implementation architecture", "Eine priorisierte Umsetzungsarchitektur")}</li>
            <li>{tt("A technology decision despite an unclear success forecast", "Eine Technologieentscheidung trotz unklarer Erfolgsprognose")}</li>
          </ol>
        </div>
      </div>
      <TodayTable />
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Measures you chose in Route 1: ", "Von Ihnen in Route 1 gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-4", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.4 in Route 1", "Zu Block 2.4 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt(
            "The brief gives the role (Chief Digital Officer or sales manager) and the situation: lots of data but low usage, measures not measurable, automation potential unused, budget restrictions, uncertain data quality and high time pressure, and a technology decision despite an unclear success forecast. The budget, the technologies, the uplifts, the costs and the baselines are made up for this exercise.",
            "Der Auftrag gibt Rolle (Chief Digital Officer oder Vertriebsleitung) und Lage vor: viele Daten, aber wenig Nutzung, nicht messbare Maßnahmen, ungenutztes Automatisierungspotenzial, Budgetgrenzen, unsichere Datenqualität und hoher Zeitdruck, und eine Technologieentscheidung trotz unklarer Erfolgsprognose. Budget, Technologien, Uplifts, Kosten und Ausgangswerte sind für diese Übung erfunden.",
          )}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const [scn, setScn] = useState<Scn>(0);
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-control-system-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div id="r2-frame" className="space-y-4">
        <Panel scn={scn} setScn={setScn} />
        <StepA scn={scn} />
        <StepB scn={scn} />
      </div>
      <section id="go-deeper" aria-labelledby="go-deeper-h" className="space-y-3">
        <div className="space-y-1">
          <h2 id="go-deeper-h">{tt("Go deeper · optional", "Vertiefen · optional")}</h2>
          <p className="max-w-prose text-caption text-ash">
            {tt(
              "Four blocks that each practise one part of the plan: the principles of the vision, the selection of technologies, the KPI system, and roll out, keep testing or stop. They are folded: nothing in Step A or Step B needs them, and they are not counted in the progress ring or the missing list. Open one any time.",
              "Vier Blöcke, die je einen Teil des Plans üben: die Prinzipien des Zielbilds, die Auswahl der Technologien, das KPI-System, und ausrollen, weiter testen oder stoppen. Sie sind eingeklappt: Nichts in Schritt A oder Schritt B braucht sie, und sie zählen nicht im Fortschrittsring oder in der Liste des Offenen. Öffnen Sie einen jederzeit.",
            )}
          </p>
        </div>
        <OptionalSection
          id="block-3-1"
          title={tt("Block 3.1 · The target vision of an AI-based retention system", "Block 3.1 · Das Zielbild eines KI-gestützten Bindungssystems")}
          minutes={BLOCK_MINUTES["3.1"]}
          reason={tt("Names the principles behind an AI-based control system; Step A asks for your vision without them.", "Benennt die Prinzipien hinter einem KI-gestützten Steuerungssystem; Schritt A fragt Ihr Zielbild auch ohne sie ab.")}
        >
          <Block31 />
        </OptionalSection>
        <OptionalSection
          id="block-3-2"
          title={tt("Block 3.2 · Selection of relevant technologies", "Block 3.2 · Auswahl relevanter Technologien")}
          minutes={BLOCK_MINUTES["3.2"]}
          reason={tt("Sorts eight technologies into select now, data first or not now; Step A prints the figures it needs itself.", "Sortiert acht Technologien in jetzt auswählen, erst die Daten oder jetzt nicht; Schritt A druckt die Zahlen, die er braucht, selbst.")}
        >
          <Block32 />
        </OptionalSection>
        <OptionalSection
          id="block-3-3"
          title={tt("Block 3.3 · A KPI system for management", "Block 3.3 · Ein KPI-System für das Management")}
          minutes={BLOCK_MINUTES["3.3"]}
          reason={tt("Rates KPI candidates on four tests; Step B prints the customer figures it uses, so the decision does not need the ratings.", "Bewertet KPI-Kandidaten nach vier Tests; Schritt B druckt die Kundenzahlen, die er nutzt, die Entscheidung braucht die Bewertungen also nicht.")}
        >
          <Block33 />
        </OptionalSection>
        <OptionalSection
          id="block-3-4"
          title={tt("Block 3.4 · Continuous optimisation: roll out, keep testing or stop", "Block 3.4 · Laufende Optimierung: ausrollen, weiter testen oder stoppen")}
          minutes={BLOCK_MINUTES["3.4"]}
          reason={tt("Decides roll out, keep testing or stop for six A/B results; Step B asks only when you would stop.", "Entscheidet für sechs A/B-Ergebnisse über Ausrollen, Weitertesten oder Stoppen; Schritt B fragt nur, wann Sie aufhören würden.")}
        >
          <Block34 />
        </OptionalSection>
      </section>
      <MemoPanel />
      <ExportBar
        id="export-l3"
        previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")}
        exportLabel={tt("Export the Control System Memo", "Control System Memo exportieren")}
        docTitle="Control System Memo"
        filename={filename}
        missing={missing}
        buildBody={() => memoBody(p)}
        showPreview={false}
      />
    </div>
  );
}
