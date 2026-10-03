"use client";

import clsx from "clsx";
import { Insight } from "@/components/materi/kit";
import { ARCH_BY_ID, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { PANEL, READY_BAR, WEAK_POINTS } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { IDS } from "@/lib/missing";
import { planOf, rangeOf } from "@/lib/r2Panel";
import type { ItemView, Scn } from "@/lib/r2Panel";
import { useStore } from "@/store/useStore";

/**
 * The control panel of Route 2 (CLAUDE.md #47): an architecture diagram with links that can break, three range bars (Budget, Measurable, Risk) and
 * the four tests, all drawn from the learner's own choices in Step A and redrawn at once. It shows consequences, never a verdict: every state has a
 * text or pattern channel besides colour, and a position outside a limit is a fact, not a missing item.
 */

/** One box of the diagram: solid teal = Now, dashed amber = After data is ready, faded = Not now; a black box is drawn dark and marked “?”. */
function Box({ id, v }: { id: ArchId; v: ItemView }) {
  const p = PANEL[id];
  const a = ARCH_BY_ID[id];
  const cls =
    v.tier === "now" ? (p.blackBox ? "border-ink bg-mist" : "border-signal bg-signalSoft") : v.tier === "later" ? "border-2 border-dashed border-gold bg-paper" : "border-line opacity-60";
  const status =
    v.tier === "now"
      ? tt(`Now · in use month ${v.inUse}`, `Jetzt · im Einsatz ab Monat ${v.inUse}`)
      : v.tier === "later"
        ? v.never
          ? tt("After data is ready · never starts", "Wenn die Daten bereit sind · startet nie")
          : tt(`After data is ready · starts month ${v.start}, in use month ${v.inUse}`, `Wenn die Daten bereit sind · Start Monat ${v.start}, im Einsatz ab Monat ${v.inUse}`)
        : tt("Not now", "Jetzt nicht");
  return (
    <div id={`arch-box-${id}`} className={clsx("min-h-[3.5rem] rounded-lg border p-2 text-caption leading-snug", cls)}>
      <p className="font-semibold text-ink">
        {p.blackBox && v.tier !== "not" ? "? " : ""}
        {p.short} <span className="font-normal text-ash">· {euro(a.cost)}</span>
      </p>
      <p className="text-ash">{status}</p>
      {v.notes.map((n) => (
        <p key={n} className="text-accent">
          {n}
        </p>
      ))}
    </div>
  );
}

/** A link between two layers: solid teal when it works, dashed amber with its reason in words when it does not; invisible when there is nothing to link. */
function Lk({ state, text }: { state: "ok" | "no" | "off"; text: string }) {
  return (
    <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", state === "no" ? "text-accent" : "text-ash", state === "off" && "invisible")}>
      <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", state === "no" ? "border-dashed border-gold" : "border-solid border-signal")} />
      <span>{text}</span>
    </div>
  );
}

/** A range bar: the pale band spans the two data scenarios, the marker is the active one. */
function RangeBar({ label, lo, hi, cur, tone, sentence }: { label: string; lo: number | null; hi: number | null; cur: number | null; tone: "signal" | "gold"; sentence: string }) {
  const l = lo === null || hi === null ? 0 : Math.min(lo, hi);
  const h = lo === null || hi === null ? 0 : Math.max(lo, hi);
  return (
    <div className="space-y-1">
      <p className="text-caption font-semibold text-ink">{label}</p>
      <div className="relative h-3 rounded border border-line bg-mist" role="img" aria-label={`${label}: ${sentence}`}>
        {cur !== null && (
          <>
            <div className={clsx("absolute inset-y-0 rounded", tone === "signal" ? "bg-signal/35" : "bg-gold/50")} style={{ left: `${l}%`, width: `${Math.max(1, h - l)}%` }} />
            <div className={clsx("absolute -inset-y-[3px] w-[3px] rounded", tone === "signal" ? "bg-signal" : "bg-accent")} style={{ left: `calc(${cur}% - 1.5px)` }} />
          </>
        )}
      </div>
      <p className="text-micro normal-case tracking-normal text-ash" aria-live="polite">
        {sentence}
      </p>
    </div>
  );
}

export function Panel({ scn, setScn }: { scn: Scn; setScn: (s: Scn) => void }) {
  const r2 = useStore((s) => s.r2);
  const plan = planOf(r2, scn);
  const rng = rangeOf(r2);
  const it = plan.items;
  const b = plan.bars;
  const none = plan.funded.length === 0;
  const range = (x: [number | null, number | null]) => (x[0] === null || x[1] === null ? "" : tt(` Range ${Math.min(x[0], x[1])}–${Math.max(x[0], x[1])}%.`, ` Spanne ${Math.min(x[0], x[1])}–${Math.max(x[0], x[1])} %.`));
  const pct = (n: number | null) => (n === null ? "" : `${n}${tt("%", " %")}`);
  const spent = Math.min(100, (b.spent / 300) * 100);

  const engineLink = (id: ArchId): { state: "ok" | "no" | "off"; text: string } => {
    const v = it[id];
    if (v.tier === "not") return { state: "off", text: "." };
    if (v.never) return { state: "no", text: tt(`${PANEL[id].short}: never starts`, `${PANEL[id].short}: startet nie`) };
    return v.measOk ? { state: "ok", text: tt(`${PANEL[id].short}: measured`, `${PANEL[id].short}: gemessen`) } : { state: "no", text: tt(`${PANEL[id].short}: not measured`, `${PANEL[id].short}: nicht gemessen`) };
  };
  const meas: { state: "ok" | "no" | "off"; text: string } =
    it.abtest.tier === "not" ? { state: "off", text: "." } : it.abtest.measOk ? { state: "ok", text: tt("reads the KPIs", "liest die KPIs") } : { state: "no", text: tt("no KPI system to read", "kein KPI-System zum Lesen") };
  const clean: { state: "ok" | "no" | "off"; text: string } =
    it.quality.tier === "now" ? { state: "ok", text: tt("cleaner data", "sauberere Daten") } : it.pricing.tier !== "not" ? { state: "no", text: tt("data used as it is", "Daten, wie sie sind") } : { state: "off", text: "." };
  const suiteLink: { state: "ok" | "no" | "off"; text: string } = it.suite.tier === "not" ? { state: "off", text: "." } : { state: "no", text: tt("no link to the KPI system", "keine Verbindung zum KPI-System") };

  const applicable = plan.tests.filter((x) => x.applies);
  const insight = none
    ? tt("Nothing is funded yet. Set an item to Now in Step A and the diagram, the three bars and the tests draw it.", "Noch nichts ist finanziert. Setzen Sie in Schritt A einen Punkt auf „Jetzt“, und Diagramm, drei Balken und Tests zeichnen es.")
    : tt(
        `${plan.holding} of ${plan.applicable} tests hold${scn === 1 ? ` with the data ${WEAK_POINTS} points weaker` : ""}. ${plan.holding === plan.applicable ? "Nothing is open under the course's four tests; a plan that holds them can still be argued against, so say in your reasons what it gives and what you give up." : "Each open test below says what it means and gives two ways to act. You decide; a different choice with a clear reason still exports."} The bars show where the money sits; the pale part of Measurable and Risk is the range across both data scenarios.`,
        `${plan.holding} von ${plan.applicable} Tests stimmen${scn === 1 ? ` bei um ${WEAK_POINTS} Punkte schwächeren Daten` : ""}. ${plan.holding === plan.applicable ? "Unter den vier Tests des Kurses ist nichts offen; ein Plan, der sie hält, lässt sich trotzdem hinterfragen, sagen Sie also in Ihren Begründungen, was er gibt und worauf Sie verzichten." : "Jeder offene Test unten sagt, was er bedeutet, und nennt zwei Wege zu handeln. Sie entscheiden; eine andere Wahl mit klarer Begründung lässt sich trotzdem exportieren."} Die Balken zeigen, wo das Geld liegt; der helle Teil bei Messbar und Risiko ist die Spanne über beide Datenszenarien.`,
      );

  return (
    <section id={IDS.panel} aria-label={tt("Your architecture, live", "Ihre Architektur, live")} className="card space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="smallcaps text-accent">{tt(`Your architecture · live · budget ${euro(R2_BUDGET)} · ${R2_MONTHS} months`, `Ihre Architektur · live · Budget ${euro(R2_BUDGET)} · ${R2_MONTHS} Monate`)}</p>
        <div className="ml-auto flex flex-wrap items-center gap-2" role="group" aria-label={tt("Data quality", "Datenqualität")}>
          <span className="text-caption text-ash">{tt("Data quality", "Datenqualität")}:</span>
          {([0, 1] as Scn[]).map((s) => (
            <button key={s} type="button" aria-pressed={scn === s} onClick={() => setScn(s)} className={clsx("btn btn-sm min-h-[40px] border", scn === s ? "border-accent bg-accentSoft font-semibold text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {s === 0 ? tt("As the brief says", "Wie im Auftrag") : tt(`${WEAK_POINTS} points weaker`, `${WEAK_POINTS} Punkte schwächer`)}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label={tt("The architecture diagram", "Das Architekturdiagramm")}>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What customers meet: offer e-mails · portal · sales calls", "Was Kunden erleben: Angebots-E-Mails · Portal · Verkaufsgespräche")}</div>
        <Lk {...suiteLink} />
        <Box id="suite" v={it.suite} />
        <Lk state="off" text="." />
        <div className="grid gap-2 sm:grid-cols-3">
          <Box id="reco" v={it.reco} />
          <Box id="trigger" v={it.trigger} />
          <Box id="pricing" v={it.pricing} />
        </div>
        <div className="grid gap-x-2 sm:grid-cols-3">
          {(["reco", "trigger", "pricing"] as ArchId[]).map((id) => (
            <Lk key={id} {...engineLink(id)} />
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-[3fr_1fr]">
          <Box id="abtest" v={it.abtest} />
          <Box id="training" v={it.training} />
        </div>
        <Lk {...meas} />
        <Box id="foundation" v={it.foundation} />
        <Lk {...clean} />
        <Box id="quality" v={it.quality} />
        <Lk state="ok" text={tt("raw data flows up", "Rohdaten fließen nach oben")} />
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("Where the data lives today: shop · CRM · e-mail · portal", "Wo die Daten heute liegen: Shop · CRM · E-Mail · Portal")}</div>
        <p className="mt-2 text-micro normal-case tracking-normal text-ash">
          {tt("Solid teal box: Now. Dashed amber box: After data is ready (it starts in the month the data clean-up is in use). Faded box: Not now. A solid teal link works; a dashed amber link says in words why it does not.", "Durchgezogener teal Kasten: Jetzt. Gestrichelter amberfarbener Kasten: Wenn die Daten bereit sind (er startet in dem Monat, in dem die Datenbereinigung im Einsatz ist). Blasser Kasten: Jetzt nicht. Eine durchgezogene teal Verbindung funktioniert; eine gestrichelte amberfarbene sagt in Worten, warum nicht.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-caption font-semibold text-ink">{tt("Budget", "Budget")}</p>
          <div className="relative h-3 rounded border border-line bg-mist" role="img" aria-label={tt(`Budget: ${euro(b.spent)} of ${euro(R2_BUDGET)}`, `Budget: ${euro(b.spent)} von ${euro(R2_BUDGET)}`)}>
            <div className="absolute inset-y-0 left-0 rounded bg-signal/50" style={{ width: `${spent}%` }} />
            <div className="absolute -inset-y-1 border-l-[1.5px] border-dashed border-ash" style={{ left: `${(R2_BUDGET / 300) * 100}%` }} />
          </div>
          <p className="text-micro normal-case tracking-normal text-ash" aria-live="polite">
            {b.over > 0 ? tt(`${euro(b.over)} over the budget (dashed line). Keep it only with a reason.`, `${euro(b.over)} über dem Budget (gestrichelte Linie). Behalten Sie es nur mit einer Begründung.`) : tt(`${euro(b.spent)} of ${euro(R2_BUDGET)}. ${euro(b.left)} left.`, `${euro(b.spent)} von ${euro(R2_BUDGET)}. ${euro(b.left)} übrig.`)}
          </p>
        </div>
        <RangeBar
          label={tt("Measurable", "Messbar")}
          lo={rng.meas[0]}
          hi={rng.meas[1]}
          cur={b.meas}
          tone="signal"
          sentence={none ? tt("Nothing is funded, so nothing is measured and the brief's three problems stay.", "Nichts ist finanziert, also wird nichts gemessen, und die drei Probleme des Auftrags bleiben.") : tt(`${pct(b.meas)} of the money sits on items that are measured and whose data is ready.${range(rng.meas)}`, `${pct(b.meas)} des Geldes liegen auf Punkten, die gemessen werden und deren Daten bereit sind.${range(rng.meas)}`)}
        />
        <RangeBar
          label={tt("Risk", "Risiko")}
          lo={rng.risk[0]}
          hi={rng.risk[1]}
          cur={b.risk}
          tone="gold"
          sentence={none ? tt("Nothing is funded yet.", "Noch nichts ist finanziert.") : tt(`${pct(b.risk)} of the money rests on a black box or on data below ${READY_BAR}% when the item starts.${range(rng.risk)}`, `${pct(b.risk)} des Geldes beruhen auf einer Black Box oder auf Daten unter ${READY_BAR} %, wenn der Punkt startet.${range(rng.risk)}`)}
        />
      </div>

      <div id="r2-tests" className="space-y-2">
        <p className="smallcaps text-ash">
          {tt("Four tests the course teaches", "Vier Tests, die der Kurs lehrt")}
          {applicable.length > 0 ? ` · ${tt(`${plan.holding} of ${plan.applicable} hold`, `${plan.holding} von ${plan.applicable} stimmen`)}` : ""}
        </p>
        {applicable.length === 0 ? (
          <p className="text-caption text-ash">{tt("No tests yet. Set at least one item to Now in Step A.", "Noch keine Tests. Setzen Sie in Schritt A mindestens einen Punkt auf „Jetzt“.")}</p>
        ) : (
          <ul className="space-y-2">
            {applicable.map((x) => (
              <li key={x.id} className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-caption font-semibold text-ink">{x.name}</span>
                  <span className={clsx("pill", x.holds ? "border-signal/50 bg-signalSoft text-signal" : "border-gold bg-accentSoft text-accent")}>{x.holds ? tt("Holds", "Stimmt") : tt("Open", "Offen")}</span>
                </div>
                {!x.holds &&
                  x.open.map((o, i) => (
                    <div key={i} className="space-y-1 rounded-md border border-gold bg-accentSoft p-2.5 text-caption text-ink">
                      <p>{o.fact}</p>
                      <p className="text-ash">
                        <span className="smallcaps mr-1">{tt("Rule", "Regel")}</span>
                        {o.rule}
                      </p>
                      <p>
                        <span className="smallcaps mr-1 text-accent">{tt("You can", "Sie können")}</span>
                      </p>
                      <ul className="list-disc space-y-0.5 pl-5">
                        {o.ways.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Insight>
        {tt("In plain words: ", "In einfachen Worten: ")}
        {insight}
      </Insight>
    </section>
  );
}
