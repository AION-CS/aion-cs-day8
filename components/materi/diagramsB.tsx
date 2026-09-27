"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Spree Systems (a Berlin software provider,
 * Case assumption), never AIConnect. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20).
 */
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
  const [st, setSt] = useState<Stage>("dash");
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an AI-based control system", "Vier Stufen zu einem KI-gestützten Steuerungssystem")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
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
      <Insight>{s.reading}</Insight>
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
  const [sel, setSel] = useState("voice");
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
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
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Technology", "Technologie")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
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
  const [sel, setSel] = useState("views");
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Spree Systems on four tests", "Ein KPI-Kandidat von Spree Systems nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
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
      <Insight>
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and conversions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLift] = useState(20);
  const [cases, setCases] = useState(40);
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
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
      <Insight>
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

/* ------------------------------------------------------------------ B5 · Spree's architecture over six months */

const I_ARCH = bi([
  { id: "base", name: t("KPI system and test routine", "KPI-System und Test-Routine"), start: 1, owner: t("Head of Data", "Leitung Data"), trigger: t("If the three KPIs are not filled for 95% of customers by month 2, the recommender waits.", "Sind die drei KPIs bis Monat 2 nicht für 95 % der Kunden gefüllt, wartet die Empfehlung."), why: t("Starts first: every other item is measured by it.", "Startet zuerst: Jeder andere Punkt wird daran gemessen.") },
  { id: "score", name: t("Upsell recommender", "Upsell-Empfehlung"), start: 2, owner: t("Head of Data", "Leitung Data"), trigger: t("If the upgrade rate is not at least 1.2 times the control group's on 100 upgrades per group by month 4, the model is retrained before any rollout.", "Liegt die Upgrade-Rate bis Monat 4 bei 100 Upgrades pro Gruppe nicht bei mindestens dem 1,2-Fachen der Kontrollgruppe, wird das Modell vor jedem Rollout neu trainiert."), why: t("Starts once the KPI system can measure it.", "Startet, sobald das KPI-System sie messen kann.") },
  { id: "calls", name: t("Win-back e-mails", "Rückgewinnungs-E-Mails"), start: 3, owner: t("Head of Marketing", "Marketingleitung"), trigger: t("If unsubscribes rise above 0.5% in any month, the trigger with the most unsubscribes is paused.", "Steigen die Abmeldungen in einem Monat über 0,5 %, wird der Trigger mit den meisten Abmeldungen pausiert."), why: t("Starts when the first test routine has run once.", "Startet, wenn die erste Test-Routine einmal gelaufen ist.") },
]);
export function ArchExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("base");
  const r = I_ARCH.find((x) => x.id === sel)!;
  const X = (m: number) => 190 + (m - 1) * 60;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Spree's three funded items by start month", "Die drei finanzierten Punkte von Spree nach Startmonat")}</title>
        <desc id={`${uid}-d`}>{I_ARCH.map((a) => `${a.name}: ${a.start}`).join(". ")}</desc>
        {[1, 2, 3, 4, 5, 6].map((m) => (
          <text key={m} x={X(m) + 30} y="14" textAnchor="middle" fontSize="11.5" fill={C.ash}>{`M${m}`}</text>
        ))}
        {I_ARCH.map((a, i) => {
          const y = 24 + i * 44;
          const on = a.id === sel;
          return (
            <g key={a.id} className="hit" role="button" tabIndex={0} aria-label={a.name} onClick={() => setSel(a.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(a.id)}>
              <text x="4" y={y + 22} fontSize="12" fontWeight={on ? 800 : 600} fill={C.ink}>{a.name.length > 28 ? `${a.name.slice(0, 27)}…` : a.name}</text>
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <rect key={m} className={m === a.start ? "hit-shape" : undefined} x={X(m) + 2} y={y + 6} width="56" height="24" rx="3" fill={m === a.start ? C.data : m > a.start ? C.tealSoft : C.paper} stroke={on && m === a.start ? C.amber : C.line} strokeWidth={on && m === a.start ? 2.5 : 1} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Read one item", "Einen Punkt lesen")}</p>
        <Toggles<string> label={tt("Item", "Punkt")} value={sel} onChange={setSel} options={I_ARCH.map((a) => ({ id: a.id, label: a.name }))} />
      </div>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{r.name}</p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Owner. </span>
          {r.owner}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Trigger. </span>
          <Gloss>{r.trigger}</Gloss>
        </p>
        <p className="mt-1 text-ash">{r.why}</p>
      </div>
      <Insight>
        {tt(
          "The KPI system and test routine start first, because every other item is measured by them. Each item has one owner who can change it alone and a trigger with a number, a date and an action. Spree left out a vendor's all-in AI suite on purpose: a system nobody at Spree can explain or measure cannot be steered.",
          "KPI-System und Test-Routine starten zuerst, weil jeder andere Punkt daran gemessen wird. Jeder Punkt hat einen Owner, der ihn allein ändern kann, und einen Trigger mit Zahl, Datum und Aktion. Spree hat die All-in-KI-Suite eines Anbieters bewusst weggelassen: Ein System, das bei Spree niemand erklären oder messen kann, lässt sich nicht steuern.",
        )}
      </Insight>
    </div>
  );
}
