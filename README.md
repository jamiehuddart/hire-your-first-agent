# Hire Your First Agent

A retro arcade game for the High Intent Labs cohort. You run a fictional start-up and hire AI agents to take on real business jobs. Build each agent from its parts (job description, tools, context, guardrails, human checkpoints), send it to work, and watch it succeed or fail. Every level unlocks a use-case card you can take back to your own business.

**Status:** all seven levels and the boss level are playable. See [PRD.md](PRD.md) for the full product requirements.

## How to play
1. Open the game (GitHub Pages link coming soon) and press **START**.
2. Each level gives you a business problem. Build an agent by picking its job description, tools, guardrail, context and human checkpoint.
3. Send it to work and watch it plan, act and observe. Then see how it scored on outcome, safety, cost and speed.
4. Get one star to unlock the next level, two stars for a use-case card and three for a bonus card.
5. Beat Level 7 to unlock the boss level: design an agent for your own business and download its spec.

Progress is saved in your browser only.

## How to add or change a level
Each level is a single file in `site/data/` (`level-1.js` to `level-7.js`). It holds the brief, the options for each slot, and a list of outcomes. Outcomes are checked in order and the first `match` wins; `"*"` matches any option. Use-case cards live in `site/data/cards.js`. The engine in `site/js/game.js` needs no changes to add a level; just add a `<script>` line for the new file in `site/index.html`.

## Project files
| File | What it is |
|---|---|
| `PRD.md` | Product requirements: what we're building and why |
| `CLAUDE.md` | Standing context and instructions for Claude |
| `MEMORY.md` | Running record of progress, learnings and decisions |
| `site/` | The game: `index.html`, `css/`, `js/game.js` (engine) and `data/` (levels and cards) |

Built with Claude as part of the High Intent Labs course, November to December 2026.
