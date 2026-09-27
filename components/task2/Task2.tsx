"use client";

import { Block31, Block32, Block33, Block34, Block35, Block36 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { MEASURE_BY_ID } from "@/data/measures";
import { PATTERNS, PATTERN_IDS, RISK_LABEL } from "@/data/patterns";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { TASK2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const risks = PATTERN_IDS.filter((x) => p.l1.rows[x].risk).map((x) => `${PATTERNS[x].label} (${RISK_LABEL[p.l1.rows[x].risk!]})`);
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && (risks.length > 0 || chosen.length > 0);
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
            <li>{tt("The technologies are in Block 3.2, the KPI candidates in Block 3.3, the test results in Block 3.4, the items and costs in Block 3.5, the baselines in Block 3.6.", "Die Technologien stehen in Block 3.2, die KPI-Kandidaten in Block 3.3, die Testergebnisse in Block 3.4, die Punkte und Kosten in Block 3.5, die Ausgangswerte in Block 3.6.")}</li>
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
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Link to customer value per kind of metric: ", "Verbindung zum Kundenwert pro Art von Kennzahl: ")}
            <strong>{risks.join(", ") || tt("none yet", "noch keines")}</strong>. {tt("Measures you chose: ", "Von Ihnen gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ") || tt("none yet", "noch keine")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-2", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.2 in Route 1", "Zu Block 2.2 in Route 1")}
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
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-control-system-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <div className="min-w-0 space-y-6 pb-14 lg:pb-0">
          <Block31 />
          <Block32 />
          <Block33 />
          <Block34 />
          <Block35 />
          <Block36 />
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
        <MemoPanel />
      </div>
    </div>
  );
}
