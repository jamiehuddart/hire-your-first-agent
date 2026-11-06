// Hire Your First Agent: game engine.
// Content lives in data/; this file only knows how to play a level, so new levels need no changes here.

(function () {
  "use strict";

  const LEVELS = (window.GAME_LEVELS || []).slice().sort((a, b) => a.number - b.number);
  const CARDS = window.USE_CASE_CARDS || [];
  const BOSS = window.GAME_BOSS || { number: "B", title: "YOUR BUSINESS", fn: "Boss level" };
  const app = document.getElementById("app");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Saving (browser only; the game works without it) ----------
  const KEY = "hyfa-save-v1";
  const fresh = () => ({
    levels: {},
    cards: [],
    boss: null,
    scores: [
      { i: "CPU", s: 6000, l: "1" },
      { i: "BOT", s: 4000, l: "1" },
      { i: "LLM", s: 2000, l: "1" }
    ]
  });
  function loadSave() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? Object.assign(fresh(), JSON.parse(raw)) : fresh();
    } catch (e) { return fresh(); }
  }
  let save = loadSave();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* private mode: play on */ } }

  // ---------- Helpers ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n, w) => String(n).padStart(w, "0");
  const levelById = (id) => LEVELS.find((l) => l.id === id);
  const cardById = (id) => CARDS.find((c) => c.id === id);
  const best = (id) => save.levels[id] || { stars: 0, score: 0 };

  function starsHtml(n, max) {
    let s = "";
    for (let i = 0; i < (max || 3); i++) s += `<span class="${i < n ? "on" : ""}">★</span>`;
    return `<span class="stars" aria-label="${n} of ${max || 3} stars">${s}</span>`;
  }

  // Pixel robot, drawn from a 12 x 12 map.
  const SPRITE = [
    ".....yy.....",
    ".....aa.....",
    "..aaaaaaaa..",
    ".aaaaaaaaaa.",
    ".aaccaaccaa.",
    ".aaccaaccaa.",
    ".aaaaaaaaaa.",
    ".aammmmmmaa.",
    "..aaaaaaaa..",
    "...bbbbbb...",
    ".bbbbbbbbbb.",
    ".bb.bbbb.bb."
  ];
  const PAL = { a: "var(--bot-body)", c: "var(--bot-eye)", m: "var(--bot-mouth)", y: "var(--yellow)", b: "var(--bot-legs)" };
  function robot(mood, size) {
    let r = "";
    SPRITE.forEach((row, y) => [...row].forEach((ch, x) => {
      if (PAL[ch]) r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${PAL[ch]}"/>`;
    }));
    const s = size || 96;
    return `<svg class="bot bot-${mood || "ok"}" viewBox="0 0 12 12" width="${s}" height="${s}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
  }

  function totalScore() {
    let t = 0;
    Object.values(save.levels).forEach((l) => { t += l.score || 0; });
    if (save.boss) t += save.boss.score || 0;
    return t;
  }
  function updateHud() {
    document.getElementById("hud-score").textContent = pad(totalScore(), 6);
    document.getElementById("hud-cards").textContent = `${save.cards.length}/${CARDS.length}`;
  }

  function isUnlocked(index) {
    if (index === 0) return true;
    const prev = LEVELS[index - 1];
    return prev && best(prev.id).stars >= 1;
  }
  const bossUnlocked = () => LEVELS.length > 0 && best(LEVELS[LEVELS.length - 1].id).stars >= 1;

  // ---------- State ----------
  const state = { level: null, picks: {}, outcome: null, runId: 0, skip: false, result: null };

  function show(html) {
    state.runId++; // cancels any run animation in progress
    app.innerHTML = html;
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
    updateHud();
  }

  // ---------- Screens ----------
  function screenTitle() {
    const rows = save.scores.slice(0, 5).map((r, i) =>
      `<li><span class="rank">${i + 1}.</span><span>${esc(r.i)}</span><span class="lvl">L${esc(r.l)}</span><span class="pts">${pad(r.s, 5)}</span></li>`
    ).join("");
    show(`
      <section class="title-screen">
        ${robot("ok", 120)}
        <h1 class="logo">HIRE YOUR<br>FIRST AGENT</h1>
        <p class="tagline">Build AI agents for a start-up that needs them. Watch them work. Try not to leak the cap table.</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-act="levels"><span class="blink">PRESS START</span></button>
          <button class="btn" data-act="deck">USE-CASE DECK</button>
        </div>
        <div class="hiscores">
          <h2>HIGH SCORES</h2>
          <ol>${rows}</ol>
        </div>
      </section>`);
  }

  function screenLevels() {
    const tiles = LEVELS.map((l, i) => {
      const open = isUnlocked(i);
      const b = best(l.id);
      return `
        <button class="level-tile" data-act="brief" data-id="${l.id}" ${open ? "" : "disabled"}>
          <span class="num">LEVEL ${l.number}</span>
          <span class="name">${esc(l.title)}</span>
          <span class="fn">${esc(l.fn)}</span>
          ${open ? starsHtml(b.stars) : `<span class="fn">Locked: get 1 star on Level ${LEVELS[i - 1].number}</span>`}
        </button>`;
    }).join("");
    const bOpen = bossUnlocked();
    const bossTile = `
      <button class="level-tile boss" data-act="boss" ${bOpen ? "" : "disabled"}>
        <span class="num">BOSS LEVEL</span>
        <span class="name">${esc(BOSS.title)}</span>
        <span class="fn">Design an agent for your own business</span>
        ${bOpen ? starsHtml(save.boss ? save.boss.stars : 0) : `<span class="fn">Locked: get 1 star on Level ${LEVELS.length}</span>`}
      </button>`;
    show(`
      <section>
        <div class="kicker">SELECT LEVEL</div>
        <h2>Your start-up has jobs to fill</h2>
        <p class="muted">Each level teaches one idea about building agents. Get a star to unlock the next. Two stars earns a use-case card; three earns a bonus card.</p>
        <div class="level-grid">${tiles}${bossTile}</div>
        <div class="btn-row"><button class="btn" data-act="title">BACK</button></div>
      </section>`);
  }

  function loopHtml() {
    return `<div class="loop" aria-hidden="true">
      <span class="plan" data-loop="plan">PLAN</span><i>→</i>
      <span class="act" data-loop="act">ACT</span><i>→</i>
      <span class="observe" data-loop="observe">OBSERVE</span><i>↺</i>
      <span class="result" data-loop="result">DONE</span>
    </div>`;
  }

  function screenBrief(id) {
    const l = levelById(id);
    state.level = l;
    state.picks = {};
    show(`
      <section>
        <div class="kicker">LEVEL ${l.number} · ${esc(l.fn.toUpperCase())}</div>
        <h1>${esc(l.title)}</h1>
        <div class="brief-grid">
          <div class="panel">
            <div class="clock">${esc(l.brief.clock)}</div>
            <ul class="brief-lines">${l.brief.lines.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <p class="ask">${esc(l.brief.ask)}</p>
          </div>
          <div class="panel concept">
            <h3>NEW IDEA: ${esc(l.concept.title.toUpperCase())}</h3>
            <p>${esc(l.concept.text)}</p>
            ${loopHtml()}
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" data-act="build">BUILD YOUR AGENT</button>
          <button class="btn" data-act="levels">LEVEL SELECT</button>
        </div>
      </section>`);
  }

  function openSlots(l) { return l.slots.filter((s) => !s.locked); }
  function buildReady() { return openSlots(state.level).every((s) => state.picks[s.id]); }

  function screenBuild() {
    const l = state.level;
    const slots = l.slots.map((s) => {
      if (s.locked) {
        return `<div class="slot locked"><div class="slot-head"><h3>${esc(s.label.toUpperCase())}</h3></div><div class="lockbox">🔒 ${esc(s.locked)}</div></div>`;
      }
      const opts = s.options.map((o) => `
        <button class="opt" data-act="pick" data-slot="${s.id}" data-opt="${o.id}" aria-pressed="${state.picks[s.id] === o.id}">
          <span class="name">${esc(o.name)}</span>
          <span class="blurb">${esc(o.blurb)}</span>
        </button>`).join("");
      return `
        <div class="slot" role="group" aria-labelledby="slot-${s.id}">
          <div class="slot-head"><h3 id="slot-${s.id}">${esc(s.label.toUpperCase())}</h3><span class="hint">${esc(s.hint || "")}</span></div>
          <div class="options">${opts}</div>
        </div>`;
    }).join("");
    show(`
      <section>
        <div class="kicker">LEVEL ${l.number} · BUILD YOUR AGENT</div>
        <h2>${esc(l.brief.ask)}</h2>
        ${slots}
        <div class="build-bar">
          <span class="status" id="build-status"></span>
          <div class="btn-row" style="margin:0">
            <button class="btn" data-act="brief" data-id="${l.id}">BRIEF</button>
            <button class="btn btn-primary" id="go" data-act="run">SEND TO WORK ▶</button>
          </div>
        </div>
      </section>`);
    refreshBuildBar();
  }

  function refreshBuildBar() {
    const open = openSlots(state.level);
    const done = open.filter((s) => state.picks[s.id]).length;
    const st = document.getElementById("build-status");
    const go = document.getElementById("go");
    if (!st || !go) return;
    const ready = done === open.length;
    st.textContent = ready ? "AGENT READY" : `PARTS: ${done}/${open.length}`;
    st.classList.toggle("ready", ready);
    go.disabled = !ready;
  }

  function resolveOutcome(l, picks) {
    const ok = (rule) => Object.entries(rule).every(([k, v]) => v === "*" || (Array.isArray(v) ? v.includes(picks[k]) : v === picks[k]));
    return l.outcomes.find((o) => ok(o.match)) || {
      id: "fallback", title: "UNEXPECTED RESULT", stars: 0,
      scores: { outcome: 0, safety: 50, cost: 50, speed: 50 },
      log: [["observe", "The agent wasn't sure what to do with this combination."]],
      lesson: "This combination isn't covered yet. Try a different build."
    };
  }

  const TAGS = { plan: "PLAN", act: "ACT", observe: "OBSERVE", alert: "ALERT!", result: "RESULT" };
  const LOOP_OF = { plan: "plan", act: "act", observe: "observe", alert: "observe", result: "result" };

  async function screenRun() {
    const l = state.level;
    const o = resolveOutcome(l, state.picks);
    state.outcome = o;
    state.skip = false;
    show(`
      <section>
        <div class="kicker">LEVEL ${l.number} · AGENT AT WORK</div>
        <div class="run-grid">
          <div class="panel">
            ${robot("ok", 110)}
            ${loopHtml()}
            <div class="meters">
              <div>STEPS <b id="m-steps">0</b></div>
              <div>TOKENS <b id="m-tokens">0</b></div>
            </div>
          </div>
          <div class="terminal" role="log" aria-label="Agent activity">
            <ol id="feed"></ol><span class="cursor" id="cursor"></span>
          </div>
        </div>
        <div class="btn-row" id="run-actions">
          <button class="btn" data-act="skip">SKIP ▶▶</button>
        </div>
      </section>`);

    const myRun = state.runId;
    const feed = document.getElementById("feed");
    const totalTokens = 1500 + (100 - o.scores.cost) * 420;
    const steps = o.log.length;
    for (let i = 0; i < steps; i++) {
      if (state.runId !== myRun) return;
      const [type, text] = o.log[i];
      document.querySelectorAll(".loop span").forEach((s) => s.classList.toggle("on", s.dataset.loop === LOOP_OF[type]));
      const li = document.createElement("li");
      li.className = `t-${type}`;
      li.innerHTML = `<span class="tag">${TAGS[type] || type.toUpperCase()}</span><span class="txt"></span>`;
      feed.appendChild(li);
      li.scrollIntoView({ block: "nearest", behavior: "auto" });
      const txt = li.querySelector(".txt");
      if (state.skip || reduceMotion) {
        txt.textContent = text;
      } else {
        for (let c = 1; c <= text.length; c++) {
          if (state.runId !== myRun) return;
          if (state.skip) { txt.textContent = text; break; }
          txt.textContent = text.slice(0, c);
          await sleep(12);
        }
      }
      document.getElementById("m-steps").textContent = i + 1;
      document.getElementById("m-tokens").textContent = Math.round(totalTokens * (i + 1) / steps).toLocaleString("en-GB");
      if (!state.skip && !reduceMotion) await sleep(type === "alert" ? 650 : 380);
    }
    if (state.runId !== myRun) return;
    const cur = document.getElementById("cursor");
    if (cur) cur.remove();
    const bot = document.querySelector(".run-grid .bot");
    if (bot) bot.setAttribute("class", `bot bot-${o.stars >= 2 ? "happy" : o.stars === 0 ? "sad" : "ok"}`);
    document.getElementById("run-actions").innerHTML = `<button class="btn btn-primary" data-act="review">SEE RESULTS ▶</button>`;
    document.querySelector('[data-act="review"]').focus();
  }

  function recordResult() {
    const l = state.level;
    const o = state.outcome;
    const sc = o.scores;
    const score = Math.round((sc.outcome + sc.safety + sc.cost + sc.speed) * 25);
    const prev = best(l.id);
    const newBest = score > prev.score;
    save.levels[l.id] = { stars: Math.max(prev.stars, o.stars), score: Math.max(prev.score, score) };
    const newCards = [];
    (l.cards || []).forEach((cid, idx) => {
      const need = idx === 0 ? 2 : 3;
      if (o.stars >= need && !save.cards.includes(cid)) { save.cards.push(cid); newCards.push(cid); }
    });
    persist();
    const lowest = save.scores.length < 5 ? 0 : save.scores[save.scores.length - 1].s;
    state.result = { score, newBest, newCards, canEnter: score > lowest, entered: false, unlockedNext: prev.stars < 1 && o.stars >= 1 };
  }

  function barHtml(label, v) {
    const cls = v < 40 ? "low" : v < 70 ? "mid" : "";
    return `<div class="bar-row"><span>${label}</span><div class="bar ${cls}"><span style="width:${v}%"></span></div><span>${v}</span></div>`;
  }

  function screenReview() {
    const l = state.level;
    const o = state.outcome;
    if (!state.result) recordResult();
    const r = state.result;
    const note = o.notes && Object.keys(o.notes).map((k) => Object.values(state.picks).includes(k) ? o.notes[k] : null).find(Boolean);
    const cardIds = l.cards || [];
    const cardsHtml = cardIds.map((cid, idx) => {
      const c = cardById(cid);
      if (!c) return "";
      return save.cards.includes(cid) ? cardHtml(c, r.newCards.includes(cid)) : downCardHtml(idx === 0 ? "Get 2 stars to unlock" : "Get 3 stars for the bonus card");
    }).join("");
    const nextIdx = LEVELS.indexOf(l) + 1;
    const nextBtn = nextIdx < LEVELS.length && isUnlocked(nextIdx)
      ? `<button class="btn btn-primary" data-act="brief" data-id="${LEVELS[nextIdx].id}">NEXT LEVEL ▶</button>`
      : nextIdx >= LEVELS.length && bossUnlocked() ? `<button class="btn btn-primary" data-act="boss">BOSS LEVEL ▶</button>` : "";
    const entry = r.canEnter && !r.entered ? `
      <form class="initials" id="initials">
        <label for="ini">NEW HIGH SCORE! ENTER INITIALS</label>
        <input id="ini" maxlength="3" autocomplete="off" pattern="[A-Za-z0-9]{1,3}" required>
        <button class="btn" type="submit">SAVE</button>
      </form>` : "";
    show(`
      <section>
        <div class="verdict ${o.stars === 0 ? "fail" : ""}">
          <div class="kicker">LEVEL ${l.number} · RESULT</div>
          <h1>${esc(o.title)}</h1>
          ${starsHtml(o.stars)}
          <div class="total">SCORE <b>${pad(r.score, 5)}</b></div>
          ${r.newBest ? `<div class="newbest">NEW PERSONAL BEST FOR THIS LEVEL</div>` : ""}
          ${r.unlockedNext && nextIdx <= LEVELS.length ? `<div class="newbest">${nextIdx < LEVELS.length ? `LEVEL ${LEVELS[nextIdx].number}` : "BOSS LEVEL"} UNLOCKED</div>` : ""}
          ${entry}
        </div>
        <div class="review-grid">
          <div class="panel">
            <h3>SCORECARD</h3>
            <div class="bars">
              ${barHtml("OUTCOME", o.scores.outcome)}
              ${barHtml("SAFETY", o.scores.safety)}
              ${barHtml("COST", o.scores.cost)}
              ${barHtml("SPEED", o.scores.speed)}
            </div>
          </div>
          <div class="panel lesson">
            <h3>${o.stars >= 3 ? "WHY IT WORKED" : "WHAT WENT WRONG"}</h3>
            <p>${esc(o.lesson)}</p>
            ${note ? `<p class="note">${esc(note)}</p>` : ""}
          </div>
        </div>
        <div class="panel" style="margin-top:18px">
          <h3>USE-CASE CARDS FROM THIS LEVEL</h3>
          <div class="deck" style="margin-top:12px">${cardsHtml}</div>
        </div>
        <div class="btn-row">
          ${nextBtn}
          <button class="btn" data-act="retry">TRY ANOTHER BUILD</button>
          <button class="btn" data-act="levels">LEVEL SELECT</button>
        </div>
      </section>`);
  }

  function cardHtml(c, isNew) {
    return `
      <article class="card ${isNew ? "new" : ""}">
        <span class="fnc">${esc(c.fn.toUpperCase())}${isNew ? " · NEW!" : ""}</span>
        <h3>${esc(c.title.toUpperCase())}</h3>
        <p style="margin:0">${esc(c.job)}</p>
        <dl>
          <div><dt>Suits</dt><dd>${esc(c.suits)}</dd></div>
          <div><dt>Tools</dt><dd>${esc(c.tools)}</dd></div>
          <div><dt>Main risk</dt><dd>${esc(c.risk)}</dd></div>
          <div><dt>Guardrail</dt><dd>${esc(c.guardrail)}</dd></div>
          <div><dt>Try this on Monday</dt><dd class="prompt">${esc(c.prompt)}</dd></div>
        </dl>
        <button class="btn copy" data-act="copy" data-text="${esc(c.prompt)}">COPY PROMPT</button>
      </article>`;
  }
  function downCardHtml(why) {
    return `<article class="card down"><span class="q">?</span><span class="why">${esc(why)}</span></article>`;
  }

  function screenDeck() {
    const all = [];
    LEVELS.forEach((l) => (l.cards || []).forEach((cid, idx) => {
      const c = cardById(cid);
      if (!c) return;
      all.push(save.cards.includes(cid) ? cardHtml(c, false) : downCardHtml(`Level ${l.number}: ${idx === 0 ? "2 stars" : "3 stars"}`));
    }));
    const mine = save.boss ? `
      <article class="card" style="border-color:var(--green)">
        <span class="fnc">YOUR BUSINESS · BOSS LEVEL</span>
        <h3>${esc(save.boss.name.toUpperCase())}</h3>
        <p style="margin:0">${esc(save.boss.job)}</p>
        <dl>
          <div><dt>Tools</dt><dd>${esc(save.boss.tools.join(", ") || "None chosen")}</dd></div>
          <div><dt>Guardrails</dt><dd>${esc(save.boss.guards.join("; ") || "None chosen")}</dd></div>
        </dl>
        <button class="btn copy" data-act="boss">OPEN YOUR SPEC</button>
      </article>` : downCardHtml("Boss level: design your own agent");
    show(`
      <section>
        <div class="kicker">USE-CASE DECK · ${save.cards.length}/${CARDS.length} COLLECTED</div>
        <h2>Agent ideas to take back to work</h2>
        <p class="muted">Every card is a real job an agent can do, with the risk to watch and a prompt to try. Earn them by playing the levels.</p>
        <div class="deck">${all.join("")}${mine}</div>
        <div class="btn-row"><button class="btn" data-act="levels">LEVEL SELECT</button><button class="btn" data-act="title">TITLE</button></div>
      </section>`);
  }

  // ---------- Boss level: design your own agent ----------
  const BOSS_TOOLS = ["Email", "Calendar", "CRM", "Accounting software", "Spreadsheets", "Web search", "Shared drive / documents", "Team chat", "Ticket system", "Payments"];
  const BOSS_GUARDS = [
    "Drafts only; a person sends",
    "Never move money without approval",
    "Log every action with a reason",
    "Cite a source for every fact",
    "Judge people on skills and experience only",
    "Escalate to a person when unsure",
    "Only use the data the job needs"
  ];
  const TRIGGERS = ["When I ask it to", "Every morning", "Every week", "When something happens (a new email, ticket, invoice...)"];

  function screenBoss() {
    const b = save.boss || { role: "Founder", name: "", job: "", trigger: TRIGGERS[0], tools: [], context: "", risk: "", guards: [], checkpoint: "" };
    const checks = (list, chosen, name) => list.map((t, i) =>
      `<label><input type="checkbox" name="${name}" value="${esc(t)}" ${chosen.includes(t) ? "checked" : ""} id="${name}-${i}"> ${esc(t)}</label>`).join("");
    show(`
      <section>
        <div class="kicker">BOSS LEVEL · ${esc(BOSS.title)}</div>
        <h1>Hire an agent for your own business</h1>
        <p class="muted">Use everything from Levels 1 to 7. Describe a real, recurring job from your work, and the game turns it into an Agent Spec you can build after the course. Nothing you type leaves your browser.</p>
        <form class="panel boss-form" id="boss-form">
          <div class="field"><label for="b-role">YOUR ROLE</label>
            <select id="b-role" name="role">${["Founder", "Operator", "Career professional"].map((r) => `<option ${b.role === r ? "selected" : ""}>${r}</option>`).join("")}</select></div>
          <div class="field"><label for="b-name">NAME YOUR AGENT</label>
            <input type="text" id="b-name" name="name" maxlength="40" required placeholder="e.g. Friday Report Bot" value="${esc(b.name)}"></div>
          <div class="field"><label for="b-job">JOB DESCRIPTION</label>
            <p class="help">What, by when, and what good looks like. (Level 1)</p>
            <textarea id="b-job" name="job" maxlength="600" required placeholder="e.g. Every Friday, pull this week's sales from the CRM and write a one-page summary for the team: wins, losses and deals at risk.">${esc(b.job)}</textarea></div>
          <div class="field"><label for="b-trigger">WHEN DOES IT RUN?</label>
            <select id="b-trigger" name="trigger">${TRIGGERS.map((t) => `<option ${b.trigger === t ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></div>
          <div class="field"><span class="legend">TOOLS</span>
            <p class="help">Only what the job needs. (Levels 2 and 3)</p>
            <div class="checks">${checks(BOSS_TOOLS, b.tools, "tools")}</div></div>
          <div class="field"><label for="b-context">CONTEXT IT NEEDS</label>
            <p class="help">What it must know to do the job well, and nothing more. (Level 3)</p>
            <textarea id="b-context" name="context" maxlength="400" placeholder="e.g. Our sales stages, last quarter's numbers, and the team's targets.">${esc(b.context)}</textarea></div>
          <div class="field"><label for="b-risk">WHAT COULD GO WRONG?</label>
            <textarea id="b-risk" name="risk" maxlength="400" placeholder="e.g. Sharing deal values with the wrong people.">${esc(b.risk)}</textarea></div>
          <div class="field"><span class="legend">GUARDRAILS</span>
            <p class="help">Rules that cover the real risk. (Levels 4 and 6)</p>
            <div class="checks">${checks(BOSS_GUARDS, b.guards, "guards")}</div></div>
          <div class="field"><label for="b-check">HUMAN CHECKPOINT</label>
            <p class="help">Where must it stop and ask you? Put it at the point of risk. (Levels 5 and 7)</p>
            <input type="text" id="b-check" name="checkpoint" maxlength="200" placeholder="e.g. Before the summary is posted to the team channel" value="${esc(b.checkpoint)}"></div>
          <div class="btn-row" style="margin-top:0"><button class="btn btn-primary" type="submit">GENERATE AGENT SPEC ▶</button></div>
        </form>
        <div id="boss-result"></div>
        <div class="btn-row"><button class="btn" data-act="levels">LEVEL SELECT</button></div>
      </section>`);
    if (save.boss) renderBossResult(save.boss, false);
  }

  function readBossForm(form) {
    const fd = new FormData(form);
    return {
      role: fd.get("role"), name: String(fd.get("name") || "").trim(), job: String(fd.get("job") || "").trim(),
      trigger: fd.get("trigger"), tools: fd.getAll("tools"), context: String(fd.get("context") || "").trim(),
      risk: String(fd.get("risk") || "").trim(), guards: fd.getAll("guards"), checkpoint: String(fd.get("checkpoint") || "").trim()
    };
  }

  function assessBoss(b) {
    const fb = [];
    const add = (ok, good, bad) => fb.push(ok ? { ok: true, t: good } : { ok: false, t: bad });
    add(b.job.length >= 60, "Clear, specific job description.", "Be more specific: say what, by when, and what good looks like.");
    add(b.tools.length >= 1, "It has tools, so it can act, not just chat.", "No tools: it can only chat. Pick what it needs to act.");
    if (b.tools.length >= 1) add(b.tools.length <= 4, "A focused toolkit: least privilege.", "That's a lot of access. Give it only the tools the job needs.");
    add(b.context.length >= 15, "It knows the context it needs.", "No context: it will guess. Say what it needs to know.");
    add(b.risk.length >= 10, "You've named the main risk.", "Name what could go wrong, so your rules can cover it.");
    add(b.guards.length >= 1, "Guardrails set.", "No guardrails. Add at least one rule that covers the real risk.");
    add(b.checkpoint.length >= 10, "A human checkpoint where it matters.", "No checkpoint. Where must it stop and ask you?");
    if (b.tools.includes("Payments")) add(b.guards.includes("Never move money without approval"), "Money only moves with your approval.", "It can make payments with no approval rule. Remember Level 5.");
    if (b.tools.includes("Email") && !b.guards.includes("Drafts only; a person sends")) fb.push({ ok: false, t: "It can send email. Consider 'drafts only' unless sending is the job." });
    const warns = fb.filter((f) => !f.ok).length;
    const stars = warns === 0 ? 3 : warns <= 2 ? 2 : 1;
    const score = Math.round((fb.filter((f) => f.ok).length / fb.length) * 9500);
    return { fb, stars, score };
  }

  function specText(b) {
    const list = (a) => (a.length ? a.map((x) => `- ${x}`).join("\n") : "- (none chosen)");
    const prompt = [
      `You are ${b.name}, an AI agent working for a ${b.role.toLowerCase()}.`,
      `Your job: ${b.job}`,
      `When to run: ${b.trigger.toLowerCase()}.`,
      b.tools.length ? `Use only these tools: ${b.tools.join(", ")}.` : "",
      b.context ? `Context you have: ${b.context}` : "",
      b.guards.length ? `Rules you must always follow: ${b.guards.join("; ")}.` : "",
      b.checkpoint ? `Stop and ask me for approval at this point: ${b.checkpoint}.` : "",
      "Log what you did and why, and tell me if anything is unclear rather than guessing."
    ].filter(Boolean).join("\n");
    return `# Agent Spec: ${b.name}

Owner: ${b.role}
Built in: Hire Your First Agent (High Intent Labs)

## The job
${b.job}

## When it runs
${b.trigger}

## Tools
${list(b.tools)}

## Context it needs
${b.context || "(not set)"}

## Main risk
${b.risk || "(not set)"}

## Guardrails
${list(b.guards)}

## Human checkpoint
${b.checkpoint || "(not set)"}

## Starter prompt
${prompt}
`;
  }

  function renderBossResult(b, fresh) {
    const a = assessBoss(b);
    if (fresh) {
      const prevScore = save.boss ? save.boss.score : 0;
      const prevStars = save.boss ? save.boss.stars : 0;
      save.boss = Object.assign({}, b, { stars: Math.max(prevStars, a.stars), score: Math.max(prevScore, a.score) });
      persist();
      updateHud();
    }
    const out = document.getElementById("boss-result");
    out.innerHTML = `
      <div class="verdict" style="margin-top:28px">
        <div class="kicker">SPEC REVIEW</div>
        <h1>${a.stars === 3 ? "BOSS DEFEATED!" : a.stars === 2 ? "NEARLY THERE" : "KEEP BUILDING"}</h1>
        ${starsHtml(a.stars)}
        <div class="total">SCORE <b>${pad(a.score, 5)}</b></div>
      </div>
      <div class="review-grid">
        <div class="panel"><h3>REVIEW</h3><ul class="feedback">${a.fb.map((f) => `<li class="${f.ok ? "ok" : "warn"}">${esc(f.t)}</li>`).join("")}</ul></div>
        <div class="panel"><h3>YOUR AGENT SPEC</h3><div class="spec" id="spec">${esc(specText(b))}</div>
          <div class="btn-row"><button class="btn" data-act="copy-spec">COPY</button><button class="btn" data-act="download-spec">DOWNLOAD .MD</button></div></div>
      </div>`;
    if (fresh) out.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  // ---------- Clipboard and download ----------
  function copyText(text, btn) {
    const done = () => { if (btn) { const o = btn.textContent; btn.textContent = "COPIED!"; setTimeout(() => { btn.textContent = o; }, 1400); } };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    ta.remove();
  }

  // ---------- Events ----------
  const actions = {
    title: screenTitle,
    levels: screenLevels,
    deck: screenDeck,
    boss: screenBoss,
    brief: (d) => screenBrief(d.id),
    build: screenBuild,
    pick: (d, el) => {
      state.picks[d.slot] = d.opt;
      el.closest(".options").querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-pressed", String(b === el)));
      refreshBuildBar();
    },
    run: () => { if (buildReady()) { state.result = null; screenRun(); } },
    skip: () => { state.skip = true; },
    review: screenReview,
    retry: () => { state.result = null; screenBuild(); },
    copy: (d, el) => copyText(d.text, el),
    "copy-spec": (d, el) => copyText(specText(save.boss), el),
    "download-spec": () => {
      const blob = new Blob([specText(save.boss)], { type: "text/markdown" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${(save.boss.name || "agent").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-spec.md`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    const fn = actions[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el.dataset, el); }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "initials") {
      e.preventDefault();
      const v = document.getElementById("ini").value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
      if (!v) return;
      save.scores.push({ i: v.padEnd(3, " "), s: state.result.score, l: String(state.level.number) });
      save.scores.sort((a, b) => b.s - a.s);
      save.scores = save.scores.slice(0, 5);
      persist();
      state.result.entered = true;
      e.target.outerHTML = `<div class="newbest">SAVED TO THE HIGH SCORE TABLE</div>`;
    }
    if (e.target.id === "boss-form") {
      e.preventDefault();
      const b = readBossForm(e.target);
      if (!b.name || !b.job) return;
      renderBossResult(b, true);
    }
  });

  // Expose a small hook for testing outcome coverage from the console.
  window.HYFA = { LEVELS, resolveOutcome };

  screenTitle();
})();
