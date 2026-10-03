"use client";

import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
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
 * "What this shows" (CLAUDE.md #20), every picture opens with "The point" and carries a three-step "Walk me through it" story that
 * drives the real controls (CLAUDE.md #36); a manual button leaves the story.
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
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

/** The numbers of the two starts, as the picture prints them in START.*.result (a check in scripts/verify-calc.cjs keeps them equal). */
const TOOL_START = { spent: 90000, mailsUp: 40 };
const PROBLEM_START = { spent: 25000, from: 2.0, to: 3.0 };

export function ToolOrProblem() {
  const uid = useId().replace(/:/g, "");
  const [start, setStartRaw] = useState<Start>("tool");
  const story = useStory([
    {
      title: tt("A named problem first", "Zuerst ein benanntes Problem"),
      say: tt(`Mosel Software is an example company, not your case. It named a problem first: few renewals upgrade. A ${euro(PROBLEM_START.spent)} test moved the upgrade rate from ${num(PROBLEM_START.from, { minimumFractionDigits: 1 })}% to ${num(PROBLEM_START.to, { minimumFractionDigits: 1 })}%.`, `Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Es benannte zuerst ein Problem: wenige Verlängerungen mit Upgrade. Ein Test für ${euro(PROBLEM_START.spent)} hob die Upgrade-Rate von ${num(PROBLEM_START.from, { minimumFractionDigits: 1 })} % auf ${num(PROBLEM_START.to, { minimumFractionDigits: 1 })} %.`),
      look: tt("the teal result line at the bottom", "die teal Ergebniszeile unten"),
      apply: () => setStartRaw("problem"),
    },
    {
      title: tt("A tool bought first", "Zuerst ein Werkzeug gekauft"),
      say: tt(`Mosel could have bought the tool first. For ${euro(TOOL_START.spent)} it would have sent ${TOOL_START.mailsUp}% more e-mails and still not known whether anyone bought more. Like buying a drill before knowing which hole you need.`, `Mosel hätte auch zuerst das Werkzeug kaufen können. Für ${euro(TOOL_START.spent)} hätte es ${TOOL_START.mailsUp} % mehr E-Mails verschickt und trotzdem nicht gewusst, ob jemand mehr kaufte. Wie eine Bohrmaschine zu kaufen, bevor man das Loch kennt.`),
      look: tt("the dashed boxes: no KPI checks those steps", "die gestrichelten Kästen: Kein KPI prüft diese Schritte"),
      apply: () => setStartRaw("tool"),
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("AI is a tool, not a plan. A named problem and a KPI give a result you can check; a tool bought first gives activity. Switch between the two buttons.", "KI ist ein Werkzeug, kein Plan. Ein benanntes Problem und ein KPI geben ein Ergebnis, das Sie prüfen können; ein zuerst gekauftes Werkzeug gibt Aktivität. Wechseln Sie zwischen den beiden Schaltflächen."),
      look: tt("the first box: where each path starts", "der erste Kasten: wo jeder Weg anfängt"),
      apply: () => setStartRaw("problem"),
    },
  ]);
  const setStart = (v: Start) => {
    story.leave();
    setStartRaw(v);
  };
  const s = START[start];
  const stroke = start === "tool" ? C.grey : C.data;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("AI helps when it answers a problem you have already named and can measure. Bought first, with the hope that uses will turn up, it keeps people busy and nobody can say what it achieved.", "KI hilft, wenn sie ein Problem beantwortet, das Sie schon benannt haben und messen können. Zuerst gekauft, in der Hoffnung, dass sich Anwendungen finden, hält sie Leute beschäftigt, und niemand kann sagen, was sie erreicht hat.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
        {story.step !== null && <rect x="3" y="107" width="548" height="50" rx="9" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <rect x="8" y="112" width="538" height="40" rx="6" fill={start === "tool" ? C.mist : C.tealSoft} stroke={start === "tool" ? C.grey : C.teal} strokeDasharray={start === "tool" ? "5 4" : undefined} />
        <text x="277" y="137" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.ink}>{s.result}</text>
      </svg>
      <Toggles<Start> label={tt("Where Mosel starts", "Wo Mosel anfängt")} value={start} onChange={setStart} options={[{ id: "tool", label: START.tool.label }, { id: "problem", label: START.problem.label }]} />
      <Insight>{plain()}{s.reading}</Insight>
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
  const [sel, setSelRaw] = useState<Prod>("security");
  const [open, setOpen] = useState<string[]>([]);
  const story = useStory([
    {
      title: tt("The system counts", "Das System zählt"),
      say: tt(`Mosel Software is an example company, not your case. Of its ${BOTH.security.security} Security customers, ${BOTH.security.training} also own Training. So a customer looking at Security is shown Training.`, `Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Von seinen ${BOTH.security.security} Security-Kunden besitzen ${BOTH.security.training} auch Schulung. Also wird einem Kunden, der Security ansieht, Schulung gezeigt.`),
      look: tt("the amber cell in the Security row", "die bernsteinfarbene Zelle in der Security-Zeile"),
      apply: () => setSelRaw("security"),
    },
    {
      title: tt("A recommendation system", "Ein Recommendation System"),
      say: tt(`It works like a shop assistant who has noticed what others took together. For Backup the partner is Archive: ${BOTH.backup.archive} of ${BOTH.backup.backup} Backup customers own both.`, `Es arbeitet wie eine Verkäuferin, die bemerkt hat, was andere zusammen nahmen. Bei Backup ist der Partner Archiv: ${BOTH.backup.archive} von ${BOTH.backup.backup} Backup-Kunden besitzen beides.`),
      look: tt("the amber cell moves to Archive", "die bernsteinfarbene Zelle wandert zu Archiv"),
      apply: () => setSelRaw("backup"),
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("A recommendation picks the product from what other customers bought; it does not know why. Changing the message or its timing is a different thing. Try the four buttons.", "Eine Empfehlung wählt das Produkt aus dem, was andere Kunden kauften; sie weiß nicht, warum. Die Nachricht oder ihren Zeitpunkt zu ändern, ist etwas anderes. Probieren Sie die vier Schaltflächen."),
      look: tt("the three example ideas below the table", "die drei Beispielideen unter der Tabelle"),
      apply: () => setSelRaw("security"),
    },
  ]);
  const setSel = (v: Prod) => {
    story.leave();
    setSelRaw(v);
  };
  const best = bestFor(sel);
  const cell = 70;
  const x0 = 110;
  const y0 = 40;
  const share = Math.round((BOTH[sel][best] / BOTH[sel][sel]) * 100);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A recommendation system suggests the product that other customers most often bought together with this one. It counts what customers did; it does not know why. It personalises which product you see, not what you are told.", "Ein Recommendation System schlägt das Produkt vor, das andere Kunden am häufigsten zusammen mit diesem kauften. Es zählt, was Kunden taten; es weiß nicht, warum. Es personalisiert, welches Produkt Sie sehen, nicht, was Ihnen gesagt wird.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
        {story.step !== null && <rect x={x0 + PRODS.indexOf(best) * cell - 1} y={y0 + PRODS.indexOf(sel) * cell - 1} width={cell + 2} height={cell + 2} rx="6" fill="none" stroke={C.amber} strokeWidth="2.4" strokeDasharray="5 4" className="anim-pulse" />}
        <text x={x0} y={y0 + 4 * cell + 22} fontSize="11.5" fill={C.ash}>{tt("grey = customers who own the product · other cells = customers who own both", "grau = Kunden, die das Produkt besitzen · andere Zellen = Kunden, die beide besitzen")}</text>
      </svg>
      <Toggles<Prod> label={tt("Customer is looking at", "Kunde schaut auf")} value={sel} onChange={setSel} options={PRODS.map((p) => ({ id: p, label: PROD_LABEL[p] }))} />
      <Insight>
        {plain()}
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
  const [sel, setSelRaw] = useState<string>("m1");
  const vol = (id: string) => M_SITS.find((x) => x.id === id)!.volume;
  const story = useStory([
    {
      title: tt("A machine can do it", "Eine Maschine kann es"),
      say: tt(`Mosel Software is an example company, not your case. It gets ${vol("m1")} requests a month to resend a licence key: the same answer every time, nothing at stake. A machine can answer all of them.`, `Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Es bekommt ${vol("m1")} Anfragen im Monat, einen Lizenzschlüssel erneut zu senden: jedes Mal dieselbe Antwort, nichts steht auf dem Spiel. Eine Maschine kann alle beantworten.`),
      look: tt("dot 1, inside the teal box at the bottom right", "Punkt 1, im teal Kasten unten rechts"),
      apply: () => setSelRaw("m1"),
    },
    {
      title: tt("A person must", "Ein Mensch muss"),
      say: tt(`A customer who threatens to switch is the opposite: no standard answer and a whole contract at stake, ${vol("m6")} a month. A machine here would confirm the customer's doubt.`, `Ein Kunde, der mit Wechsel droht, ist das Gegenteil: keine Standardantwort und ein ganzer Vertrag auf dem Spiel, ${vol("m6")} im Monat. Eine Maschine bestätigte hier den Zweifel des Kunden.`),
      look: tt("dot 6, in the hatched band at the top", "Punkt 6, im schraffierten Band oben"),
      apply: () => setSelRaw("m6"),
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Automate fully only what is routine, low-stakes and frequent. In between, the machine prepares and a person decides: the grey middle. Try the dots.", "Voll automatisieren Sie nur, was Routine, geringen Einsatz und hohe Häufigkeit hat. Dazwischen bereitet die Maschine vor und ein Mensch entscheidet: die graue Mitte. Probieren Sie die Punkte."),
      look: tt("dot 4, in the grey middle", "Punkt 4, in der grauen Mitte"),
      apply: () => setSelRaw("m4"),
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
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
      <ThePoint>{tt("A contact goes fully to a machine only when three things hold together: the answer is the same every time, little is at stake, and it happens often. Where a contract or an upset customer is behind it, a person stays.", "Ein Kontakt geht nur dann ganz an eine Maschine, wenn drei Dinge zusammen gelten: Die Antwort ist jedes Mal dieselbe, wenig steht auf dem Spiel, und es kommt oft vor. Steht ein Vertrag oder ein verärgerter Kunde dahinter, bleibt ein Mensch.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
              {on && story.step !== null && <circle cx={p.cx} cy={p.cy} r="21" fill="none" stroke={C.amber} strokeWidth="2.2" strokeDasharray="5 4" className="anim-pulse" />}
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
        {plain()}
        {`${s.name} · ${tt(`${s.volume} a month`, `${s.volume} im Monat`)} · ${VERDICT_GLYPH[s.verdict]} ${VERDICT_LABEL[s.verdict]}. ${s.why}`}
      </Insight>
      <p className="text-caption text-ash">{tt("Illustration on Mosel Software (Case assumption). Hatched = keep a person; teal = automate fully; the grey middle = assist.", "Illustration mit Mosel Software (Fallannahme). Schraffiert = Mensch behalten; teal = voll automatisieren; die graue Mitte = unterstützen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · reading a pilot (Mosel Software) */

export function PilotExample() {
  const uid = useId().replace(/:/g, "");
  const [yearly, setYearlyRaw] = useState(MOSEL.yearly);
  const r = MOSEL_RESULT;
  const story = useStory([
    {
      title: tt("Two groups, two rates", "Zwei Gruppen, zwei Raten"),
      say: tt(`Mosel Software is an example company, not your case. It tested a new offer on two equal groups: ${pct(r.rate, 1)} ordered, against ${pct(r.other, 1)} with the old offer. That is ${num(r.lift)} times as often.`, `Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Es testete ein neues Angebot an zwei gleich großen Gruppen: ${pct(r.rate, 1)} bestellten, gegenüber ${pct(r.other, 1)} beim alten Angebot. Das ist ${num(r.lift)}-mal so oft.`),
      look: tt("the two bars and the amber line under them", "die zwei Balken und die bernsteinfarbene Zeile darunter"),
      apply: () => setYearlyRaw(MOSEL.yearly),
    },
    {
      title: tt("Only the difference is extra", "Nur der Unterschied ist zusätzlich"),
      say: tt(`The old offer would have sold its ${pct(r.other, 1)} anyway. On ${num(MOSEL.yearly * 2)} e-mails a year the difference is worth about ${euro(extraOf(MOSEL.yearly * 2, r.rate, r.other, MOSEL.order))}. The app does this arithmetic for you.`, `Das alte Angebot hätte seine ${pct(r.other, 1)} ohnehin verkauft. Bei ${num(MOSEL.yearly * 2)} E-Mails pro Jahr ist der Unterschied etwa ${euro(extraOf(MOSEL.yearly * 2, r.rate, r.other, MOSEL.order))} wert. Die Rechnung übernimmt die App für Sie.`),
      look: tt("the slider at 20,000 and the sum in “What this shows”", "der Regler bei 20.000 und die Rechnung in „Was das zeigt“"),
      apply: () => setYearlyRaw(MOSEL.yearly * 2),
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Two rates side by side turn “it seems to work” into a figure. Each group has few orders, so say “promising”, not “proven”. Move the slider to see how the year's size matters.", "Zwei Raten nebeneinander machen aus „es scheint zu wirken“ eine Zahl. Hinter jeder Gruppe stehen wenige Bestellungen, sagen Sie also „vielversprechend“, nicht „bewiesen“. Bewegen Sie den Regler, um zu sehen, wie die Größe des Jahres zählt."),
      look: tt("the orders printed behind each bar", "die Bestellungen, die hinter jedem Balken stehen"),
      apply: () => setYearlyRaw(MOSEL.yearly),
    },
  ]);
  const setYearly = (v: number) => {
    story.leave();
    setYearlyRaw(v);
  };
  const extra = extraOf(yearly, r.rate, r.other, MOSEL.order);
  const W = (p: number) => (p / 4) * 300;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A pilot gives two conversion rates, one per group. Their ratio says how many times better the new offer did, and the difference, over a year of e-mails, says what it is worth. A small pilot is promising, not proof.", "Ein Pilot gibt zwei Conversion Rates, eine pro Gruppe. Ihr Verhältnis sagt, wie viel Mal besser das neue Angebot abschnitt, und der Unterschied, über ein Jahr E-Mails, sagt, was es wert ist. Ein kleiner Pilot ist vielversprechend, kein Beweis.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel Software's pilot: personalised offer against standard offer", "Pilot von Mosel Software: personalisiertes Angebot gegen Standardangebot")}</title>
        <desc id={`${uid}-d`}>{tt(`Personalised ${r.rate}%, standard ${r.other}%, uplift ${r.lift}.`, `Personalisiert ${r.rate} %, Standard ${r.other} %, Uplift ${r.lift}.`)}</desc>
        {story.step !== null && <rect x="164" y="14" width="396" height="88" rx="8" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
        {plain()}
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
  const [sel, setSelRaw] = useState("wau");
  const [past, setPastRaw] = useState(false);
  const story = useStory([
    {
      title: tt("A driver you can steer by", "Ein Treiber, nach dem Sie steuern"),
      say: tt("Mosel Software is an example company, not your case. Weekly active users is something customers do before they renew, and it moved with value last year. A team can push it this month.", "Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Wöchentlich aktive Nutzer ist etwas, das Kunden tun, bevor sie verlängern, und es bewegte sich letztes Jahr mit dem Wert. Ein Team kann es in diesem Monat bewegen."),
      look: tt("the amber box under the top, and “moved with value”", "der bernsteinfarbene Kasten unter der Spitze und „mit dem Wert bewegt“"),
      apply: () => {
        setSelRaw("wau");
        setPastRaw(true);
      },
    },
    {
      title: tt("A number that flatters", "Eine Zahl, die schmeichelt"),
      say: tt("Newsletters sent counts what Mosel did, not what customers did. It did not move with value. It looks like progress and decides nothing: a vanity metric, a number that only flatters.", "Versendete Newsletter zählt, was Mosel tat, nicht was Kunden taten. Es bewegte sich nicht mit dem Wert. Es sieht nach Fortschritt aus und entscheidet nichts: eine Vanity Metric, eine Zahl, die nur schmeichelt."),
      look: tt("the grey box outside the tree", "der graue Kasten außerhalb des Baums"),
      apply: () => {
        setSelRaw("news");
        setPastRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Steer by the result and the behaviours that lead to it, watch a limit such as complaints, and stop reporting what only counts your own activity. Choose any metric.", "Steuern Sie nach dem Ergebnis und den Verhalten, die dorthin führen, beobachten Sie eine Grenze wie Beschwerden, und hören Sie auf, zu berichten, was nur Ihre eigene Aktivität zählt. Wählen Sie eine beliebige Kennzahl."),
      look: tt("the dashed amber frame: the guardrail", "der gestrichelte bernsteinfarbene Rahmen: die Guardrail"),
      apply: () => {
        setSelRaw("compl");
        setPastRaw(true);
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const setPast = (f: (v: boolean) => boolean) => {
    story.leave();
    setPastRaw(f);
  };
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
      <ThePoint>{tt("Not every number is a KPI. The result sits at the top, the customer behaviours that lead to it below it, a limit that must not get worse beside it; numbers that only count your own activity do not belong in the picture.", "Nicht jede Zahl ist ein KPI. Das Ergebnis steht oben, die Kundenverhalten, die dorthin führen, darunter, eine Grenze, die nicht schlechter werden darf, daneben; Zahlen, die nur die eigene Aktivität zählen, gehören nicht ins Bild.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
              {on && story.step !== null && <rect x={bx - 5} y={by - 5} width={w + 10} height="58" rx="9" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
        {plain()}
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
  const [flaw, setFlawRaw] = useState<Flaw>("none");
  const [conv, setConvRaw] = useState(30);
  const ratio = 1.5;
  const first = rangeOf(30, ratio);
  const story = useStory([
    {
      title: tt("A fair test", "Ein fairer Test"),
      say: tt("Mosel Software is an example company, not your case. A fair test is like a race: same track, same start, one runner changed. Mosel changes one thing, for a random half, in the same weeks.", "Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Ein fairer Test ist wie ein Rennen: dieselbe Bahn, derselbe Start, ein Läufer ist ausgetauscht. Mosel ändert eine Sache, für eine zufällige Hälfte, in denselben Wochen."),
      look: tt("Group A and Group B: only the offer differs", "Gruppe A und Gruppe B: Nur das Angebot unterscheidet sich"),
      apply: () => {
        setFlawRaw("none");
        setConvRaw(30);
      },
    },
    {
      title: tt("An unfair test", "Ein unfairer Test"),
      say: tt("Now the variant differs in three things at once. If it wins, nobody knows whether the offer, the subject line or the day did it.", "Jetzt unterscheidet sich die Variante in drei Dingen zugleich. Gewinnt sie, weiß niemand, ob das Angebot, die Betreffzeile oder der Tag es war."),
      look: tt("the dashed amber Group B box", "der gestrichelte bernsteinfarbene Kasten von Gruppe B"),
      apply: () => {
        setFlawRaw("two");
        setConvRaw(30);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Even a fair test says less than it seems on few orders: with 30 conversions per group, the same 1.5× could be ${num(first.lo)}×, which is no gain. Move the slider to 100.`, `Selbst ein fairer Test sagt bei wenigen Bestellungen weniger, als es scheint: Mit 30 Conversions pro Gruppe könnte dasselbe 1,5× ${num(first.lo)}× sein, also kein Gewinn. Bewegen Sie den Regler auf 100.`),
      look: tt("the hatched bar crossing the dashed 1× line", "der schraffierte Balken, der die gestrichelte 1×-Linie kreuzt"),
      apply: () => {
        setFlawRaw("none");
        setConvRaw(30);
      },
    },
  ]);
  const setFlaw = (v: Flaw) => {
    story.leave();
    setFlawRaw(v);
  };
  const setConv = (v: number) => {
    story.leave();
    setConvRaw(v);
  };
  const f = FLAWS[flaw];
  const { lo, hi } = rangeOf(conv, ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  return (
    <div className="space-y-4">
      <ThePoint>{tt("A test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed in advance. Even then, a small test tells you less than it seems.", "Ein Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vorab feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{tt("Group A", "Gruppe A")}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={`rounded-md border px-3 py-2 text-caption ${flaw === "none" ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft"} ${story.step === 1 ? "outline outline-2 -outline-offset-2 outline-dashed outline-[#8A5A0B] anim-pulse" : ""}`}>
            <p className="smallcaps">{tt("Group B", "Gruppe B")}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<Flaw> label={tt("How Mosel runs the test", "Wie Mosel den Test durchführt")} value={flaw} onChange={setFlaw} options={FLAW_IDS.map((k) => ({ id: k, label: FLAWS[k].label }))} />
        <Insight>{plain()}{f.reading}</Insight>
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
          {story.step === 2 && <rect x={X(Math.max(lo, 0.5)) - 4} y="42" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5))) + 8} height="36" rx="5" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
          {plain()}
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

const scoreOf = (x: WM) => x.eff * explainBucket(x.evidence) * x.fea;

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("upgrade");
  const byId = (id: string) => M_MEASURES.find((x) => x.id === id)!;
  const story = useStory([
    {
      title: tt("Strong on all three", "Stark in allen dreien"),
      say: tt(`Mosel Software is an example company, not your case. Its upgrade recommendation scores ${scoreOf(byId("upgrade"))}: it moves the result, it is proven against a control group, and it serves every customer.`, `Mosel Software ist ein Beispielunternehmen, nicht Ihr Fall. Seine Upgrade-Empfehlung erzielt ${scoreOf(byId("upgrade"))}: Sie bewegt das Ergebnis, ist gegen eine Kontrollgruppe belegt und dient jedem Kunden.`),
      look: tt("the longest bar", "der längste Balken"),
      apply: () => setSelRaw("upgrade"),
    },
    {
      title: tt("One weak factor", "Ein schwacher Faktor"),
      say: tt(`Hand-written notes score only ${scoreOf(byId("handwritten"))}. They feel personal, but nobody can measure them and they stop at ten customers. One weak factor pulls the whole product down.`, `Handgeschriebene Notizen erzielen nur ${scoreOf(byId("handwritten"))}. Sie wirken persönlich, aber niemand kann sie messen, und sie enden bei zehn Kunden. Ein schwacher Faktor zieht das ganze Produkt herunter.`),
      look: tt("the short bar, and its three parts in “What this shows”", "der kurze Balken und seine drei Teile in „Was das zeigt“"),
      apply: () => setSelRaw("handwritten"),
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Multiply effect, measurability and scalability. Measurability is read from how success is measured, never guessed. Choose a measure to read its three parts.", "Multiplizieren Sie Wirkung, Messbarkeit und Skalierbarkeit. Die Messbarkeit wird daraus gelesen, wie der Erfolg gemessen wird, nie geschätzt. Wählen Sie eine Maßnahme, um ihre drei Teile zu lesen."),
      look: tt("the licence-key bot: cheap, but it saves time rather than raising sales", "der Lizenzschlüssel-Bot: günstig, spart aber eher Zeit, als Umsatz zu steigern"),
      apply: () => setSelRaw("bot"),
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const m = M_MEASURES.find((x) => x.id === sel)!;
  const e = explainBucket(m.evidence);
  const score = m.eff * e * m.fea;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Score a measure on three questions: how much does it move the result, can we measure whether it did, and does it reach every customer at no extra cost? The three scores are multiplied, so one weak answer lowers the whole.", "Bewerten Sie eine Maßnahme nach drei Fragen: Wie stark bewegt sie das Ergebnis, können wir messen, ob sie es tat, und erreicht sie jeden Kunden ohne Zusatzkosten? Die drei Werte werden multipliziert, also senkt eine schwache Antwort das Ganze.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Mosel's three measures scored: effect × measurability × scalability", "Mosels drei Maßnahmen bewertet: Wirkung × Messbarkeit × Skalierbarkeit")}</title>
        <desc id={`${uid}-d`}>{M_MEASURES.map((x) => `${x.name}: ${x.eff * explainBucket(x.evidence) * x.fea}`).join("; ")}</desc>
        {M_MEASURES.map((x, i) => {
          const s = x.eff * explainBucket(x.evidence) * x.fea;
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <rect x="-4" y={y - 4} width="556" height="32" rx="7" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <text x="0" y={y + 17} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{x.name}</text>
              <rect className="hit-shape" x="250" y={y} width={(s / 27) * 260} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={256 + (s / 27) * 260} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Measure", "Maßnahme")} value={sel} onChange={setSel} options={M_MEASURES.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {plain()}
        {tt(
          `${m.name} (${euro(m.cost)}): effect ${m.eff} × measurability ${e} × scalability ${m.fea} = ${score}. Its success is measured by ${MEASURED_BY[m.evidence]}, which is ${EVIDENCE_LABEL[m.evidence]}, so measurability is ${e}. ${m.id === "handwritten" ? "The notes feel personal and may even work, but nobody will ever know, and they do not reach beyond ten customers." : m.id === "bot" ? "The bot scales perfectly, but it saves service time rather than raising sales or keeping customers." : "It scores highest because all three are strong: it moves the result, it is proven against a control group, and it serves every customer at no extra cost."}`,
          `${m.name} (${euro(m.cost)}): Wirkung ${m.eff} × Messbarkeit ${e} × Skalierbarkeit ${m.fea} = ${score}. Ihr Erfolg wird gemessen durch ${MEASURED_BY[m.evidence]}, das ist ${EVIDENCE_LABEL[m.evidence]}, also ist die Messbarkeit ${e}. ${m.id === "handwritten" ? "Die Notizen wirken persönlich und wirken vielleicht sogar, aber niemand wird es je wissen, und sie reichen nicht über zehn Kunden hinaus." : m.id === "bot" ? "Der Bot skaliert perfekt, spart aber eher Servicezeit, als dass er Umsatz steigert oder Kunden hält." : "Sie erzielt den höchsten Wert, weil alle drei stark sind: Sie bewegt das Ergebnis, ist gegen eine Kontrollgruppe belegt und dient jedem Kunden ohne Zusatzkosten."}`,
        )}
      </Insight>
    </div>
  );
}
