/* ============================================================
   PAGES/TIMER.JS — Focus Timer
   ============================================================ */

let timerSecs    = 25 * 60;
let timerTotal   = 25 * 60;
let timerRunning = false;
let timerInt     = null;
let timerLabel   = 'FOCUS SESSION';

function renderTimer() {
  document.getElementById('page-timer').innerHTML = `
    <div class="section-header">
      <div class="section-tag">FOCUS PROTOCOL</div>
      <h2 class="section-title">TIMER</h2>
      <p class="section-sub">Set time by complexity, or define custom. Every session earns XP.</p>
    </div>

    <div class="grid-2" style="max-width:900px;gap:24px;">

      <!-- CLOCK DISPLAY -->
      <div class="card" style="display:flex;flex-direction:column;align-items:center;padding:40px 20px;gap:20px;">
        <div style="font-size:10px;color:var(--text-dim);letter-spacing:3px;" id="timerLabelDisplay">FOCUS SESSION</div>

        <!-- CIRCULAR PROGRESS -->
        <div style="position:relative;width:200px;height:200px;">
          <svg width="200" height="200" style="position:absolute;top:0;left:0;transform:rotate(-90deg);">
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--surface2)" stroke-width="6"/>
            <circle id="timerCircle" cx="100" cy="100" r="88" fill="none"
              stroke="var(--green)" stroke-width="6"
              stroke-dasharray="${2 * Math.PI * 88}"
              stroke-dashoffset="0"
              style="transition:stroke-dashoffset .5s linear;filter:drop-shadow(0 0 6px var(--green));"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div id="clockDisplay2" style="font-family:var(--font-crt);font-size:52px;color:var(--green);
                 text-shadow:var(--green-glow);line-height:1;letter-spacing:2px;">25:00</div>
            <div id="timerStatus" style="font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-top:4px;">READY</div>
          </div>
        </div>

        <!-- CONTROLS -->
        <div style="display:flex;gap:12px;">
          <button class="btn btn-primary" onclick="startTimer()">[ START ]</button>
          <button class="btn btn-amber" onclick="pauseTimer()">[ PAUSE ]</button>
          <button class="btn btn-ghost" onclick="resetTimer()">[ RESET ]</button>
        </div>

        <div style="font-size:12px;color:var(--text-dim);">
          Sessions today: <span id="timerSessCount" style="color:var(--green);font-family:var(--font-mono);">${(STATE.timerSessions||[]).filter(s=>s.date===today()).length}</span>
        </div>
      </div>

      <!-- CONFIG -->
      <div class="card">
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:12px;">AUTO COMPLEXITY</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;" id="complexityBtns">
            <button class="complexity-btn" data-mins="15" data-label="EASY // 15MIN" onclick="setComplexity(this,15,'EASY // 15MIN')">
              <span style="color:var(--green);">EASY</span><br/>
              <span style="font-size:10px;color:var(--text-dim);">15 min</span>
            </button>
            <button class="complexity-btn active" data-mins="25" data-label="MEDIUM // 25MIN" onclick="setComplexity(this,25,'MEDIUM // 25MIN')">
              <span style="color:var(--amber);">MEDIUM</span><br/>
              <span style="font-size:10px;color:var(--text-dim);">25 min</span>
            </button>
            <button class="complexity-btn" data-mins="45" data-label="HARD // 45MIN" onclick="setComplexity(this,45,'HARD // 45MIN')">
              <span style="color:var(--red);">HARD</span><br/>
              <span style="font-size:10px;color:var(--text-dim);">45 min</span>
            </button>
          </div>
        </div>

        <hr class="divider"/>

        <div style="margin-bottom:20px;">
          <div style="font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:12px;">CUSTOM TIME</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <input type="number" class="input input-num" id="customMins" value="25" min="1" max="180"/>
            <span style="color:var(--text-dim);font-size:13px;">min</span>
            <button class="btn btn-secondary btn-sm" onclick="setCustomTime()">SET</button>
          </div>
        </div>

        <hr class="divider"/>

        <!-- SESSION LOG -->
        <div>
          <div style="font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:12px;">SESSION LOG</div>
          <div id="timerSessionLog" style="display:flex;flex-direction:column;gap:6px;max-height:180px;overflow-y:auto;">
            ${renderSessionLog()}
          </div>
        </div>
      </div>
    </div>
  `;

  applyComplexityStyles();
}

function setComplexity(btn, mins, label) {
  timerLabel = label;
  timerSecs  = mins * 60;
  timerTotal = mins * 60;
  if (!timerRunning) {
    updateTimerDisplay();
  }
  document.getElementById('timerLabelDisplay').textContent = label;
  qsa('.complexity-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyComplexityStyles();
}

function applyComplexityStyles() {
  qsa('.complexity-btn').forEach(b => {
    const active = b.classList.contains('active');
    b.style.padding = '10px 8px';
    b.style.border = `1px solid ${active ? 'var(--green)' : 'var(--border2)'}`;
    b.style.background = active ? 'var(--green-ghost)' : 'var(--surface2)';
    b.style.borderRadius = 'var(--radius)';
    b.style.cursor = 'pointer';
    b.style.fontFamily = 'var(--font-mono)';
    b.style.fontSize = '12px';
    b.style.textAlign = 'center';
    b.style.transition = 'all .2s';
    b.style.boxShadow = active ? 'var(--green-glow-sm)' : 'none';
  });
}

function setCustomTime() {
  const mins = parseInt(document.getElementById('customMins').value) || 25;
  timerSecs  = mins * 60;
  timerTotal = mins * 60;
  timerLabel = `CUSTOM // ${mins}MIN`;
  if (!timerRunning) updateTimerDisplay();
  document.getElementById('timerLabelDisplay').textContent = timerLabel;
  qsa('.complexity-btn').forEach(b => b.classList.remove('active'));
  applyComplexityStyles();
  toast(`Timer set to ${mins} minutes`, 'cyan');
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById('timerStatus').textContent = 'RUNNING';
  document.getElementById('timerStatus').style.color = 'var(--green)';

  timerInt = setInterval(() => {
    timerSecs--;
    updateTimerDisplay();
    if (timerSecs <= 0) {
      clearInterval(timerInt);
      timerRunning = false;
      completeSession();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInt);
  timerRunning = false;
  document.getElementById('timerStatus').textContent = 'PAUSED';
  document.getElementById('timerStatus').style.color = 'var(--amber)';
}

function resetTimer() {
  clearInterval(timerInt);
  timerRunning = false;
  timerSecs = timerTotal;
  updateTimerDisplay();
  document.getElementById('timerStatus').textContent = 'READY';
  document.getElementById('timerStatus').style.color = 'var(--text-dim)';
}

function completeSession() {
  document.getElementById('timerStatus').textContent = 'COMPLETE';
  document.getElementById('timerStatus').style.color = 'var(--green)';

  const session = {
    label: timerLabel,
    duration: Math.round(timerTotal / 60),
    date: today(),
    timestamp: new Date().toLocaleTimeString()
  };
  STATE.timerSessions = STATE.timerSessions || [];
  STATE.timerSessions.unshift(session);
  saveState();

  addXP(50, `⏱ Completed ${session.duration}min focus session`);
  toast('Focus session complete! +50 XP', 'green');

  document.getElementById('timerSessCount').textContent =
    STATE.timerSessions.filter(s => s.date === today()).length;
  document.getElementById('timerSessionLog').innerHTML = renderSessionLog();
}

function updateTimerDisplay() {
  const m = Math.floor(timerSecs / 60);
  const s = timerSecs % 60;
  const display = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const el = document.getElementById('clockDisplay2');
  if (el) el.textContent = display;

  // Circle
  const circle = document.getElementById('timerCircle');
  if (circle && timerTotal > 0) {
    const ratio = timerSecs / timerTotal;
    const circ  = 2 * Math.PI * 88;
    circle.style.strokeDashoffset = circ * (1 - ratio);
    circle.style.stroke = ratio < 0.1 ? 'var(--red)' : ratio < 0.25 ? 'var(--amber)' : 'var(--green)';
    circle.style.filter = `drop-shadow(0 0 6px ${ratio < 0.1 ? 'var(--red)' : ratio < 0.25 ? 'var(--amber)' : 'var(--green)'})`;
  }
}

function renderSessionLog() {
  const sessions = (STATE.timerSessions || []).slice(0, 8);
  if (!sessions.length) return `<div style="font-size:12px;color:var(--text-dim);">No sessions yet.</div>`;
  return sessions.map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;
                padding:7px 10px;background:var(--surface2);border:1px solid var(--border2);font-size:11px;">
      <span style="color:var(--green);">${s.label}</span>
      <span style="color:var(--text-dim);">${s.duration}min · ${s.timestamp}</span>
    </div>
  `).join('');
}
