# My Game: Project Memory

Keep this file up to date at all times. Read it, along with `CLAUDE.md`, at the start of every session.

## Progress
- [x] Created the `my Game` folder, `CLAUDE.md` and `MEMORY.md`, following the Website task's structure (2026-11-06)
- [x] Wrote the first draft of the product requirements document, `PRD.md` (2026-11-06)
- [x] Jamie answered the PRD's open questions; PRD updated to v0.2 (2026-11-06)
- [x] Created the public repo https://github.com/jamiehuddart/hire-your-first-agent and pushed this folder to `main`, with a `README.md` and `.gitignore` (2026-11-06)
- [ ] Build the MVP (see the PRD's milestones)
- [ ] Deploy with GitHub Pages and share the link with the cohort

## What we're learning
- A PRD (product requirements document) sets out the problem, who it's for, what we're building and how we'll know it worked, before any code is written. It gives Claude a fixed brief to build against.

- Git tracks changes on your machine; GitHub hosts a copy online. `git commit` saves a snapshot locally, `git push` sends it to GitHub.
- You don't need the GitHub CLI (`gh`) to use GitHub: create the empty repo on github.com, then push with plain git. Git Credential Manager opens a browser sign-in the first time.
- On a public repo every commit shows an email address. GitHub's private no-reply address (`ID+username@users.noreply.github.com`) keeps your real email hidden.

## Key takeaways
- Write the brief once, in `CLAUDE.md`, and keep the detailed scope in `PRD.md`, so every session builds against the same plan.

## Decisions
| Date | Decision | Why |
|------|----------|-----|
| 2026-11-06 | Follow the Website task's `CLAUDE.md` and `MEMORY.md` structure | It keeps us aligned with Seb's course format |
| 2026-11-06 | PRD saved as Markdown (`PRD.md`), not .docx | It lives in the GitHub repo, where Markdown renders and diffs cleanly |
| 2026-11-06 | Name: "Hire Your First Agent" | Founders and operators already understand hiring, so it frames agents in familiar terms |
| 2026-11-06 | Visual style: retro arcade | Jamie's choice; the most game-like option. Body text stays readable |
| 2026-11-06 | Local high scores only in v1; shared leaderboard moved to Later | No backend keeps v1 simple; the share card handles cohort rivalry |
| 2026-11-06 | Public GitHub repo, hosted on GitHub Pages | Free hosting, and the cohort can see how it was built |
| 2026-11-06 | No extra requirements from Seb | The brief is simply a fun game website in a GitHub repo |
| 2026-11-06 | Commits use GitHub's private no-reply email, set for this repo only | Public repo; keeps Jamie's work email private |
| 2026-11-06 | Repo created on github.com rather than with the GitHub CLI | The CLI install was cancelled at the Windows admin prompt; plain git does the job |

## Feedback from Jamie

## Session log
### 2026-11-06
Set up the project folder and context files, and drafted the PRD. Jamie then answered the open questions (name, retro arcade style, local scores, public repo) and the PRD moved to v0.2. Then created the public GitHub repo and pushed the project files. Next step: build the Level 1 prototype in `site/` and switch on GitHub Pages.
