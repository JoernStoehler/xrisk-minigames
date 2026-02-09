/**
 * Stateful CLI for agent-driven playtesting.
 *
 * Persists game state to /tmp/ai-ceo-cli-state.json between invocations.
 * Each invocation does ONE action and returns ONLY the result.
 * The agent keeps prior emails in its context window.
 *
 * Usage:
 *   npx tsx scripts/cli.ts status        — show current date + metrics + pending decisions
 *   npx tsx scripts/cli.ts next          — advance to next email, print it
 *   npx tsx scripts/cli.ts reply <id>    — reply to current decision with option id
 *   npx tsx scripts/cli.ts reset         — start new game
 *   npx tsx scripts/cli.ts inbox         — list all received emails (id, date, subject, replied?)
 *
 * Designed for agents: each call returns concise, parseable output.
 * No ANSI colors. No interactive prompts.
 */
import * as fs from "node:fs";
import { scenario } from "../src/data/scenario";
import {
  createInitialState,
  advanceDay,
  handleReply,
} from "../src/engine/state";
import type { GameState, NarrativeContext, Email } from "../src/engine/types";

const STATE_FILE = "/tmp/ai-ceo-cli-state.json";

// ── Engine (from useGame.ts, adapted for non-React) ──

function computeEmails(state: GameState): Email[] {
  const ctx: NarrativeContext = {
    currentDate: state.currentDate,
    decisions: state.decisions,
    metrics: state.metrics,
  };

  const result: Email[] = [];
  for (const def of scenario) {
    const date = typeof def.date === "string" ? def.date : def.date(ctx);
    if (!date || date > state.currentDate) continue;
    const email = def.generate(ctx, date);
    if (!email) continue;

    const ui = state.emailUI[email.id];
    const expired =
      email.replyExpiresOn &&
      state.currentDate > email.replyExpiresOn &&
      !ui?.chosenReply;

    result.push({
      ...email,
      read: ui?.read,
      starred: ui?.starred,
      chosenReply: ui?.chosenReply,
      replyOptions: expired ? undefined : email.replyOptions,
    });
  }
  return result;
}

function getNextEmailDate(state: GameState): string | null {
  const ctx: NarrativeContext = {
    currentDate: state.currentDate,
    decisions: state.decisions,
    metrics: state.metrics,
  };

  let earliest: string | null = null;
  for (const def of scenario) {
    const date = typeof def.date === "string" ? def.date : def.date(ctx);
    if (!date || date <= state.currentDate) continue;
    if (!earliest || date < earliest) earliest = date;
  }
  return earliest;
}

function advanceToNext(state: GameState): GameState {
  const targetDate = getNextEmailDate(state);
  if (!targetDate) {
    let s = state;
    while (s.phase === "playing") s = advanceDay(s);
    return s;
  }
  let s = state;
  while (s.currentDate < targetDate && s.phase === "playing") {
    s = advanceDay(s);
  }
  return s;
}

// ── State persistence ──

function loadState(): GameState {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf-8");
    return JSON.parse(raw) as GameState;
  } catch {
    return createInitialState();
  }
}

function saveState(state: GameState) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── Formatting ──

function formatMetrics(state: GameState): string {
  const m = state.metrics;
  return [
    `Date: ${state.currentDate}`,
    `Stock: $${m.stockPrice.toFixed(0)}`,
    `Revenue: $${m.revenue.toFixed(1)}B/q`,
    `Public Trust: ${m.publicTrust.toFixed(0)}%`,
    `Board Confidence: ${m.boardConfidence.toFixed(0)}%`,
    `AI Capability: ${m.aiCapability.toFixed(0)}`,
    `Oversight: ${m.oversight.toFixed(0)}%`,
  ].join(" | ");
}

function formatEmail(email: Email): string {
  let out = `--- EMAIL ---\n`;
  out += `Date: ${email.date}\n`;
  out += `From: ${email.from.name} <${email.from.email}> (${email.from.role})\n`;
  out += `Subject: ${email.subject}\n`;
  if (email.tags?.length) out += `Tags: ${email.tags.join(", ")}\n`;
  out += `\n${email.body}\n`;

  if (email.attachments?.length) {
    out += `\nAttachments:\n`;
    for (const att of email.attachments) {
      out += `  ${att.label} (${att.type}): ${Object.entries(att.data).map(([k, v]) => `${k}: ${v}`).join(", ")}\n`;
    }
  }

  if (email.replyOptions?.length) {
    out += `\nREPLY OPTIONS:\n`;
    for (const opt of email.replyOptions) {
      const effects = opt.effects
        ? ` [${opt.effects.map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`).join(", ")}]`
        : "";
      const ends = opt.endsGame ? " [ENDS GAME]" : "";
      out += `  ${opt.id}: "${opt.text}"${effects}${ends}\n`;
    }
    if (email.replyExpiresOn) {
      out += `  (Expires: ${email.replyExpiresOn})\n`;
    }
  }

  return out;
}

// ── Commands ──

const [, , command, ...args] = process.argv;

let state = loadState();

switch (command) {
  case "reset": {
    state = createInitialState();
    saveState(state);
    console.log("Game reset. Date: 2026-10-14");
    break;
  }

  case "status": {
    console.log(formatMetrics(state));
    if (state.phase === "ended") {
      console.log(`\nGAME OVER\n${state.endingText}`);
    } else {
      const nextDate = getNextEmailDate(state);
      if (nextDate) console.log(`Next email: ${nextDate}`);

      // Show pending decisions
      const emails = computeEmails(state);
      const pending = emails.filter(
        (e) => e.replyOptions?.length && !e.chosenReply
      );
      if (pending.length) {
        console.log(`\nPending decisions:`);
        for (const e of pending) {
          console.log(`  ${e.id}: "${e.subject}"`);
          for (const opt of e.replyOptions!) {
            console.log(`    reply ${opt.id}`);
          }
        }
      }
    }
    break;
  }

  case "next": {
    if (state.phase === "ended") {
      console.log("GAME OVER\n" + state.endingText);
      break;
    }

    const emailsBefore = computeEmails(state).map((e) => e.id);
    state = advanceToNext(state);
    saveState(state);

    if (state.phase === "ended") {
      console.log(formatMetrics(state));
      console.log(`\nGAME OVER\n${state.endingText}`);
      break;
    }

    const emailsAfter = computeEmails(state);
    const newEmails = emailsAfter
      .filter((e) => !emailsBefore.includes(e.id))
      .sort((a, b) => a.date.localeCompare(b.date));

    if (newEmails.length === 0) {
      console.log(`Advanced to ${state.currentDate}. No new emails.`);
    } else {
      console.log(formatMetrics(state));
      for (const email of newEmails) {
        console.log();
        console.log(formatEmail(email));
      }
    }
    break;
  }

  case "reply": {
    const replyId = args[0];
    if (!replyId) {
      console.error("Usage: cli.ts reply <option-id>");
      process.exit(1);
    }

    const emails = computeEmails(state);
    // Find the email with this reply option
    const email = emails.find((e) =>
      e.replyOptions?.some((o) => o.id === replyId)
    );

    if (!email) {
      console.error(`No pending decision with reply option "${replyId}".`);
      console.error("Current pending decisions:");
      const pending = emails.filter(
        (e) => e.replyOptions?.length && !e.chosenReply
      );
      for (const e of pending) {
        for (const opt of e.replyOptions!) {
          console.error(`  ${opt.id}`);
        }
      }
      process.exit(1);
    }

    const option = email.replyOptions!.find((o) => o.id === replyId)!;
    state = handleReply(state, email, replyId);
    saveState(state);

    console.log(`Replied to "${email.subject}"`);
    console.log(`> ${option.text}`);
    if (option.effects) {
      console.log(
        `Effects: ${option.effects.map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`).join(", ")}`
      );
    }
    console.log();
    console.log(formatMetrics(state));

    if (state.phase === "ended") {
      console.log(`\nGAME OVER\n${state.endingText}`);
    }
    break;
  }

  case "inbox": {
    const emails = computeEmails(state).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    for (const e of emails) {
      const status = e.chosenReply
        ? "[replied]"
        : e.replyOptions?.length
          ? "[ACTION NEEDED]"
          : "";
      const tags = e.tags?.length ? ` (${e.tags.join(", ")})` : "";
      console.log(`${e.date} | ${e.from.name} | ${e.subject}${tags} ${status}`);
    }
    console.log(`\n${emails.length} emails total.`);
    break;
  }

  case "read": {
    const emailId = args[0];
    if (!emailId) {
      console.error("Usage: cli.ts read <email-id>");
      process.exit(1);
    }
    const emails = computeEmails(state);
    const email = emails.find((e) => e.id === emailId);
    if (!email) {
      console.error(`Email "${emailId}" not found.`);
      process.exit(1);
    }
    console.log(formatEmail(email));
    break;
  }

  default: {
    console.log(`AI CEO Game — CLI

Commands:
  reset              Start a new game
  status             Show date, metrics, pending decisions
  next               Advance to next email (prints new emails)
  reply <option-id>  Reply to a pending decision
  inbox              List all received emails
  read <email-id>    Show a specific email

State stored in ${STATE_FILE}`);
  }
}
