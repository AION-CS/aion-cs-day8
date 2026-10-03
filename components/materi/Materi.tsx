"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { useCardMore } from "@/store/useCardMore";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, SECTIONS, materialAnchorId } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["davenport2020", "davenport2018", "gdpr2016", "linden2003", "peppers1993", "huang2021", "adam2021", "denboer2015", "provost2013", "kohavi2020", "kaplan1992", "ries2011", "hubbard2014"];
const REFS_B: RefKey[] = ["davenport2018", "tetlock2015", "gdpr2016", "hubbard2014", "davenport2020", "kaplan1992", "ries2011", "kohavi2020", "courtney1997", "klein2007"];

const CARDS_A_META = MATERIALS.filter((m) => m.block === "A");
const CARDS_B_META = MATERIALS.filter((m) => m.block === "B");

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation, video and rule", "Alle Zusatzerklärungen, Videos und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("AI, automation and success measurement: personalise with sense, automate what fits, and make every measure measurable", "KI, Automatisierung und Erfolgsmessung: sinnvoll personalisieren, automatisieren, was passt, und jede Maßnahme messbar machen")}>
      <p className="max-w-prose text-body text-ash">
        {tt(
          "Seven cards, Level 1 and Level 2 in one run: knowledge first (when AI adds value, recommendation systems and individualised communication, automation in sales, reading a pilot), then application (KPIs that steer, a fair A/B test, choosing measures). Every diagram uses Mosel Software, another provider, so the task is never answered for you.",
          "Sieben Karten, Level 1 und Level 2 in einem Durchgang: zuerst Wissen (wann KI Mehrwert bringt, Recommendation Systems und individualisierte Kommunikation, Automatisierung im Vertrieb, einen Pilot lesen), dann Anwendung (KPIs, die steuern, ein fairer A/B-Test, Maßnahmen wählen). Jedes Diagramm nutzt Mosel Software, einen anderen Anbieter, damit die Aufgabe nie für Sie gelöst wird.",
        )}
      </p>
      {CARDS_A.map((C, i) => {
        const m = CARDS_A_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the AI and Measurement File.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für die AI and Measurement File nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("An AI-based control system: the vision, the technologies, the KPI system, the optimisation loop, and a technology decision under uncertainty", "Ein KI-gestütztes Steuerungssystem: das Zielbild, die Technologien, das KPI-System, die Optimierungsschleife und eine Technologieentscheidung unter Unsicherheit")}>
      <p className="max-w-prose text-body text-ash">
        {tt(
          "Five cards for Level 3. You stop judging single measures and start designing how the whole company steers AI and automation by a few KPIs. Each card ends in rules the task uses; each diagram uses Spree Systems, another provider.",
          "Fünf Karten für Level 3. Sie beurteilen keine einzelnen Maßnahmen mehr, sondern gestalten, wie das ganze Unternehmen KI und Automatisierung über wenige KPIs steuert. Jede Karte endet mit Regeln, die die Aufgabe nutzt; jedes Diagramm nutzt Spree Systems, einen anderen Anbieter.",
        )}
      </p>
      {CARDS_B.map((C, i) => {
        const m = CARDS_B_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Control System Memo.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für das Control System Memo nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
