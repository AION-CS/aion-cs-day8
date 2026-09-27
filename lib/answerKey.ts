import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, PICK_WHY, ROUTINE_LABEL, STAKES_LABEL, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, EVIDENCE_LABEL, MEASURES, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  KPIS,
  LOGIC_OWNER_LABEL,
  MODEL_ARCH,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  MODEL_TRIPWIRE,
  OWNERS,
  OWNER_ACCEPT,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Recommendation, communication or automation",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Idea ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Idea ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are idea 2 (triggered by behaviour, but the point is which product: recommendation) and idea 5 (sent automatically, but the point is the message built from this customer's use: communication). Ask “what changes between two customers?” and “who does the work that a person did before?”.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Automate fully, keep with a person",
    expected: `Automate fully: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Keep with a person: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · ${c.volume}/month · same answer: ${ROUTINE_LABEL[c.routine]} · at stake: ${STAKES_LABEL[c.stakes]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Automate fully. " : CHURN_TRUTH.includes(c.id) ? "Keep with a person. " : "Assist (neither list). "}${PICK_WHY[c.id]}`,
    })),
    teachingNote:
      "The traps are the licence price (routine and frequent, but a price is a commitment: assist) and the night-time technical question (frequent and low stakes, but only partly routine: a chatbot with hand-over, not full automation). The four middle situations are all “assist”, which is the answer most of AIConnect's contacts deserve. The check reports only how many of the four picks hold.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Kind of metric",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with value)`).join(", ")}. M-06 is the trap: it did not move with value last year, but it is still a driver; tag what a metric measures, not how it behaved. M-07 (unsubscribes) moved with value and is a guardrail, not an outcome.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, meaning and use per kind",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no kind."
              : "This use fits a different kind; read what this kind tells management.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one metric is not punished twice. With the reference tags, outcome and driver are Strong (3 and 2 of 3 moved), guardrail Partial (1 of 3), vanity None.",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in measuring the pilot",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The three false ones are common beliefs about KPIs; each is contradicted by something in the material (guardrails, the small KPI system, reading a number against its base).",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The brief's problem is low conversion; the test is judged by orders, not by opens."
                : "The size is fixed before the start, so nobody stops at a lucky moment; two full weeks cover weekday effects."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  return {
    title: "Block 2.4 · The three measures",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((m) => ({
      label: `${m.name} · ${m.model.effect} × ${explainBucket(m.evidence)} × ${m.model.feasibility} = ${modelScore(m.id)} · ${euro(m.cost)} · measured by ${EVIDENCE_LABEL[m.evidence]} · answers ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(m.id),
      why: `${m.verdict} ${m.model.note}`,
    })),
    teachingNote: `Score = Effect × Measurability × Scalability. The checks look only at the problems named (a subset of the real ones, or “none” for the chatbot) and at measurability, which follows from how success is measured. Effect and scalability are judged; the model values are here. The model three cost ${euro(MODEL_COST)}; a learner who adds the chatbot instead of the triggered e-mails is choosing service speed over the brief's problems: accept it only if the why says so.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order",
    expected: MODEL_ORDER.map((id) => MEASURES.find((m) => m.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((m) => m.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Highest score (27), answers two problems, and the pilot showed 1.6 times the standard rate." : i === 1 ? "Makes every other measure measurable; starts alongside the engine so it is measured from week one." : "Makes contact personal; its effect on orders is smaller.",
    })),
    teachingNote: "The testing routine and the triggered e-mails both score 18, so either order between them defends. Putting the KPI dashboard first is also defensible if the why says the engine must be measured from its first day; it is then an inversion the learner explains.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the AI-based control system",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not tool-first or an unlimited AI`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: without one KPI system, every tool reports its own success and nobody can steer."
          : c === "rules"
            ? "Required: it is the answer to “measures not measurable” and to technology without strategy."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a slide."
              : c === "review"
                ? "A good third: continuous optimisation means checking results against forecasts and adjusting."
                : c === "hoard"
                  ? "Rejected: tool first, use cases later is technology without strategy; the brief's budget and time do not allow it."
                  : "Rejected: prices and offers set by a model nobody can explain or cap cannot be checked, and they risk business customers' trust.",
    })),
    teachingNote: "The check only asks for the KPI system and the test-before-scale rule. The third is judged; KPI owners and the quarterly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Select now, data first, or not now",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `No KPI is named, so not now, however ready its data (${s.complete}%) or cheap.` : s.complete >= 80 ? `It moves a KPI (${s.decision.toLowerCase()}) and ${s.complete}% of its data is ready: select now.` : `It would move a KPI (${s.decision.toLowerCase()}), but only ${s.complete}% of its data is ready: fix the data first.`,
    })),
    teachingNote: "Social media listening is the trap: 70% of its data is there and it sounds modern, but it moves no KPI of the system. The next-best-action tool is the other: it matters for key accounts, but the CRM notes it needs are less than half complete.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. Conversion rate is the model's greatest lever: High on all four and the problem the brief names. A learner who picks engagement defends it as the earliest driver; ask how the board would see the result.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Roll out, keep testing or stop",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (uplift ${s.lift}%, ${s.cases} conversions)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Uplift ${s.lift}% on ${s.cases} conversions: clear and proven, guardrail intact. Marketing owns the e-mail channel, so marketing rolls it out.`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Uplift ${s.lift}% looks strong, but ${s.cases} conversions are too few: keep testing; the data team runs it on.`
              : `Uplift ${s.lift}%: a small difference. Keep testing a stronger variant; the data team runs it.`
            : `Uplift ${s.lift}%: no real gain${s.lift < 0 ? ", and complaints" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The renewal timing is the trap: +18% tempts learners to roll out, but forty conversions can be chance. The chatbot greeting is the second: four hundred conversions prove that there is almost no difference, so a large sample does not rescue a tiny uplift.",
  };
}

export function ownerKey(funded: ArchId[]): AnswerKeyBlock {
  const ids = funded.length ? funded : MODEL_ARCH;
  return {
    title: "Block 3.5 · Owners, sequence and funding",
    expected: `Model: ${MODEL_ARCH.map((id) => `${ARCH_BY_ID[id].name} (${OWNERS[OWNER_ACCEPT[id][0]].name})`).join(", ")} · ${euro(MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0))}`,
    options: ids.map((id) => ({
      label: `${ARCH_BY_ID[id].name} → ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}`,
      expected: true,
      why:
        id === "foundation"
          ? "Head of Data (or IT, who owns the interfaces). It starts first: every other item is measured by it."
          : id === "suite"
            ? "A black box: nobody at AIConnect can explain or measure it. Funding it breaks the third rule; the check flags it."
            : id === "pricing"
              ? "Its price data is only 40% ready (Block 3.2: data first), and €50,000 would push the plan over."
              : `The owner who can change it without asking anyone: ${OWNERS[OWNER_ACCEPT[id][0]].profile}`,
    })),
    teachingNote: `The check tests three rules: the KPI system starts no later than the first other item, total within ${euro(R2_BUDGET)}, nothing funded is a black box. Owners are not checked by the app; use this key. Leaving out the training instead of the data clean-up defends if the learner argues that the chatbot and pricing will not come this half-year anyway.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.6 · The technology decision",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: "“Buy the suite” and “Stage it” are both decisions, with different reasoning; the check outlines only “Wait”, because the brief asks for a technology decision despite an unclear forecast. Push a learner who buys the suite on how they would measure it.",
  };
}

export function tripKey(): AnswerKeyBlock {
  const k = KPIS.find((x) => x.id === MODEL_TRIPWIRE.kpi)!;
  return {
    title: "Block 3.6 · The tripwire",
    expected: `${k.label} ≥ ${MODEL_TRIPWIRE.threshold}% by month ${MODEL_TRIPWIRE.month}, else adjust one rule`,
    options: KPIS.map((x) => ({ label: `${x.label} (baseline ${x.baseline}${x.unit === "%" ? "%" : ` ${x.unit}`})`, expected: x.behaviour, why: x.behaviour ? "How customers behave: the result the system is meant to move." : "Counts AIConnect's own output, not how customers responded." })),
    teachingNote: "Any customer metric with a threshold better than its baseline defends. E-mails sent is the tempting one: it rises with every trigger and says nothing about whether customers bought.",
  };
}
