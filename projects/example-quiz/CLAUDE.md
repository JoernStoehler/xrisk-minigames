# Example Quiz — Reference Project

This is a minimal example project that demonstrates the tech stack and conventions. Future agents can reference it when building new projects. It is NOT a polished product.

## What This Is

A 5-question multiple-choice quiz about AI x-risk basics. Shows score at end.

## Specs

- 5 hardcoded questions with 4 answer choices each
- One correct answer per question, brief explanation shown after answering
- Progress indicator (e.g. "Question 2 of 5")
- Score summary at end with option to restart
- Dark theme, centered layout, mobile-friendly
- No external APIs, no persistence, no routing — pure client-side React state

## What This Demonstrates

- React state management (useState for quiz progression)
- Tailwind CSS styling (dark theme, responsive layout)
- Vitest unit tests (quiz logic)
- Playwright E2E smoke test
- `npm run check` passing end-to-end

## Verification

```bash
npm run check   # typecheck + lint + build + test
npm run dev     # dev server at http://localhost:5173
```
