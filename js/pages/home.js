/* ============================================================
   HOME PAGE v3
   ============================================================ */
function renderHome() {
  document.getElementById('page-home').innerHTML = `
    <div class="stagger">
      <!-- HERO -->
      <div style="margin-bottom:52px;padding-bottom:40px;border-bottom:1px solid var(--border2);">
        <div class="section-tag" style="margin-bottom:20px;">AI/ML Engineer Track &mdash; Bangalore, India</div>

        <!-- ANIMATED TITLE -->
        <div class="hero-title-wrap" style="margin-bottom:24px;">
          <span class="hero-title-main" data-text="HACK THE FUTURE">HACK THE FUTURE</span>
          <span class="hero-title-ghost" aria-hidden="true">HACK THE FUTURE</span>
          <span class="hero-title-ghost2" aria-hidden="true">HACK THE FUTURE</span>
        </div>

        <div style="font-family:var(--font-display);font-size:clamp(13px,2vw,18px);letter-spacing:8px;
                    color:var(--text-dim);text-transform:uppercase;margin-bottom:28px;line-height:1;">
          AI / ML &nbsp;&nbsp;·&nbsp;&nbsp; DEEP LEARNING &nbsp;&nbsp;·&nbsp;&nbsp; DATA SCIENCE
        </div>

        <p style="font-size:16px;color:var(--text-dim);max-width:560px;line-height:1.8;margin-bottom:36px;font-family:var(--font-body);">
          A complete 90-day engineering pipeline — from Python fundamentals to production AI systems.
          Built for freshers targeting top Bangalore tech companies.
        </p>

        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" onclick="Router.go('roadmap')">
            <span>&#9655;</span> Start Roadmap
          </button>
          <button class="btn btn-cyan btn-lg" onclick="Router.go('ide')">
            <span>&lt;/&gt;</span> Open IDE
          </button>
          <button class="btn btn-ghost btn-lg" onclick="Router.go('projects')">
            &#9632; View Projects
          </button>
        </div>
      </div>

      <!-- STATS ROW -->
      <div class="grid-4 mb-32" style="max-width:720px;">
        <div class="stat-box">
          <span class="stat-num" style="color:var(--cyan);text-shadow:var(--cyan-glow-sm);">${weeksCompleted()}</span>
          <span class="stat-label">/ 12 Weeks</span>
          <div class="prog-track" style="margin-top:10px;"><div class="prog-fill" style="width:${Math.round(weeksCompleted()/12*100)}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-num" style="color:var(--primary);text-shadow:var(--primary-glow-sm);">${problemsSolved()}</span>
          <span class="stat-label">Problems Solved</span>
          <div class="prog-track" style="margin-top:10px;"><div class="prog-fill" style="width:${Math.round(problemsSolved()/200*100)}%"></div></div>
        </div>
        <div class="stat-box">
          <span class="stat-num" style="color:var(--amber);text-shadow:var(--amber-glow-sm);">${STATE.xp}</span>
          <span class="stat-label">Total XP</span>
        </div>
        <div class="stat-box">
          <span class="stat-num" style="color:var(--violet);text-shadow:var(--violet-glow-sm);">${(STATE.timerSessions||[]).length}</span>
          <span class="stat-label">Focus Sessions</span>
        </div>
      </div>

      <!-- SKILL PROGRESS -->
      <div class="section-tag">Skill Progress</div>
      <div class="grid-auto mt-16 mb-32" id="homeProgressCards"></div>

      <!-- TERMINAL -->
      <div class="terminal" style="max-width:680px;">
        <div class="terminal-bar">
          <span class="terminal-dot dot-red"></span>
          <span class="terminal-dot dot-yellow"></span>
          <span class="terminal-dot dot-green"></span>
          <span class="terminal-title">martial@aiml-academy:~</span>
        </div>
        <div class="terminal-body">
          <div class="prompt">whoami</div>
          <div class="output">AIML Engineer (In Training) &mdash; Bangalore, India</div>
          <div class="prompt">python3 -c "import this" | head -1</div>
          <div class="output info">The Zen of Python, by Tim Peters</div>
          <div class="prompt">ls ~/projects/</div>
          <div class="output">rag_bot/&nbsp;&nbsp; drone_detection/&nbsp;&nbsp; edge_impulse/&nbsp;&nbsp; livekit_agent/</div>
          <div class="prompt">ollama list | grep bge</div>
          <div class="output success">bge-m3:latest &nbsp;&nbsp; 1.2GB &nbsp;&nbsp; 3 days ago</div>
          <div class="prompt" style="display:inline;"><span class="typing-cursor">&nbsp;</span></div>
        </div>
      </div>
    </div>`;
  renderHomeProgress();
}

function renderHomeProgress() {
  const container = document.getElementById('homeProgressCards');
  if (!container) return;
  const groups = [...new Set(ALL_PROBLEMS.map(p => p.group))];
  const items = [
    ...groups.map(g => {
      const gProbs = ALL_PROBLEMS.filter(p => p.group === g);
      const done = gProbs.filter(p => STATE.solved[p.id]).length;
      const pct  = Math.round((done/gProbs.length)*100);
      return { label:g, done, total:gProbs.length, pct, color:'' };
    }),
    { label:'Roadmap Weeks', done:weeksCompleted(), total:12, pct:Math.round(weeksCompleted()/12*100), color:'amber' }
  ];
  container.innerHTML = items.map(it => `
    <div class="card" style="padding:18px;">
      <div class="card-label">${it.label}</div>
      <div style="font-family:var(--font-display);font-size:26px;font-weight:900;color:var(--primary);margin:4px 0 10px;">
        ${it.done}<span style="font-size:13px;color:var(--text-dim);font-family:var(--font-mono);">/${it.total}</span>
      </div>
      <div class="prog-label"><span>progress</span><span>${it.pct}%</span></div>
      <div class="prog-track"><div class="prog-fill ${it.color}" style="width:${it.pct}%"></div></div>
    </div>`).join('');
}
