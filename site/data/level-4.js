// Level 4: The CV Mountain. Concept: guardrails, bias and fairness; when a human must decide.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "cv-mountain",
  number: 4,
  title: "THE CV MOUNTAIN",
  fn: "Hiring",
  concept: {
    title: "Fairness: some calls stay human",
    text: "Agents can screen at speed, but they copy patterns, including unfair ones. Set clear rules on what they judge, and keep the final decision about people with a person."
  },
  brief: {
    clock: "MON 09:00",
    lines: [
      "You posted your first Head of Finance role on Friday.",
      "480 applications arrived over the weekend.",
      "Every one of them deserves a fair look."
    ],
    ask: "Hire an agent to help you get to a shortlist."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "pick", name: "\"Pick the best candidate and tell them they've got the job.\"", blurb: "Hire in a day." },
        { id: "clone", name: "\"Find people like our last great hire.\"", blurb: "Lightning in a bottle, twice." },
        { id: "clear", name: "\"Score every CV against the five criteria in the job spec, explain each score, and suggest a longlist of 20 for me to review.\"", blurb: "Clear criteria, reasons, and you decide." }
      ]
    },
    {
      id: "tool", label: "Tools", hint: "Pick a toolkit.",
      options: [
        { id: "email", name: "Read CVs + email candidates", blurb: "Can reply to applicants." },
        { id: "sheet", name: "Read CVs + scoring sheet", blurb: "Scores and notes in a spreadsheet." },
        { id: "social", name: "Read CVs + social media search", blurb: "Gets the full picture of each person." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule it must follow.",
      options: [
        { id: "none", name: "No rules", blurb: "Let the data speak." },
        { id: "fair", name: "Ignore name, age, gender, photo and university; judge skills and experience only", blurb: "Blind screening." },
        { id: "bigfour", name: "Reject anyone without a Big Four background", blurb: "A quick filter." }
      ]
    },
    {
      id: "context", label: "Context", hint: "What does it judge against?",
      options: [
        { id: "none", name: "Nothing", blurb: "It knows a good CV when it sees one." },
        { id: "spec", name: "Job spec + scoring criteria", blurb: "What the role needs, and how to weigh it." },
        { id: "past", name: "Notes from past hiring rounds", blurb: "Who you hired before and why." }
      ]
    },
    { id: "checkpoint", label: "Human checkpoint", locked: "Unlocks in Level 5" }
  ],
  outcomes: [
    {
      id: "offer-sent",
      match: { goal: "pick", tool: "email", guard: "*", context: "*" },
      title: "GAME OVER: YOU'RE HIRED (WHO?)",
      stars: 0,
      scores: { outcome: 10, safety: 0, cost: 70, speed: 95 },
      log: [
        ["plan", "Pick the best candidate and tell them."],
        ["act", "cv.rank(480)"],
        ["observe", "Top candidate: highest keyword count."],
        ["act", "email.send(top_candidate, \"Congratulations, you've got the job!\")"],
        ["act", "email.send(479 others, \"Unfortunately...\")"],
        ["alert", "Offer sent to someone you've never met. 479 rejections sent in 3 minutes."],
        ["result", "Role filled by 09:04."]
      ],
      lesson: "Hiring decisions affect people's lives and careers. An agent can help you find candidates, but the decision, and telling them, belongs to a person."
    },
    {
      id: "not-its-call",
      match: { goal: "pick", tool: "*", guard: "*", context: "*" },
      title: "NOT ITS CALL",
      stars: 1,
      scores: { outcome: 30, safety: 60, cost: 70, speed: 90 },
      log: [
        ["plan", "Pick the best candidate."],
        ["act", "cv.rank(480)"],
        ["observe", "One winner chosen."],
        ["plan", "Why this person? Hard to say. They scored highest."],
        ["alert", "Can't contact them with this toolkit."],
        ["result", "One name, no reasoning, and 479 people never really looked at."]
      ],
      lesson: "One name with no explanation isn't something you can stand behind. Ask an agent to narrow the field and show its reasons; you make the call."
    },
    {
      id: "social",
      match: { goal: "*", tool: "social", guard: "*", context: "*" },
      title: "GAME OVER: TOO MUCH INFORMATION",
      stars: 0,
      scores: { outcome: 30, safety: 5, cost: 30, speed: 40 },
      log: [
        ["plan", "Get the full picture of each candidate."],
        ["act", "social.search(480 candidates)"],
        ["observe", "Found holiday photos, political posts and family details."],
        ["alert", "Marked down a candidate for 'too many weekend photos'."],
        ["alert", "Scored candidates using personal information unrelated to the job."],
        ["result", "A shortlist built on things you are not allowed to judge."]
      ],
      lesson: "More data isn't fairer data. Pulling in people's private lives opens the door to discrimination and privacy breaches. Judge the job, not the person's Instagram."
    },
    {
      id: "clone",
      match: { goal: "clone", tool: "*", guard: "*", context: "*" },
      title: "COPY AND PASTE BIAS",
      stars: 1,
      scores: { outcome: 35, safety: 30, cost: 75, speed: 80 },
      log: [
        ["plan", "Find people like the last great hire."],
        ["observe", "Last great hire: same university as the founders, started at a Big Four firm, plays rugby."],
        ["act", "cv.rank(similarity_to_last_hire)"],
        ["alert", "Top 20 are near-identical. Strong candidates from different backgrounds ranked bottom."],
        ["result", "20 clones of one person."]
      ],
      lesson: "'Like our last hire' teaches the agent to copy a pattern, not to find talent. That's how bias gets automated. Judge against what the role needs.",
      notes: { fair: "Your blind-screening rule hid names and universities, but the pattern still came through in job titles and hobbies." }
    },
    {
      id: "past-notes",
      match: { goal: "*", tool: "*", guard: "*", context: "past" },
      title: "COPY AND PASTE BIAS",
      stars: 1,
      scores: { outcome: 40, safety: 35, cost: 75, speed: 80 },
      log: [
        ["plan", "Score CVs. Learning from past hiring notes."],
        ["observe", "Past notes: 'not a culture fit', 'gap in CV, pass', 'great energy, went to Durham'."],
        ["act", "cv.score(480, learned_preferences)"],
        ["alert", "Candidates with career breaks scored down by 30% on average."],
        ["result", "A longlist that repeats every past habit, good and bad."]
      ],
      lesson: "Past hiring notes carry past biases. The agent learned them and applied them at scale. Give it the criteria for this role instead."
    },
    {
      id: "bigfour",
      match: { goal: "*", tool: "*", guard: "bigfour", context: "*" },
      title: "FILTERED OUT THE BEST",
      stars: 1,
      scores: { outcome: 40, safety: 60, cost: 85, speed: 90 },
      log: [
        ["plan", "Apply the rule first: Big Four background only."],
        ["act", "cv.filter(big_four=true)"],
        ["observe", "412 rejected. 68 remain."],
        ["alert", "Rejected: the candidate who ran finance at a scale-up through two funding rounds."],
        ["result", "Longlist of 20, from a pool you cut by 86% on one line of a CV."]
      ],
      lesson: "A hard filter is a guardrail pointed the wrong way. It removed great people for a reason that doesn't predict the job. Rules should protect fairness, not narrow it."
    },
    {
      id: "hidden-bias",
      match: { goal: "*", tool: "*", guard: "none", context: "*" },
      title: "HIDDEN BIAS",
      stars: 1,
      scores: { outcome: 65, safety: 35, cost: 80, speed: 85 },
      log: [
        ["plan", "Score every CV against the criteria."],
        ["act", "cv.score(480)"],
        ["observe", "Scores calculated with reasons."],
        ["alert", "Pattern found: candidates over 50 and those with career breaks scored lower, though neither is in the criteria."],
        ["result", "A tidy longlist with a bias you'd never spot from the spreadsheet."]
      ],
      lesson: "Without a fairness rule, the agent picked up signals it shouldn't use. Tell it explicitly what to ignore."
    },
    {
      id: "no-criteria",
      match: { goal: "*", tool: "*", guard: "*", context: "none" },
      title: "SCORING IN THE DARK",
      stars: 1,
      scores: { outcome: 35, safety: 80, cost: 75, speed: 80 },
      log: [
        ["plan", "Score against 'the five criteria'. I haven't been given them."],
        ["plan", "Inventing five: length, formatting, keywords, buzzwords, font."],
        ["act", "cv.score(480, invented_criteria)"],
        ["result", "Top candidate: best-formatted CV. Worst: the most qualified person, who used Comic Sans."]
      ],
      lesson: "You referred to criteria the agent never saw, so it made some up. Context it can't see might as well not exist."
    },
    {
      id: "hasty-emails",
      match: { goal: "clear", tool: "email", guard: "fair", context: "spec" },
      title: "GREAT LIST, HASTY EMAILS",
      stars: 2,
      scores: { outcome: 90, safety: 60, cost: 85, speed: 90 },
      log: [
        ["plan", "Score 480 CVs against 5 criteria, with reasons; longlist of 20."],
        ["act", "cv.anonymise(480)"],
        ["act", "cv.score(480, job_spec_criteria)"],
        ["observe", "Longlist of 20, each with a written rationale."],
        ["plan", "Being helpful: letting the other 460 know."],
        ["act", "email.send(460, rejection)"],
        ["alert", "460 rejections sent at 09:04 on a Monday, before you'd reviewed anything."],
        ["result", "Fair longlist ready. Candidate experience: questionable."]
      ],
      lesson: "The screening was fair and well reasoned. Then it used a tool it didn't need. Rejections are part of the decision; keep a person on them. Level 5 gives you human checkpoints."
    },
    {
      id: "hired",
      match: { goal: "clear", tool: "sheet", guard: "fair", context: "spec" },
      title: "HIRED! FAIR LONGLIST",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 85, speed: 85 },
      log: [
        ["plan", "Score 480 CVs against 5 criteria, with reasons; longlist of 20."],
        ["act", "cv.anonymise(480)"],
        ["act", "cv.score(480, job_spec_criteria)"],
        ["observe", "Scores spread evenly across backgrounds. No pattern on age or career breaks."],
        ["act", "sheet.write(scores, reasons, longlist=20)"],
        ["result", "Longlist of 20 with a reason for every score. Ready for your review."]
      ],
      lesson: "Clear criteria, blind screening and you making the decision. The agent did hours of reading in minutes, and every score can be explained."
    }
  ],
  cards: ["cv-screening", "interview-debrief"]
});
