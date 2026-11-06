// Level 3: Lead Hunter. Concept: context; the quality of the inputs drives the quality of the output.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "lead-hunter",
  number: 3,
  title: "LEAD HUNTER",
  fn: "Sales",
  concept: {
    title: "Context: rubbish in, rubbish out",
    text: "An agent only knows what you give it. Context, such as your customer profile and past wins, is the difference between a useful list and a random one. Too much context is a risk too."
  },
  brief: {
    clock: "MON 10:00",
    lines: [
      "Your pipeline is thin and the quarter ends in six weeks.",
      "Your first sales hire starts next month.",
      "You need 50 good prospects by Friday."
    ],
    ask: "Hire an agent to build a target list and draft first emails."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "vague", name: "\"Find me some leads.\"", blurb: "Keep it open." },
        { id: "clear", name: "\"Find 50 UK companies that match our customer profile, name the right decision-maker at each, and draft a personal first email for my review.\"", blurb: "How many, which ones, who, and what next." },
        { id: "volume", name: "\"Find 5,000 leads and email them all today.\"", blurb: "It's a numbers game." }
      ]
    },
    {
      id: "tool", label: "Tools", hint: "Pick a toolkit.",
      options: [
        { id: "search", name: "Web search", blurb: "Finds companies online." },
        { id: "research", name: "Web search + company database", blurb: "Finds companies, people and roles. Can draft emails." },
        { id: "send", name: "Web search + company database + email sending", blurb: "Everything above, and it can hit send." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule it must follow.",
      options: [
        { id: "none", name: "No rules", blurb: "Move fast." },
        { id: "drafts", name: "Drafts only; never contact anyone directly", blurb: "You approve every first touch." },
        { id: "friendly", name: "Always be friendly", blurb: "Warm tone." }
      ]
    },
    {
      id: "context", label: "Context", hint: "What does it know about you?",
      options: [
        { id: "none", name: "Nothing", blurb: "It'll work it out." },
        { id: "icp", name: "Ideal customer profile + 3 best case studies", blurb: "Who buys from you and why." },
        { id: "everything", name: "The whole shared drive", blurb: "Give it everything, just in case." }
      ]
    },
    { id: "checkpoint", label: "Human checkpoint", locked: "Unlocks in Level 5" }
  ],
  outcomes: [
    {
      id: "spam-cannon",
      match: { goal: "volume", tool: "send", guard: ["none", "friendly"] },
      title: "GAME OVER: SPAM CANNON",
      stars: 0,
      scores: { outcome: 5, safety: 0, cost: 20, speed: 60 },
      log: [
        ["plan", "5,000 leads, all emailed today."],
        ["act", "database.export(any_company, limit=5000)"],
        ["act", "email.send(template x 5000)"],
        ["observe", "1,912 bounced. 340 marked as spam."],
        ["alert", "Your email domain has been blacklisted. Your own invoices now land in spam."],
        ["result", "5,000 sent. 0 replies. 1 very cross existing customer."]
      ],
      lesson: "Volume plus the power to send, with nothing stopping it, is a fast way to wreck your reputation. More is not better.",
      notes: { friendly: "Every one of the 5,000 emails was very friendly." }
    },
    {
      id: "volume",
      match: { goal: "volume", tool: "*", guard: "*" },
      title: "QUANTITY OVER QUALITY",
      stars: 1,
      scores: { outcome: 20, safety: 85, cost: 15, speed: 30 },
      log: [
        ["plan", "5,000 leads today."],
        ["act", "web.search(\"companies UK\") x 400"],
        ["observe", "5,000 rows collected. Includes a garden centre, two charities and your own company."],
        ["alert", "Can't email them: no permission to send."],
        ["result", "A 5,000-row spreadsheet nobody will read. Budget gone."]
      ],
      lesson: "A huge, unfocused target burns budget and gives you nothing usable. Fifty right companies beat five thousand random ones."
    },
    {
      id: "logos",
      match: { goal: "*", tool: "search", guard: "*" },
      title: "A LIST OF LOGOS",
      stars: 1,
      scores: { outcome: 30, safety: 95, cost: 70, speed: 65 },
      log: [
        ["plan", "Find prospects."],
        ["act", "web.search(\"fast-growing UK companies\")"],
        ["observe", "Found 50 company names from a 'top startups' list."],
        ["plan", "Need decision-makers. Searching..."],
        ["alert", "Web search can't see who works where or their roles."],
        ["result", "50 company names. No people, no emails."]
      ],
      lesson: "Without the right data tool, the agent found the 'what' but not the 'who'. Prospecting needs a source of people, not just pages."
    },
    {
      id: "generic",
      match: { goal: "*", tool: "*", guard: "*", context: "none" },
      title: "DEAR SIR OR MADAM",
      stars: 1,
      scores: { outcome: 25, safety: 85, cost: 75, speed: 80 },
      log: [
        ["plan", "Find prospects. I don't know what the company sells."],
        ["act", "database.search(\"growing companies\", UK)"],
        ["observe", "50 companies: a bakery chain, a football club, three law firms..."],
        ["act", "email.draft(\"Dear Sir or Madam, I'd love to tell you about our solution...\")"],
        ["result", "50 generic drafts to 50 random companies."]
      ],
      lesson: "With no context, the agent had no idea who you sell to or why they buy. Give it your customer profile and it can target properly."
    },
    {
      id: "secret-sent",
      match: { goal: "*", tool: "send", guard: ["none", "friendly"], context: "everything" },
      title: "GAME OVER: SENT THE PRICE LIST",
      stars: 0,
      scores: { outcome: 40, safety: 0, cost: 50, speed: 80 },
      log: [
        ["plan", "Find prospects and write great emails using all the material I have."],
        ["act", "drive.read(all 3,214 files)"],
        ["act", "database.search(matching_profile)"],
        ["act", "email.send(personalised x 50)"],
        ["alert", "Emails quoted your confidential pricing and named an existing client's deal."],
        ["result", "50 emails sent. One went to that client's biggest competitor."]
      ],
      lesson: "Too much context is a leak waiting to happen. The agent used everything you gave it, including what should never leave the building. Give it what the job needs, nothing more."
    },
    {
      id: "too-much",
      match: { goal: "*", tool: "*", guard: "*", context: "everything" },
      title: "TOO MUCH CONTEXT",
      stars: 1,
      scores: { outcome: 50, safety: 55, cost: 40, speed: 60 },
      log: [
        ["plan", "Read everything first."],
        ["act", "drive.read(all 3,214 files)"],
        ["observe", "Read board minutes, salaries, pricing and 1,200 old drafts."],
        ["act", "email.draft(personalised x 50)"],
        ["alert", "Drafts mention confidential pricing and an old 2019 product name."],
        ["result", "50 drafts. You caught the problems before anything went out."]
      ],
      lesson: "More context isn't always better. It slowed the agent down, cost more, and pulled confidential details into the emails. Curate what you give it."
    },
    {
      id: "nice-list",
      match: { goal: "vague", tool: "*", guard: "*", context: "icp" },
      title: "NICE LIST, WRONG ASK",
      stars: 1,
      scores: { outcome: 45, safety: 95, cost: 80, speed: 80 },
      log: [
        ["plan", "Find some leads. Using the customer profile."],
        ["act", "database.search(matching_profile)"],
        ["observe", "12 good-fit companies found."],
        ["result", "Here are 12 leads! (No contacts, no emails. You didn't ask.)"]
      ],
      lesson: "Good context gave it the right kind of company, but 'some leads' gave it no finish line. Say how many, who, and what you want done with them."
    },
    {
      id: "sent-unchecked",
      match: { goal: "clear", tool: "send", guard: ["none", "friendly"], context: "icp" },
      title: "SENT WITHOUT A SECOND LOOK",
      stars: 1,
      scores: { outcome: 80, safety: 30, cost: 85, speed: 90 },
      log: [
        ["plan", "50 UK companies matching our profile, decision-makers and first emails."],
        ["act", "database.search(matching_profile, UK)"],
        ["observe", "50 companies, 50 decision-makers found."],
        ["act", "email.draft(personalised x 50)"],
        ["plan", "Drafts look strong. Sending to save time."],
        ["act", "email.send(x 50)"],
        ["alert", "One went to a current customer, pitching them the product they already pay for."],
        ["result", "50 sent. 4 replies, 1 confused customer."]
      ],
      lesson: "Great targeting, but it sent before you could check. You asked for drafts for your review; an agent that can send may decide sending is more helpful.",
      notes: { friendly: "The email to your existing customer was very friendly." }
    },
    {
      id: "close-call",
      match: { goal: "clear", tool: "send", guard: "drafts", context: "icp" },
      title: "JOB DONE (CLOSE CALL)",
      stars: 2,
      scores: { outcome: 95, safety: 85, cost: 85, speed: 85 },
      log: [
        ["plan", "50 UK companies matching our profile, decision-makers and first emails."],
        ["act", "database.search(matching_profile, UK)"],
        ["observe", "50 companies, 50 decision-makers found."],
        ["act", "email.draft(personalised x 50)"],
        ["act", "email.send(x 50)"],
        ["alert", "Blocked by guardrail: drafts only."],
        ["result", "50 targeted drafts waiting for you."]
      ],
      lesson: "Good result, saved by your rule. It never needed the power to send. Least privilege again: don't give a tool the job doesn't need."
    },
    {
      id: "hired",
      match: { goal: "clear", tool: "research", guard: "*", context: "icp" },
      title: "HIRED! PIPELINE FILLED",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 90, speed: 90 },
      log: [
        ["plan", "50 UK companies matching our profile, decision-makers and first emails."],
        ["act", "database.search(matching_profile, UK)"],
        ["observe", "71 matches. Ranking by fit to the case studies."],
        ["act", "database.people(role=\"Head of Ops\" or \"COO\", top 50)"],
        ["observe", "50 decision-makers found. 3 already in your CRM, removed."],
        ["act", "email.draft(personalised x 50, citing the closest case study)"],
        ["result", "50 strong-fit prospects, each with a tailored draft ready for you."]
      ],
      lesson: "The right context did the heavy lifting: it knew who you sell to and what proof to use. Tools found the people, and you keep the final say on outreach.",
      notes: { friendly: "Warm tone, nicely judged." }
    }
  ],
  cards: ["prospect-research", "crm-hygiene"]
});
