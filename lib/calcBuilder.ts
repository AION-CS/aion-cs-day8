import { FIGURE_IDS, FORECAST, PILOT, extraOf, liftOf, rateOf } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { tt } from "@/lib/lang";
import { parseAmount } from "@/lib/parseAmount";

/**
 * The "automatic calculator" under a calculation question: the formula split into small labelled parts. The learner types each part
 * (a value read from a printed row); the result is computed live and can be copied into the answer field. On "Check", every part is
 * compared with the value it should hold, and a wrong part names the exact row to read, never the value. Expected values come from the
 * same constants as the tables and the model answers (data/forecast.ts).
 */
export type CalcPart = { id: string; label: string; expected: number; tolerance?: number; clue: string };
export type CalcBuilder = { parts: CalcPart[]; compute: (v: Record<string, number>) => number; show: (v: Record<string, string>) => string };

const f1Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "orders", label: tt("Orders from the personalised offer", "Bestellungen aus dem personalisierten Angebot"), expected: PILOT.variant.orders, clue: tt("“Pilot last quarter”: the orders in the row of the personalised offer, not of the standard offer.", "„Pilot im letzten Quartal“: die Bestellungen in der Zeile des personalisierten Angebots, nicht des Standardangebots.") },
      { id: "sent", label: tt("E-mails with the personalised offer", "E-Mails mit dem personalisierten Angebot"), expected: PILOT.variant.sent, clue: tt("“Pilot last quarter”: the e-mails delivered with the personalised offer, not the e-mails of a whole year.", "„Pilot im letzten Quartal“: die zugestellten E-Mails mit dem personalisierten Angebot, nicht die E-Mails eines ganzen Jahres.") },
    ];
  },
  compute: (v) => rateOf(v.orders, v.sent),
  show: (v) => `${v.orders} ÷ ${v.sent} × 100`,
};

const f2Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "rate", label: tt("Conversion rate of the personalised offer (%)", "Conversion Rate des personalisierten Angebots (%)"), expected: FORECAST.f1, tolerance: 0.05, clue: tt("This is your F1: the conversion rate of the personalised offer.", "Das ist Ihr F1: die Conversion Rate des personalisierten Angebots.") },
      { id: "orders", label: tt("Orders from the standard offer", "Bestellungen aus dem Standardangebot"), expected: PILOT.control.orders, clue: tt("“Pilot last quarter”: the orders in the row of the standard offer.", "„Pilot im letzten Quartal“: die Bestellungen in der Zeile des Standardangebots.") },
      { id: "sent", label: tt("E-mails with the standard offer", "E-Mails mit dem Standardangebot"), expected: PILOT.control.sent, clue: tt("“Pilot last quarter”: the e-mails delivered with the standard offer.", "„Pilot im letzten Quartal“: die zugestellten E-Mails mit dem Standardangebot.") },
    ];
  },
  compute: (v) => liftOf(v.rate, rateOf(v.orders, v.sent)),
  show: (v) => `${v.rate} ÷ (${v.orders} ÷ ${v.sent} × 100)`,
};

const f3Builder: CalcBuilder = {
  get parts() {
    return [
      { id: "yearly", label: tt("Offer e-mails a year", "Angebots-E-Mails pro Jahr"), expected: PILOT.yearly, clue: tt("“Next year”: the offer e-mails in a whole year, not the 2,000 of one pilot group.", "„Nächstes Jahr“: die Angebots-E-Mails eines ganzen Jahres, nicht die 2.000 einer Pilotgruppe.") },
      { id: "rate", label: tt("Conversion rate of the personalised offer (%)", "Conversion Rate des personalisierten Angebots (%)"), expected: FORECAST.f1, tolerance: 0.05, clue: tt("Your F1, as a percentage; the calculator turns the difference into a share of one.", "Ihr F1, in Prozent; der Rechner macht aus dem Unterschied einen Anteil von eins.") },
      { id: "orders", label: tt("Orders from the standard offer", "Bestellungen aus dem Standardangebot"), expected: PILOT.control.orders, clue: tt("“Pilot last quarter”: the orders in the row of the standard offer; only what the personalised offer adds on top counts as extra.", "„Pilot im letzten Quartal“: die Bestellungen in der Zeile des Standardangebots; nur was das personalisierte Angebot obendrauf bringt, zählt als zusätzlich.") },
      { id: "sent", label: tt("E-mails with the standard offer", "E-Mails mit dem Standardangebot"), expected: PILOT.control.sent, clue: tt("“Pilot last quarter”: the e-mails delivered with the standard offer.", "„Pilot im letzten Quartal“: die zugestellten E-Mails mit dem Standardangebot.") },
      { id: "order", label: tt("Average order value (€)", "Durchschnittlicher Bestellwert (€)"), expected: PILOT.order, clue: tt("“All orders”: the average order value, not a yearly revenue.", "„Alle Bestellungen“: der durchschnittliche Bestellwert, kein Jahresumsatz.") },
    ];
  },
  compute: (v) => extraOf(v.yearly, v.rate, rateOf(v.orders, v.sent), v.order),
  show: (v) => `${v.yearly} × (${v.rate}% − ${v.orders} ÷ ${v.sent} × 100%) × ${v.order}`,
};

export const FIGURE_BUILDERS: Record<FigureId, CalcBuilder> = { F1: f1Builder, F2: f2Builder, F3: f3Builder };
export const figAnswer = (id: FigureId) => ({ F1: FORECAST.f1, F2: FORECAST.f2, F3: FORECAST.f3 })[id];
export { FIGURE_IDS };

export const partKey = (figure: string, part: string) => `${figure}.${part}`;
export function partValues(b: CalcBuilder, figure: string, parts: Record<string, string>): Record<string, number | null> {
  return Object.fromEntries(
    b.parts.map((p) => {
      const raw = (parts[partKey(figure, p.id)] ?? "").trim();
      return [p.id, raw ? parseAmount(raw) : null];
    }),
  );
}
export function builderResult(b: CalcBuilder, figure: string, parts: Record<string, string>): number | null {
  const v = partValues(b, figure, parts);
  if (Object.values(v).some((x) => x === null)) return null;
  const r = b.compute(v as Record<string, number>);
  return Number.isFinite(r) ? Math.round(r * 1e6) / 1e6 : null;
}
export function wrongParts(b: CalcBuilder, figure: string, parts: Record<string, string>): string[] {
  const v = partValues(b, figure, parts);
  return b.parts.filter((p) => v[p.id] !== null && Math.abs((v[p.id] as number) - p.expected) > (p.tolerance ?? 1e-9)).map((p) => partKey(figure, p.id));
}
export function allPartsRight(b: CalcBuilder, figure: string, parts: Record<string, string>): boolean {
  const v = partValues(b, figure, parts);
  return Object.values(v).every((x) => x !== null) && wrongParts(b, figure, parts).length === 0;
}
export function modelParts(builders: Partial<Record<string, CalcBuilder>>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [fid, b] of Object.entries(builders)) if (b) for (const p of b.parts) out[partKey(fid, p.id)] = String(p.expected);
  return out;
}
export function figurePartFlags(parts: Record<string, string>): string[] {
  return FIGURE_IDS.flatMap((f) => wrongParts(FIGURE_BUILDERS[f], f, parts));
}
