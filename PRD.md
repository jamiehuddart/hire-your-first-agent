# PRD: Hire Your First Agent

| | |
|---|---|
| Owner | Jamie Huddart |
| Status | v0.3, campaign built (see section 15) |
| Date | 6 November 2026 |
| Course | High Intent Labs (HIL), Task 2 |
| Repo | Public GitHub repo (to be created), hosted on GitHub Pages |

## 1. Summary

A browser game that teaches the High Intent Labs cohort how AI agents work and what they can be used for. The player runs a fictional early-stage company and "hires" AI agents to take on real business jobs. To win each level they assemble an agent from its building blocks (goal, tools, context, guardrails, human checkpoints), run it, and watch it succeed or fail in a simulated workplace. Every level unlocks a use-case card the player can take straight back to their own business.

The hook for this cohort: hiring is something every founder and operator already understands, so framing agents as hires makes the concepts land fast.

## 2. Problem

- Most of the cohort can use a chatbot but have not built an agent, and the jump from "prompt" to "agent with tools and memory" feels abstract.
- Tutorials teach the mechanics but rarely answer the question operators actually care about: "where would this save me time on Monday?"
- Course material is read once and forgotten. A game gets replayed, compared and talked about.

## 3. Goals

1. **Teach the anatomy of an agent**: the loop (plan, act, observe, repeat), and the parts that make it work: instructions, tools, context and memory, guardrails, and human-in-the-loop checkpoints.
2. **Spark use cases**: every player leaves with at least three agent ideas relevant to their own role or business.
3. **Be genuinely fun**: short levels, funny failures, visible progress and a bit of cohort rivalry.
4. **Ship within the course**: playable MVP before the course ends in early December 2026.

### Non-goals (v1)
- Calling a live AI model. Agent runs are simulated, so the game is free to host, needs no API keys and behaves the same for everyone.
- Accounts, logins or payments.
- Teaching code. The game teaches concepts and design choices; it links out to real tools for building.

## 4. Audience

| Persona | What they want from the game |
|---|---|
| **Founder** of an early-stage business | Where agents can replace hiring or cover gaps in a small team; what's safe to hand over |
| **Operator** (COO, Head of Ops, Chief of Staff) | Repeatable processes to automate across sales, finance, hiring and support |
| **Career professional** | A confident mental model of agents, and ideas to take back to their employer |

Shared traits: time-poor, commercially minded, non-technical to semi-technical, competitive in a friendly way. Mostly playing on a laptop, sometimes on a phone between meetings.

## 5. Core game design

### 5.1 Premise
You've just founded a start-up. You have a tiny team, an overflowing to-do list and a budget for "AI hires". Each level is a job you need doing. You write the role, kit your agent out, and send it to work.

### 5.2 The core loop (one level, 3 to 5 minutes)
1. **The brief**: a short scenario card ("Your inbox has 214 unread emails and an investor call in an hour").
2. **Build the agent**: choose from a deck of component cards in five slots:
   - **Job description** (the goal and instructions)
   - **Tools** (email, calendar, CRM, web search, spreadsheet, payments)
   - **Context** (company docs, past emails, customer list)
   - **Guardrails** (spending limits, "never email externally", tone rules)
   - **Human checkpoint** (where the agent must stop and ask you)
3. **Run it**: the agent works through the task step by step in a visual feed, showing its plan, each tool call and what it observed. This makes the agent loop visible.
4. **Review**: a scorecard on four measures:
   - **Outcome** (did it do the job?)
   - **Safety** (did it do anything it shouldn't?)
   - **Cost** (tokens and tool calls used)
   - **Speed** (steps taken)
5. **Unlock**: a use-case card and XP. Retry to improve the score.

### 5.3 Failure is the fun part
Bad builds produce memorable, plausible failures that teach a lesson:
- No guardrail on email: the agent replies-all to the investor list with the cap table.
- Too many tools and a vague goal: it loops for 40 steps and burns the budget.
- No context: it books a sales call with your biggest competitor.
- No human checkpoint on payments: it pays a supplier invoice twice.

Each failure ends with a one-line "what went wrong" so the lesson sticks.

### 5.4 Levels (MVP campaign)
Difficulty builds, and each level introduces one new concept.

| # | Level | Business function | Concept taught |
|---|---|---|---|
| 1 | Inbox Zero | Admin | Goal plus one tool; what makes an agent different from a chatbot |
| 2 | The Meeting Booker | Operations | Multiple tools; the plan, act, observe loop |
| 3 | Lead Hunter | Sales | Web research and context; quality of inputs drives quality of outputs |
| 4 | The CV Mountain | Hiring | Guardrails, bias and fairness; when a human must decide |
| 5 | Month-End Close | Finance | Human checkpoints on money; audit trail |
| 6 | Support Desk at 2am | Customer | Memory and tone; escalation rules |
| 7 | The Agent Team | Cross-functional | Multi-agent hand-offs: a researcher, a writer and a reviewer working together |
| Boss | Your Business | The player's own | Design an agent for a real problem in your own company |

### 5.5 Side modes (quick play, under 2 minutes)
- **Agent or Not?**: swipe through tasks and sort each into "agent", "simple automation" or "keep it human". Teaches judgement about where agents fit.
- **Spot the Flaw**: read a short agent spec and find the risky gap before the timer runs out.

### 5.6 The final level: your own agent
The player answers a few prompts about their business (a recurring task, the tools involved, what could go wrong). The game turns the answers into a one-page **Agent Spec** they can download or copy, ready to build in Claude or another tool after the course. This is the main take-home.

## 6. Use-case library

Every level and side mode unlocks cards in a collectable **Use-Case Deck**, organised by function: Sales, Marketing, Finance, Hiring, Operations, Customer, Founder's Desk.

Each card holds:
- The job the agent does, in one line
- Who it suits (founder, operator, professional)
- The tools it needs
- The main risk and the guardrail that handles it
- A "try this on Monday" starter prompt

Target: 30+ cards at launch. The deck is browsable outside the game, so it works as a reference library after the course.

## 7. Gamification

- **XP and levels** for completing missions, with bonus XP for a perfect safety score.
- **Badges**, e.g. "Zero Incidents" (no safety failures across the campaign), "Penny Pincher" (lowest-cost build), "Delegator" (used human checkpoints well), "Collector" (full deck).
- **Stars per level** (one to three) to encourage replays.
- **High-score table** on each player's device, arcade style, with three-letter initials.
- **Share card**: a small image of your score and best badge to post in the cohort chat. In v1 this replaces a shared leaderboard and handles the cohort rivalry.

## 8. User experience

- Opens straight into play: one click from the landing page to Level 1, no sign-up.
- Clear, friendly copy; no jargon without a tooltip.
- Progress saved automatically in the browser.
- Works on laptop first, playable on phone.
- Accessible: keyboard playable, readable contrast, no information carried by colour alone.
- **Visual style: retro arcade.** Pixel-art agents and office scenes, a neon palette on a dark background, a chunky pixel font for headings, and "INSERT COIN" and "GAME OVER" moments. Body text stays in a clean, readable font so the teaching copy isn't hard work. Sound effects are optional and muted by default.

## 9. Technical approach

- **Static site**: HTML, CSS and JavaScript, no build step, hosted free on **GitHub Pages** from the repo.
- **Content as data**: levels, component cards, failure outcomes and use-case cards live in JSON files, so new levels and cards can be added without touching game logic.
- **Simulated agent runs**: each level defines how the chosen components combine into an outcome, using rules written in the level data. No live model calls in v1.
- **Saving**: browser local storage for progress, badges and high scores. No backend in v1.
- **Hosting**: a public GitHub repo, so GitHub Pages is free and the cohort can see how the game was built.
- **Analytics**: privacy-friendly page counts only (optional, e.g. GitHub Pages traffic stats); no personal data collected.

### Repo structure (proposed)
```
my Game/
  CLAUDE.md
  MEMORY.md
  PRD.md
  site/
    index.html
    css/
    js/
    data/        levels, cards, use cases (JSON)
    assets/      images, icons
  README.md      how to play, how to add a level
```

## 10. Success measures

| Measure | Target |
|---|---|
| Cohort members who play at least one level | 75% |
| Players who complete the campaign | 40% |
| Average use-case cards collected per player | 10+ |
| Agent Specs downloaded from the final level | 1 in 3 players |
| Post-game pulse: "I have an agent idea I'll try" | 80% yes |

## 11. Milestones

| Date (2026) | Milestone |
|---|---|
| 6 Nov | PRD draft (this document) |
| By 11 Nov | PRD signed off; repo created; visual style agreed |
| By 18 Nov | Playable prototype: Level 1 end to end, build, run, review |
| By 25 Nov | MVP: Levels 1 to 4, Agent or Not?, Use-Case Deck, local saving |
| By 2 Dec | Full campaign, final level with Agent Spec, polish, cohort playtest |
| Course end | Launch to the cohort; collect feedback |

## 12. Risks

| Risk | Mitigation |
|---|---|
| Too much reading makes it feel like a course, not a game | Hard limit on copy per screen; teach through failures, not text |
| Simulated outcomes feel arbitrary | Every outcome explains which component caused it |
| Scope creep beyond the course timeline | Fixed MVP scope above; everything else goes to "Later" |
| Use cases feel generic | Write cards for this cohort's real roles and sectors; invite cohort members to submit cards |

## 13. Later (post-MVP ideas)

- Shared cohort leaderboard (needs a small backend, such as Supabase).
- Live mode: run the player's agent against a real Claude model with their own API key.
- Cohort-submitted levels and use-case cards.
- Head-to-head mode: two players build for the same brief, best score wins.
- Weekly challenge tied to that week's course content.

## 14. Decisions (6 November 2026)

| Question | Decision |
|---|---|
| Name | Hire Your First Agent |
| Visual style | Retro arcade |
| Leaderboard | Local high scores only in v1; a shared leaderboard moves to Later |
| Repo | Public, hosted on GitHub Pages |
| Seb's brief | No requirements beyond the brief: a fun game website in a GitHub repo |

## 15. Build status (6 November 2026)

Built ahead of the milestones above, at Jamie's request:
- All seven levels and the boss level, playable end to end: brief, build, run, review.
- Every combination of choices in every level (954 in total) leads to a written outcome with its own lesson.
- Levels unlock in order with one star. Each level awards two use-case cards (two stars and three stars), so there are 14 cards, plus the player's own agent from the boss level.
- The boss level scores the player's spec against the lessons from Levels 1 to 7, and offers it as a copyable and downloadable Markdown file.
- Arcade high-score table with initials, saved in the browser.

Changes from the plan:
- Content files are `.js`, not `.json`, so the game also runs when `index.html` is opened straight from disk.
- 14 cards at launch rather than 30 or more; more can be added in `site/data/cards.js`.
- The side modes ("Agent or Not?" and "Spot the Flaw") and the share card are not built yet.

Still to do: switch on GitHub Pages, a cohort playtest, then the side modes and share card.
