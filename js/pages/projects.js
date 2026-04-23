/* ============================================================
   PROJECTS PAGE v3 — Full details, mini projects, GitHub links
   ============================================================ */
function renderProjects() {
  const totalWeeks = weeksCompleted();
  document.getElementById('page-projects').innerHTML = `
    <div class="section-header">
      <div class="section-tag">Build Real Things</div>
      <h2 class="section-title" style="margin-bottom:8px;">PROJECTS</h2>
      <p class="section-sub" style="margin-bottom:32px;">8 capstone projects + 12 weekly mini projects. Unlock capstones by completing roadmap weeks.</p>
    </div>

    <!-- CAPSTONE PROJECTS -->
    <div class="section-tag" style="margin-bottom:16px;">Capstone Projects</div>
    <div class="grid-auto stagger" id="projectsGrid" style="margin-bottom:48px;"></div>

    <!-- WEEKLY MINI PROJECTS -->
    <div class="section-tag" style="margin-bottom:16px;">Weekly Mini Projects</div>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:20px;font-family:var(--font-body);">
      Quick 2–4 hour projects to reinforce each week's learning. Solution links point to GitHub/Replit.
    </p>
    <div class="grid-auto stagger" id="miniProjectsGrid"></div>

    <!-- PROJECT DETAIL MODAL -->
    <div id="projectModal" style="display:none;position:fixed;inset:0;z-index:700;
         background:rgba(0,0,0,0.92);backdrop-filter:blur(10px);align-items:center;justify-content:center;overflow-y:auto;">
      <div id="projectModalContent" style="background:var(--surface);border:1px solid var(--border3);
           width:min(760px,96vw);margin:40px auto;border-radius:var(--radius-lg);
           box-shadow:0 0 60px rgba(79,140,255,0.12);overflow:hidden;"></div>
    </div>
  `;

  renderCapstoneCards(totalWeeks);
  renderMiniProjectCards();
}

function renderCapstoneCards(totalWeeks) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => {
    const isUnlocked = totalWeeks >= p.unlockWeek;
    const isDone     = !!STATE.solved[`proj_${i}`];
    return `
      <div class="card" style="${isUnlocked?'':'opacity:.5;'} cursor:pointer;position:relative;"
           onclick="${isUnlocked?`openProjectDetail(${i})`:''}">
        ${!isUnlocked?`<div style="position:absolute;top:12px;right:12px;font-size:16px;opacity:.4;">🔒</div>`:''}
        ${isDone?`<div style="position:absolute;top:12px;right:12px;color:var(--green);font-size:16px;">✓</div>`:''}
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--cyan);letter-spacing:2px;margin-bottom:6px;">${p.phase}</div>
        <div style="font-family:var(--font-display);font-size:14px;color:var(--text-bright);margin-bottom:8px;line-height:1.3;">${p.title}</div>
        <div style="font-size:12px;color:var(--text-dim);line-height:1.7;margin-bottom:12px;">${p.desc}</div>
        <div class="tag-list" style="margin-bottom:12px;">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--border2);">
          <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--amber);">+${p.xp} XP</span>
            ${isUnlocked?`<span style="font-size:10px;color:var(--primary);font-family:var(--font-mono);">Click for details →</span>`
              :`<span style="font-size:10px;color:var(--text-dim);font-family:var(--font-mono);">Unlock at Week ${p.unlockWeek}</span>`}
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderMiniProjectCards() {
  const grid = document.getElementById('miniProjectsGrid');
  grid.innerHTML = MINI_PROJECTS.map((mp, i) => {
    const weekDone = !!STATE.weeks[mp.week];
    return `
      <div class="card" style="padding:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-family:var(--font-mono);font-size:9px;color:var(--violet);letter-spacing:2px;">WEEK ${String(mp.week).padStart(2,'0')}</span>
          ${weekDone?`<span style="color:var(--green);font-size:11px;">✓ Week done</span>`:''}
        </div>
        <div style="font-family:var(--font-display);font-size:12px;color:var(--text-bright);margin-bottom:6px;">${mp.title}</div>
        <div style="font-size:12px;color:var(--text-dim);line-height:1.6;margin-bottom:10px;">${mp.desc}</div>
        <div class="tag-list" style="margin-bottom:12px;">${mp.tags.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
        <a href="${mp.solution_url}" target="_blank"
           style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);
                  font-size:11px;color:var(--primary);border:1px solid rgba(79,140,255,0.3);
                  padding:4px 12px;border-radius:var(--radius);transition:all .15s;"
           onmouseover="this.style.background='rgba(79,140,255,0.1)'" onmouseout="this.style.background=''">
          ↗ View Solution / Reference
        </a>
      </div>`;
  }).join('');
}

function openProjectDetail(i) {
  const p = PROJECTS[i];
  const isDone = !!STATE.solved[`proj_${i}`];
  const modal  = document.getElementById('projectModal');
  document.getElementById('projectModalContent').innerHTML = `
    <!-- HEADER -->
    <div style="padding:24px 28px;border-bottom:1px solid var(--border2);background:var(--surface2);
                display:flex;align-items:flex-start;justify-content:space-between;">
      <div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--cyan);letter-spacing:3px;margin-bottom:6px;">${p.phase}</div>
        <div style="font-family:var(--font-display);font-size:20px;color:var(--text-bright);letter-spacing:1px;">${p.title}</div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center;">
          <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--amber);">+${p.xp} XP</span>
        </div>
      </div>
      <button onclick="closeProjectModal()" style="font-size:24px;color:var(--text-dim);cursor:pointer;background:none;border:none;line-height:1;padding:0 4px;">&times;</button>
    </div>

    <!-- BODY -->
    <div style="padding:28px;">
      <!-- FULL DESCRIPTION -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--primary);letter-spacing:2px;margin-bottom:10px;">WHAT YOU'LL BUILD</div>
      <div style="font-size:14px;color:var(--text);line-height:1.9;white-space:pre-line;margin-bottom:24px;font-family:var(--font-body);">${p.full_desc}</div>

      <!-- REQUIREMENTS -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--primary);letter-spacing:2px;margin-bottom:10px;">REQUIREMENTS</div>
      <div class="tag-list" style="margin-bottom:24px;">${(p.requirements||[]).map(r=>`<span class="tech-tag" style="font-size:12px;padding:4px 10px;">${r}</span>`).join('')}</div>

      <!-- SETUP -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--primary);letter-spacing:2px;margin-bottom:10px;">SETUP COMMANDS</div>
      <div style="background:var(--code-bg);border:1px solid var(--border2);border-radius:var(--radius);
                  padding:16px 18px;margin-bottom:24px;font-family:'Share Tech Mono',monospace;font-size:12px;
                  line-height:1.8;color:var(--code-string);white-space:pre-wrap;">${p.setup||'See README in project repo'}</div>

      <!-- TECH STACK -->
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--primary);letter-spacing:2px;margin-bottom:10px;">TECH STACK</div>
      <div class="tag-list" style="margin-bottom:28px;">${p.tech.map(t=>`<span class="tech-tag" style="font-size:12px;padding:4px 12px;">${t}</span>`).join('')}</div>

      <!-- ACTIONS -->
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding-top:20px;border-top:1px solid var(--border2);">
        <a href="${p.github_solution||'https://github.com'}" target="_blank"
           class="btn btn-primary">↗ View Reference Solution</a>
        <button class="btn ${isDone?'btn-ghost':'btn-cyan'}" onclick="markProjectDone(${i})">
          ${isDone?'✓ Completed':'Mark as Complete'}
        </button>
        <button class="btn btn-ghost" onclick="Router.go('ide')">Open IDE to Code</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

function markProjectDone(i) {
  const p = PROJECTS[i];
  STATE.solved[`proj_${i}`] = true;
  addXP(p.xp, `🛠 Completed: ${p.title}`);
  saveState();
  toast(`Project complete! +${p.xp} XP`, 'green');
  closeProjectModal();
  renderProjects();
}
