"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { LEVEL_LABEL } from "@/data/ladder";
import type { LevelTag } from "@/data/ladder";
import { MOSEL, MOSEL_RESULT, extraOf } from "@/data/forecast";
import { PATTERNS } from "@/data/patterns";
import type { PatternId } from "@/data/patterns";
import { EVIDENCE_LABEL, explainBucket } from "@/data/measures";
import type { Evidence } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * The interactive diagrams of Materi A (Route 1). Every one uses the worked-example company Mosel Software (a Trier software house,
 * Case assumption), never AIConnect, so the answer to a task block is never printed. Every control is followed by an always-visible
 * "What this shows" (CLAUDE.md #20).
 */
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", rustSoft: "#F6E3DB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };

/* ------------------------------------------------------------------ A1 · tool first or problem first */

type Start = "tool" | "problem";
const START = bi({
  tool: {
    label: t("Tool first", "Werkzeug zuerst"),
    steps: [t("Buy an AI marketing suite", "KI-Marketing-Suite kaufen"), t("Look for things it can do", "Suchen, was sie kann"), t("Personalise every channel", "Jeden Kanal personalisieren"), t("Report activity", "Aktivität berichten")],
    result: t("€90,000 spent · e-mails sent up 40% · conversion: unknown", "90.000 € ausgegeben · versendete E-Mails +40 % · Conversion: unbekannt"),
    reading: t("Mosel started with the tool. Six months later it could report how much the suite sent, not whether a single customer bought more or stayed longer: no KPI was named before the money was spent. That is technology without strategy.", "Mosel hat mit dem Werkzeug angefangen. Sechs Monate später konnte es berichten, wie viel die Suite verschickte, nicht aber, ob ein einziger Kunde mehr kaufte oder länger blieb: Vor der Ausgabe wurde kein KPI benannt. Das ist Technologie ohne Strategie."),
  },
  problem: {
    label: t("Problem first", "Problem zuerst"),
    steps: [t("Name the problem: few renewals upgrade", "Problem benennen: wenige Verlängerungen mit Upgrade"), t("Choose the KPI: upgrade rate", "KPI wählen: Upgrade-Rate"), t("Test one AI idea against a control group", "Eine KI-Idee gegen eine Kontrollgruppe testen"), t("Scale what wins", "Skalieren, was gewinnt")],
    result: t("€25,000 spent · upgrade rate 2.0% → 3.0% against the control group", "25.000 € ausgegeben · Upgrade-Rate 2,0 % → 3,0 % gegen die Kontrollgruppe"),
    reading: t("Mosel started with a problem and a KPI, and let one AI idea earn its place in a test. It spent less, and it knows what the money did. AI added value because it answered a measured problem, not because it was AI.", "Mosel hat mit einem Problem und einem KPI angefangen und eine KI-Idee sich ihren Platz in einem Test verdienen lassen. Es gab weniger aus und weiß, was das Geld bewirkt hat. KI brachte Mehrwert, weil sie ein gemessenes Problem beantwortete, nicht weil sie KI war."),
  },
});

export function ToolOrProblem() {
  const uid = useId().replace(/:/g, "");
  const [start, setStart] = useState<Start>("tool");
  const s = START[start];
  const stroke = start === "tool" ? C.grey : C.data;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Two ways Mosel Software could start with AI", "Zwei Wege, wie Mosel Software mit KI anfangen könnte")}</title>
        <desc id={`${uid}-d`}>{`${s.label}: ${s.steps.join(" → ")}. ${s.result}`}</desc>
        <defs>
          <marker id={`${uid}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.ash} />
          </marker>
        </defs>
        {s.steps.map((st, i) => {
          const x = 8 + i * 138;
          return (
            <g key={i}>
              <rect x={x} y="20" width="124" height="70" rx="8" fill={i === 0 ? C.soft : C.paper} stroke={i === 0 ? C.amber : stroke} strokeWidth={i === 0 ? 2.2 : 1.4} strokeDasharray={start === "tool" && i > 0 ? "5 4" : undefined} />
              <foreignObject x={x + 6} y="26" width="112" height="60">
                <div style={{ fontSize: 11.5, lineHeight: 1.25, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{st}</div>
              </foreignObject>
              {i < 3 && <line x1={x + 124} y1="55" x2={x + 136} y2="55" stroke={C.ash} strokeWidth="1.6" markerEnd={`url(#${uid}-arr)`} />}
            </g>
          );
        })}
        <rect x="8" y="112" width="538" height="40" rx="6" fill={start === "tool" ? C.mist : C.tealSoft} stroke={start === "tool" ? C.grey : C.teal} strokeDasharray={start === "tool" ? "5 4" : undefined} />
        <text x="277" y="137" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.ink}>{s.result}</text>
      </svg>
      <Toggles<Start> label={tt("Where Mosel starts", "Wo Mosel anfängt")} value={start} onChange={setStart} options={[{ id: "tool", label: START.tool.label }, { id: "problem", label: START.problem.label }]} />
      <Insight>{s.reading}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Mosel Software (Case assumption). A dashed outline marks a step that no KPI checks.", "Illustration mit Mosel Software (Fallannahme). Ein gestrichelter Rahmen markiert einen Schritt, den kein KPI prüft.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · how "customers also bought" works */

type Prod = "backup" | "archive" | "security" | "training";
const PRODS: Prod[] = ["backup", "archive", "security", "training"];
const PROD_LABEL = bi({ backup: t("Backup", "Backup"), archive: t("Archive", "Archiv"), security: t("Security", "Security"), training: t("Training", "Schulung") });
/** Mosel customers who own both products (Case assumption); the diagonal is the number who own the product. */
const BOTH: Record<Prod, Record<Prod, number>> = {
  backup: { backup: 120, archive: 54, security: 30, training: 12 },
  archive: { backup: 54, archive: 70, security: 18, training: 9 },
  security: { backup: 30, archive: 18, security: 60, training: 33 },
  training: { backup: 12, archive: 9, security: 33, training: 45 },
};
const bestFor = (p: Prod) => PRODS.filter((q) => q !== p).sort((a, b) => BOTH[p][b] - BOTH[p][a])[0];

const M_IDEAS = bi([
  { id: "a", text: t("“Customers who bought Security also booked the training: offer it on the Security page.”", "„Kunden, die Security kauften, buchten auch die Schulung: Sie auf der Security-Seite anbieten.“"), tag: "reco" as LevelTag, why: t("A product is chosen from what other customers bought together: recommendation.", "Ein Produkt wird aus dem gewählt, was andere Kunden zusammen kauften: Empfehlung.") },
  { id: "b", text: t("“Send finance contacts the invoice summary, admins the release notes.”", "„Finanzkontakten die Rechnungsübersicht schicken, Admins die Release Notes.“"), tag: "comm" as LevelTag, why: t("The message changes with the reader; the product does not: communication.", "Die Nachricht ändert sich mit dem Leser; das Produkt nicht: Kommunikation.") },
  { id: "c", text: t("“A bot resends licence keys by itself, day and night.”", "„Ein Bot verschickt Lizenzschlüssel selbst, Tag und Nacht.“"), tag: "auto" as LevelTag, why: t("A machine does a step a person did before: automation.", "Eine Maschine erledigt einen Schritt, den vorher ein Mensch machte: Automatisierung.") },
]);

export function RecoBasket() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<Prod>("security");
  const [open, setOpen] = useState<string[]>([]);
  const best = bestFor(sel);
  const cell = 70;
  const x0 = 110;
  const y0 = 40;
  const share = Math.round((BOTH[sel][best] / BOTH[sel][sel]) * 100);
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 360" className="mx-auto h-auto w-full max-w-[520px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel customers who own both products", "Kunden von Mosel, die beide Produkte besitzen")}</title>
        <desc id={`${uid}-d`}>{tt(`Selected: ${PROD_LABEL[sel]}. Most often bought with it: ${PROD_LABEL[best]}.`, `Gewählt: ${PROD_LABEL[sel]}. Am häufigsten dazu gekauft: ${PROD_LABEL[best]}.`)}</desc>
        {PRODS.map((q, j) => (
          <text key={`h${q}`} x={x0 + j * cell + cell / 2} y={y0 - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.ink}>{PROD_LABEL[q]}</text>
        ))}
        {PRODS.map((p, i) => (
          <g key={p} className="hit" role="button" tabIndex={0} aria-label={tt(`Select ${PROD_LABEL[p]}`, `${PROD_LABEL[p]} wählen`)} onClick={() => setSel(p)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(p)}>
            <rect className="hit-shape" x="4" y={y0 + i * cell + 16} width="96" height="38" rx="6" fill={p === sel ? C.soft : C.paper} stroke={p === sel ? C.amber : C.line} strokeWidth={p === sel ? 2.2 : 1.2} />
            <text x="52" y={y0 + i * cell + 40} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.ink}>{PROD_LABEL[p]}</text>
            {PRODS.map((q, j) => {
              const v = BOTH[p][q];
              const diag = p === q;
              const hot = p === sel && q === best;
              return (
                <g key={q}>
                  <rect x={x0 + j * cell + 3} y={y0 + i * cell + 3} width={cell - 6} height={cell - 6} rx="4" fill={diag ? C.mist : p === sel ? C.tealSoft : C.paper} stroke={hot ? C.amber : C.line} strokeWidth={hot ? 3 : 1} />
                  <text x={x0 + j * cell + cell / 2} y={y0 + i * cell + cell / 2 + 5} textAnchor="middle" fontSize="14" fontWeight={hot ? 700 : 400} fill={diag ? C.ash : C.ink}>{v}</text>
                </g>
              );
            })}
          </g>
        ))}
        <text x={x0} y={y0 + 4 * cell + 22} fontSize="11.5" fill={C.ash}>{tt("grey = customers who own the product · other cells = customers who own both", "grau = Kunden, die das Produkt besitzen · andere Zellen = Kunden, die beide besitzen")}</text>
      </svg>
      <Toggles<Prod> label={tt("Customer is looking at", "Kunde schaut auf")} value={sel} onChange={setSel} options={PRODS.map((p) => ({ id: p, label: PROD_LABEL[p] }))} />
      <Insight>
        {tt(
          `Of the ${BOTH[sel][sel]} customers who own ${PROD_LABEL[sel]}, ${BOTH[sel][best]} (${share}%) also own ${PROD_LABEL[best]}, more than any other product. So the system shows “customers who bought ${PROD_LABEL[sel]} also bought ${PROD_LABEL[best]}”. It does not know why they belong together; it only counts what customers did.`,
          `Von den ${BOTH[sel][sel]} Kunden, die ${PROD_LABEL[sel]} besitzen, besitzen ${BOTH[sel][best]} (${share} %) auch ${PROD_LABEL[best]}, mehr als jedes andere Produkt. Also zeigt das System „Kunden, die ${PROD_LABEL[sel]} kauften, kauften auch ${PROD_LABEL[best]}“. Es weiß nicht, warum sie zusammengehören; es zählt nur, was Kunden taten.`,
        )}
      </Insight>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("A worked sort: three ideas at Mosel Software", "Eine Beispielsortierung: drei Ideen bei Mosel Software")}</p>
        <ul className="space-y-1.5">
          {M_IDEAS.map((x) => {
            const on = open.includes(x.id);
            return (
              <li key={x.id} className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
                <p className="text-ink">{x.text}</p>
                <button type="button" aria-expanded={on} onClick={() => setOpen((o) => (on ? o.filter((y) => y !== x.id) : [...o, x.id]))} className="btn-ghost btn-sm mt-1">
                  {on ? tt("Hide", "Verbergen") : tt("Show the kind and why", "Art und Grund zeigen")}
                </button>
                {on && (
                  <p className="mt-1 text-ink">
                    <strong>{LEVEL_LABEL[x.tag]}.</strong> {x.why}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ A3 · automate, assist or keep a person */

type Verdict = "auto" | "assist" | "human";
type MSit = { id: string; name: string; routine: 0 | 1 | 2; stakes: 0 | 1 | 2; volume: number; verdict: Verdict; why: string };
const M_SITS: MSit[] = bi([
  { id: "m1", name: t("Resend a licence key", "Lizenzschlüssel erneut senden"), routine: 2 as const, stakes: 0 as const, volume: 400, verdict: "auto" as Verdict, why: t("Same answer every time, nothing at stake, 400 a month: automate fully.", "Jedes Mal dieselbe Antwort, nichts auf dem Spiel, 400 im Monat: voll automatisieren.") },
  { id: "m2", name: t("Copy of an invoice", "Rechnungskopie"), routine: 2 as const, stakes: 0 as const, volume: 150, verdict: "auto" as Verdict, why: t("A document the system holds, low stakes, 150 a month: automate fully.", "Ein Dokument, das das System hat, geringer Einsatz, 150 im Monat: voll automatisieren.") },
  { id: "m3", name: t("Change of billing address", "Änderung der Rechnungsadresse"), routine: 2 as const, stakes: 0 as const, volume: 20, verdict: "assist" as Verdict, why: t("Routine and low stakes, but only 20 a month: building full automation does not pay; a person with a template (assist) is enough.", "Routine und geringer Einsatz, aber nur 20 im Monat: Volle Automatisierung lohnt sich nicht; ein Mensch mit Vorlage (unterstützen) reicht.") },
  { id: "m4", name: t("Setup question at night", "Einrichtungsfrage in der Nacht"), routine: 1 as const, stakes: 0 as const, volume: 90, verdict: "assist" as Verdict, why: t("Only partly routine: a chatbot answers the known issues and hands the rest to a person in the morning.", "Nur teilweise Routine: Ein Chatbot beantwortet die bekannten Probleme und übergibt den Rest morgens an einen Menschen.") },
  { id: "m5", name: t("Discount for 50 seats", "Rabatt für 50 Arbeitsplätze"), routine: 2 as const, stakes: 1 as const, volume: 30, verdict: "assist" as Verdict, why: t("A price is a commitment: dynamic pricing may propose it within a band, a person confirms it.", "Ein Preis ist eine Zusage: Dynamic Pricing darf ihn innerhalb einer Spanne vorschlagen, ein Mensch bestätigt ihn.") },
  { id: "m6", name: t("Customer threatens to switch", "Kunde droht mit Wechsel"), routine: 0 as const, stakes: 2 as const, volume: 4, verdict: "human" as Verdict, why: t("A contract at stake and no standard answer: a person, fast.", "Ein Vertrag steht auf dem Spiel, und es gibt keine Standardantwort: ein Mensch, schnell.") },
  { id: "m7", name: t("Security incident report", "Meldung eines Sicherheitsvorfalls"), routine: 0 as const, stakes: 2 as const, volume: 3, verdict: "human" as Verdict, why: t("A worried customer and possible damage: only a person can take responsibility.", "Ein besorgter Kunde und möglicher Schaden: Nur ein Mensch kann Verantwortung übernehmen.") },
]);
const VERDICT_LABEL = bi({ auto: t("Automate fully", "Voll automatisieren"), assist: t("Assist: automation prepares, a person decides", "Unterstützen: Automatisierung bereitet vor, ein Mensch entscheidet"), human: t("Keep with a person", "Bei einem Menschen lassen") });
const VERDICT_GLYPH: Record<Verdict, string> = { auto: "●", assist: "◐", human: "○" };

export function AutomationGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<string>("m1");
  const s = M_SITS.find((x) => x.id === sel)!;
  const X = (r: number) => 110 + r * 140;
  const Y = (k: number) => 250 - k * 80;
  const pos = (x: MSit, i: number) => {
    const same = M_SITS.filter((y) => y.routine === x.routine && y.stakes === x.stakes && y.verdict === x.verdict);
    const k = same.indexOf(x);
    // A routine, low-stakes situation with too few requests stays outside the automate box, to its left.
    const base = x.routine === 2 && x.stakes === 0 && x.verdict !== "auto" ? X(2) - 62 : X(x.routine) + (x.routine === 2 && x.stakes === 0 ? 12 : 0);
    return { cx: base + (k - (same.length - 1) / 2) * 34, cy: Y(x.stakes) + (i % 2 === 0 ? 0 : 0) };
  };
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 310" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel Software's contact situations by routine and stakes", "Kontaktsituationen von Mosel Software nach Routine und Einsatz")}</title>
        <desc id={`${uid}-d`}>{`${s.name}: ${VERDICT_LABEL[s.verdict]}.`}</desc>
        <defs>
          <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="40" y="130" width="420" height="160" fill={C.mist} opacity="0.6" />
        <rect x="355" y="210" width="105" height="80" fill={C.tealSoft} stroke={C.teal} />
        <rect x="40" y="50" width="420" height="80" fill={`url(#${uid}-hatch)`} stroke={C.amber} />
        <text x="407" y="284" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.teal}>{tt("automate: 100+/month", "automatisieren: ab 100/Monat")}</text>
        <text x="250" y="66" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep a person", "Mensch behalten")}</text>
        <text x="180" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.ash}>{tt("assist", "unterstützen")}</text>
        {[tt("No", "Nein"), tt("Partly", "Teilweise"), tt("Yes", "Ja")].map((l, r) => (
          <text key={r} x={X(r)} y="306" textAnchor="middle" fontSize="11.5" fill={C.ash}>{l}</text>
        ))}
        <text x="470" y="306" fontSize="11" fill={C.ash}>{tt("same answer?", "gleiche Antwort?")}</text>
        {[tt("Low", "Gering"), tt("Mid", "Mittel"), tt("High", "Hoch")].map((l, k) => (
          <text key={k} x="34" y={Y(k) + 4} textAnchor="end" fontSize="11.5" fill={C.ash}>{l}</text>
        ))}
        <text x="4" y="30" fontSize="11" fill={C.ash}>{tt("what is at stake", "was auf dem Spiel steht")}</text>
        {M_SITS.map((x, i) => {
          const p = pos(x, i);
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 14 : 11} fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" />
              <text x={p.cx} y={p.cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? C.ink : C.paper}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={tt("Situations", "Situationen")} className="flex flex-wrap gap-2">
        {M_SITS.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={x.id === sel} onClick={() => setSel(x.id)} className={`btn btn-sm min-h-[40px] border ${x.id === sel ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash"}`}>
            {`${i + 1} · ${x.name}`}
          </button>
        ))}
      </div>
      <Insight>
        {`${s.name} · ${tt(`${s.volume} a month`, `${s.volume} im Monat`)} · ${VERDICT_GLYPH[s.verdict]} ${VERDICT_LABEL[s.verdict]}. ${s.why}`}
      </Insight>
      <p className="text-caption text-ash">{tt("Illustration on Mosel Software (Case assumption). Hatched = keep a person; teal = automate fully; the grey middle = assist.", "Illustration mit Mosel Software (Fallannahme). Schraffiert = Mensch behalten; teal = voll automatisieren; die graue Mitte = unterstützen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · reading a pilot (Mosel Software) */

export function PilotExample() {
  const uid = useId().replace(/:/g, "");
  const [yearly, setYearly] = useState(MOSEL.yearly);
  const r = MOSEL_RESULT;
  const extra = extraOf(yearly, r.rate, r.other, MOSEL.order);
  const W = (p: number) => (p / 4) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel Software's pilot: personalised offer against standard offer", "Pilot von Mosel Software: personalisiertes Angebot gegen Standardangebot")}</title>
        <desc id={`${uid}-d`}>{tt(`Personalised ${r.rate}%, standard ${r.other}%, uplift ${r.lift}.`, `Personalisiert ${r.rate} %, Standard ${r.other} %, Uplift ${r.lift}.`)}</desc>
        <text x="0" y="36" fontSize="12" fill={C.ink}>{tt("Personalised offer", "Personalisiertes Angebot")}</text>
        <rect x="170" y="20" width={W(r.rate)} height="26" fill={C.data} stroke={C.ink} />
        <text x={176 + W(r.rate)} y="38" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.rate)} (${MOSEL.variant.orders} ${tt("of", "von")} ${num(MOSEL.variant.sent)})`}</text>
        <text x="0" y="86" fontSize="12" fill={C.ink}>{tt("Standard offer", "Standardangebot")}</text>
        <rect x="170" y="70" width={W(r.other)} height="26" fill={C.grey} stroke={C.ink} />
        <text x={176 + W(r.other)} y="88" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.other)} (${MOSEL.control.orders} ${tt("of", "von")} ${num(MOSEL.control.sent)})`}</text>
        <text x="170" y="128" fontSize="13" fontWeight="700" fill={C.amber}>{tt(`Uplift = ${r.rate} ÷ ${r.other} = ${num(r.lift)} times the standard rate`, `Uplift = ${num(r.rate)} ÷ ${num(r.other)} = das ${num(r.lift)}-Fache der Standardrate`)}</text>
      </svg>
      <div className="space-y-1.5">
        <label htmlFor={`${uid}-y`} className="smallcaps block">
          {tt(`Mosel's offer e-mails a year: ${num(yearly)}`, `Angebots-E-Mails von Mosel pro Jahr: ${num(yearly)}`)}
        </label>
        <input id={`${uid}-y`} type="range" min={2000} max={20000} step={1000} value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
      </div>
      <Insight>
        {tt(
          `${num(yearly)} e-mails × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} extra a year. Only the difference between the two rates counts as extra: the standard offer would have sold ${pct(r.other)} anyway. ${yearly === MOSEL.yearly ? "At 10,000 e-mails the example gives €60,000." : `Moving the slider changes how often the uplift is used, not the uplift itself: ${yearly > MOSEL.yearly ? "more" : "fewer"} e-mails, ${yearly > MOSEL.yearly ? "more" : "less"} extra revenue.`}`,
          `${num(yearly)} E-Mails × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} zusätzlich pro Jahr. Nur der Unterschied zwischen den beiden Raten zählt als zusätzlich: Das Standardangebot hätte ${pct(r.other)} ohnehin verkauft. ${yearly === MOSEL.yearly ? "Bei 10.000 E-Mails ergibt das Beispiel 60.000 €." : `Der Regler ändert, wie oft der Uplift genutzt wird, nicht den Uplift selbst: ${yearly > MOSEL.yearly ? "mehr" : "weniger"} E-Mails, ${yearly > MOSEL.yearly ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · a KPI tree (Mosel Software) */

type MMetric = { id: string; name: string; kind: PatternId; moved: boolean; why: string };
const M_METRICS: MMetric[] = bi([
  { id: "rev", name: t("Revenue per customer", "Umsatz pro Kunde"), kind: "outcome" as PatternId, moved: true, why: t("Money: the result Mosel is paid for. It moves last.", "Geld: das Ergebnis, für das Mosel bezahlt wird. Es bewegt sich zuletzt.") },
  { id: "renew", name: t("Renewal rate", "Verlängerungsrate"), kind: "outcome" as PatternId, moved: true, why: t("Customers kept: a result.", "Gehaltene Kunden: ein Ergebnis.") },
  { id: "wau", name: t("Weekly active users", "Wöchentlich aktive Nutzer"), kind: "driver" as PatternId, moved: true, why: t("A customer behaviour that comes before renewals, and service can move it.", "Ein Kundenverhalten, das vor Verlängerungen kommt, und der Service kann es bewegen.") },
  { id: "click", name: t("Clicks on recommended add-ons", "Klicks auf empfohlene Add-ons"), kind: "driver" as PatternId, moved: false, why: t("Customers act before they buy; it did not move with value last year, which is a finding, not another kind.", "Kunden handeln, bevor sie kaufen; es bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art.") },
  { id: "compl", name: t("Complaints per 1,000 contacts", "Beschwerden pro 1.000 Kontakte"), kind: "guardrail" as PatternId, moved: true, why: t("It must not rise while Mosel automates: a guardrail.", "Sie dürfen nicht steigen, während Mosel automatisiert: eine Guardrail.") },
  { id: "news", name: t("Newsletters sent", "Versendete Newsletter"), kind: "vanity" as PatternId, moved: false, why: t("Counts Mosel's own activity: a vanity metric.", "Zählt die eigene Aktivität von Mosel: eine Vanity Metric.") },
]);
const KIND_POS: Record<PatternId, { x: number; y: number }> = { outcome: { x: 150, y: 30 }, driver: { x: 150, y: 150 }, guardrail: { x: 420, y: 90 }, vanity: { x: 420, y: 230 } };

export function KpiTree() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("wau");
  const [past, setPast] = useState(false);
  const m = M_METRICS.find((x) => x.id === sel)!;
  const boxes = M_METRICS.map((x) => {
    const same = M_METRICS.filter((y) => y.kind === x.kind);
    const k = same.indexOf(x);
    const base = KIND_POS[x.kind];
    const w = same.length > 1 ? 130 : 140;
    return { x, bx: base.x - (same.length > 1 ? 140 : 70) + k * 150, by: base.y, w };
  });
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel Software's metrics as a KPI tree", "Die Kennzahlen von Mosel Software als KPI-Baum")}</title>
        <desc id={`${uid}-d`}>{`${m.name}: ${PATTERNS[m.kind].label}.`}</desc>
        <line x1="75" y1="78" x2="75" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="225" y1="78" x2="225" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="75" y1="114" x2="225" y2="114" stroke={C.ink} strokeWidth="1.6" />
        <rect x="340" y="80" width="190" height="72" rx="6" fill="none" stroke={C.amber} strokeDasharray="6 4" />
        <rect x="340" y="222" width="190" height="66" rx="6" fill="none" stroke={C.grey} strokeDasharray="3 4" />
        <text x="435" y="76" textAnchor="middle" fontSize="10.5" fill={C.amber}>{tt("guardrail: must not get worse", "Guardrail: darf nicht schlechter werden")}</text>
        <text x="435" y="218" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("outside the tree: decides nothing", "außerhalb des Baums: entscheidet nichts")}</text>
        {boxes.map(({ x, bx, by, w }) => {
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <rect className="hit-shape" x={bx} y={by} width={w} height="48" rx="6" fill={on ? C.soft : x.kind === "vanity" ? C.mist : C.paper} stroke={on ? C.amber : C.ink} strokeWidth={on ? 2.4 : 1.2} />
              <foreignObject x={bx + 4} y={by + 4} width={w - 8} height="40">
                <div style={{ fontSize: 11.5, lineHeight: 1.2, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              {past && (
                <text x={bx + w - 6} y={by + 60} textAnchor="end" fontSize="10.5" fontWeight="700" fill={x.moved ? C.teal : C.ash}>{x.moved ? tt("● moved with value", "● mit dem Wert bewegt") : tt("○ did not move", "○ nicht bewegt")}</text>
              )}
            </g>
          );
        })}
        <text x="8" y="22" fontSize="10.5" fill={C.ash}>{tt("outcome", "Outcome")}</text>
        <text x="8" y="142" fontSize="10.5" fill={C.ash}>{tt("drivers", "Treiber")}</text>
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={tt("Metric", "Kennzahl")} value={sel} onChange={setSel} options={M_METRICS.map((x) => ({ id: x.id, label: x.name }))} />
        <Toggles<string> label={tt("Last year", "Letztes Jahr")} value={past ? "on" : null} onChange={() => setPast((v) => !v)} options={[{ id: "on", label: past ? tt("Hide last year", "Letztes Jahr verbergen") : tt("Show whether it moved with value last year", "Zeigen, ob es sich letztes Jahr mit dem Wert bewegte") }]} />
      </div>
      <Insight>
        {past
          ? tt(
              `${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Last year it ${m.moved ? "moved" : "did not move"} with customer value. Of Mosel's two outcomes both moved, of its two drivers one, its guardrail moved, its vanity metric did not: the closer to the top of the tree, the stronger the link.`,
              `${m.name} ist ${m.kind === "outcome" ? "ein Outcome-KPI" : m.kind === "driver" ? "ein Treiber-KPI" : m.kind === "guardrail" ? "eine Guardrail" : "eine Vanity Metric"}: ${m.why} Letztes Jahr ${m.moved ? "bewegte es sich" : "bewegte es sich nicht"} mit dem Kundenwert. Von Mosels zwei Outcomes bewegten sich beide, von den zwei Treibern einer, die Guardrail bewegte sich, die Vanity Metric nicht: Je näher an der Spitze des Baums, desto stärker die Verbindung.`,
            )
          : tt(`${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Switch on “last year” to see which kinds move with customer value.`, `${m.name} ist ${m.kind === "outcome" ? "ein Outcome-KPI" : m.kind === "driver" ? "ein Treiber-KPI" : m.kind === "guardrail" ? "eine Guardrail" : "eine Vanity Metric"}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Arten sich mit dem Kundenwert bewegen.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A6 · a fair A/B test */

type Flaw = "none" | "two" | "time" | "peek";
const FLAWS = bi({
  none: { label: t("Fair test", "Fairer Test"), a: t("Standard offer · random half · weeks 1–3", "Standardangebot · zufällige Hälfte · Wochen 1–3"), b: t("Recommended add-on · other half · weeks 1–3", "Empfohlenes Add-on · andere Hälfte · Wochen 1–3"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the recommended add-on.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich dem empfohlenen Add-on zuschreiben.") },
  two: { label: t("Two changes at once", "Zwei Änderungen auf einmal"), a: t("Standard offer · Monday · random half", "Standardangebot · Montag · zufällige Hälfte"), b: t("Recommended add-on and a new subject line · Friday", "Empfohlenes Add-on und neue Betreffzeile · Freitag"), reading: t("The variant differs in three things. If it wins, nobody can say whether the offer, the subject line or the day did it, so nothing can be learned for the next test.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob das Angebot, die Betreffzeile oder der Tag es war, also lässt sich für den nächsten Test nichts lernen.") },
  time: { label: t("Compared with last month", "Mit dem Vormonat verglichen"), a: t("Standard offer · all customers · March", "Standardangebot · alle Kunden · März"), b: t("Recommended add-on · all customers · April", "Empfohlenes Add-on · alle Kunden · April"), reading: t("The groups are different months. If April has budget releases, easter or a price change, the difference may come from the month, not the offer.", "Die Gruppen sind verschiedene Monate. Hat der April Budgetfreigaben, Ostern oder eine Preisänderung, kann der Unterschied vom Monat kommen, nicht vom Angebot.") },
  peek: { label: t("Stopped when ahead", "Gestoppt, sobald vorn"), a: t("Standard offer · random half · stopped on day 3", "Standardangebot · zufällige Hälfte · an Tag 3 gestoppt"), b: t("Recommended add-on · other half · stopped on day 3", "Empfohlenes Add-on · andere Hälfte · an Tag 3 gestoppt"), reading: t("Early on, a handful of orders swing the result. Stopping at the first lead picks a lucky moment, and the “win” often disappears in the next run.", "Am Anfang kippen wenige Bestellungen das Ergebnis. Beim ersten Vorsprung zu stoppen, wählt einen glücklichen Moment, und der „Gewinn“ verschwindet im nächsten Durchlauf oft wieder.") },
});
const FLAW_IDS: Flaw[] = ["none", "two", "time", "peek"];
/** A 95% range for the ratio of two conversion rates of equal-sized groups, from the conversions (normal approximation on the log). */
const rangeOf = (ctl: number, ratio: number) => {
  const se = Math.sqrt(1 / (ctl * ratio) + 1 / ctl);
  const r2 = (x: number) => Math.round(x * 100) / 100;
  return { lo: r2(Math.exp(Math.log(ratio) - 1.96 * se)), hi: r2(Math.exp(Math.log(ratio) + 1.96 * se)) };
};

export function FairTest() {
  const uid = useId().replace(/:/g, "");
  const [flaw, setFlaw] = useState<Flaw>("none");
  const [conv, setConv] = useState(30);
  const f = FLAWS[flaw];
  const ratio = 1.5;
  const { lo, hi } = rangeOf(conv, ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{tt("Group A", "Gruppe A")}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={`rounded-md border px-3 py-2 text-caption ${flaw === "none" ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft"}`}>
            <p className="smallcaps">{tt("Group B", "Gruppe B")}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<Flaw> label={tt("How Mosel runs the test", "Wie Mosel den Test durchführt")} value={flaw} onChange={setFlaw} options={FLAW_IDS.map((k) => ({ id: k, label: FLAWS[k].label }))} />
        <Insight>{f.reading}</Insight>
      </div>
      <div className="space-y-2">
        <svg viewBox="0 0 560 120" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>{tt("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist")}</title>
          <desc id={`${uid}-d`}>{tt(`With ${conv} conversions in the standard group, the uplift lies between ${num(lo)} and ${num(hi)} times.`, `Mit ${conv} Conversions in der Standardgruppe liegt der Uplift zwischen dem ${num(lo)}- und dem ${num(hi)}-Fachen.`)}</desc>
          <line x1="40" y1="60" x2="520" y2="60" stroke={C.ash} />
          {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
            <g key={v}>
              <line x1={X(v)} y1="55" x2={X(v)} y2="65" stroke={C.ash} />
              <text x={X(v)} y="84" textAnchor="middle" fontSize="11" fill={C.ash}>{`${num(v)}×`}</text>
            </g>
          ))}
          <line x1={zero} y1="20" x2={zero} y2="70" stroke={C.rust} strokeDasharray="4 3" />
          <text x={zero + 4} y="22" fontSize="10.5" fill={C.rust}>{tt("1× = no difference", "1× = kein Unterschied")}</text>
          <rect x={X(Math.max(lo, 0.5))} y="48" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5)))} height="24" fill={proven ? C.tealSoft : `url(#${uid}-h)`} stroke={proven ? C.teal : C.amber} />
          <defs>
            <pattern id={`${uid}-h`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" />
            </pattern>
          </defs>
          <circle cx={X(ratio)} cy="60" r="6" fill={C.data} stroke={C.ink} />
          <text x="40" y="110" fontSize="11.5" fill={C.ink}>{tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`)}</text>
        </svg>
        <label htmlFor={`${uid}-c`} className="smallcaps block">
          {tt(`Conversions in the standard group: ${conv} (the personalised group has 1.5 times as many)`, `Conversions in der Standardgruppe: ${conv} (die personalisierte Gruppe hat 1,5-mal so viele)`)}
        </label>
        <input id={`${uid}-c`} type="range" min={10} max={300} step={10} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
        <Insight>
          {proven
            ? tt(`With ${conv} conversions per group, even the low end of the range (${num(lo)}×) is above “no difference”: the uplift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 conversions per group is where a 1.5× result becomes solid.`, `Mit ${conv} Conversions pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Uplift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 Conversions pro Gruppe wird ein Ergebnis von 1,5× belastbar.`)
            : tt(`With ${conv} conversions per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). The result is promising, not proven: keep the test running.`, `Mit ${conv} Conversions pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Das Ergebnis ist vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen.`)}
        </Insight>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Mosel Software (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Mosel Software (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A7 · scoring: Mosel's three measures */

type WM = { id: string; name: string; cost: number; evidence: Evidence; fea: 1 | 2 | 3; eff: 1 | 2 | 3 };
const M_MEASURES: WM[] = bi([
  { id: "upgrade", name: t("Upgrade recommendation in the portal", "Upgrade-Empfehlung im Portal"), cost: 25000, evidence: "controlled" as Evidence, fea: 3 as const, eff: 3 as const },
  { id: "bot", name: t("Licence-key bot", "Lizenzschlüssel-Bot"), cost: 12000, evidence: "before" as Evidence, fea: 3 as const, eff: 1 as const },
  { id: "handwritten", name: t("Hand-written notes to the top 10", "Handgeschriebene Notizen an die Top 10"), cost: 5000, evidence: "none" as Evidence, fea: 1 as const, eff: 2 as const },
]);
const MEASURED_BY = bi({ controlled: t("upgrade rate against a control group", "Upgrade-Rate gegen eine Kontrollgruppe"), before: t("tickets per month, before and after", "Tickets pro Monat, vorher und nachher"), none: t("the sales team's impression", "der Eindruck des Vertriebsteams") });

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("upgrade");
  const m = M_MEASURES.find((x) => x.id === sel)!;
  const e = explainBucket(m.evidence);
  const score = m.eff * e * m.fea;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel's three measures scored: effect × measurability × scalability", "Mosels drei Maßnahmen bewertet: Wirkung × Messbarkeit × Skalierbarkeit")}</title>
        <desc id={`${uid}-d`}>{M_MEASURES.map((x) => `${x.name}: ${x.eff * explainBucket(x.evidence) * x.fea}`).join("; ")}</desc>
        {M_MEASURES.map((x, i) => {
          const s = x.eff * explainBucket(x.evidence) * x.fea;
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && setSel(x.id)}>
              <text x="0" y={y + 17} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{x.name}</text>
              <rect className="hit-shape" x="250" y={y} width={(s / 27) * 260} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={256 + (s / 27) * 260} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Measure", "Maßnahme")} value={sel} onChange={setSel} options={M_MEASURES.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {tt(
          `${m.name} (${euro(m.cost)}): effect ${m.eff} × measurability ${e} × scalability ${m.fea} = ${score}. Its success is measured by ${MEASURED_BY[m.evidence]}, which is ${EVIDENCE_LABEL[m.evidence]}, so measurability is ${e}. ${m.id === "handwritten" ? "The notes feel personal and may even work, but nobody will ever know, and they do not reach beyond ten customers." : m.id === "bot" ? "The bot scales perfectly, but it saves service time rather than raising sales or keeping customers." : "It scores highest because all three are strong: it moves the result, it is proven against a control group, and it serves every customer at no extra cost."}`,
          `${m.name} (${euro(m.cost)}): Wirkung ${m.eff} × Messbarkeit ${e} × Skalierbarkeit ${m.fea} = ${score}. Ihr Erfolg wird gemessen durch ${MEASURED_BY[m.evidence]}, das ist ${EVIDENCE_LABEL[m.evidence]}, also ist die Messbarkeit ${e}. ${m.id === "handwritten" ? "Die Notizen wirken persönlich und wirken vielleicht sogar, aber niemand wird es je wissen, und sie reichen nicht über zehn Kunden hinaus." : m.id === "bot" ? "Der Bot skaliert perfekt, spart aber eher Servicezeit, als dass er Umsatz steigert oder Kunden hält." : "Sie erzielt den höchsten Wert, weil alle drei stark sind: Sie bewegt das Ergebnis, ist gegen eine Kontrollgruppe belegt und dient jedem Kunden ohne Zusatzkosten."}`,
        )}
      </Insight>
    </div>
  );
}
