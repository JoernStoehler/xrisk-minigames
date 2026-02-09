/**
 * Interactive CLI player — play the game in the terminal.
 *
 * Usage: npx tsx scripts/play.ts
 *
 * Lets you play through the game without a browser:
 * - Shows new emails as they arrive
 * - Prompts for decisions (enter a number)
 * - Enter to advance to the next email
 * - Ctrl+C to quit
 *
 * Useful for:
 * - M3 playtesting without clicking through the UI
 * - Agent-driven playtesting via Bash (pipe choices to stdin)
 * - Quick iteration on content changes
 */
import * as readline from "node:readline";
import { scenario } from "../src/data/scenario";
import { createInitialState, advanceDay, handleReply } from "../src/engine/state";
import type { GameState, NarrativeContext, Email } from "../src/engine/types";

// ── Engine (duplicated from useGame.ts — can't import React hook) ──

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

// ── Display helpers ──

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";

function formatDate(d: string): string {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function printMetrics(state: GameState) {
  const m = state.metrics;
  console.log(
    `${DIM}─── Metrics: ` +
    `OAIN $${m.stockPrice.toFixed(0)} │ ` +
    `Rev $${m.revenue.toFixed(1)}B │ ` +
    `Trust ${m.publicTrust.toFixed(0)}% │ ` +
    `Board ${m.boardConfidence.toFixed(0)}% │ ` +
    `AI ${m.aiCapability.toFixed(0)} │ ` +
    `Oversight ${m.oversight.toFixed(0)}%` +
    ` ───${RESET}`
  );
}

function printEmail(email: Email) {
  const tags = email.tags?.length ? ` ${DIM}[${email.tags.join(", ")}]${RESET}` : "";
  console.log(`\n${BOLD}═══ ${formatDate(email.date)} ═══${RESET}${tags}`);
  console.log(`${BOLD}From:${RESET} ${email.from.name} <${email.from.email}>`);
  console.log(`${DIM}${email.from.role}${RESET}`);
  console.log(`${BOLD}Subject:${RESET} ${email.subject}`);
  console.log();
  console.log(email.body);

  if (email.attachments?.length) {
    console.log();
    for (const att of email.attachments) {
      const data = Object.entries(att.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      console.log(`${DIM}📎 ${att.label} (${att.type}): ${data}${RESET}`);
    }
  }
}

// ── Interactive loop ──

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim()));
  });
}

async function main() {
  console.log(`${BOLD}AI CEO Game — CLI Player${RESET}`);
  console.log(`${DIM}Press Enter to advance. Type a number to reply. Ctrl+C to quit.${RESET}\n`);

  let state = createInitialState();
  const seen = new Set<string>();

  while (state.phase === "playing") {
    const emails = computeEmails(state);
    const newEmails = emails
      .filter((e) => !seen.has(e.id))
      .sort((a, b) => a.date.localeCompare(b.date));

    if (newEmails.length === 0) {
      // No new emails — advance
      state = advanceToNext(state);
      continue;
    }

    // Show metrics at the start of each batch
    printMetrics(state);

    for (const email of newEmails) {
      seen.add(email.id);
      printEmail(email);

      if (email.replyOptions && email.replyOptions.length > 0) {
        console.log();
        console.log(`${YELLOW}${BOLD}── Reply Options ──${RESET}`);
        for (let i = 0; i < email.replyOptions.length; i++) {
          const opt = email.replyOptions[i];
          const effects = opt.effects
            ? ` ${DIM}(${opt.effects.map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`).join(", ")})${RESET}`
            : "";
          const ends = opt.endsGame ? ` ${RED}[ENDS GAME]${RESET}` : "";
          console.log(`  ${CYAN}${i + 1}.${RESET} ${opt.text}${effects}${ends}`);
        }
        console.log(`  ${DIM}0. Skip (let decision expire)${RESET}`);

        let choice = -1;
        while (choice < 0 || choice > email.replyOptions.length) {
          const input = await ask(`${YELLOW}Your choice [0-${email.replyOptions.length}]: ${RESET}`);
          choice = parseInt(input, 10);
          if (isNaN(choice)) choice = -1;
        }

        if (choice > 0) {
          const opt = email.replyOptions[choice - 1];
          console.log(`\n${GREEN}✓ Sent: "${opt.text}"${RESET}`);
          state = handleReply(state, email, opt.id);
        } else {
          console.log(`\n${DIM}(Skipped — decision window will expire)${RESET}`);
        }
      }
    }

    // Prompt to continue
    const nextDate = getNextEmailDate(state);
    if (nextDate && state.phase === "playing") {
      await ask(`\n${DIM}[Enter to advance to ${formatDate(nextDate)}]${RESET} `);
      state = advanceToNext(state);
    } else if (state.phase === "playing") {
      await ask(`\n${DIM}[Enter to continue...]${RESET} `);
      state = advanceToNext(state);
    }
  }

  // Game over
  console.log(`\n${RED}${BOLD}${"═".repeat(60)}${RESET}`);
  console.log();
  console.log(state.endingText);
  console.log();
  printMetrics(state);
  console.log();

  // Show decisions
  if (state.decisions.length > 0) {
    console.log(`${BOLD}Your Decisions:${RESET}`);
    for (const d of state.decisions) {
      console.log(`  ${DIM}${d.date}${RESET} ${d.emailSubject}`);
      console.log(`    → ${d.choiceText}`);
    }
  } else {
    console.log(
      `${DIM}You made no decisions. The emails piled up. Things happened anyway.${RESET}`
    );
  }

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
