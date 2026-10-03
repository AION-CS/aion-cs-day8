"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { AUTO_MIN_VOLUME, BASES, BASIS_LABEL, CUSTOMERS, FORECAST, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, PICK, PILOT, ROUTINE_LABEL, STAKES_LABEL } from "@/data/forecast";
import type { Basis, CustId } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { num, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
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
      core
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
        keyPhrases={LINE_KEY}
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
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What AIConnect's data covers (the case)", "Was die Daten von AIConnect abdecken (der Fall)"), value: tt("every order, every login, every opened e-mail", "jede Bestellung, jedes Login, jede geöffnete E-Mail"), target: "case-brief" },
            { label: tt("The three things you can personalise (Materi A2)", "Die drei Dinge, die Sie personalisieren können (Materi A2)"), value: tt("the product suggested · what we say, when, on which channel · who does the work", "das vorgeschlagene Produkt · was wir sagen, wann, auf welchem Kanal · wer die Arbeit macht"), target: "mat-A2" },
            { label: tt("The nine ideas above", "Die neun Ideen oben"), value: tt("see how the teams already describe a group and what they would tailor", "sehen Sie, wie die Teams eine Gruppe schon beschreiben und was sie zuschneiden würden"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name a group of customers, not all customers (for example, firms that just added users).", "Nennen Sie eine Gruppe von Kunden, nicht alle Kunden (zum Beispiel Firmen, die gerade Nutzer hinzugefügt haben)."),
            tt("Say what AIConnect's data shows about that group.", "Sagen Sie, was die Daten von AIConnect über diese Gruppe zeigen."),
            tt("Finish with “so …”: what AIConnect would personalise for them (the product, the message, its timing or its channel).", "Schließen Sie mit „also …“: was AIConnect für sie personalisieren würde (das Produkt, die Nachricht, ihren Zeitpunkt oder ihren Kanal)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the pilot: two rates side by side", "Block 1.2 · Den Pilot lesen: zwei Raten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Pilot last quarter” directly below, with the two rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Pilot im letzten Quartal“ direkt darunter, mit den zwei Raten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt(
            "Last quarter AIConnect ran a pilot: half of a mailing list got the standard offer e-mail, the other half an offer chosen by a recommendation system. The app divides orders by e-mails and prints both rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell AIConnect. How such a rate is worked out is shown in",
            "Im letzten Quartal hat AIConnect einen Pilot durchgeführt: Die eine Hälfte einer Verteilerliste bekam die Standard-Angebots-E-Mail, die andere ein Angebot, das ein Recommendation System ausgewählt hatte. Die App teilt Bestellungen durch E-Mails und druckt beide Raten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie AIConnect sagen und was nicht. Wie eine solche Rate entsteht, zeigt",
          )}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Pilot last quarter · offer e-mails (Case assumption)", "Pilot im letzten Quartal · Angebots-E-Mails (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("E-mails delivered", "Zugestellte E-Mails")}</th>
              <th className="px-3 py-2 text-right">{tt("Orders within 14 days", "Bestellungen in 14 Tagen")}</th>
              <th className="px-3 py-2 text-right">{tt("Conversion rate (printed)", "Conversion Rate (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Standard offer", "Standardangebot"), num(PILOT.control.sent), num(PILOT.control.orders), pct(FORECAST.controlRate)])}
            {row("fc-var", [tt("Personalised offer", "Personalisiertes Angebot"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(
          `Read it like this: of every 100 e-mails, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} led to an order with the standard offer and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} with the personalised one, so the personalised offer sold ${num(FORECAST.f2)} times as often. Each group has only ${PILOT.control.orders} and ${PILOT.variant.orders} orders behind it.`,
          `So lesen Sie es: Von je 100 E-Mails führten ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} beim Standardangebot und ${num(FORECAST.f1, { maximumFractionDigits: 1 })} beim personalisierten zu einer Bestellung, das personalisierte Angebot verkaufte also ${num(FORECAST.f2)}-mal so oft. Hinter jeder Gruppe stehen nur ${PILOT.control.orders} und ${PILOT.variant.orders} Bestellungen.`,
        )}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What does the pilot mean for AIConnect?", "Was bedeutet der Pilot für AIConnect?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what AIConnect should do next, and why it cannot be sure yet.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was AIConnect als Nächstes tun sollte, und warum es noch nicht sicher sein kann.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much better the personalised offer did, and how many orders stand behind each group? Quote one and say what follows.", "Welcher gedruckte Wert sagt, wie viel besser das personalisierte Angebot abschnitt, und wie viele Bestellungen stehen hinter jeder Gruppe? Zitieren Sie einen und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Conversion rates, standard and personalised", "Conversion Rates, Standard und personalisiert"), value: `${pct(FORECAST.controlRate)} · ${pct(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Orders behind each group", "Bestellungen hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a pilot is not yet proof (Materi A6)", "Warum ein Pilot noch kein Beweis ist (Materi A6)"), value: tt("a small base can be partly luck", "eine kleine Basis kann teilweise Zufall sein"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much better the personalised offer converted (the two rates, or “1.6 times”).", "Sagen Sie, wie viel besser das personalisierte Angebot konvertierte (die zwei Raten, oder „1,6-mal“)."),
            tt("Say what AIConnect should do next, for example a larger second test.", "Sagen Sie, was AIConnect als Nächstes tun sollte, zum Beispiel einen größeren zweiten Test."),
            tt("Say it as an estimate: a pilot is not yet proof.", "Sagen Sie es als Schätzung: Ein Pilot ist noch kein Beweis."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
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
      core
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight contact situations” below: requests a month, whether the answer is the same every time, and what is at stake. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Kontaktsituationen“ unten: Anfragen pro Monat, ob die Antwort jedes Mal dieselbe ist, und was auf dem Spiel steht. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt(
            "How to read the table. Each row is one kind of contact that reaches AIConnect's service and sales teams, for example a customer who cannot log in. “Requests a month” says how often it happens (bold means 100 or more). “Same answer every time?” says whether the right answer is identical for every customer, like a password reset, or depends on the customer. “What is at stake” says what the customer could lose: low is a short wait, mid is a price or a bill, high is a whole contract or an upset customer.",
            "So lesen Sie die Tabelle. Jede Zeile ist eine Art von Kontakt, der beim Service und Vertrieb von AIConnect ankommt, zum Beispiel ein Kunde, der sich nicht anmelden kann. „Anfragen pro Monat“ sagt, wie oft das vorkommt (fett heißt 100 oder mehr). „Jedes Mal dieselbe Antwort?“ sagt, ob die richtige Antwort für jeden Kunden gleich ist, wie bei einem Passwort-Reset, oder vom Kunden abhängt. „Was auf dem Spiel steht“ sagt, was der Kunde verlieren könnte: gering ist eine kurze Wartezeit, mittel ein Preis oder eine Rechnung, hoch ein ganzer Vertrag oder ein verärgerter Kunde.",
          )}
        </Gloss>
      </p>
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
              {i === 0 && (
                <WritingHelp
                  id="insight-kit"
                  refs={[
                    { label: tt("What each technology does (Materi A2 and A3)", "Was jede Technologie tut (Materi A2 und A3)"), value: tt("suggests a product · adapts the message · does a step by itself", "schlägt ein Produkt vor · passt die Nachricht an · erledigt einen Schritt selbst"), target: "mat-A3" },
                    { label: tt("The contact situations (table above)", "Die Kontaktsituationen (Tabelle oben)"), value: tt("what customers ask for, and what is at stake", "worum Kunden bitten, und was auf dem Spiel steht"), target: "cust-c1" },
                    { label: tt("Risks named in Materi A1 and A3", "Risiken in Materi A1 und A3"), value: tt("wrong or pushy suggestions · feeling watched · being stuck with a machine", "falsche oder aufdringliche Vorschläge · sich beobachtet fühlen · bei einer Maschine festhängen"), target: "mat-A1" },
                  ]}
                  steps={[
                    tt("Choose the technology and name what the customer gains from it (time saved, a fitting offer, a message at the right moment).", "Wählen Sie die Technologie und nennen Sie, was der Kunde davon hat (gesparte Zeit, ein passendes Angebot, eine Nachricht zur richtigen Zeit)."),
                    tt("Say it in one sentence from the customer's side.", "Sagen Sie es in einem Satz aus Sicht des Kunden."),
                    tt("Finish with “but” and the risk the same technology brings.", "Schließen Sie mit „aber“ und dem Risiko, das dieselbe Technologie mitbringt."),
                  ]}
                />
              )}
            </TextBox>
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
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
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 (Optional) */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("When does AI bring real added value, and when is it technology without strategy?", "Wann bringt KI echten Mehrwert, und wann ist es Technologie ohne Strategie?"), help: tt("One or two sentences, using one idea from Block 1.1 that adds value and one that would not.", "Ein oder zwei Sätze, mit einer Idee aus Block 1.1, die Mehrwert bringt, und einer, die es nicht täte.") },
    { k: "causation", label: tt("Automation or customer experience: where would automating a contact make it worse?", "Automatisierung oder Kundenerlebnis: Wo würde ein automatisierter Kontakt es verschlechtern?"), help: tt("Name a situation from the table in Block 1.3, what a customer would feel, and what that costs AIConnect.", "Nennen Sie eine Situation aus der Tabelle in Block 1.3, was ein Kunde empfinden würde, und was das AIConnect kostet.") },
    { k: "decider", label: tt("How would a data-driven decision-maker read a pilot like AIConnect's before rolling it out?", "Wie würde eine datengetriebene Entscheiderin einen Pilot wie den von AIConnect lesen, bevor sie ihn ausrollt?"), help: tt("A pilot sent 2,000 e-mails to each group and counted 60 and 96 orders. What would they check first, what would they not yet conclude, and what would they do next? Be concrete.", "Ein Pilot schickte 2.000 E-Mails an jede Gruppe und zählte 60 und 96 Bestellungen. Was würde sie zuerst prüfen, was noch nicht schließen, und was als Nächstes tun? Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 and 1.3, and the two starting points in Materi A1. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 und 1.3 und die zwei Ausgangspunkte in Materi A1. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A3", "A6"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you build the measurement: when does AI add value, where does automation hurt the customer experience, and how would someone who decides with data read a pilot?", "Bevor Sie die Messung aufbauen: Wann bringt KI Mehrwert, wo schadet Automatisierung dem Kundenerlebnis, und wie würde jemand, der mit Daten entscheidet, einen Pilot lesen?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
