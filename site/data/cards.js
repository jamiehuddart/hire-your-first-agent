// The Use-Case Deck. Each level lists two card ids: the first unlocks at 2 stars, the second at 3 stars.

window.USE_CASE_CARDS = [
  {
    id: "inbox-triage", fn: "Founder's desk", title: "Inbox triage agent",
    job: "Reads your inbox each morning, flags what matters, drafts replies and clears the noise.",
    suits: "Founders and anyone whose inbox runs their day",
    tools: "Email: read, label, draft",
    risk: "Sending something it shouldn't",
    guardrail: "Drafts only; you press send",
    prompt: "Every weekday at 8am, read my unread email. Flag anything from investors, customers or my team as urgent and draft a reply to each. Archive newsletters. Never send or delete anything; leave the drafts for me to review."
  },
  {
    id: "meeting-briefing", fn: "Founder's desk", title: "Meeting briefing agent",
    job: "Before each external meeting, pulls together who you're meeting, your last emails with them and open actions.",
    suits: "Founders, operators and anyone in back-to-back meetings",
    tools: "Calendar, email (read), web search",
    risk: "Out-of-date or wrong information about a person",
    guardrail: "Cite where each fact came from",
    prompt: "Every evening, look at tomorrow's external meetings. For each, write a five-line brief: who they are, their company, our last three emails, any open actions, and one smart question to ask. Cite the source of each fact."
  },
  {
    id: "meeting-scheduler", fn: "Operations", title: "Scheduling agent",
    job: "Finds times that work across diaries and time zones, sends invites and handles the back and forth.",
    suits: "Operators, EAs and teams spread across time zones",
    tools: "Calendar, email",
    risk: "Booking outside someone's working hours",
    guardrail: "Respect each person's working hours and time zone",
    prompt: "When I forward you a meeting request, find three slots next week inside everyone's working hours, offer them to the other side, book the one they pick with a video link, and confirm to me."
  },
  {
    id: "ops-digest", fn: "Operations", title: "Weekly ops digest",
    job: "Every Monday, collects updates from your tools and writes a one-page summary of what moved, what's stuck and what needs a decision.",
    suits: "Operators, Chiefs of Staff and founders of growing teams",
    tools: "Project tracker, CRM, shared drive (read only)",
    risk: "Missing or misreporting something important",
    guardrail: "Link every point to its source",
    prompt: "Every Monday at 7am, read last week's updates in our project tracker and CRM. Write a one-page digest with three sections: done, stuck, decisions needed. Link every point to where you found it."
  },
  {
    id: "prospect-research", fn: "Sales", title: "Prospect research agent",
    job: "Builds a list of companies that match your customer profile, finds the right person at each and drafts a tailored first email.",
    suits: "Founders doing their own sales, and early sales teams",
    tools: "Web search, company database, email (drafts)",
    risk: "Spam, or using confidential material in outreach",
    guardrail: "Drafts only; only public information",
    prompt: "Using our ideal customer profile and case studies, find 20 UK companies that fit, name the most relevant decision-maker at each, and draft a short first email that references the closest case study. Save drafts only."
  },
  {
    id: "crm-hygiene", fn: "Sales", title: "CRM hygiene agent",
    job: "After each sales call, logs notes, updates the deal stage and sets the next follow-up so your pipeline is always current.",
    suits: "Anyone who sells and hates admin",
    tools: "CRM, meeting notes, calendar",
    risk: "Overwriting good data with wrong data",
    guardrail: "Suggest changes; a person confirms",
    prompt: "After each sales call, read the meeting notes, suggest updates to the deal in our CRM (stage, next step, follow-up date) and show me the changes to confirm before saving."
  },
  {
    id: "cv-screening", fn: "Hiring", title: "Fair CV screening agent",
    job: "Scores every application against the criteria in your job spec, explains each score and suggests a longlist for you to review.",
    suits: "Founders hiring without an in-house recruiter",
    tools: "Applicant tracking system or CV folder, spreadsheet",
    risk: "Bias, and decisions about people made by a machine",
    guardrail: "Blind screening; a person makes every decision",
    prompt: "Score each CV in this folder against the five criteria in the job spec, from 1 to 5, with a one-line reason per score. Ignore name, age, gender, photo and university. Suggest a longlist of 15 for me to review. Do not contact anyone."
  },
  {
    id: "interview-debrief", fn: "Hiring", title: "Interview debrief agent",
    job: "Turns interviewers' rough notes into a structured scorecard against the role's criteria, so you compare candidates like for like.",
    suits: "Teams running interviews with several people",
    tools: "Notes, shared drive, scorecard template",
    risk: "Adding opinions that weren't in the notes",
    guardrail: "Only use what interviewers wrote; flag gaps",
    prompt: "Turn these interview notes into our scorecard: a score and evidence for each criterion, quoting the notes. Where the notes don't cover a criterion, write 'no evidence' rather than guessing."
  },
  {
    id: "invoice-matching", fn: "Finance", title: "Invoice matching agent",
    job: "Matches supplier invoices to purchase orders, flags mismatches and duplicates, and prepares a payment run for approval.",
    suits: "Founders and finance leads without a big finance team",
    tools: "Accounting software, purchase orders",
    risk: "Paying the wrong amount, twice, or to a fraudster",
    guardrail: "Log every action; a person approves every payment run",
    prompt: "Match this month's supplier invoices to purchase orders. Flag duplicates, price differences and any change of bank details. Prepare a payment run of the clean matches and send it to me for approval, with a log of every decision."
  },
  {
    id: "cash-watch", fn: "Finance", title: "Cash watch agent",
    job: "Each morning, reports your cash position, flags overdue customer invoices and drafts polite chasers.",
    suits: "Founders watching runway",
    tools: "Bank feed (read only), accounting software, email (drafts)",
    risk: "Chasing a customer who has already paid",
    guardrail: "Check payment status first; drafts only",
    prompt: "Every morning, tell me today's cash balance and runway in months. List invoices more than 14 days overdue, check none have been paid since, and draft a polite chaser for each. Don't send anything."
  },
  {
    id: "support-triage", fn: "Customer", title: "Out-of-hours support agent",
    job: "Answers common questions from your help centre overnight and passes refunds, upset customers and anything unclear to a person.",
    suits: "Products with customers in several time zones",
    tools: "Ticket system, help centre",
    risk: "Promising refunds or fixes it can't deliver",
    guardrail: "Never promise money or dates; escalate when unsure",
    prompt: "Outside office hours, answer support tickets using only our help centre. Match the customer's tone. Never promise refunds, discounts or fix dates. Escalate refunds, upset customers and anything you're unsure of to the morning queue with a short summary."
  },
  {
    id: "customer-themes", fn: "Customer", title: "Voice of the customer agent",
    job: "Reads a week of tickets, reviews and calls, and reports the top themes with real quotes.",
    suits: "Founders and product leads",
    tools: "Ticket system, reviews, call notes (read only)",
    risk: "Overstating a theme from a handful of comments",
    guardrail: "Count every theme and quote real customers",
    prompt: "Every Friday, read this week's support tickets and reviews. Give me the top five themes, how many times each came up, and two real quotes for each. Note anything that's new this week."
  },
  {
    id: "content-team", fn: "Marketing", title: "Content team of agents",
    job: "A researcher, a writer and a reviewer agent turn one brief into a sourced report, a deck outline and a blog post.",
    suits: "Small teams with big launches",
    tools: "Web search, documents, brand guide",
    risk: "Made-up facts, off-brand copy",
    guardrail: "Every fact needs a source; a person signs off",
    prompt: "Act as three agents. Researcher: find sourced facts on [topic]. Writer: draft a 600-word post in our brand voice using only those facts. Reviewer: check every claim against its source and send back anything unsupported. Show me the final draft for sign-off."
  },
  {
    id: "competitor-watch", fn: "Marketing", title: "Competitor watch agent",
    job: "Tracks competitors' news, launches, pricing pages and job ads, and sends a short weekly summary.",
    suits: "Founders and anyone in a busy market",
    tools: "Web search, news, competitor websites",
    risk: "Reporting rumour as fact",
    guardrail: "Link every item to its source and date",
    prompt: "Every Monday, check these five competitors' websites, news coverage and job ads. Summarise anything new in under 200 words: launches, pricing, hiring and partnerships. Link and date every item."
  }
];

// Levels in the campaign, in order, with the boss level last. Used for the level select screen.
window.GAME_BOSS = { number: "B", title: "YOUR BUSINESS", fn: "Boss level" };
