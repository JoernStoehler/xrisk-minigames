export interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  greeting: string;
  signoff: string;
}

export interface EmailAttachment {
  label: string;
  type: "benchmark" | "report" | "chart";
  data: Record<string, number>;
}

export interface ReplyOption {
  id: string;
  text: string;
  effects?: StateEffect[];
  /** ID of modifier to trigger */
  triggersModifier?: string;
}

export interface Email {
  id: string;
  from: Person;
  subject: string;
  body: string;
  /** Game date string, e.g. "2026-10-15" */
  date: string;
  attachments?: EmailAttachment[];
  replyOptions?: ReplyOption[];
  /** If true, this email has been read */
  read?: boolean;
  /** Which reply was chosen */
  chosenReply?: string;
  /** If true, was moved to spam */
  spammed?: boolean;
  /** Tags for filtering/modification by modifiers */
  tags?: string[];
}

export interface StateEffect {
  key: keyof GameMetrics;
  delta: number;
}

export interface GameMetrics {
  aiCapability: number;       // 0-100, how capable the AI is
  publicTrust: number;        // 0-100, public trust in OpenAI
  boardConfidence: number;    // 0-100, board's confidence in CEO
  oversight: number;          // 0-100, how real the safety oversight is
  stockPrice: number;         // absolute, starts at ~150
  revenue: number;            // quarterly revenue in billions
}

export interface Modifier {
  id: string;
  name: string;
  /** Description for recap screen */
  description: string;
  /** State conditions to be triggerable */
  preconditions?: Partial<Record<keyof GameMetrics, { min?: number; max?: number }>>;
  /** Direct state effects when triggered */
  effects?: StateEffect[];
  /** Emails to inject when triggered */
  injectEmails?: Email[];
  /** Email IDs to suppress */
  suppressEmails?: string[];
  /** Personnel replacements: old person ID -> new person */
  replacePersonnel?: Record<string, Person>;
  /** Does this end the game? */
  endsGame?: boolean;
  /** If endsGame, what's the ending description */
  endingText?: string;
}

export type GamePhase = "playing" | "ended";

export interface Decision {
  date: string;
  emailId: string;
  emailSubject: string;
  chosenReplyText: string;
  modifierTriggered?: string;
}

export interface GameState {
  /** Current game date */
  currentDate: string;
  /** All metrics */
  metrics: GameMetrics;
  /** Current personnel roster (can be modified by modifiers) */
  personnel: Record<string, Person>;
  /** All emails (inbox + spam) */
  emails: Email[];
  /** Active modifier IDs */
  activeModifiers: string[];
  /** Decisions made by the player */
  decisions: Decision[];
  /** Game phase */
  phase: GamePhase;
  /** Ending text if game ended */
  endingText?: string;
  /** IDs of emails suppressed by modifiers */
  suppressedEmailIds: string[];
}
