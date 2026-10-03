import { BUDGET, EVIDENCE_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · A personalisation opportunity of your own",
    answer: L1().extraInsight ?? "",
    why: "An opportunity names a group of customers, what AIConnect's data shows about them, and what could be tailored to them. It must rest on data AIConnect has (orders, logins, opened e-mails).",
    lookFor: ["A group of customers, not “all customers”.", "What the data shows about them.", "What would be personalised: the product, the message, the timing or the channel (“so …”)."],
    pitfalls: ["A technology with no customer group (“use AI for e-mails”): ask for whom, and on what data.", "A discount for everyone: that is the opposite of personalisation."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What the pilot means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (3%, 4.8%, 1.6 times, or 60 and 96 orders).", "A next step: a larger second test, then rollout.", "Said as an estimate: 60 and 96 orders are still a small base."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“The personalised e-mail works for every customer”: it is a promising result from a small pilot, not proof."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Advantage ${i + 1}`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three advantages from three different technologies, each with the risk it brings. The app checks only that each names a technology, is long enough and names a risk.",
    lookFor: ["An advantage the customer feels (time saved, a better-fitting offer, a message at the right moment).", "The kind of technology it comes from.", "A risk: wrong or pushy suggestions, feeling watched, being stuck with a machine."],
    pitfalls: ["An advantage for AIConnect only (“more sales”): ask what the customer gains.", "No risk named: the task asks for both sides."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · When AI adds value" : k === "causation" ? "1.4 · Automation or customer experience" : "1.4 · Reading a pilot like a data-driven decision-maker",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["An idea from 1.1 that answers a measurable problem.", "An example of technology without strategy (a tool bought first, no KPI)."]
        : k === "causation"
          ? ["A concrete situation from 1.3 (usually the key account or the data-loss complaint).", "What the customer would feel and what it costs AIConnect."]
          : ["Checks the fairness of the comparison (same weeks, random split, size of each group).", "Does not over-read a small pilot.", "A next step before rollout: a larger test with a guardrail."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three KPIs",
    answer: L1().misread ?? "",
    example: tt(
      "Company A (a software shop) steers its renewal programme by three KPIs. Renewal rate, from the billing system, target 88% by month 6: it is the result the programme is paid for, so it is the outcome. Weekly active users per customer, from the login log, target 60%: customers do it before they renew and the success team can move it, so it is the driver. Cancellations after a reminder, from the service desk, must stay under 2%: if it rises we stop, so it is the guardrail. Choose yours from AIConnect's twelve metrics.",
      "Unternehmen A (ein Softwarehaus) steuert sein Verlängerungsprogramm mit drei KPIs. Verlängerungsrate, aus dem Abrechnungssystem, Ziel 88 % bis Monat 6: Es ist das Ergebnis, für das das Programm bezahlt wird, also der Outcome. Wöchentlich aktive Nutzer pro Kunde, aus dem Login-Protokoll, Ziel 60 %: Kunden tun es, bevor sie verlängern, und das Success-Team kann es bewegen, also der Treiber. Kündigungen nach einer Erinnerung, aus dem Servicedesk, müssen unter 2 % bleiben: Steigen sie, stoppen wir, also die Guardrail. Wählen Sie Ihre aus den zwölf Kennzahlen von AIConnect.",
    ),
    lookFor: ["At least one outcome KPI (conversion rate, customer value or retention rate).", "At least one driver KPI (engagement, clicks on recommendations, second module).", "For each: where the number comes from, a target and why it is a KPI; a guardrail as the third is a strong answer."],
    pitfalls: ["E-mails sent, followers or dashboards as a KPI: vanity metrics, they count AIConnect's activity.", "Three outcomes and no driver: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt(
      "Company A tests a renewal reminder. Hypothesis: if we send the reminder that names the customer's own usage instead of the standard text, then the renewal rate rises, because the customer sees what it would lose. Rule, written before the start: roll out if the rate is at least 8% above the control group with 80 renewals per group and cancellations stay under 2%; keep testing between 3% and 8%; stop below 3%. Write yours for AIConnect's test card.",
      "Unternehmen A testet eine Verlängerungserinnerung. Hypothese: Wenn wir die Erinnerung, die die eigene Nutzung des Kunden nennt, statt des Standardtexts senden, dann steigt die Verlängerungsrate, weil der Kunde sieht, was er verlöre. Regel, vor dem Start geschrieben: ausrollen, wenn die Rate bei 80 Verlängerungen pro Gruppe mindestens 8 % über der Kontrollgruppe liegt und die Kündigungen unter 2 % bleiben; weiter testen zwischen 3 % und 8 %; stoppen unter 3 %. Schreiben Sie Ihre für die Testkarte von AIConnect.",
    ),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (unsubscribes, complaints)."],
    pitfalls: ["“The new e-mail will be better”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${m.model.effect} × ${e} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Measurability from how success is measured (A7)", calc: `measured by ${EVIDENCE_LABEL[m.evidence]} → control group 3 · before and after 2 · none 1`, result: String(e) },
      { label: "Score = Effect × Measurability × Scalability", calc: `${m.model.effect} × ${e} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or scalability score is acceptable: only measurability follows a printed rule.`,
    pitfalls:
      id === "suite"
        ? ["Measurability 3 “because the vendor reports results”: the vendor's own report is not a KPI against a control group: 1."]
        : id === "chatbot"
          ? ["Answering “impersonal communication”: a chatbot answers faster, it does not make the message personal."]
          : id === "roles"
            ? ["Measurability 3: an open rate compared with last year has no control group: 2."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its effect and scalability scores`,
    answer: `Effect ${m.model.effect}, scalability ${m.model.feasibility}: ${m.model.note}`,
    example: tt(
      "Company A's “renewal call list for the 20 biggest customers”: effect 3, because every one of those customers is called before its contract ends and the list is where most revenue sits; scalability 1, because only two success managers can make the calls and it stops at 20 customers. Give your own reason for each score, with a fact printed on the card.",
      "Die „Verlängerungs-Anrufliste für die 20 größten Kunden“ von Unternehmen A: Wirkung 3, weil jeder dieser Kunden vor Vertragsende angerufen wird und auf dieser Liste der meiste Umsatz liegt; Skalierbarkeit 1, weil nur zwei Success Manager anrufen können und es bei 20 Kunden endet. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache.",
    ),
    why: "Effect and scalability are judgements; a different score with a clear reason is as good as the model. The reason should name what changes for the customer (effect) and whether the measure reaches every customer within the time (scalability).",
    lookFor: ["Effect: what the customer sees or does differently because of the measure.", "Scalability: whether it works for every customer without more people, and how long it takes (the weeks printed on the card).", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    example: tt(
      "Company A puts the renewal dashboard first: it scores 18 and it is the only measure that lets Company A tell whether the others work. The usage-based reminder comes second and starts alongside it. Together they cost €45,000 of the €80,000. The loyalty gift stays out: it scores 4 and nothing in the data says gifts keep customers. Make the same three statements about your own measures.",
      "Unternehmen A setzt das Verlängerungs-Dashboard an die erste Stelle: Es erzielt 18 und ist die einzige Maßnahme, mit der Unternehmen A erkennen kann, ob die anderen wirken. Die nutzungsbasierte Erinnerung kommt zweite und startet gleichzeitig. Zusammen kosten sie 45.000 € von 80.000 €. Das Treuegeschenk bleibt draußen: Es erzielt 4, und nichts in den Daten sagt, dass Geschenke Kunden halten. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen.",
    ),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the problem of the brief it answers).", "The cost against €200,000.", "What was left out, said as a decision."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name}`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for AIConnect's teams or customers.", "Which problem of the brief it answers (data not used, measures not measurable, automation potential unused)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask which KPI it serves, or who could explain and cap it."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “orders per portal visit” as its greatest-leverage KPI: it is linked to revenue and counted daily for every visitor by the systems, so every new tool can be judged within a week, and it answers the problem that nobody knows which tool sells. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „Bestellungen pro Portalbesuch“ als KPI mit der größten Hebelwirkung: Er ist mit dem Umsatz verbunden und wird täglich für jeden Besucher von den Systemen gezählt, sodass sich jedes neue Werkzeug innerhalb einer Woche beurteilen lässt, und er beantwortet das Problem, dass niemand weiß, welches Werkzeug verkauft. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (link to value and early together).", "The problem of the brief it answers."],
    pitfalls: ["E-mails sent as greatest “because it is weekly and complete”: it is not linked to value."],
  };
}

const ids = (tier: Record<string, Tier>, which: (t: Tier) => boolean) => ARCH_IDS.filter((id) => which(tier[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = funded.filter((id) => PANEL[id].measured && plan.items[id].measOk && plan.items[id].dataOk && !PANEL[id].blackBox);
  const measured = measuredIds.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk).reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredWeakIds = funded.filter((id) => PANEL[id].measured && weak.items[id].measOk && weak.items[id].dataOk && !PANEL[id].blackBox);
  const measuredWeak = measuredWeakIds.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const pr = planOf({ tier: { ...model, pricing: "now" as const } }, 0);
  return {
    title: "Step A · The architecture and what the panel shows for it",
    answer: `Now: ${MODEL_ARCH.map((id) => PANEL[id].short).join(", ")}. Not now: ${ARCH_IDS.filter((id) => model[id] === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After data item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (all start in month 1)`, calc: funded.map((id) => `${PANEL[id].short}: 1 + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's data: money on measured items with data ready ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(measured)} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: "Measurable, data 15 points weaker (the recommendation engine drops to 77%)", calc: `${n(measuredWeak)} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box or on data below 80% ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(riskWeak)} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's data (${plan.holding} of ${plan.applicable}) and opens the data test when the data is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for an architecture).", "The KPI system and the A/B routine are in place no later than any engine.", "Nothing the learner cannot explain or measure is funded without a reason."],
    pitfalls: [
      `Adding the full AI suite: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding dynamic pricing Now beside the model set: ${euro(pr.bars.spent)} funded, ${euro(pr.bars.over)} over the budget, and it starts in month 1 on data 40% ready, so the data test opens; After data with the clean-up Now starts it in month ${1 + monthsOf("quality")}.`,
      "Leaving the A/B routine out: every engine loses its link to measurement, so the Measurable bar falls to the share of money on the KPI system alone.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will steer its renewals by two KPIs that sales and service read from one page, and every new tool has to move one of them before it grows. Its customers get a reminder that fits their contract, and Company A can show which reminder worked. Write your own target vision for AIConnect.",
      "Unternehmen A wird seine Verlängerungen über zwei KPIs steuern, die Vertrieb und Service auf einer Seite lesen, und jedes neue Werkzeug muss einen davon bewegen, bevor es wächst. Seine Kunden erhalten eine Erinnerung, die zu ihrem Vertrag passt, und Unternehmen A kann zeigen, welche Erinnerung gewirkt hat. Schreiben Sie Ihr eigenes Zielbild für AIConnect.",
    ),
    why: "The plan asks for a target vision of an AI-based retention system. It is the one place the learner says, in two sentences, what the whole architecture is for, before the items.",
    lookFor: ["What the system does for the company and its customers.", "Steering by a few KPIs, not by single tools.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it one dashboard, a control group for every campaign, and two tools that run on data that is ready. It gives up a chatbot, because its answers are only 45% complete, and €30,000 stay unspent. If its data is worse than expected, the reminder tool rests on data below 80%, so it is watched first. Write yours about your own plan: what it gives, what it leaves open, what you gave up.",
      "Der Plan von Unternehmen A gibt ihm ein Dashboard, eine Kontrollgruppe für jede Kampagne und zwei Werkzeuge, die auf bereiten Daten laufen. Es verzichtet auf einen Chatbot, weil dessen Antworten erst zu 45 % vollständig sind, und 30.000 € bleiben ungenutzt. Sind seine Daten schlechter als erwartet, beruht das Erinnerungswerkzeug auf Daten unter 80 %, also wird es zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er offen lässt, worauf Sie verzichtet haben.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, ready, in budget).", "One thing it costs or leaves open (an item not now, data below 80%, budget unspent).", "A link to the two data scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A decides now but builds in stages: the dashboard and the control group start first, so every tool is measured from its first week, and the voice assistant waits because nobody could explain what it does. Write your reason for your own decision.",
      "Unternehmen A entscheidet jetzt, baut aber in Stufen: Dashboard und Kontrollgruppe starten zuerst, damit jedes Werkzeug ab seiner ersten Woche gemessen wird, und der Sprachassistent wartet, weil niemand erklären könnte, was er tut. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says what happens to the forecast that nobody can make (it is tested, not waited for)."],
  };
}

export function watchGuide(): MentorGuide {
  return {
    title: "Step B · What the learner watches, and when they would stop",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the renewal rate: today it is 76%, and if it is not clearly above that by month 4 on enough contracts, it stops rolling out the reminder tool and keeps the dashboard. It also watches the data behind the tool: if it stays below 80%, it pauses the tool. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet die Verlängerungsquote: Heute liegt sie bei 76 %, und liegt sie bis Monat 4 bei genug Verträgen nicht deutlich darüber, stoppt es den Rollout des Erinnerungswerkzeugs und behält das Dashboard. Es beobachtet auch die Daten hinter dem Werkzeug: Bleiben sie unter 80 %, pausiert es das Werkzeug. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (conversion, weekly active customers, customer value), not the company's own output, a month in which it can first be read (an engine is in use from month 3 in the model, so month 4), and an action. The numbers are the ones printed in “the numbers today”: conversion 3% today with an aim of 5%; the data bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["E-mails sent or dashboards built as the figure: that counts the company's own output.", "No month: a sign nobody can act on."],
  };
}
