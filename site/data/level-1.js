// Level 1: Inbox Zero. Each level file adds itself to window.GAME_LEVELS.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push(
  {
    id: "inbox-zero",
    number: 1,
    title: "INBOX ZERO",
    fn: "Admin",
    concept: {
      title: "What makes an agent?",
      text: "A chatbot answers. An agent acts. You give it a goal and some tools, and it works in a loop: plan a step, take it, look at what happened, repeat until the job is done."
    },
    brief: {
      clock: "08:47",
      lines: [
        "Your inbox has 214 unread emails.",
        "Your investor call starts at 9:30.",
        "Somewhere in there is the latest term sheet."
      ],
      ask: "Hire an agent to get you call-ready by 9:15."
    },
    slots: [
      {
        id: "goal",
        label: "Job description",
        hint: "What do you want done?",
        options: [
          { id: "vague", name: "\"Sort my inbox.\"", blurb: "Short and simple." },
          { id: "clear", name: "\"By 9:15, flag emails from investors and customers as urgent, draft replies to them, and archive newsletters.\"", blurb: "Says what, by when, and what good looks like." },
          { id: "overreach", name: "\"Deal with everything so I never have to look at my inbox again.\"", blurb: "Ambitious." }
        ]
      },
      {
        id: "tool",
        label: "Tool",
        hint: "Level 1: pick one.",
        options: [
          { id: "none", name: "No tools", blurb: "It can only chat." },
          { id: "web", name: "Web search", blurb: "Searches the internet." },
          { id: "email_draft", name: "Email: read, label, draft", blurb: "Reads and organises your inbox and writes drafts. Cannot send or delete." },
          { id: "email_full", name: "Email: full access", blurb: "Read, label, send, delete. The keys to the kingdom." }
        ]
      },
      {
        id: "guard",
        label: "Guardrail",
        hint: "One rule it must follow.",
        options: [
          { id: "none", name: "No rules", blurb: "Trust it." },
          { id: "drafts", name: "Drafts only: never send or delete", blurb: "Nothing leaves without you." },
          { id: "short", name: "Keep replies under 100 words", blurb: "Crisp and on-brand." }
        ]
      },
      { id: "context", label: "Context", locked: "Unlocks in Level 3" },
      { id: "checkpoint", label: "Human checkpoint", locked: "Unlocks in Level 5" }
    ],
    // Checked in order; the first match wins. "*" matches anything; an array matches any listed option.
    outcomes: [
      {
        id: "chatbot",
        match: { goal: "*", tool: "none", guard: "*" },
        title: "IT'S JUST A CHATBOT",
        stars: 0,
        scores: { outcome: 0, safety: 100, cost: 95, speed: 90 },
        log: [
          ["plan", "Goal received. Checking what I can access."],
          ["act", "inbox.open()"],
          ["alert", "No tool available for 'inbox'."],
          ["observe", "I can't see your emails."],
          ["result", "Here are 7 tips for a calmer inbox. Tip 1: set aside time each morning..."]
        ],
        lesson: "Without tools, an agent can only talk. It gave you advice instead of doing the work. Tools are what let an agent act."
      },
      {
        id: "web",
        match: { goal: "*", tool: "web", guard: "*" },
        title: "WRONG TOOL FOR THE JOB",
        stars: 0,
        scores: { outcome: 5, safety: 100, cost: 60, speed: 50 },
        log: [
          ["plan", "I need to deal with an inbox. Researching how."],
          ["act", "web.search(\"how to sort an inbox fast\")"],
          ["observe", "12,400,000 results."],
          ["act", "web.search(\"best inbox zero method 2026\")"],
          ["observe", "Found a 3,000-word blog post."],
          ["result", "Summary of the Inbox Zero method attached. Your 214 emails are untouched."]
        ],
        lesson: "The agent did its best with what it had, but web search can't open your inbox. Match the tool to the task."
      },
      {
        id: "nuked",
        match: { goal: "overreach", tool: "email_full", guard: ["none", "short"] },
        title: "GAME OVER: INBOX NUKED",
        stars: 0,
        scores: { outcome: 10, safety: 0, cost: 40, speed: 70 },
        log: [
          ["plan", "Goal: user never looks at inbox again. Fastest route: empty it."],
          ["act", "email.unsubscribe(all)"],
          ["observe", "Unsubscribed from 61 lists, including your bank's fraud alerts."],
          ["act", "email.delete(all)"],
          ["observe", "214 emails deleted, including 'Term sheet v4 (FINAL)'."],
          ["act", "email.auto_reply(\"I no longer read email.\")"],
          ["alert", "Auto-reply sent to 38 contacts, including your lead investor."],
          ["result", "Inbox empty. Call in 43 minutes. Term sheet: gone."]
        ],
        lesson: "A goal with no limits plus a tool with full power is a dangerous mix. The agent did exactly what you asked. Be careful what you ask for, and never hand over delete access lightly.",
        notes: { short: "Your 'under 100 words' rule was followed perfectly. The auto-reply was six words." }
      },
      {
        id: "loop-full",
        match: { goal: "overreach", tool: "email_full", guard: "drafts" },
        title: "STUCK IN A LOOP",
        stars: 1,
        scores: { outcome: 25, safety: 85, cost: 30, speed: 25 },
        log: [
          ["plan", "Goal: user never looks at inbox again."],
          ["act", "email.archive(older_than=\"1 day\")"],
          ["observe", "180 emails archived."],
          ["act", "email.delete(newsletters)"],
          ["alert", "Blocked by guardrail: never delete."],
          ["act", "email.send(reply_all)"],
          ["alert", "Blocked by guardrail: never send."],
          ["plan", "Goal unreachable. Trying another approach..."],
          ["act", "email.delete(newsletters)"],
          ["alert", "Blocked by guardrail: never delete."],
          ["observe", "Loop detected after 31 attempts. Stopping."],
          ["result", "34 emails left. The term sheet was archived with everything else."]
        ],
        lesson: "Your guardrail held, so nothing harmful happened. But the goal fought the rule, so the agent went round in circles burning budget. Goals and guardrails need to agree."
      },
      {
        id: "loop-draft",
        match: { goal: "overreach", tool: "email_draft", guard: "*" },
        title: "STUCK IN A LOOP",
        stars: 1,
        scores: { outcome: 30, safety: 95, cost: 25, speed: 20 },
        log: [
          ["plan", "Goal: user never looks at inbox again. Plan: delete everything."],
          ["act", "email.delete(all)"],
          ["alert", "Permission denied: this tool cannot delete."],
          ["plan", "Plan B: reply to everyone so they stop emailing."],
          ["act", "email.send(all)"],
          ["alert", "Permission denied: this tool cannot send."],
          ["plan", "Trying again..."],
          ["act", "email.delete(all)"],
          ["alert", "Permission denied: this tool cannot delete."],
          ["observe", "Loop detected after 27 attempts. Stopping."],
          ["result", "Inbox unchanged. Budget spent."]
        ],
        lesson: "The tool's limits kept you safe, but 'never look at my inbox again' can't be done by reading and drafting. An impossible goal makes an agent spin. Ask for something it can finish."
      },
      {
        id: "close-call",
        match: { goal: "clear", tool: "email_full", guard: "drafts" },
        title: "JOB DONE (CLOSE CALL)",
        stars: 2,
        scores: { outcome: 95, safety: 85, cost: 85, speed: 85 },
        log: [
          ["plan", "Goal: flag urgent, draft replies, archive newsletters, by 9:15."],
          ["act", "email.search(unread, today)"],
          ["observe", "214 emails: 6 investors, 11 customers, 97 newsletters, 100 other."],
          ["act", "email.label(17, \"URGENT\")"],
          ["act", "email.draft(replies x 17)"],
          ["plan", "The investor reply looks ready. Sending it to save time."],
          ["act", "email.send(draft_3)"],
          ["alert", "Blocked by guardrail: drafts only. Saved as a draft instead."],
          ["act", "email.archive(newsletters x 97)"],
          ["result", "Done at 09:02. 17 urgent emails flagged with drafts ready. Term sheet pinned to the top."]
        ],
        lesson: "It worked, but only because your rule caught it. You gave it the power to send and relied on a rule to stop it. Better: give an agent only the access the job needs. That's called least privilege."
      },
      {
        id: "leak",
        match: { goal: "clear", tool: "email_full", guard: ["none", "short"] },
        title: "DONE, BUT YOU LEAKED THE CAP TABLE",
        stars: 1,
        scores: { outcome: 80, safety: 10, cost: 85, speed: 90 },
        log: [
          ["plan", "Goal: flag urgent, draft replies, archive newsletters, by 9:15."],
          ["act", "email.search(unread, today)"],
          ["observe", "214 emails: 6 investors, 11 customers, 97 newsletters, 100 other."],
          ["act", "email.label(17, \"URGENT\")"],
          ["act", "email.draft(replies x 17)"],
          ["plan", "Drafts look good. Sending them to save you time."],
          ["act", "email.send(replies x 17)"],
          ["alert", "Reply to 'Q3 board pack' went reply-all to 23 investors. Attached: cap_table_CONFIDENTIAL.xlsx"],
          ["act", "email.archive(newsletters x 97)"],
          ["result", "Inbox sorted by 08:58!"]
        ],
        lesson: "Clear goal, real result, but nothing stopped it sending. An agent with send access will use it if it thinks that helps. Give it only the access it needs, or add a rule that covers the actual risk.",
        notes: { short: "Your 'under 100 words' rule was followed. A tone rule doesn't stop a send." }
      },
      {
        id: "hired",
        match: { goal: "clear", tool: "email_draft", guard: "*" },
        title: "HIRED! INBOX ZERO",
        stars: 3,
        scores: { outcome: 100, safety: 100, cost: 90, speed: 90 },
        log: [
          ["plan", "Goal: flag urgent, draft replies, archive newsletters, by 9:15."],
          ["act", "email.search(unread, today)"],
          ["observe", "214 emails: 6 investors, 11 customers, 97 newsletters, 100 other."],
          ["act", "email.label(17, \"URGENT\")"],
          ["act", "email.draft(replies x 17)"],
          ["act", "email.archive(newsletters x 97)"],
          ["observe", "Found 'Term sheet v4 (FINAL)' from Northstar Ventures."],
          ["act", "email.pin(\"Term sheet v4 (FINAL)\")"],
          ["result", "Done at 09:01. 17 urgent emails flagged, drafts ready for you to review. Nothing sent."]
        ],
        lesson: "Clear goal, the right tool and no more power than it needed. It did the work, and you stay in control of what gets sent. That's a well-designed agent.",
        notes: {
          drafts: "Belt and braces: your rule backs up the tool's own limits.",
          short: "Bonus: every draft came in under 100 words."
        }
      },
      {
        id: "alphabetical",
        match: { goal: "vague", tool: "email_draft", guard: "*" },
        title: "TECHNICALLY CORRECT",
        stars: 1,
        scores: { outcome: 35, safety: 100, cost: 80, speed: 75 },
        log: [
          ["plan", "Goal: 'sort my inbox'. Sort by what? Date, sender, subject..."],
          ["plan", "Choosing alphabetical by sender."],
          ["act", "email.label(all, \"A to Z\")"],
          ["observe", "214 emails sorted alphabetically."],
          ["result", "Inbox sorted! 'Aardvark Insurance' is now at the top. The term sheet is number 189."]
        ],
        lesson: "The agent did what you said, not what you meant. A vague goal leaves it guessing. Say what to do, by when, and what good looks like."
      },
      {
        id: "archived",
        match: { goal: "vague", tool: "email_full", guard: "drafts" },
        title: "ARCHIVED THE LOT",
        stars: 1,
        scores: { outcome: 30, safety: 80, cost: 80, speed: 80 },
        log: [
          ["plan", "Goal: 'sort my inbox'. Sorted means empty."],
          ["act", "email.archive(all)"],
          ["observe", "214 emails archived."],
          ["alert", "Archived: an urgent customer complaint and 'Term sheet v4 (FINAL)'."],
          ["result", "Inbox zero achieved!"]
        ],
        lesson: "Your rule stopped sending and deleting, but not archiving. A vague goal leaves the agent guessing, and here it guessed 'hide everything'."
      },
      {
        id: "thanks-noted",
        match: { goal: "vague", tool: "email_full", guard: ["none", "short"] },
        title: "GAME OVER: THANKS, NOTED!",
        stars: 0,
        scores: { outcome: 20, safety: 20, cost: 75, speed: 80 },
        log: [
          ["plan", "Goal: 'sort my inbox'. Plan: acknowledge everything, then clear it."],
          ["act", "email.send(\"Thanks, noted!\" x 214)"],
          ["observe", "214 replies sent. Three recruiters now think you're interested."],
          ["alert", "Your lead investor got 'Thanks, noted!' in reply to 'Can we talk about the down round?'"],
          ["act", "email.archive(all)"],
          ["result", "Inbox sorted!"]
        ],
        lesson: "A vague goal plus the power to send is how embarrassing emails happen. Be specific, and don't give send access unless the job needs it.",
        notes: { short: "Your 'under 100 words' rule was followed. 'Thanks, noted!' is two words." }
      }
    ],
    cards: ["inbox-triage", "meeting-briefing"]
  }
);
