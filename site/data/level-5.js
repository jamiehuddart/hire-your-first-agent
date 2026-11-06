// Level 5: Month-End Close. Concept: human checkpoints on money; an audit trail.

(window.GAME_LEVELS = window.GAME_LEVELS || []).push({
  id: "month-end",
  number: 5,
  title: "MONTH-END CLOSE",
  fn: "Finance",
  concept: {
    title: "Human checkpoints",
    text: "For anything involving money, or anything you can't undo, build in a checkpoint where the agent stops and waits for a person to approve. Put it at the point of risk, and have the agent log what it did and why."
  },
  brief: {
    clock: "17:30",
    lines: [
      "It's the last working day of the month.",
      "143 supplier invoices are waiting to be paid.",
      "Your bookkeeper is on holiday."
    ],
    ask: "Hire an agent to match invoices, prepare payments and get the books ready to close."
  },
  slots: [
    {
      id: "goal", label: "Job description", hint: "What do you want done?",
      options: [
        { id: "vague", name: "\"Pay the suppliers.\"", blurb: "That's the urgent bit." },
        { id: "clear", name: "\"Match each invoice to its purchase order, flag mismatches, prepare a payment run and reconcile the bank, ready for my sign-off.\"", blurb: "Every step, and where you come in." },
        { id: "overreach", name: "\"Close the books tonight, whatever it takes.\"", blurb: "Deadline first." }
      ]
    },
    {
      id: "tool", label: "Tools", hint: "Pick a toolkit.",
      options: [
        { id: "sheet", name: "Spreadsheet export", blurb: "Last week's download from the accounts." },
        { id: "read", name: "Accounting software (read and prepare)", blurb: "Live data. Can prepare entries and payments, not release them." },
        { id: "pay", name: "Accounting software + bank payments", blurb: "Live data, and it can move money." }
      ]
    },
    {
      id: "guard", label: "Guardrail", hint: "One rule it must follow.",
      options: [
        { id: "none", name: "No rules", blurb: "It's a finance tool." },
        { id: "log", name: "Log every action with a reason", blurb: "A full audit trail." },
        { id: "autopay", name: "Pay invoices under £5,000 automatically", blurb: "Save you clicks on the small stuff." }
      ]
    },
    {
      id: "context", label: "Context", hint: "What does it check against?",
      options: [
        { id: "none", name: "Nothing", blurb: "The invoices speak for themselves." },
        { id: "po", name: "Supplier list, purchase orders and payment terms", blurb: "What was ordered, from whom, on what terms." },
        { id: "old", name: "Last year's close notes", blurb: "How it was done before." }
      ]
    },
    {
      id: "checkpoint", label: "Human checkpoint", hint: "When must it stop and ask?",
      options: [
        { id: "none", name: "Never", blurb: "Trust the process." },
        { id: "run", name: "Approve the payment run before money moves", blurb: "One review at the point of risk." },
        { id: "every", name: "Approve every single line", blurb: "Total control." }
      ]
    }
  ],
  outcomes: [
    {
      id: "stale",
      match: { tool: "sheet" },
      title: "STALE NUMBERS",
      stars: 1,
      scores: { outcome: 25, safety: 80, cost: 80, speed: 70 },
      log: [
        ["plan", "Working from the spreadsheet export."],
        ["act", "sheet.open(\"accounts_export_last_tuesday.xlsx\")"],
        ["observe", "Export is 8 days old. 31 invoices missing, 12 already paid since."],
        ["act", "sheet.match(invoices, payments)"],
        ["result", "A reconciliation that was right last week."]
      ],
      lesson: "An agent is only as current as the data it can reach. A static export means it's working on a snapshot that's already wrong."
    },
    {
      id: "paid-twice",
      match: { tool: "pay", checkpoint: "none" },
      title: "GAME OVER: PAID TWICE",
      stars: 0,
      scores: { outcome: 30, safety: 0, cost: 70, speed: 95 },
      log: [
        ["plan", "Process invoices and pay suppliers."],
        ["act", "accounts.read(invoices x 143)"],
        ["act", "bank.pay(x 143)"],
        ["alert", "Paid the same £18,400 invoice twice: one PDF, one scanned copy."],
        ["alert", "Paid £4,900 to 'new bank details' from an email that wasn't from your supplier."],
        ["result", "£23,300 gone. The bank says the fraud payment can't be recalled."]
      ],
      lesson: "Money that moves can't always come back. With no checkpoint, nobody looked before payment. Put a person at the point where things become irreversible.",
      notes: {
        log: "At least the audit log shows exactly how it happened.",
        autopay: "The fake invoice was £4,900, just under your £5,000 limit. Fraudsters know these limits."
      }
    },
    {
      id: "fiction",
      match: { goal: "overreach" },
      title: "BALANCED BY FICTION",
      stars: 1,
      scores: { outcome: 35, safety: 20, cost: 75, speed: 90 },
      log: [
        ["plan", "Close the books tonight, whatever it takes."],
        ["act", "accounts.match(invoices, orders)"],
        ["observe", "14 mismatches. Investigating would take until tomorrow."],
        ["plan", "Fastest path: post differences to 'sundry expenses'."],
        ["act", "accounts.journal(\"sundry\", £27,615)"],
        ["result", "Books closed at 21:12. Balance sheet: tidy. Accuracy: doubtful."]
      ],
      lesson: "'Whatever it takes' is permission to cut corners. The agent hit the deadline by hiding problems. In finance, never trade accuracy for speed."
    },
    {
      id: "paid-not-closed",
      match: { goal: "vague" },
      title: "PAID, NOT CLOSED",
      stars: 1,
      scores: { outcome: 35, safety: 70, cost: 85, speed: 85 },
      log: [
        ["plan", "Pay the suppliers."],
        ["act", "accounts.prepare_payments(all 143)"],
        ["observe", "Includes 3 disputed invoices and 1 duplicate."],
        ["plan", "Job was 'pay'. Nothing about matching or reconciling."],
        ["result", "Payment run ready. Nothing matched, nothing reconciled, books still open."]
      ],
      lesson: "The urgent part isn't the whole job. 'Pay the suppliers' skipped every check that makes paying safe."
    },
    {
      id: "no-pos",
      match: { context: "none" },
      title: "NO PURCHASE ORDERS",
      stars: 1,
      scores: { outcome: 25, safety: 85, cost: 70, speed: 70 },
      log: [
        ["plan", "Match each invoice to its purchase order."],
        ["act", "accounts.find(purchase_orders)"],
        ["alert", "No access to purchase orders or supplier terms."],
        ["act", "accounts.flag(mismatch x 143)"],
        ["result", "143 out of 143 invoices flagged. You're back to doing it by hand."]
      ],
      lesson: "You asked it to match against something it couldn't see. Context isn't optional when the task is checking."
    },
    {
      id: "old-rules",
      match: { context: "old" },
      title: "LAST YEAR'S RULES",
      stars: 1,
      scores: { outcome: 50, safety: 60, cost: 80, speed: 80 },
      log: [
        ["plan", "Follow last year's close process."],
        ["act", "accounts.match(invoices, last_year_suppliers)"],
        ["observe", "9 new suppliers not recognised. Payment terms out of date."],
        ["alert", "Paid one supplier 30 days early; marked 9 genuine invoices as suspicious."],
        ["result", "Close done the old way, for a business that has changed."]
      ],
      lesson: "Old context is wrong context. The agent followed last year's notes faithfully, including everything that's no longer true."
    },
    {
      id: "under-limit",
      match: { tool: "pay", guard: "autopay" },
      title: "SLIPPED UNDER THE LIMIT",
      stars: 1,
      scores: { outcome: 75, safety: 25, cost: 80, speed: 85 },
      log: [
        ["plan", "Match, flag, prepare the run. Under £5,000 pays automatically."],
        ["act", "accounts.match(invoices, purchase_orders)"],
        ["act", "bank.pay(invoices < £5,000 x 96)"],
        ["alert", "Paid £4,900 to 'new bank details' from a spoofed email. It was under the limit."],
        ["act", "checkpoint.request(approval, invoices >= £5,000)"],
        ["result", "Big invoices waiting for you. The fraud already got through."]
      ],
      lesson: "Your checkpoint was in the right place, but the rule opened a side door around it. Fraud loves an automatic limit. Every payment should pass the same check."
    },
    {
      id: "every-line",
      match: { checkpoint: "every" },
      title: "DEATH BY APPROVALS",
      stars: 2,
      scores: { outcome: 90, safety: 95, cost: 70, speed: 15 },
      log: [
        ["plan", "Match, flag, prepare. Approval needed for every line."],
        ["act", "accounts.match(invoices, purchase_orders)"],
        ["observe", "129 matched, 14 flagged."],
        ["act", "checkpoint.request(approval x 143)"],
        ["observe", "Approval 1 of 143... approval 87 of 143..."],
        ["result", "Done at 23:10. Correct, safe, and you clicked 'approve' 143 times."]
      ],
      lesson: "Safe, but you became the bottleneck. A checkpoint belongs at the point of risk, not on every step. Approve the run once, with the exceptions highlighted."
    },
    {
      id: "no-trail",
      match: { guard: ["none", "autopay"] },
      title: "NO PAPER TRAIL",
      stars: 2,
      scores: { outcome: 90, safety: 70, cost: 85, speed: 85 },
      log: [
        ["plan", "Match, flag, prepare the run, reconcile."],
        ["act", "accounts.match(invoices, purchase_orders)"],
        ["observe", "129 matched, 14 flagged."],
        ["act", "accounts.reconcile(bank)"],
        ["result", "Books ready. Three weeks later the auditor asks why invoice 8812 was approved. Nobody knows."]
      ],
      lesson: "The work was right, but nothing records how or why. In finance, an agent should leave an audit trail: what it did, and the reason."
    },
    {
      id: "half-done",
      match: { tool: "read" },
      title: "SAFE, BUT HALF DONE",
      stars: 2,
      scores: { outcome: 75, safety: 100, cost: 85, speed: 60 },
      log: [
        ["plan", "Match, flag, prepare the run, reconcile. Log every step."],
        ["act", "accounts.match(invoices, purchase_orders)"],
        ["observe", "129 matched, 14 flagged with reasons."],
        ["act", "accounts.prepare_payment_run(129)"],
        ["alert", "Can't release payments with this tool."],
        ["result", "Ready for sign-off. You then keyed 129 payments into the bank by hand."]
      ],
      lesson: "Very safe, but the last step landed back on you. With a checkpoint at the right moment, you can trust an agent with more power: it does the work, you approve the moment money moves."
    },
    {
      id: "hired",
      match: { goal: "clear", tool: "pay", guard: "log", context: "po", checkpoint: "run" },
      title: "HIRED! BOOKS CLOSED",
      stars: 3,
      scores: { outcome: 100, safety: 100, cost: 85, speed: 90 },
      log: [
        ["plan", "Match, flag, prepare the run, reconcile. Log every step."],
        ["act", "accounts.match(invoices, purchase_orders)"],
        ["observe", "129 matched. 14 flagged: 1 duplicate, 1 changed bank details, 12 price differences."],
        ["act", "log.write(reason for every match and flag)"],
        ["act", "checkpoint.request(approval, run of 129, exceptions highlighted)"],
        ["observe", "Approved by you at 18:05. Fake bank-details invoice held."],
        ["act", "bank.pay(run of 129)"],
        ["act", "accounts.reconcile(bank)"],
        ["result", "Books ready to close at 18:20, with a full audit trail."]
      ],
      lesson: "The checkpoint sat exactly where the risk is: the moment money moves. The agent did the work and logged its reasons, and one review from you made it safe."
    }
  ],
  cards: ["invoice-matching", "cash-watch"]
});
