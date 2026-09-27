"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { CalcDiagnosis } from "@/components/ui/CalcDiagnosis";
import { Field } from "@/components/ui/Field";
import { FormulaBuilder } from "@/components/ui/FormulaBuilder";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { AUTO_MIN_VOLUME, BASES, BASIS_LABEL, CUSTOMERS, FIGURES, FIGURE_IDS, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, PICK, PILOT, ROUTINE_LABEL, STAKES_LABEL } from "@/data/forecast";
import type { Basis, CustId, FigureId } from "@/data/forecast";
import { FIGURE_BUILDERS, figAnswer, figurePartFlags, partKey } from "@/lib/calcBuilder";
import { citesForecastFigure, figMatches, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { extraInsightGuide, figureGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Recommendation, communication or automation?", "Block 1.1 · Empfehlung, Kommunikation oder Automatisierung?")}
      kind="OBJECTIVE"
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine ideas on the sort board below, from AIConnect's marketing, sales, service and product teams. Answer on the sort board.", "Route 1 → Task 1 → die neun Ideen auf der Sortiertafel unten, aus Marketing, Vertrieb, Service und Produkt von AIConnect. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("idea", "Idee")}
        intro={tt("Drag an idea onto a kind of technology, or select it and then select a kind. Select a placed one to move it again. One kind per idea: the one the idea is mainly about.", "Ziehen Sie eine Idee auf eine Art von Technologie, oder wählen Sie sie aus und dann eine Art. Wählen Sie eine platzierte Idee, um sie zu verschieben. Eine Art pro Idee: die, um die es in der Idee vor allem geht.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A2 and A3", "Testfragen · aus Materi A2 und A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every idea. They repeat the tests from Materi A2 and A3; they never say which idea goes where.", "Stellen Sie diese Fragen zu jeder Idee. Sie wiederholen die Tests aus Materi A2 und A3; sie sagen nie, welche Idee wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("One personalisation opportunity of your own", "Eine eigene Chance zur Personalisierung")}
        help={tt("Name a group of AIConnect's customers, what its data shows about them, and what AIConnect could personalise for them (“so …”). At least 30 characters.", "Nennen Sie eine Gruppe von Kunden von AIConnect, was ihre Daten über sie zeigen, und was AIConnect für sie personalisieren könnte („also …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 */

const row = (id: string, label: string, value: string) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2">{label}</td>
    <td className="tnum px-3 py-2 text-right font-semibold">{value}</td>
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const setFig = (id: FigureId, v: string) => patch((s) => ({ fig: { ...s.fig, [id]: v }, figFlagged: s.figFlagged.filter((f) => f !== id), meaningFlagged: false }));
  const check = () =>
    patch((s) => {
      const figFlagged = FIGURE_IDS.filter((id) => s.fig[id].trim() !== "" && !figMatches(s.fig[id], figAnswer(id)));
      const w = s.meaning.trim();
      return { checks: s.checks + 1, figFlagged, figClue: {}, partFlags: figurePartFlags(s.parts), meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the pilot: three KPI figures", "Block 1.2 · Den Pilot lesen: drei KPI-Werte")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three tables “Pilot last quarter”, “Next year” and “All orders” directly below. Answer in the fields under the tables.", "Route 1 → Task 1 → die drei Tabellen „Pilot im letzten Quartal“, „Nächstes Jahr“ und „Alle Bestellungen“ direkt darunter. Antworten Sie in den Feldern unter den Tabellen.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt(
            "Last quarter AIConnect ran a pilot: half of a mailing list got the standard offer e-mail, the other half an offer chosen by a recommendation system. The numbers you need are in the tables below. Look for them first; the buttons “Show where the numbers are” and “Show the formula” are there if you get stuck. The method is taught in",
            "Im letzten Quartal hat AIConnect einen Pilot durchgeführt: Die eine Hälfte einer Verteilerliste bekam die Standard-Angebots-E-Mail, die andere ein Angebot, das ein Recommendation System ausgewählt hatte. Die Zahlen stehen in den Tabellen unten. Suchen Sie sie zuerst selbst; die Schaltflächen „Zeigen, wo die Zahlen stehen“ und „Formel zeigen“ helfen, wenn Sie nicht weiterkommen. Die Methode steht in",
          )}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        {tt(", on other numbers. What you practise is combining them correctly.", ", mit anderen Zahlen. Was Sie üben, ist, sie richtig zu kombinieren.")}
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative overflow-x-auto rounded-lg border border-line md:col-span-2">
          <table className="w-full border-collapse text-caption">
            <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Pilot last quarter · offer e-mails (Case assumption)", "Pilot im letzten Quartal · Angebots-E-Mails (Fallannahme)")}</caption>
            <tbody>
              {row("fc-ctl-sent", tt("Standard offer · e-mails delivered", "Standardangebot · zugestellte E-Mails"), num(PILOT.control.sent))}
              {row("fc-ctl-orders", tt("Standard offer · orders within 14 days", "Standardangebot · Bestellungen innerhalb von 14 Tagen"), num(PILOT.control.orders))}
              {row("fc-var-sent", tt("Personalised offer · e-mails delivered", "Personalisiertes Angebot · zugestellte E-Mails"), num(PILOT.variant.sent))}
              {row("fc-var-orders", tt("Personalised offer · orders within 14 days", "Personalisiertes Angebot · Bestellungen innerhalb von 14 Tagen"), num(PILOT.variant.orders))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3">
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Next year", "Nächstes Jahr")}</caption>
              <tbody>{row("fc-yearly", tt("Offer e-mails a year", "Angebots-E-Mails pro Jahr"), num(PILOT.yearly))}</tbody>
            </table>
          </div>
          <div className="relative overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-caption">
              <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("All orders", "Alle Bestellungen")}</caption>
              <tbody>{row("fc-order", tt("Average order value", "Durchschnittlicher Bestellwert"), euro(PILOT.order))}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {FIGURE_IDS.map((id) => {
          const f = FIGURES[id];
          const b = FIGURE_BUILDERS[id];
          const flagged = l1.figFlagged.includes(id);
          const partsFlagged = b.parts.some((p) => l1.partFlags.includes(partKey(id, p.id)));
          return (
            <div key={id} className="space-y-2">
              <Field
                id={IDS.figure(id)}
                htmlFor={`fig-${id}-in`}
                label={f.label}
                help={tt(`${f.question} Type the figure as a number, for example ${f.example}.`, `${f.question} Tippen Sie den Wert als Zahl, zum Beispiel ${f.example.replace(".", ",")}.`)}
                flagged={flagged}
                clue={f.clue}
                clueShown={!!l1.figClue[id]}
                onShowClue={() => patch((s) => ({ figClue: { ...s.figClue, [id]: true } }))}
              >
                <input id={`fig-${id}-in`} className="field tnum max-w-xs" inputMode="decimal" autoComplete="off" value={l1.fig[id]} onChange={(e) => setFig(id, e.target.value)} aria-invalid={flagged || undefined} />
              </Field>
              {flagged && (
                <CalcDiagnosis
                  builder={b}
                  figure={id}
                  parts={l1.parts}
                  partFlags={l1.partFlags}
                  name={tt(`your ${id}`, `Ihr ${id}`)}
                  mismatch={(r) => tt(`The parts in the formula calculator are right and give ${r}, but the figure you entered differs. Press “Use this result in ${id}” or check the entry.`, `Die Teile im Formelrechner stimmen und ergeben ${r}, aber Ihr eingetragener Wert weicht ab. Drücken Sie „Ergebnis übernehmen in ${id}“ oder prüfen Sie den Eintrag.`)}
                />
              )}
              <div className="flex flex-wrap items-start gap-2">
                <RevealHint id={`fig-${id}-where`} label={tt("Show where the numbers are", "Zeigen, wo die Zahlen stehen")} title={tt("Numbers you need · the printed rows", "Zahlen, die Sie brauchen · die gedruckten Zeilen")}>
                  <ul className="space-y-1 text-caption">
                    {f.sources.map((s) => (
                      <li key={s.label}>
                        <button type="button" onClick={() => scrollToAndFlash(s.target, "ref")} className="flex min-h-[36px] w-full flex-wrap items-baseline gap-x-2 rounded px-2 py-1 text-left hover:bg-accentSoft">
                          <span className="text-ink">{s.label}:</span>
                          <span className="tnum font-semibold text-ink">{s.value === "F1" ? l1.fig.F1.trim() || tt("your F1", "Ihr F1") : s.value}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </RevealHint>
                <RevealHint id={`fig-${id}-formula`} label={tt("Show the formula", "Formel zeigen")} title={tt(`The formula · from Materi ${f.taughtIn}`, `Die Formel · aus Materi ${f.taughtIn}`)} forceOpen={partsFlagged}>
                  <p className="text-caption text-ink">
                    <Gloss>{f.formula}</Gloss>
                  </p>
                  <FormulaBuilder
                    figure={id}
                    builder={b}
                    parts={l1.parts}
                    partFlags={l1.partFlags}
                    onPart={(k, v) => patch((s) => ({ parts: { ...s.parts, [k]: v }, partFlags: s.partFlags.filter((x) => x !== k) }))}
                    onUse={(v) => setFig(id, String(Math.round(v * 100) / 100))}
                    unit={f.unit}
                    label={id}
                    source={tt("the tables above", "den Tabellen oben")}
                  />
                </RevealHint>
              </div>
              {mentor && <MentorGuide guide={figureGuide(id)} />}
            </div>
          );
        })}
      </div>
      <TextBox
        id={IDS.meaning}
        label={tt("What does the pilot mean for AIConnect?", "Was bedeutet der Pilot für AIConnect?")}
        help={tt("One or two sentences. Use at least one of your figures and say what AIConnect should do next, and how sure it can be.", "Ein oder zwei Sätze. Nutzen Sie mindestens einen Ihrer Werte und sagen Sie, was AIConnect als Nächstes tun sollte und wie sicher es sein kann.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which of your figures says how much better the personalised offer did, and which says what it is worth in a year? Quote one and say what follows.", "Welche Ihrer Zahlen sagt, wie viel besser das personalisierte Angebot abschnitt, und welche, was es in einem Jahr wert ist? Zitieren Sie eine und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          steps={[
            tt("Say how much better the personalised offer converted (your uplift, or the two rates).", "Sagen Sie, wie viel besser das personalisierte Angebot konvertierte (Ihr Uplift, oder die zwei Raten)."),
            tt("Say what it would be worth in a year.", "Sagen Sie, was es in einem Jahr wert wäre."),
            tt("Finish with the next step, and say it as an estimate: a pilot is not yet proof.", "Schließen Sie mit dem nächsten Schritt, und sagen Sie es als Schätzung: Ein Pilot ist noch kein Beweis."),
          ]}
          refs={[{ label: tt("Offer e-mails a year", "Angebots-E-Mails pro Jahr"), value: num(PILOT.yearly), target: "fc-yearly" }]}
        />
      </TextBox>
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my figures and sentence", "Meine Werte und meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {l1.figFlagged.length === 0 && !l1.meaningFlagged && l1.partFlags.length === 0
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt(
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} figure${l1.figFlagged.length === 1 ? " is" : "s are"} outlined above. Each says what to check.` : ""}${l1.meaningFlagged ? " The sentence needs at least one of your pilot figures." : ""}${l1.partFlags.length > 0 ? " A part of the formula calculator is outlined." : ""}`,
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} ${l1.figFlagged.length === 1 ? "Wert ist" : "Werte sind"} oben markiert. Jeder sagt, was zu prüfen ist.` : ""}${l1.meaningFlagged ? " Der Satz braucht mindestens einen Ihrer Pilotwerte." : ""}${l1.partFlags.length > 0 ? " Ein Teil des Formelrechners ist markiert." : ""}`,
              )}
        </Reading>
      )}
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Where automation fits, and what customers gain", "Block 1.3 · Wo Automatisierung passt, und was Kunden gewinnen")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight contact situations” below: requests a month, whether the answer is the same every time, and what is at stake. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Kontaktsituationen“ unten: Anfragen pro Monat, ob die Antwort jedes Mal dieselbe ist, und was auf dem Spiel steht. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight contact situations · AIConnect's service and sales requests (Case assumption)", "Acht Kontaktsituationen · Service- und Vertriebsanfragen bei AIConnect (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Situation", "Situation")}</th>
              <th className="px-3 py-2 text-right">{tt("Requests a month", "Anfragen pro Monat")}</th>
              <th className="px-3 py-2">{tt("Same answer every time?", "Jedes Mal dieselbe Antwort?")}</th>
              <th className="px-3 py-2">{tt("What is at stake", "Was auf dem Spiel steht")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className={clsx("tnum px-3 py-2 text-right", c.volume >= AUTO_MIN_VOLUME && "font-semibold")}>{num(c.volume)}</td>
                <td className="px-3 py-2">{ROUTINE_LABEL[c.routine]}</td>
                <td className="px-3 py-2">{STAKES_LABEL[c.stakes]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} situations to hand fully to automation`, `a · Die ${PICK} Situationen, die voll automatisiert werden können`)}</p>
          <OptionList<CustId> multi label={tt("Hand fully to automation", "Voll automatisieren")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} situations that must stay with a person`, `b · Die ${PICK} Situationen, die bei einem Menschen bleiben müssen`)}</p>
          <OptionList<CustId> multi label={tt("Keep with a person", "Bei einem Menschen lassen")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: full automation needs all three at once: the same answer every time, little at stake, and enough requests. Which situations meet all three? And which have a contract or an upset customer behind them?", "Hinweis: Volle Automatisierung braucht alle drei zugleich: jedes Mal dieselbe Antwort, wenig auf dem Spiel und genug Anfragen. Welche Situationen erfüllen alle drei? Und hinter welchen stehen ein Vertrag oder ein verärgerter Kunde?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three advantages for customers, each with its risk", "c · Drei Vorteile für Kunden, jeder mit seinem Risiko")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three advantages AIConnect's customers would gain, each from a different kind of technology: a recommendation system, individualised communication, or automation. Name the risk that comes with each.", "Schreiben Sie drei Vorteile, die die Kunden von AIConnect gewinnen würden, jeder aus einer anderen Art von Technologie: Recommendation System, individualisierte Kommunikation oder Automatisierung. Nennen Sie das Risiko, das jeweils mitkommt.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Advantage ${i + 1}`, `Vorteil ${i + 1}`)}
              help={tt(`Choose the technology, then write the advantage for the customer and its risk in one or two sentences (“…, but …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie die Technologie und schreiben Sie dann den Vorteil für den Kunden und sein Risiko in ein oder zwei Sätzen („…, aber …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose a technology no other row uses, and finish with “but” and the risk.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie eine Technologie, die keine andere Zeile nutzt, und schließen Sie mit „aber“ und dem Risiko.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Technology", "Technologie")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the technology…", "Technologie wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and advantages", "Meine Wahl und Vorteile prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the advantages. All ${INSIGHT_COUNT} rest on different technologies and name a risk; whether they are good is for you and your facilitator to judge.`, `Bei den Vorteilen ist nichts markiert. Alle ${INSIGHT_COUNT} ruhen auf unterschiedlichen Technologien und nennen ein Risiko; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} advantage${l1.insFlagged.length === 1 ? " is" : "s are"} outlined: the technology is missing or repeated, the text is short, or it names no risk.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Vorteil ist" : "Vorteile sind"} markiert: Die Technologie fehlt oder wiederholt sich, der Text ist kurz, oder er nennt kein Risiko.`)}
        </Reading>
      )}
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("When does AI bring real added value, and when is it technology without strategy?", "Wann bringt KI echten Mehrwert, und wann ist es Technologie ohne Strategie?"), help: tt("One or two sentences, using one idea from Block 1.1 that adds value and one that would not.", "Ein oder zwei Sätze, mit einer Idee aus Block 1.1, die Mehrwert bringt, und einer, die es nicht täte.") },
    { k: "causation", label: tt("Automation or customer experience: where would automating a contact make it worse?", "Automatisierung oder Kundenerlebnis: Wo würde ein automatisierter Kontakt es verschlechtern?"), help: tt("Name a situation from Block 1.3, what a customer would feel, and what that costs AIConnect.", "Nennen Sie eine Situation aus Block 1.3, was ein Kunde empfinden würde, und was das AIConnect kostet.") },
    { k: "decider", label: tt("How would a data-driven decision-maker read the pilot before rolling it out?", "Wie würde eine datengetriebene Entscheiderin den Pilot lesen, bevor sie ihn ausrollt?"), help: tt("What would they check first in Block 1.2, what would they not yet conclude, and what would they do next? Be concrete.", "Was würde sie in Block 1.2 zuerst prüfen, was noch nicht schließen, und was als Nächstes tun? Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 to 1.3, and the two starting points in Materi A1. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 bis 1.3 und die zwei Ausgangspunkte in Materi A1. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A3", "A6"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you build the measurement: when does AI add value, where does automation hurt the customer experience, and how would someone who decides with data read a pilot?", "Bevor Sie die Messung aufbauen: Wann bringt KI Mehrwert, wo schadet Automatisierung dem Kundenerlebnis, und wie würde jemand, der mit Daten entscheidet, einen Pilot lesen?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
    </AnswerBlock>
  );
}
