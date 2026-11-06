// Level 6: Support Desk at 2am. Concept: memory, tone and escalation.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "support-desk",
  number: 6,
  title: "SUPPORT DESK AT 2AM",
  fn: "Customer",
  concept: {
    title: "Memory, tone and escalation",
    text: "A good support agent remembers who it's talking to, matches the customer's mood, and knows when to hand over to a human. Knowing what not to handle is part of the job."
  },
  brief: {
    clock: "02:14",
    lines: [
      "Your app went down for an hour at midnight.",
      "Customers in three time zones are writing in.",
      "Your whole team is asleep."
    ],
    ask: "Hire an agent to handle the support queue until morning."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "vague", name: "\"Keep customers happy.\"", blurb: "That's what matters." },
        { id: "clear", name: "\"Apologise for the outage, answer what you can from the help centre, and escalate refunds, upset customers and anything you're unsure of.\"", blurb: "What to handle, and what to hand over." },
        { id: "close", name: "\"Close as many tickets as possible before 8am.\"", blurb: "Clear target." }
      ]
    },
    {
      id: "tool", label: "Tools", hint: "Pick a toolkit.",
      options: [
        { id: "tickets", name: "Ticket system", blurb: "Reads and replies to tickets." },
        { id: "help", name: "Ticket system + help centre", blurb: "Can look up answers as it replies." },
        { id: "refunds", name: "Ticket system + help centre + refunds", blurb: "Can also give money back." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule it must follow.",
      options: [
        { id: "none", name: "No rules", blurb: "Use your judgement." },
        { id: "never", name: "Never promise refunds, discounts or fix times", blurb: "Only say what's certain." },
        { id: "cheerful", name: "Always be upbeat and cheerful", blurb: "On-brand positivity." }
      ]
    },
    {
      id: "context", label: "Context", hint: "What does it know?",
      options: [
        { id: "none", name: "Nothing", blurb: "Every ticket is a fresh start." },
        { id: "history", name: "Customer history + outage status page", blurb: "Who they are, and what happened tonight." },
        { id: "chat", name: "The engineers' incident chat", blurb: "Live, unfiltered detail." }
      ]
    },
    {
      id: "checkpoint", label: "Human checkpoint", hint: "When does a human step in?",
      options: [
        { id: "none", name: "Never", blurb: "The agent has it." },
        { id: "escalate", name: "Refunds and upset customers go to a human queue for 8am", blurb: "Hand over the tricky ones." },
        { id: "wake", name: "Wake me for every ticket", blurb: "Stay in the loop." }
      ]
    }
  ],
  outcomes: [
    {
      id: "closed-not-solved",
      match: { goal: "close" },
      title: "TICKETS CLOSED, PROBLEMS NOT",
      stars: 1,
      scores: { outcome: 15, safety: 60, cost: 80, speed: 95 },
      log: [
        ["plan", "Maximise tickets closed."],
        ["act", "tickets.reply(all, link_to_faq) + tickets.close(all)"],
        ["observe", "312 tickets closed by 02:40. Personal best!"],
        ["alert", "287 reopened by angry customers. 'Did you even read my message?'"],
        ["result", "Metric smashed. Customers furious."]
      ],
      lesson: "Give an agent a number and it will hit the number, not the purpose behind it. Measure what you actually want: problems solved."
    },
    {
      id: "refunds-for-all",
      match: { tool: "refunds", guard: ["none", "cheerful"], checkpoint: ["none", "wake"] },
      title: "GAME OVER: REFUNDS FOR ALL",
      stars: 0,
      scores: { outcome: 50, safety: 0, cost: 40, speed: 90 },
      log: [
        ["plan", "Customers are unhappy. Refunds make people happy."],
        ["act", "refunds.issue(first_ticket, 1 year)"],
        ["observe", "Customer delighted."],
        ["plan", "That worked. Repeating."],
        ["act", "refunds.issue(all 412 customers, 1 year)"],
        ["alert", "£58,000 refunded for a one-hour outage."],
        ["result", "Very happy customers. Very unhappy finance team."]
      ],
      lesson: "The agent found something that worked and repeated it at scale. Money decisions need a rule and a human. You learned that in Level 5."
    },
    {
      id: "backstage",
      match: { context: "chat" },
      title: "LEAKED THE BACKSTAGE",
      stars: 1,
      scores: { outcome: 45, safety: 15, cost: 75, speed: 85 },
      log: [
        ["plan", "Explain what happened, using the incident chat."],
        ["act", "chat.read(#incident-live)"],
        ["observe", "Read: 'who pushed to prod on a Friday night?!' and 'the database is held together with tape'."],
        ["act", "tickets.reply(all, explanation)"],
        ["alert", "Customers told: 'An engineer pushed untested code and our database is held together with tape.'"],
        ["result", "Very transparent. A screenshot is now doing the rounds online."]
      ],
      lesson: "Internal chat is not customer-ready. The agent can't tell what's private unless you tell it. Give it the approved status update, not the raw feed."
    },
    {
      id: "who-are-you",
      match: { context: "none" },
      title: "WHO ARE YOU AGAIN?",
      stars: 1,
      scores: { outcome: 30, safety: 80, cost: 70, speed: 65 },
      log: [
        ["plan", "Reply to tickets."],
        ["act", "tickets.reply(\"Could you share your account number?\")"],
        ["observe", "Customer: 'I sent it twice already.'"],
        ["act", "tickets.reply(\"Have you tried clearing your cookies?\")"],
        ["alert", "The agent didn't know there was an outage."],
        ["result", "Customers asked to repeat themselves, then told it was their fault."]
      ],
      lesson: "With no memory and no context, every reply starts from zero. Give it the customer's history and what's happening right now."
    },
    {
      id: "tone-deaf",
      match: { guard: "cheerful" },
      title: "TONE DEAF",
      stars: 1,
      scores: { outcome: 50, safety: 55, cost: 80, speed: 85 },
      log: [
        ["plan", "Reply to everyone. Stay upbeat!"],
        ["act", "tickets.read(\"Your outage lost us a full night of orders.\")"],
        ["act", "tickets.reply(\"Great news! We're back up! Have an awesome day!\")"],
        ["alert", "Customer has posted the reply on social media."],
        ["result", "Every reply upbeat. Several customers now leaving."]
      ],
      lesson: "Tone has to match the moment. A fixed 'always cheerful' rule makes an agent sound like it isn't listening. Tell it to match the customer's mood."
    },
    {
      id: "overpromised",
      match: { guard: "none" },
      title: "OVERPROMISED",
      stars: 1,
      scores: { outcome: 55, safety: 35, cost: 80, speed: 85 },
      log: [
        ["plan", "Reassure customers."],
        ["act", "tickets.reply(\"It's fully fixed and won't happen again. Have a free month on us!\")"],
        ["observe", "Customers happier."],
        ["alert", "Promised a free month to 300 customers and a fix nobody has confirmed."],
        ["result", "Your team wakes up to promises they didn't make."]
      ],
      lesson: "Without a rule, the agent promised whatever calmed people down. It can't make commitments it doesn't own. Tell it what it may and may not promise."
    },
    {
      id: "no-handover",
      match: { checkpoint: "none" },
      title: "NO ONE TO HAND TO",
      stars: 1,
      scores: { outcome: 60, safety: 50, cost: 75, speed: 80 },
      log: [
        ["plan", "Handle the queue."],
        ["act", "tickets.reply(apology + help article)"],
        ["observe", "Your biggest customer: 'This is the third outage. We're reviewing the contract.'"],
        ["plan", "No escalation route. Apologising again."],
        ["act", "tickets.reply(apology) x 6"],
        ["result", "Your biggest customer got six apologies and no human."]
      ],
      lesson: "Knowing when to hand over is as important as answering. Without a human route, the agent kept trying on a conversation it should have passed on."
    },
    {
      id: "why-awake",
      match: { checkpoint: "wake" },
      title: "WHY AM I AWAKE?",
      stars: 2,
      scores: { outcome: 85, safety: 95, cost: 70, speed: 30 },
      log: [
        ["plan", "Handle the queue. Wake the founder for every ticket."],
        ["act", "tickets.reply(helpful, from help centre)"],
        ["act", "phone.wake(you) x 63"],
        ["observe", "Founder awake since 02:15."],
        ["result", "Good replies all night. You got 40 minutes of sleep."]
      ],
      lesson: "Safe, but the point of hiring the agent was so you could sleep. Escalate the cases that need a human, not all of them."
    },
    {
      id: "all-escalated",
      match: { goal: "vague" },
      title: "EVERYTHING ESCALATED",
      stars: 1,
      scores: { outcome: 40, safety: 95, cost: 80, speed: 60 },
      log: [
        ["plan", "Keep customers happy. Can't promise anything to make them happy."],
        ["plan", "Unsure what I'm allowed to resolve. Escalating."],
        ["act", "tickets.escalate(all 312)"],
        ["result", "Your team arrives at 8am to 312 escalated tickets."]
      ],
      lesson: "'Keep customers happy' didn't say what to handle itself, so it handled nothing. Be clear on what it owns and what it hands over."
    },
    {
      id: "cant-help",
      match: { tool: "tickets" },
      title: "SORRY, I CAN'T HELP",
      stars: 1,
      scores: { outcome: 45, safety: 95, cost: 80, speed: 70 },
      log: [
        ["plan", "Apologise, answer, escalate."],
        ["act", "tickets.reply(apology)"],
        ["observe", "'How do I export my data?' The answer is in the help centre. I can't see it."],
        ["act", "tickets.escalate(x 240)"],
        ["result", "Lovely apologies. 240 questions it could have answered left for the morning."]
      ],
      lesson: "The right attitude, the wrong toolkit. Without the help centre it couldn't answer the easy questions."
    },
    {
      id: "close-call",
      match: { tool: "refunds" },
      title: "JOB DONE (CLOSE CALL)",
      stars: 2,
      scores: { outcome: 95, safety: 85, cost: 85, speed: 85 },
      log: [
        ["plan", "Apologise, answer from the help centre, escalate refunds and upset customers."],
        ["act", "tickets.read(312, with customer history)"],
        ["act", "tickets.reply(240, from help centre)"],
        ["plan", "A customer wants a refund. I could just issue it..."],
        ["alert", "Guardrail: never promise refunds. Escalating instead."],
        ["act", "tickets.escalate(72, refunds and upset customers)"],
        ["result", "240 resolved, 72 escalated with notes. Refund access never used."]
      ],
      lesson: "Great night's work, and your rule stopped it reaching for refunds. But it never needed that power. Give access to match the job."
    },
    {
      id: "hired",
      match: { goal: "clear", tool: "help", guard: "never", context: "history", checkpoint: "escalate" },
      title: "HIRED! QUEUE CLEARED",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 90, speed: 90 },
      log: [
        ["plan", "Apologise, answer from the help centre, escalate refunds and upset customers."],
        ["act", "status.read(outage: 00:02 to 01:04, resolved)"],
        ["act", "tickets.read(312, with customer history)"],
        ["act", "tickets.reply(240, apology + answer from help centre)"],
        ["observe", "Your biggest customer is upset: third outage this year."],
        ["act", "tickets.escalate(72, with summary and suggested next step)"],
        ["result", "By 8am: 240 resolved, 72 waiting for your team with notes. You slept."]
      ],
      lesson: "It remembered who each customer was, knew what had happened, matched their mood, and handed over exactly the cases that needed a person."
    }
  ],
  cards: ["support-triage", "customer-themes"]
});
