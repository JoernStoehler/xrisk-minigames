/**
 * Core type definitions for the AI CEO game engine.
 *
 * Key concepts:
 * - GameState: the only persisted data (currentDate, metrics, emailUI, decisions, phase)
 * - Email: computed on-demand from EmailDef generators — never stored
 * - EmailDef: a scenario entry with a date (fixed or computed) and a generator function
 * - NarrativeContext: read-only snapshot passed to generators (currentDate, decisions, metrics)
 *
 * Narrative helpers (chose, decided, decisionDate) are used in scenario.ts generators
 * to branch content based on player choices.
 */

// === People ===

export interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  greeting: string;
  signoff: string;
}

// === Emails ===

export interface EmailAttachment {
  label: string;
  type: "benchmark" | "report" | "chart";
  data: Record<string, number>;
}

export interface ReplyOption {
  id: string;
  text: string;
  effects?: StateEffect[];
  /** Records a decision when chosen. Value = this reply's id. */
  decisionId?: string;
  /** Ends the game immediately when chosen. */
  endsGame?: boolean;
  endingText?: string;
}

export interface Email {
  id: string;
  from: Person;
  subject: string;
  body: string;
  date: string;
  attachments?: EmailAttachment[];
  replyOptions?: ReplyOption[];
  /** Date after which reply options expire and vanish. */
  replyExpiresOn?: string;
  read?: boolean;
  chosenReply?: string;
  starred?: boolean;
  tags?: string[];
}

export interface StateEffect {
  key: keyof GameMetrics;
  delta: number;
}

// === Game state ===

export interface GameMetrics {
  aiCapability: number;
  publicTrust: number;
  boardConfidence: number;
  oversight: number;
  stockPrice: number;
  revenue: number;
}

/** Per-email UI state — the only mutable data per email. */
export interface EmailUI {
  read?: boolean;
  starred?: boolean;
  chosenReply?: string;
}

export interface Decision {
  id: string;           // decision point (e.g. "safety-anomaly")
  choice: string;       // reply option id
  choiceText: string;   // display text for recap
  date: string;
  emailId: string;
  emailSubject: string;
}

export interface GameState {
  currentDate: string;
  metrics: GameMetrics;
  /** Per-email UI state (read, starred, chosenReply). Email content is computed. */
  emailUI: Record<string, EmailUI>;
  decisions: Decision[];
  phase: "playing" | "ended";
  endingText?: string;
}

// === Narrative engine ===

export interface NarrativeContext {
  currentDate: string;
  decisions: Decision[];
  metrics: GameMetrics;
}

/** Returns the choice for a decision, or null if not yet made. */
export function decided(ctx: NarrativeContext, decisionId: string): string | null {
  const d = ctx.decisions.find((dec) => dec.id === decisionId);
  return d ? d.choice : null;
}

/** Returns true if the player made this specific choice. */
export function chose(ctx: NarrativeContext, decisionId: string, choice: string): boolean {
  return decided(ctx, decisionId) === choice;
}

/** Returns the date a decision was made, or null. */
export function decisionDate(ctx: NarrativeContext, decisionId: string): string | null {
  const d = ctx.decisions.find((dec) => dec.id === decisionId);
  return d ? d.date : null;
}

/** Email generator: returns an Email or null (skip). */
export type EmailGenerator = (ctx: NarrativeContext, date: string) => Email | null;

/** A scheduled email in the scenario. */
export interface EmailDef {
  id: string;
  /** Fixed date string, or function returning delivery date (null = not applicable). */
  date: string | ((ctx: NarrativeContext) => string | null);
  generate: EmailGenerator;
}
