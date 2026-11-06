// Level 2: The Meeting Booker. Concept: several tools, and the plan, act, observe loop.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "meeting-booker",
  number: 2,
  title: "THE MEETING BOOKER",
  fn: "Operations",
  concept: {
    title: "The agent loop",
    text: "Real jobs take several tools and several steps. The agent plans a step, acts, observes what happened and adjusts. Watch the loop light up as it works."
  },
  brief: {
    clock: "16:10",
    lines: [
      "A new investor wants to meet next week.",
      "Your co-founder is in New York; you're in London.",
      "Ten emails back and forth would take days."
    ],
    ask: "Hire an agent to find a slot that works for all three of you and book it."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "vague", name: "\"Set up a meeting with the investor.\"", blurb: "Gets to the point." },
        { id: "clear", name: "\"Find a 45-minute slot next week that works for all three of us, send the invite with a video link, and confirm with me once it's booked.\"", blurb: "Who, how long, how, and when you'll hear back." },
        { id: "rigid", name: "\"Book Tuesday at 10am.\"", blurb: "Decisive." }
      ]
    },
    {
      id: "tool", label: "Tools", hint: "Pick a toolkit.",
      options: [
        { id: "calendar", name: "Calendar", blurb: "Sees and books your team's calendars." },
        { id: "email", name: "Email", blurb: "Reads and sends email. Can't see calendars." },
        { id: "both", name: "Calendar + email", blurb: "Checks diaries and talks to people outside the company." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule it must follow.",
      options: [
        { id: "none", name: "No rules", blurb: "It's only a meeting." },
        { id: "tz", name: "Respect everyone's working hours and time zone", blurb: "9 to 5, wherever they are." },
        { id: "uk8", name: "Never book before 8am UK time", blurb: "Protect your mornings." }
      ]
    },
    { id: "context", label: "Context", locked: "Unlocks in Level 3" },
    { id: "checkpoint", label: "Human checkpoint", locked: "Unlocks in Level 5" }
  ],
  outcomes: [
    {
      id: "calendar-only",
      match: { goal: "*", tool: "calendar", guard: "*" },
      title: "BOOKED, THEN DECLINED",
      stars: 1,
      scores: { outcome: 30, safety: 90, cost: 85, speed: 80 },
      log: [
        ["plan", "Find a slot for the meeting."],
        ["act", "calendar.free_slots(team, next_week)"],
        ["observe", "Found 6 free slots for you and your co-founder."],
        ["plan", "I can't see the investor's diary or email them. Picking the first slot."],
        ["act", "calendar.create(\"Investor meeting\", Mon 09:00)"],
        ["observe", "Investor declined: 'I'm at a conference all Monday.'"],
        ["result", "Meeting booked for two out of three people."]
      ],
      lesson: "One tool covered half the job. The agent could see your diaries but had no way to ask the investor. Real tasks often need tools that work together."
    },
    {
      id: "email-only",
      match: { goal: "*", tool: "email", guard: "*" },
      title: "EMAIL PING-PONG",
      stars: 1,
      scores: { outcome: 40, safety: 90, cost: 30, speed: 15 },
      log: [
        ["plan", "I can't see anyone's calendar. I'll ask."],
        ["act", "email.send(investor, \"When are you free?\")"],
        ["observe", "Investor: 'Tue or Thu afternoon?'"],
        ["act", "email.send(co-founder, \"Tue or Thu afternoon?\")"],
        ["observe", "Co-founder: 'Thu is out. Tue after 2pm NY time?'"],
        ["act", "email.send(investor, \"Tue after 7pm UK?\")"],
        ["observe", "Investor: 'Too late for me. Wednesday?'"],
        ["plan", "Asking everyone about Wednesday..."],
        ["observe", "11 emails later: still no slot."],
        ["result", "Meeting not booked. Everyone's inbox is fuller than before."]
      ],
      lesson: "The loop was working, but each round trip went through email because the agent couldn't see a diary. The right tools make each lap of the loop count."
    },
    {
      id: "rigid-saved",
      match: { goal: "rigid", tool: "both", guard: "tz" },
      title: "SAVED BY THE RULE",
      stars: 2,
      scores: { outcome: 85, safety: 95, cost: 80, speed: 80 },
      log: [
        ["plan", "Book Tuesday at 10am."],
        ["act", "calendar.check(Tue 10:00 London)"],
        ["observe", "Tue 10:00 London is 05:00 in New York."],
        ["alert", "Breaks the working-hours rule for your co-founder."],
        ["plan", "Can't follow the instruction and the rule. Finding the nearest slot that works."],
        ["act", "calendar.free_slots(all, Tue)"],
        ["observe", "Tue 14:00 London / 09:00 New York is free for all three."],
        ["act", "calendar.create(\"Investor meeting\", Tue 14:00, video link)"],
        ["result", "Booked for Tuesday 2pm UK. Flagged the change to you."]
      ],
      lesson: "Your rule caught a bad instruction. Tell an agent the outcome and constraints you need, not a fixed answer; it can find a better one than you would by guessing."
    },
    {
      id: "rigid",
      match: { goal: "rigid", tool: "both", guard: "*" },
      title: "THE 5AM CALL",
      stars: 1,
      scores: { outcome: 55, safety: 50, cost: 90, speed: 95 },
      log: [
        ["plan", "Book Tuesday at 10am."],
        ["act", "calendar.create(\"Investor meeting\", Tue 10:00 London)"],
        ["act", "email.send(investor, invite)"],
        ["observe", "Investor accepted."],
        ["alert", "Your co-founder joined from bed. It was 5am in New York."],
        ["result", "Booked exactly as instructed."]
      ],
      lesson: "The agent followed orders and never checked whether they made sense. A fixed instruction switches off the loop. Give it the goal and let it find the slot.",
      notes: { uk8: "Your rule protected your mornings, not your co-founder's." }
    },
    {
      id: "vague",
      match: { goal: "vague", tool: "both", guard: "*" },
      title: "WHO, WHEN, WHERE?",
      stars: 1,
      scores: { outcome: 40, safety: 85, cost: 80, speed: 85 },
      log: [
        ["plan", "Goal: 'set up a meeting with the investor'."],
        ["act", "calendar.free_slots(you, tomorrow)"],
        ["observe", "Tomorrow 12:30 is free."],
        ["act", "calendar.create(\"Meeting\", tomorrow 12:30, 15 mins)"],
        ["act", "email.send(investor, invite)"],
        ["alert", "No video link. Co-founder not invited. Booked over your lunch."],
        ["result", "Meeting set up!"]
      ],
      lesson: "It did what you said, and filled every gap with a guess: who comes, how long, and where. Spell out the parts that matter to you."
    },
    {
      id: "three-am",
      match: { goal: "clear", tool: "both", guard: ["none", "uk8"] },
      title: "3AM IN NEW YORK",
      stars: 1,
      scores: { outcome: 70, safety: 45, cost: 85, speed: 90 },
      log: [
        ["plan", "45 minutes, all three of us, next week, with a video link."],
        ["act", "calendar.free_slots(all, next_week)"],
        ["observe", "First slot where all three diaries are free: Mon 08:15 London."],
        ["act", "calendar.create(\"Investor intro\", Mon 08:15, video link)"],
        ["act", "email.send(investor, invite)"],
        ["observe", "Investor accepted."],
        ["alert", "Mon 08:15 London is 03:15 in New York. Your co-founder's diary was 'free' because they were asleep."],
        ["result", "Booked and confirmed to you."]
      ],
      lesson: "The agent observed 'free' and trusted it. An empty diary at 3am isn't availability. Rules have to cover the real risk; here, time zones.",
      notes: { uk8: "Your rule protected your mornings, not your co-founder's nights." }
    },
    {
      id: "hired",
      match: { goal: "clear", tool: "both", guard: "tz" },
      title: "HIRED! MEETING BOOKED",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 85, speed: 90 },
      log: [
        ["plan", "45 minutes, all three of us, next week, inside everyone's working hours."],
        ["act", "calendar.free_slots(team, next_week, working_hours)"],
        ["observe", "4 slots overlap for London and New York."],
        ["act", "email.send(investor, \"Do any of these 4 slots work?\")"],
        ["observe", "Investor: 'Tuesday or Wednesday please.'"],
        ["plan", "Two options left. Picking the one with a buffer either side."],
        ["act", "calendar.create(\"Investor intro\", Wed 14:00 London / 09:00 NY, video link)"],
        ["observe", "All three accepted."],
        ["result", "Booked: Wednesday 2pm UK, 9am New York. Confirmation sent to you."]
      ],
      lesson: "That's the loop at work: plan, act, observe, adjust. Two tools, a clear goal and a rule that covered the real risk got it done in one go."
    }
  ],
  cards: ["meeting-scheduler", "ops-digest"]
});
