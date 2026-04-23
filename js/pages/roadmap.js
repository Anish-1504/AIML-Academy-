/* ============================================================
   ROADMAP PAGE v3 — Collapsible phases, expandable week cards
   ============================================================ */
const PHASE_OPEN = {};

function renderRoadmap() {
  const totalW = ROADMAP.reduce((a,p) => a + p.weeks.length, 0);
  const done   = weeksCompleted();
  const pct    = Math.round((done/totalW)*100);

  const PHASE_COLORS = {
    cyan:   { accent:'var(--cyan)',   glow:'var(--cyan-glow-sm)',   border:'rgba(0,212,255,0.35)'   },
    green:  { accent:'var(--primary)', glow:'var(--primary-glow-sm)', border:'rgba(79,140,255,0.35)' },
    amber:  { accent:'var(--amber)',  glow:'var(--amber-glow-sm)',  border:'rgba(245,158,11,0.35)'  },
  };

  document.getElementById('page-roadmap').innerHTML = `
    <div class="section-tag">3-Month Training Protocol</div>
    <h2 class="section-title" style="margin-bottom:6px;">ROADMAP</h2>
    <p class="section-sub" style="margin-bottom:28px;">Click a phase header to expand it. Click the circle on a week card to mark complete.</p>

    <!-- OVERALL PROGRESS -->
    <div style="display:flex;align-items:center;gap:16px;max-width:640px;margin-bottom:40px;
                padding:16px 20px;background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius-lg);">
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px;">
          <span style="font-family:var(--font-mono);color:var(--text-dim);letter-spacing:1px;">OVERALL COMPLETION</span>
          <span style="font-family:var(--font-display);font-size:14px;color:var(--cyan);">${done} / ${totalW} weeks</span>
        </div>
        <div class="prog-track" style="height:5px;">
          <div class="prog-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div style="font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--cyan);
                  text-shadow:var(--cyan-glow-sm);white-space:nowrap;">${pct}%</div>
    </div>

    <!-- PHASES -->
    <div style="display:flex;flex-direction:column;gap:16px;">
      ${ROADMAP.map(phase => {
        const pc = PHASE_COLORS[phase.color] || PHASE_COLORS.cyan;
        const phaseDone = phase.weeks.filter(w => STATE.weeks[w.num]).length;
        const phasePct  = Math.round((phaseDone/phase.weeks.length)*100);
        const isOpen    = !!PHASE_OPEN[phase.phase];
        return `
        <div class="phase-block" id="phase-${phase.phase}" style="border:1px solid var(--border2);border-radius:var(--radius-lg);overflow:hidden;">
          <!-- PHASE HEADER — clickable -->
          <div onclick="togglePhase(${phase.phase})" style="
            display:flex;align-items:center;gap:20px;padding:20px 24px;
            background:var(--surface2);cursor:pointer;
            border-left:3px solid ${pc.accent};
            transition:background var(--t-fast);
            user-select:none;"
            onmouseover="this.style.background='var(--surface3)'"
            onmouseout="this.style.background='var(--surface2)'">
            <div style="flex:1;min-width:0;">
              <div style="font-family:var(--font-mono);font-size:10px;color:${pc.accent};letter-spacing:3px;margin-bottom:4px;text-transform:uppercase;">${phase.label}</div>
              <div style="font-family:var(--font-display);font-size:17px;color:var(--text-bright);letter-spacing:1px;">${phase.title}</div>
            </div>
            <div style="display:flex;align-items:center;gap:20px;flex-shrink:0;">
              <div style="text-align:right;">
                <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">${phase.duration}</div>
                <div style="font-family:var(--font-display);font-size:14px;color:${pc.accent};margin-top:2px;">${phaseDone}/${phase.weeks.length} &nbsp;<span style="font-size:11px;color:var(--text-dim);">weeks</span></div>
              </div>
              <!-- mini progress ring -->
              <div style="position:relative;width:44px;height:44px;flex-shrink:0;">
                <svg width="44" height="44" style="transform:rotate(-90deg);">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="var(--surface3)" stroke-width="3"/>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="${pc.accent}" stroke-width="3"
                    stroke-dasharray="${2*Math.PI*18}"
                    stroke-dashoffset="${2*Math.PI*18*(1-phasePct/100)}"
                    style="transition:stroke-dashoffset .6s;filter:drop-shadow(0 0 4px ${pc.accent})"/>
                </svg>
                <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
                            font-family:var(--font-mono);font-size:9px;color:${pc.accent};">${phasePct}%</div>
              </div>
              <div style="font-size:18px;color:var(--text-dim);transition:transform .25s;transform:rotate(${isOpen?'90':'0'}deg);" id="arrow-${phase.phase}">&#9658;</div>
            </div>
          </div>

          <!-- WEEK GRID — collapsible -->
          <div id="phase-weeks-${phase.phase}" style="display:${isOpen?'block':'none'};padding:20px 24px;background:var(--surface);">
            <div class="grid-auto stagger">
              ${phase.weeks.map(w => {
                const isDone = !!STATE.weeks[w.num];
                return `
                <div class="card" id="week-card-${w.num}"
                  style="padding:18px;${isDone?`border-color:${pc.border};background:rgba(79,140,255,0.03);`:''}"
                  onclick="openWeekDetail(${phase.phase},${w.num})">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
                    <div>
                      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:4px;">WEEK ${String(w.num).padStart(2,'0')}</div>
                      <div style="font-family:var(--font-display);font-size:13px;color:var(--text-bright);line-height:1.3;">${w.title}</div>
                    </div>
                    <button onclick="event.stopPropagation();toggleWeek(${w.num},${w.xp})"
                      style="width:30px;height:30px;border-radius:50%;border:2px solid ${isDone?pc.accent:'var(--border2)'};
                             background:${isDone?pc.accent+'22':'transparent'};
                             color:${isDone?pc.accent:'var(--text-dim)'};
                             font-size:13px;cursor:pointer;transition:all .2s;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
                      ${isDone?'✓':'○'}
                    </button>
                  </div>
                  <div class="tag-list" style="margin-bottom:12px;">
                    ${w.topics.map(t=>`<span class="tech-tag">${t}</span>`).join('')}
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--border2);">
                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">+${w.xp} XP</span>
                    <button onclick="event.stopPropagation();window.open('${w.resources?.[0]||'#'}','_blank')"
                      class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 10px;">Docs ↗</button>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- WEEK DETAIL MODAL AREA -->
    <div id="weekDetailModal" style="display:none;position:fixed;inset:0;z-index:700;background:rgba(0,0,0,0.9);backdrop-filter:blur(8px);align-items:center;justify-content:center;">
      <div id="weekDetailContent" style="background:var(--surface);border:1px solid var(--border3);width:min(700px,94vw);max-height:88vh;overflow-y:auto;border-radius:var(--radius-lg);box-shadow:0 0 60px rgba(79,140,255,0.15);">
      </div>
    </div>
  `;
}

function togglePhase(phaseNum) {
  PHASE_OPEN[phaseNum] = !PHASE_OPEN[phaseNum];
  const el    = document.getElementById(`phase-weeks-${phaseNum}`);
  const arrow = document.getElementById(`arrow-${phaseNum}`);
  if (el)    el.style.display    = PHASE_OPEN[phaseNum] ? 'block' : 'none';
  if (arrow) arrow.style.transform = PHASE_OPEN[phaseNum] ? 'rotate(90deg)' : 'rotate(0deg)';
}

function openWeekDetail(phaseNum, weekNum) {
  const phase = ROADMAP.find(p => p.phase === phaseNum);
  const week  = phase?.weeks.find(w => w.num === weekNum);
  if (!week) return;
  const PHASE_COLORS = { cyan:'var(--cyan)', green:'var(--primary)', amber:'var(--amber)' };
  const accent = PHASE_COLORS[phase.color] || 'var(--primary)';
  const isDone = !!STATE.weeks[week.num];

  const modal = document.getElementById('weekDetailModal');
  document.getElementById('weekDetailContent').innerHTML = `
    <div style="padding:24px 28px;border-bottom:1px solid var(--border2);background:var(--surface2);display:flex;align-items:flex-start;justify-content:space-between;">
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;color:${accent};letter-spacing:3px;margin-bottom:4px;">${phase.label} &mdash; WEEK ${String(week.num).padStart(2,'0')}</div>
        <div style="font-family:var(--font-display);font-size:20px;color:var(--text-bright);letter-spacing:1px;">${week.title}</div>
      </div>
      <button onclick="closeWeekDetail()" style="color:var(--text-dim);font-size:24px;padding:0 6px;cursor:pointer;background:none;border:none;line-height:1;">&times;</button>
    </div>
    <div style="padding:28px;">
      <!-- TOPICS -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:3px;margin-bottom:12px;">TOPICS COVERED</div>
      <div class="tag-list" style="margin-bottom:28px;">
        ${week.topics.map(t=>`<span class="tech-tag" style="font-size:12px;padding:4px 12px;">${t}</span>`).join('')}
      </div>

      <!-- WHAT YOU'LL LEARN -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:3px;margin-bottom:12px;">WHAT YOU'LL BUILD THIS WEEK</div>
      <div style="background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius-lg);padding:18px;margin-bottom:28px;font-size:14px;line-height:1.8;color:var(--text);">
        ${getWeekDescription(week.num)}
      </div>

      <!-- RESOURCES -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:3px;margin-bottom:12px;">RESOURCES</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:28px;">
        ${(week.resources||[]).map(r=>`
          <a href="${r}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:12px 16px;
            background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius);
            font-family:var(--font-mono);font-size:12px;color:var(--primary);transition:all .15s;"
            onmouseover="this.style.borderColor='var(--primary-dim)'" onmouseout="this.style.borderColor='var(--border2)'">
            ↗ ${r}
          </a>`).join('')}
      </div>

      <!-- ACTIONS -->
      <div style="display:flex;gap:12px;align-items:center;">
        <button class="btn btn-${isDone?'ghost':'primary'}" onclick="toggleWeek(${week.num},${week.xp});closeWeekDetail();renderRoadmap();">
          ${isDone ? '✓ Mark Incomplete' : '○ Mark Complete  +'+week.xp+' XP'}
        </button>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">Duration: 1 week &mdash; ~8–12 hrs</span>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function closeWeekDetail() {
  document.getElementById('weekDetailModal').style.display = 'none';
}

function getWeekDescription(num) {
  const desc = {
    1:  "Set up your dev environment, master Python syntax, write functions, loops, and build a CLI calculator. Complete 5 LeetCode easy problems.",
    2:  "Deep dive into Python's built-in data structures. Build a phonebook app using dicts, implement a stack/queue with lists. Master comprehensions.",
    3:  "Build a full OOP project — a Library Management System. Cover inheritance, decorators, context managers, and async basics.",
    4:  "Implement matrix operations with NumPy, visualise derivatives with Matplotlib, run statistics on a real dataset. Watch 3Blue1Brown's LA series.",
    5:  "Load, clean, and analyse the Zomato Bangalore dataset. Practice merging, groupby, pivots, and missing-data handling.",
    6:  "Build publication-quality charts. Reproduce 5 real-world visualisations from scratch. Create an interactive Plotly dashboard.",
    7:  "Implement Linear Regression, Logistic Regression, Decision Tree from scratch. Then use sklearn. Compare performance on Titanic dataset.",
    8:  "Run K-Means on customer data, apply PCA for dimensionality reduction, tune a Random Forest with GridSearchCV. Interpret feature importance.",
    9:  "Build a digit classifier with Keras, implement backprop by hand, experiment with activations and optimisers. Reach >98% on MNIST.",
    10: "Detect objects in real images with YOLOv8, fine-tune a BERT model on a custom NLP task, and build a HuggingFace pipeline.",
    11: "Containerise your ML model with Docker, serve it with FastAPI, track experiments with MLflow, and set up a GitHub Actions CI pipeline.",
    12: "Solve 30 LeetCode problems (arrays, trees, DP). Practice 20 ML theory interview questions. Polish your resume and do 2 mock interviews.",
  };
  return desc[num] || "Detailed curriculum for this week — practice problems, mini-projects, and resources included.";
}

function toggleWeek(num, xp) {
  if (STATE.weeks[num]) {
    delete STATE.weeks[num];
    saveState();
    toast(`Week ${num} marked incomplete`, 'amber');
  } else {
    STATE.weeks[num] = true;
    addXP(xp, `✅ Completed Week ${num}`);
    showModal(`WEEK ${String(num).padStart(2,'0')} — COMPLETE`,
      `<span style="color:var(--green);">+${xp} XP earned.</span><br/><br/>Consistency is your biggest competitive advantage. Keep the streak going.`, null);
  }
  renderRoadmap();
  renderHome();
}
