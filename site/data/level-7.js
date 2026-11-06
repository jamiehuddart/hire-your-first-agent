// Level 7: The Agent Team. Concept: multi-agent hand-offs.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "agent-team",
  number: 7,
  title: "THE AGENT TEAM",
  fn: "Cross-functional",
  concept: {
    title: "Agent teams and hand-offs",
    text: "Big jobs go better split between specialists: one agent researches, one writes, one checks. Each passes its work to the next. The hand-offs are where things go right or wrong."
  },
  brief: {
    clock: "THU 14:00",
    lines: [
      "You're pitching at a big industry event on Monday.",
      "You need a market report, a deck outline and a launch blog post.",
      "Your team is flat out."
    ],
    ask: "Hire a team of agents to produce the pack by Friday at 6pm."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "vague", name: "\"Make me some launch content.\"", blurb: "You'll know it when you see it." },
        { id: "clear", name: "\"Produce a two-page market report with sources, a ten-slide deck outline and a 600-word blog post, in our tone of voice, by Friday at 6pm.\"", blurb: "Three outputs, sized, sourced and dated." },
        { id: "viral", name: "\"Make it go viral.\"", blurb: "Aim high." }
      ]
    },
    {
      id: "team", label: "Team setup", hint: "Who's on the team?",
      options: [
        { id: "solo", name: "One agent does everything", blurb: "Simple." },
        { id: "two", name: "Researcher + writer", blurb: "One finds the facts, one writes." },
        { id: "three", name: "Researcher + writer + reviewer", blurb: "A third agent checks the work." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule they all follow.",
      options: [
        { id: "none", name: "No rules", blurb: "Let them be creative." },
        { id: "sources", name: "Every fact needs a source", blurb: "No source, no claim." },
        { id: "more", name: "Write as much as possible", blurb: "More is more." }
      ]
    },
    {
      id: "context", label: "Context", hint: "What do they know?",
      options: [
        { id: "none", name: "Nothing", blurb: "Fresh eyes." },
        { id: "brand", name: "Brand voice guide + product facts", blurb: "How you sound and what's true." },
        { id: "competitor", name: "A competitor's website", blurb: "See what good looks like." }
      ]
    },
    {
      id: "checkpoint", label: "Human checkpoint", hint: "When do you step in?",
      options: [
        { id: "none", name: "Never: publish when done", blurb: "Hands off." },
        { id: "final", name: "Review the final pack before anything is published", blurb: "One look at the end." },
        { id: "every", name: "Approve every hand-off between agents", blurb: "Watch every step." }
      ]
    }
  ],
  outcomes: [
    {
      id: "viral-published",
      match: { goal: "viral", checkpoint: "none" },
      title: "GAME OVER: VIRAL FOR THE WRONG REASONS",
      stars: 0,
      scores: { outcome: 10, safety: 0, cost: 70, speed: 90 },
      log: [
        ["plan", "Goal: go viral. Outrage spreads fastest."],
        ["act", "writer.draft(\"Why [Competitor] is finished\")"],
        ["act", "blog.publish()"],
        ["observe", "12,000 shares in an hour."],
        ["alert", "Most of them are people asking why you're picking a fight. The competitor's lawyers have been in touch."],
        ["result", "Viral. Not in a good way."]
      ],
      lesson: "'Go viral' is an outcome no one controls, so the agent chased attention by any means. With nobody checking, it went live."
    },
    {
      id: "viral-binned",
      match: { goal: "viral" },
      title: "HOT TAKES ONLY",
      stars: 1,
      scores: { outcome: 20, safety: 70, cost: 70, speed: 80 },
      log: [
        ["plan", "Goal: go viral."],
        ["act", "writer.draft(10 hot takes, 3 memes, 1 controversial thread)"],
        ["observe", "Pack ready for review."],
        ["result", "You binned all of it. No report, no deck, no blog."]
      ],
      lesson: "Your checkpoint stopped anything embarrassing going out, but the goal was never going to produce what you needed. Ask for the outputs, not the reaction."
    },
    {
      id: "solo",
      match: { team: "solo" },
      title: "ONE AGENT, TOO MANY HATS",
      stars: 1,
      scores: { outcome: 40, safety: 75, cost: 50, speed: 50 },
      log: [
        ["plan", "Research, then report, then deck, then blog. All me."],
        ["act", "research(market) + write(report)"],
        ["observe", "Context window filling up with research notes."],
        ["act", "write(deck_outline)"],
        ["alert", "Deck outline has 31 slides. The blog contradicts the report's market size."],
        ["result", "Everything done, nothing consistent."]
      ],
      lesson: "One agent juggling every role loses track. Splitting the job between specialists keeps each one focused, with a clean hand-off between them."
    },
    {
      id: "waffle",
      match: { guard: "more" },
      title: "WAFFLE",
      stars: 1,
      scores: { outcome: 35, safety: 80, cost: 15, speed: 40 },
      log: [
        ["plan", "Write as much as possible."],
        ["act", "researcher.find(sources x 140)"],
        ["act", "writer.draft(report: 41 pages, blog: 9,000 words)"],
        ["alert", "The deck outline has 64 slides."],
        ["result", "Delivered. Nobody will read it. Budget gone."]
      ],
      lesson: "The rule worked against the goal. Length isn't quality, and every extra word costs money. Tell agents the size you need."
    },
    {
      id: "made-up",
      match: { guard: "none" },
      title: "THE MADE-UP STAT",
      stars: 1,
      scores: { outcome: 70, safety: 30, cost: 80, speed: 85 },
      log: [
        ["plan", "Research the market, write the pack."],
        ["act", "researcher.find(market data)"],
        ["observe", "Couldn't find a figure for UK adoption. Estimating."],
        ["act", "writer.draft(\"73% of UK CFOs plan to adopt in 2027\")"],
        ["alert", "That 73% doesn't exist. It's now the headline of slide 2."],
        ["result", "A polished pack built around an invented number."]
      ],
      lesson: "Agents fill gaps with plausible guesses, and each hand-off makes the guess look more official. A sourcing rule forces every claim to be checked."
    },
    {
      id: "copycat",
      match: { context: "competitor" },
      title: "SOUNDS LIKE THE COMPETITION",
      stars: 1,
      scores: { outcome: 45, safety: 50, cost: 80, speed: 85 },
      log: [
        ["plan", "Learn from the competitor's site, then write."],
        ["act", "researcher.read(competitor.com)"],
        ["act", "writer.draft(in the style of what we read)"],
        ["alert", "Blog post reuses two of the competitor's taglines word for word."],
        ["result", "A pack that could be mistaken for theirs."]
      ],
      lesson: "Agents copy what you show them. Give it your own voice and facts, or it will borrow someone else's."
    },
    {
      id: "off-brand",
      match: { context: "none" },
      title: "OFF-BRAND",
      stars: 1,
      scores: { outcome: 50, safety: 80, cost: 80, speed: 85 },
      log: [
        ["plan", "Write the pack. No brand guide or product facts."],
        ["act", "writer.draft(generic, enthusiastic)"],
        ["observe", "Describes your product's features as it imagines them."],
        ["alert", "Two features listed don't exist. One you killed last year."],
        ["result", "Well-written, off-brand, and partly fiction."]
      ],
      lesson: "Without your voice guide and product facts, the team wrote about a company that only exists in its head. Context keeps everyone on the same page."
    },
    {
      id: "vague",
      match: { goal: "vague" },
      title: "CONTENT, BUT FOR WHAT?",
      stars: 1,
      scores: { outcome: 40, safety: 90, cost: 70, speed: 75 },
      log: [
        ["plan", "Make some launch content. Which kind?"],
        ["act", "writer.draft(5 social posts, 1 press release, 1 FAQ)"],
        ["observe", "No report. No deck. No blog."],
        ["result", "Plenty of content. None of what you needed for Monday."]
      ],
      lesson: "A team of agents multiplies the effect of a vague brief. Everyone works hard on the wrong thing."
    },
    {
      id: "published-unseen",
      match: { checkpoint: "none" },
      title: "PUBLISHED WITHOUT A LOOK",
      stars: 2,
      scores: { outcome: 85, safety: 55, cost: 85, speed: 95 },
      log: [
        ["plan", "Research, write, check, publish."],
        ["act", "researcher.find(sourced data) -> writer.draft(pack)"],
        ["act", "blog.publish()"],
        ["alert", "Blog went live on Thursday night announcing a launch date you hadn't confirmed."],
        ["result", "Strong pack. The blog is already being quoted."]
      ],
      lesson: "Good work, but nobody signed it off. Anything public-facing needs a human look before it leaves the building."
    },
    {
      id: "bottleneck",
      match: { checkpoint: "every" },
      title: "BOTTLENECK",
      stars: 2,
      scores: { outcome: 90, safety: 100, cost: 75, speed: 25 },
      log: [
        ["plan", "Research, write, check. Wait for approval at every hand-off."],
        ["act", "researcher.find(sourced data)"],
        ["observe", "Waiting for approval... (you were in meetings until 6pm)"],
        ["act", "writer.draft(pack)"],
        ["observe", "Waiting for approval... (overnight)"],
        ["result", "Pack ready at 5:55pm Friday. You did more reviewing than writing would have taken."]
      ],
      lesson: "You slowed the team to your own speed. Check the final output, and trust the hand-offs you've designed well."
    },
    {
      id: "no-checker",
      match: { team: "two" },
      title: "NOBODY CHECKED",
      stars: 2,
      scores: { outcome: 85, safety: 80, cost: 90, speed: 90 },
      log: [
        ["plan", "Researcher finds sourced facts, writer drafts the pack."],
        ["act", "researcher.find(sourced data)"],
        ["act", "writer.draft(report, deck, blog)"],
        ["alert", "The writer misread a source: 1.3bn became 13bn."],
        ["result", "You caught it at final review on Friday at 5pm. Close."]
      ],
      lesson: "Two specialists worked well, but nobody checked the hand-off. A reviewer agent catches errors before they reach you."
    },
    {
      id: "hired",
      match: { goal: "clear", team: "three", guard: "sources", context: "brand", checkpoint: "final" },
      title: "HIRED! PACK DELIVERED",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 85, speed: 90 },
      log: [
        ["plan", "Researcher finds sourced facts; writer drafts; reviewer checks; human signs off."],
        ["act", "researcher.find(market data, sources x 12)"],
        ["act", "writer.draft(report: 2 pages, deck: 10 slides, blog: 600 words, brand voice)"],
        ["act", "reviewer.check(every claim against its source)"],
        ["observe", "Reviewer sent one figure back to the writer: 1.3bn, not 13bn. Fixed."],
        ["act", "checkpoint.request(final review)"],
        ["result", "Pack approved by you on Friday at 4pm. Two hours to spare."]
      ],
      lesson: "Specialists with clean hand-offs, a sourcing rule, your real brand context and one review at the end. That's how a team of agents does a week's work in a day."
    }
  ],
  cards: ["content-team", "competitor-watch"]
});
