"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Spree Systems (a Berlin software provider,
 * Case assumption), never AIConnect. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20), every picture opens with "The point" and carries a three-step "Walk me through it" story that
 * drives the real controls (CLAUDE.md #36); a manual button leaves the story.
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6", rust: "#A4472A" };

/* ------------------------------------------------------------------ B1 · four stages towards an AI-based control system */

type Stage = "report" | "dash" | "rules" | "forecast";
const STAGES: Stage[] = ["report", "dash", "rules", "forecast"];
const STAGE_TEXT = bi({
  report: { name: t("Single tools", "Einzelne Werkzeuge"), spree: t("A chatbot here, a newsletter tool there, each with its own activity report.", "Hier ein Chatbot, dort ein Newsletter-Tool, jedes mit seinem eigenen Aktivitätsbericht."), reading: t("Every tool reports that it is busy; nobody can say what any of them did for revenue or for customers kept. Measures are not measurable.", "Jedes Werkzeug berichtet, dass es beschäftigt ist; niemand kann sagen, was eines davon für Umsatz oder gehaltene Kunden getan hat. Maßnahmen sind nicht messbar.") },
  dash: { name: t("One KPI system", "Ein KPI-System"), spree: t("One outcome (customer value), three drivers and a guardrail, the same on every team's page.", "Ein Outcome (Kundenwert), drei Treiber und eine Guardrail, auf der Seite jedes Teams dieselben."), reading: t("Everyone now steers by the same numbers. The tools still run on hope: nobody knows which of them moves the numbers.", "Alle steuern jetzt nach denselben Zahlen. Die Werkzeuge laufen noch auf Hoffnung: Niemand weiß, welches davon die Zahlen bewegt.") },
  rules: { name: t("Tested before scaled", "Getestet vor dem Skalieren"), spree: t("“A new tool runs against a control group on one KPI before it reaches all customers.”", "„Ein neues Werkzeug läuft gegen eine Kontrollgruppe an einem KPI, bevor es alle Kunden erreicht.“"), reading: t("Technology now has to earn its place. This is where AI stops being a purchase and becomes a measured decision.", "Technologie muss sich ihren Platz jetzt verdienen. Hier hört KI auf, ein Kauf zu sein, und wird zu einer gemessenen Entscheidung.") },
  forecast: { name: t("Continuous optimisation", "Laufende Optimierung"), spree: t("Every quarter: results against forecasts, winners rolled out, losers stopped, rules adjusted.", "Jedes Quartal: Ergebnisse gegen Prognosen, Gewinner ausgerollt, Verlierer gestoppt, Regeln angepasst."), reading: t("The system learns by itself: tests feed the KPIs, the KPIs decide the next tests. A manageable system instead of individual measures.", "Das System lernt von selbst: Tests speisen die KPIs, die KPIs entscheiden die nächsten Tests. Ein steuerbares System statt einzelner Maßnahmen.") },
});

export function DataStages() {
  const uid = useId().replace(/:/g, "");
  const [st, setStRaw] = useState<Stage>("dash");
  const story = useStory([
    {
      title: tt("A system that learns", "Ein System, das lernt"),
      say: tt(`Spree Systems is an example company, not your case. Every quarter it compares results with forecasts, rolls out the winners and stops the losers.`, `Spree Systems ist ein Beispielunternehmen, nicht Ihr Fall. Jedes Quartal vergleicht es Ergebnisse mit Prognosen, rollt die Gewinner aus und stoppt die Verlierer.`),
      look: tt("the last, tallest bar", "der letzte, höchste Balken"),
      apply: () => {
        setStRaw("forecast");
      },
    },
    {
      title: tt("Single tools", "Einzelne Werkzeuge"),
      say: tt(`Before that, Spree ran a chatbot here and a newsletter tool there, each with its own activity report. Every tool said it was busy; nobody could say what any of them did for revenue.`, `Davor betrieb Spree hier einen Chatbot und dort ein Newsletter-Tool, jedes mit eigenem Aktivitätsbericht. Jedes Werkzeug sagte, es sei beschäftigt; niemand konnte sagen, was eines davon für den Umsatz tat.`),
      look: tt("the first, shortest bar", "der erste, niedrigste Balken"),
      apply: () => {
        setStRaw("report");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The jump from tools to a system is the KPI system: a few numbers that every team reads the same way. Try the four stages.`, `Der Sprung von Werkzeugen zu einem System ist das KPI-System: wenige Zahlen, die jedes Team gleich liest. Probieren Sie die vier Stufen.`),
      look: tt("the second bar", "der zweite Balken"),
      apply: () => {
        setStRaw("dash");
      },
    },
  ]);
  const setSt = (v: Stage) => {
    story.leave();
    setStRaw(v);
  };
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An AI-based retention system is not a pile of tools. It is one KPI system everyone steers by, technology that proves itself before it scales, and a loop that keeps learning.", "Ein KI-gestütztes Bindungssystem ist kein Haufen von Werkzeugen. Es ist ein KPI-System, nach dem alle steuern, Technologie, die sich beweist, bevor sie skaliert, und ein Kreislauf, der weiter lernt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an AI-based control system", "Vier Stufen zu einem KI-gestützten Steuerungssystem")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              {k === st && story.step !== null && <rect x={x - 4} y={130 - h - 4} width="136" height={h + 8} rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <rect className="hit-shape" x={x} y={130 - h} width="128" height={h} fill={k === st ? C.gold : on ? C.data : C.paper} stroke={C.ink} strokeWidth="1.4" />
              <text x={x + 64} y={146} textAnchor="middle" fontSize="11" fill={C.ash}>{`${i + 1}`}</text>
            </g>
          );
        })}
        <text x="10" y="18" fontSize="11.5" fill={C.ash}>{tt("from single tools → to one KPI system → to testing → to a system that learns", "von einzelnen Werkzeugen → zu einem KPI-System → zum Testen → zu einem System, das lernt")}</text>
      </svg>
      <Toggles<Stage> label={tt("Stage", "Stufe")} value={st} onChange={setSt} options={STAGES.map((k, i) => ({ id: k, label: `${i + 1} · ${STAGE_TEXT[k].name}` }))} />
      <p className="rounded-md border border-line bg-paper px-3 py-2 text-caption text-ink">
        <span className="smallcaps mr-1.5">Spree Systems</span>
        {s.spree}
      </p>
      <Insight>{plain()}{s.reading}</Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · the KPI first, then the tool */

type ISrc = { id: string; name: string; decision: boolean; complete: number };
const I_SRC: ISrc[] = bi([
  { id: "upsell", name: t("Upsell recommender", "Upsell-Empfehlung"), decision: true, complete: 94 },
  { id: "winback", name: t("Win-back e-mails", "Rückgewinnungs-E-Mails"), decision: true, complete: 90 },
  { id: "voice", name: t("Voice bot", "Sprachbot"), decision: true, complete: 35 },
  { id: "sentiment", name: t("Social sentiment AI", "Social-Sentiment-KI"), decision: false, complete: 60 },
  { id: "images", name: t("AI ad images", "KI-Werbebilder"), decision: false, complete: 100 },
]);
const useOfI = (s: ISrc) => (!s.decision ? "leave" : s.complete >= 80 ? "core" : "later");
export function SourceGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("voice");
  const story = useStory([
    {
      title: tt("Select now", "Jetzt auswählen"),
      say: tt(`Spree Systems is an example company, not your case. Its upsell recommender names a KPI it should move, and ${I_SRC[0].complete}% of its data is ready: select now, and test it against a control group.`, `Spree Systems ist ein Beispielunternehmen, nicht Ihr Fall. Seine Upsell-Empfehlung nennt einen KPI, den sie bewegen soll, und ${I_SRC[0].complete} % ihrer Daten sind bereit: jetzt auswählen und gegen eine Kontrollgruppe testen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setSelRaw("upsell");
      },
    },
    {
      title: tt("Data first", "Erst die Daten"),
      say: tt(`The voice bot would move a KPI too, but only ${I_SRC[2].complete}% of its data is ready. Built now, it would learn the gaps. Fix the data first, then pilot it.`, `Der Sprachbot würde auch einen KPI bewegen, aber nur ${I_SRC[2].complete} % seiner Daten sind bereit. Jetzt gebaut, würde er die Lücken lernen. Erst die Daten verbessern, dann pilotieren.`),
      look: tt("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"),
      apply: () => {
        setSelRaw("voice");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`AI ad images have ${I_SRC[4].complete}% of their data ready and look impressive, but they move no KPI of the system. However modern, not now. Try the other technologies.`, `KI-Werbebilder haben ${I_SRC[4].complete} % ihrer Daten bereit und sehen beeindruckend aus, bewegen aber keinen KPI des Systems. Egal wie modern: jetzt nicht. Probieren Sie die anderen Technologien.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setSelRaw("images");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Start from the KPI, not from the tool. A technology that names a KPI and has its data ready is selected now; with data not ready it waits; with no KPI it is not now, however modern.", "Gehen Sie vom KPI aus, nicht vom Werkzeug. Eine Technologie, die einen KPI nennt und deren Daten bereit sind, wird jetzt gewählt; mit nicht bereiten Daten wartet sie; ohne KPI ist sie jetzt nicht dran, egal wie modern.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 210" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Spree Systems' candidate technologies by KPI and data readiness", "Kandidaten-Technologien von Spree Systems nach KPI und Datenbereitschaft")}</title>
        <desc id={`${uid}-d`}>{I_SRC.map((x) => `${x.name}: ${useOfI(x)}`).join(", ")}</desc>
        <rect x="60" y="20" width="220" height="90" fill={C.soft} stroke={C.line} />
        <rect x="280" y="20" width="240" height="90" fill={C.tealSoft} stroke={C.line} />
        <rect x="60" y="110" width="460" height="80" fill={C.mist} stroke={C.line} />
        <text x="170" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.amber}>{tt("Data first, then pilot", "Erst die Daten, dann pilotieren")}</text>
        <text x="400" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.teal}>{tt("Select now", "Jetzt auswählen")}</text>
        <text x="290" y="182" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("Not now: moves no KPI", "Jetzt nicht: bewegt keinen KPI")}</text>
        <text x="30" y="70" textAnchor="middle" fontSize="11" fill={C.ash} transform="rotate(-90 30 70)">{tt("KPI named", "KPI benannt")}</text>
        <text x="170" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("< 80% of its data ready", "< 80 % der Daten bereit")}</text>
        <text x="400" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("≥ 80% of its data ready", "≥ 80 % der Daten bereit")}</text>
        {I_SRC.map((x, i) => {
          const p = pos(x, i);
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <circle cx={p.cx} cy={p.cy} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Technology", "Technologie")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>{plain()}
        {u === "core"
          ? tt(`${s.name}: it names a KPI it should move and ${s.complete}% of its data is ready. Select now, and test it against a control group before it reaches everyone.`, `${s.name}: Sie nennt einen KPI, den sie bewegen soll, und ${s.complete} % ihrer Daten sind bereit. Jetzt auswählen, und vor dem Rollout gegen eine Kontrollgruppe testen.`)
          : u === "later"
            ? tt(`${s.name}: it would move a KPI, but only ${s.complete}% of the data it needs is ready. Built now, it would learn from gaps. Fix the data first, then pilot it.`, `${s.name}: Sie würde einen KPI bewegen, aber nur ${s.complete} % der nötigen Daten sind bereit. Jetzt gebaut, würde sie aus Lücken lernen. Erst die Daten verbessern, dann pilotieren.`)
            : tt(`${s.name}: ${s.complete}% of its data is ready and it may impress, but it moves no KPI of Spree's system. However modern, not now.`, `${s.name}: ${s.complete} % der Daten sind bereit, und sie mag beeindrucken, aber sie bewegt keinen KPI des Systems von Spree. Egal wie modern: jetzt nicht.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

type ICrit = "explain" | "timely" | "reach" | "scale";
const I_CRITS: ICrit[] = ["explain", "timely", "reach", "scale"];
const I_CRIT_NAME = bi({ explain: t("Link to value", "Verbindung zum Wert"), timely: t("Early", "Früh"), reach: t("Reach", "Reichweite"), scale: t("Measured automatically", "Automatisch gemessen") });
const I_COMPS = bi([
  { id: "upgrade", name: t("Upgrade rate", "Upgrade-Rate"), facts: t("linked to value · weekly · every customer · counted by the systems", "mit dem Wert verbunden · wöchentlich · jeder Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is money, it moves weekly, it covers everyone and nobody has to collect it.", "Hoch auf allen vier: Es ist Geld, es bewegt sich wöchentlich, es deckt alle ab, und niemand muss es sammeln.") },
  { id: "survey", name: t("Yearly survey score", "Jährlicher Befragungswert"), facts: t("linked to value · yearly · those who answer · by a survey", "mit dem Wert verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("It is linked to loyalty, but it arrives once a year and only from those who answer.", "Er ist mit Loyalität verbunden, kommt aber einmal im Jahr und nur von denen, die antworten.") },
  { id: "views", name: t("Offer page views", "Aufrufe der Angebotsseite"), facts: t("not linked to value · daily · every visitor · counted by the systems", "nicht mit dem Wert verbunden · täglich · jeder Besucher · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Fast, complete and automatic, and it rose while orders fell: views are not purchases.", "Schnell, vollständig und automatisch, und sie stiegen, während die Bestellungen fielen: Aufrufe sind keine Käufe.") },
  { id: "wins", name: t("Managers' monthly wins", "Monatliche Erfolge der Manager"), facts: t("not linked to value · monthly · the deals someone reports · collected by hand", "nicht mit dem Wert verbunden · monatlich · die Deals, die jemand meldet · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid stories, but chosen by the teller, without a comparison, and collected by hand each month.", "Anschauliche Geschichten, aber vom Erzähler ausgewählt, ohne Vergleich, und jeden Monat von Hand gesammelt.") },
]);
export function CompProfile() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("views");
  const story = useStory([
    {
      title: tt("A KPI that passes", "Ein KPI, der besteht"),
      say: tt(`Spree Systems is an example company, not your case. Its upgrade rate is money, moves weekly, covers every customer and is counted by the systems: High on all four, 12 of 12.`, `Spree Systems ist ein Beispielunternehmen, nicht Ihr Fall. Seine Upgrade-Rate ist Geld, bewegt sich wöchentlich, deckt jeden Kunden ab und wird von den Systemen gezählt: Hoch auf allen vier, 12 von 12.`),
      look: tt("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"),
      apply: () => {
        setSelRaw("upgrade");
      },
    },
    {
      title: tt("A number that does not", "Eine Zahl, die nicht besteht"),
      say: tt(`Offer page views are fast, complete and automatic, but they rose while orders fell: views are not purchases. The link to value stays Low, whatever the rest.`, `Aufrufe der Angebotsseite sind schnell, vollständig und automatisch, stiegen aber, während die Bestellungen fielen: Aufrufe sind keine Käufe. Die Verbindung zum Wert bleibt Niedrig, egal wie der Rest ist.`),
      look: tt("the first row, Link to value", "die erste Zeile, Verbindung zum Wert"),
      apply: () => {
        setSelRaw("views");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The yearly survey score is linked to value but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.`, `Der jährliche Befragungswert ist mit dem Wert verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten.`),
      look: tt("the second row, Early", "die zweite Zeile, Früh"),
      apply: () => {
        setSelRaw("survey");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A KPI worth steering by is linked to value, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.", "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Wert verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Spree Systems on four tests", "Ein KPI-Kandidat von Spree Systems nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              {((story.step === 1 && k === "explain") || (story.step === 2 && k === "timely")) && <rect x="-4" y={y - 3} width="556" height="32" rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <text x="0" y={y + 18} fontSize="12" fill={C.ink}>{I_CRIT_NAME[k]}</text>
              {[1, 2, 3].map((b) => (
                <rect key={b} x={160 + (b - 1) * 110} y={y} width="104" height="26" fill={b <= v ? (v === 1 ? C.grey : C.data) : C.paper} stroke={C.ink} strokeDasharray={b <= v ? undefined : "4 3"} />
              ))}
              <text x="500" y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][v]}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("KPI candidate", "KPI-Kandidat")} value={sel} onChange={setSel} options={I_COMPS.map((x) => ({ id: x.id, label: x.name }))} />
      <p className="text-caption text-ash">
        <span className="font-semibold text-ink">{tt("Printed facts: ", "Gedruckte Fakten: ")}</span>
        {c.facts}
      </p>
      <Insight>{plain()}
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and conversions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLiftRaw] = useState(20);
  const [cases, setCasesRaw] = useState(40);
  const story = useStory([
    {
      title: tt("Roll out", "Ausrollen"),
      say: tt(`Spree Systems is an example company, not your case. An upsell test shows +30% on 200 conversions per group: clear and proven. Roll out.`, `Spree Systems ist ein Beispielunternehmen, nicht Ihr Fall. Ein Upsell-Test zeigt +30 % bei 200 Conversions pro Gruppe: klar und belegt. Ausrollen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(200);
      },
    },
    {
      title: tt("Keep testing", "Weiter testen"),
      say: tt(`Another test also shows +30%, but on only 40 conversions per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test zeigt auch +30 %, aber nur bei 40 Conversions pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`),
      look: tt("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(40);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`A third test shows +2% on 300 conversions. Many conversions do not rescue a tiny uplift: they prove it is tiny. Stop. Move the two sliders to try your own.`, `Ein dritter Test zeigt +2 % bei 300 Conversions. Viele Conversions retten keinen winzigen Uplift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setLiftRaw(2);
        setCasesRaw(300);
      },
    },
  ]);
  const setLift = (v: number) => {
    story.leave();
    setLiftRaw(v);
  };
  const setCases = (v: number) => {
    story.leave();
    setCasesRaw(v);
  };
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Every test ends in a decision. A clear uplift on enough conversions: roll out. A strong uplift on too few, or a small one: keep testing. No real uplift: stop.", "Jeder Test endet in einer Entscheidung. Ein klarer Uplift bei genug Conversions: ausrollen. Ein starker Uplift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Uplift: stoppen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 200" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Roll out, keep testing or stop, by uplift and conversions per group", "Ausrollen, weiter testen oder stoppen, nach Uplift und Conversions pro Gruppe")}</title>
        <desc id={`${uid}-d`}>{tt(`Uplift ${lift}%, ${cases} conversions: ${act}.`, `Uplift ${lift} %, ${cases} Conversions: ${act}.`)}</desc>
        <rect x={X(CASES_MIN)} y={Y(60)} width={X(300) - X(CASES_MIN)} height={Y(LIFT_ACT) - Y(60)} fill={C.tealSoft} />
        <rect x={X(0)} y={Y(60)} width={X(CASES_MIN) - X(0)} height={Y(LIFT_ACT) - Y(60)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_ACT)} width={X(300) - X(0)} height={Y(LIFT_WATCH) - Y(LIFT_ACT)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_WATCH)} width={X(300) - X(0)} height={Y(-10) - Y(LIFT_WATCH)} fill={C.mist} />
        <text x={X(200)} y={Y(45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.teal}>{tt("roll out", "ausrollen")}</text>
        <text x={X(50)} y={Y(45)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(6)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(-4)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("stop", "stoppen")}</text>
        <line x1={X(0)} y1={Y(0)} x2={X(300)} y2={Y(0)} stroke={C.rust} strokeDasharray="4 3" />
        <line x1={X(0)} y1={Y(-10)} x2={X(0)} y2={Y(60)} stroke={C.ash} />
        <text x={X(150)} y="196" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("conversions in the smaller group →", "Conversions in der kleineren Gruppe →")}</text>
        <text x="16" y={Y(25)} textAnchor="middle" fontSize="11" fill={C.ash} transform={`rotate(-90 16 ${Y(25)})`}>{tt("uplift % →", "Uplift % →")}</text>
        {story.step !== null && <circle cx={X(cases)} cy={Y(lift)} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <circle cx={X(cases)} cy={Y(lift)} r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-lift`} className="smallcaps block">{tt(`Uplift over the control group: ${lift > 0 ? "+" : ""}${lift}%`, `Uplift gegenüber der Kontrollgruppe: ${lift > 0 ? "+" : ""}${lift} %`)}</label>
          <input id={`${uid}-lift`} type="range" min={-10} max={60} step={1} value={lift} onChange={(e) => setLift(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
        <div>
          <label htmlFor={`${uid}-cases`} className="smallcaps block">{tt(`Conversions per group: ${cases}`, `Conversions pro Gruppe: ${cases}`)}</label>
          <input id={`${uid}-cases`} type="range" min={10} max={300} step={10} value={cases} onChange={(e) => setCases(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
      </div>
      <Insight>{plain()}
        {act === "intervene"
          ? tt(`An uplift of ${lift}% on ${cases} conversions per group: clear and proven. Roll out, and hand it to the team that owns the channel.`, `Ein Uplift von ${lift} % bei ${cases} Conversions pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, dem der Kanal gehört.`)
          : act === "watch"
            ? lift >= LIFT_ACT
              ? tt(`An uplift of ${lift}% looks strong, but ${cases} conversions are too few to trust it (fewer than ${CASES_MIN}). Keep testing; the data team runs it until the size is reached.`, `Ein Uplift von ${lift} % sieht stark aus, aber ${cases} Conversions sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; das Datenteam lässt ihn laufen, bis die Größe erreicht ist.`)
              : tt(`An uplift of ${lift}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Uplift von ${lift} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`)
            : tt(`An uplift of ${lift}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Uplift von ${lift} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B5 · how an architecture is built: Spree's recommender and its base */

/**
 * The worked example of Materi B5 on the example company Spree Systems (a Berlin software provider, Case assumption): a small version of the Route 2
 * panel. Two controls set the same two facts the panel reads: does measurement start before the recommender, and is its data ready. The links in
 * the picture break the way the panel's do, and "What this shows" says what the break means.
 */
export function ArchExample() {
  const [measFirst, setMeasFirstRaw] = useState(true);
  const [ready, setReadyRaw] = useState(true);
  const story = useStory([
    {
      title: tt("The base first", "Die Basis zuerst"),
      say: tt("Spree Systems is an example company, not your case. It builds its KPI system and test routine first, so its recommender is measured from its first week.", "Spree Systems ist ein Beispielunternehmen, nicht Ihr Fall. Es baut zuerst sein KPI-System und seine Test-Routine, damit seine Empfehlung ab der ersten Woche gemessen wird."),
      look: tt("the solid teal link between the recommender and the base", "die durchgezogene teal Verbindung zwischen Empfehlung und Basis"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The tool before the base", "Das Werkzeug vor der Basis"),
      say: tt("Now the recommender starts first. Nothing measures it, so nobody can say whether it sells more. Its link is dashed.", "Jetzt startet die Empfehlung zuerst. Nichts misst sie, also kann niemand sagen, ob sie mehr verkauft. Ihre Verbindung ist gestrichelt."),
      look: tt("the dashed amber link and the note on the recommender", "die gestrichelte amberfarbene Verbindung und der Vermerk an der Empfehlung"),
      apply: () => {
        setMeasFirstRaw(false);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Measured, but on data only 70% ready, the recommender would learn the gaps. Base first, then an engine on ready data. Try the two buttons.", "Gemessen, aber auf nur zu 70 % bereiten Daten würde die Empfehlung die Lücken lernen. Zuerst die Basis, dann eine Engine auf bereiten Daten. Probieren Sie die beiden Schaltflächen."),
      look: tt("the data note under the recommender", "den Datenvermerk unter der Empfehlung"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(false);
      },
    },
  ]);
  const setMeasFirst = (v: boolean) => {
    story.leave();
    setMeasFirstRaw(v);
  };
  const setReady = (v: boolean) => {
    story.leave();
    setReadyRaw(v);
  };
  const dataPct = ready ? 92 : 70;
  const dataOk = dataPct >= 80;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An architecture is built in order: the base first, then measurement, then the data, then the engines. Where a link in that chain is missing, the tool above it cannot be trusted.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis, dann die Messung, dann die Daten, dann die Engines. Wo ein Glied dieser Kette fehlt, lässt sich dem Werkzeug darüber nicht trauen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div role="group" aria-label={tt("Spree's recommender and its base", "Die Empfehlung von Spree und ihre Basis")} className="mx-auto max-w-xl">
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What customers meet: upgrade offers in the portal", "Was Kunden erleben: Upgrade-Angebote im Portal")}</div>
        <div className="my-1 flex h-7 items-center justify-center" aria-hidden />
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("Upsell recommender", "Upsell-Empfehlung")}</p>
          <p className="text-ash">{tt(measFirst ? "Starts in month 1" : "Starts in month 1, before the base", measFirst ? "Startet in Monat 1" : "Startet in Monat 1, vor der Basis")}</p>
          {!measFirst && <p className="text-accent">{tt("nothing measures it yet", "noch misst es nichts")}</p>}
          {!dataOk && <p className="text-accent">{tt(`its data is ${dataPct}% ready, below 80%, when it starts`, `seine Daten sind zu ${dataPct} % bereit, unter 80 %, wenn es startet`)}</p>}
        </div>
        <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", measFirst ? "text-ash" : "text-accent")}>
          <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", measFirst ? "border-solid border-signal" : "border-dashed border-gold")} />
          <span>{measFirst ? tt("measured", "gemessen") : tt("not measured", "nicht gemessen")}</span>
        </div>
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", measFirst ? "border-signal bg-signalSoft" : "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("KPI system and test routine", "KPI-System und Test-Routine")}</p>
          <p className="text-ash">{measFirst ? tt("Starts in month 1", "Startet in Monat 1") : tt("Starts in month 3, after the recommender", "Startet in Monat 3, nach der Empfehlung")}</p>
        </div>
        <div className="flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal text-ash">
          <span aria-hidden className="block h-full w-0 border-l-[3px] border-solid border-signal" />
          <span>{tt("raw data flows up", "Rohdaten fließen nach oben")}</span>
        </div>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt(`Where the data lives: CRM and shop, ${dataPct}% of what the recommender needs is ready`, `Wo die Daten liegen: CRM und Shop, ${dataPct} % dessen, was die Empfehlung braucht, sind bereit`)}</div>
      </div>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Two things to change", "Zwei Dinge zum Ändern")}</p>
        <Toggles<string> label={tt("Measurement starts", "Die Messung startet")} value={measFirst ? "first" : "after"} onChange={(v) => setMeasFirst(v === "first")} options={[{ id: "first", label: tt("Before the recommender", "Vor der Empfehlung") }, { id: "after", label: tt("After the recommender", "Nach der Empfehlung") }]} />
        <Toggles<string> label={tt("Data behind the recommender", "Daten hinter der Empfehlung")} value={ready ? "ready" : "weak"} onChange={(v) => setReady(v === "ready")} options={[{ id: "ready", label: tt("92% ready", "92 % bereit") }, { id: "weak", label: tt("70% ready", "70 % bereit") }]} />
      </div>
      <Insight>{plain()}
        {measFirst && dataOk
          ? tt("The base exists before the tool and the tool runs on data that is ready. Spree can say whether the recommender sells more, and its data does not teach it gaps. This is what a plan that holds looks like.", "Die Basis steht vor dem Werkzeug, und das Werkzeug läuft auf bereiten Daten. Spree kann sagen, ob die Empfehlung mehr verkauft, und ihre Daten lehren sie keine Lücken. So sieht ein Plan aus, der hält.")
          : !measFirst
            ? tt("The recommender starts before anything can measure it. Its link to the base is dashed: Spree would pay for a tool and never know whether it works. The fix is the order: the KPI system and the test routine first.", "Die Empfehlung startet, bevor etwas sie messen kann. Ihre Verbindung zur Basis ist gestrichelt: Spree würde für ein Werkzeug zahlen und nie wissen, ob es wirkt. Die Lösung ist die Reihenfolge: zuerst KPI-System und Test-Routine.")
            : tt("It is measured, but its data is only 70% ready, below the 80% an engine should start on. It would learn the gaps. The fix is to clean the data first, or to hold the engine back until it is ready.", "Sie wird gemessen, aber ihre Daten sind nur zu 70 % bereit, unter den 80 %, auf denen eine Engine starten sollte. Sie würde die Lücken lernen. Die Lösung ist, zuerst die Daten zu bereinigen oder die Engine zurückzuhalten, bis sie bereit sind.")}
      </Insight>
    </div>
  );
}
