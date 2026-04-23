/* ============================================================
   PROGRESS PAGE v3
   ============================================================ */
function renderProgress() {
  const groups=[...new Set(ALL_PROBLEMS.map(p=>p.group))];
  document.getElementById('page-progress').innerHTML=`
    <div class="section-tag">Activity Tracker</div>
    <h2 class="section-title" style="margin-bottom:8px;">PROGRESS</h2>
    <p class="section-sub" style="margin-bottom:32px;">Every action logged. Your GitHub-style journey to AIML Engineer.</p>

    <!-- HEATMAP -->
    <div style="margin-bottom:40px;">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:14px;">ACTIVITY HEATMAP — LAST 84 DAYS</div>
      <div id="heatmapGrid" style="display:grid;grid-template-columns:repeat(84,1fr);gap:2px;max-width:100%;"></div>
      <div style="display:flex;align-items:center;gap:5px;margin-top:8px;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);">
        LESS ${[0,1,2,3,4].map(l=>`<div style="width:10px;height:10px;flex-shrink:0;background:${heatColor(l)};border-radius:1px;"></div>`).join('')} MORE
      </div>
    </div>

    <!-- SKILL BREAKDOWN -->
    <div style="margin-bottom:40px;">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:16px;">SKILL BREAKDOWN</div>
      <div style="max-width:680px;display:flex;flex-direction:column;gap:14px;">
        ${groups.map((g,i)=>{
          const gProbs=ALL_PROBLEMS.filter(p=>p.group===g);
          const done=gProbs.filter(p=>STATE.solved[p.id]).length;
          const pct=Math.round((done/gProbs.length)*100);
          const colors=['','violet','amber','','violet','amber',''];
          return `<div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span style="font-family:var(--font-body);font-size:14px;font-weight:500;color:var(--text);">${g}</span>
              <span style="font-family:var(--font-mono);font-size:12px;color:var(--primary);">${done}/${gProbs.length} &nbsp; ${pct}%</span>
            </div>
            <div class="prog-track" style="height:4px;"><div class="prog-fill ${colors[i]||''}" style="width:${pct}%"></div></div>
          </div>`;
        }).join('')}
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-family:var(--font-body);font-size:14px;font-weight:500;color:var(--text);">Roadmap Weeks</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--primary);">${weeksCompleted()}/12 &nbsp; ${Math.round(weeksCompleted()/12*100)}%</span>
          </div>
          <div class="prog-track" style="height:4px;"><div class="prog-fill amber" style="width:${Math.round(weeksCompleted()/12*100)}%"></div></div>
        </div>
      </div>
    </div>

    <!-- ACHIEVEMENTS -->
    <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:16px;">ACHIEVEMENTS</div>
    <div class="grid-auto stagger" id="achievementsGrid" style="margin-bottom:40px;"></div>

    <!-- ACTIVITY LOG -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;">ACTIVITY LOG</div>
      <button class="btn btn-danger btn-sm" onclick="confirmReset()">Reset All Data</button>
    </div>
    <div id="activityLog" style="display:flex;flex-direction:column;gap:6px;max-height:500px;overflow-y:auto;"></div>
  `;
  renderHeatmap();
  renderAchievements();
  renderActivityLog();
}

function heatColor(l){
  return ['var(--surface2)','rgba(79,140,255,0.15)','rgba(79,140,255,0.35)','rgba(79,140,255,0.6)','var(--primary)'][Math.min(l,4)];
}

function renderHeatmap(){
  const grid=document.getElementById('heatmapGrid');
  if(!grid)return;
  const cells=[];
  for(let i=83;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const key=d.toISOString().split('T')[0];
    const count=STATE.heatmap?.[key]||0;
    const level=count===0?0:count<=2?1:count<=4?2:count<=6?3:4;
    cells.push(`<div class="heatmap-cell" data-tip="${key}: ${count}"
      style="aspect-ratio:1;border-radius:1px;cursor:pointer;background:${heatColor(level)};
             animation-delay:${(83-i)*4}ms;transition:transform .1s;
             ${count>0?`box-shadow:0 0 4px ${heatColor(level)}80;`:''}"
      onmouseover="this.style.transform='scale(1.5)'"
      onmouseout="this.style.transform='scale(1)'">
    </div>`);
  }
  grid.innerHTML=cells.join('');
}

function renderAchievements(){
  const grid=document.getElementById('achievementsGrid');
  if(!grid)return;
  grid.innerHTML=ACHIEVEMENTS.map(a=>{
    const earned=!!STATE.achievements[a.id];
    return `<div class="card" style="padding:16px;${earned?'border-color:rgba(245,158,11,0.4);background:rgba(245,158,11,0.03);':'filter:grayscale(.7);opacity:.5;'}">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="font-family:var(--font-display);font-size:22px;color:${earned?'var(--amber)':'var(--text-dim)'};">${a.icon}</div>
        <div style="flex:1;">
          <div style="font-family:var(--font-display);font-size:12px;color:${earned?'var(--text-bright)':'var(--text-dim)'};letter-spacing:.5px;">${a.name}</div>
          <div style="font-size:12px;color:var(--text-dim);margin-top:3px;font-family:var(--font-body);">${a.desc}</div>
        </div>
        ${earned?'<span style="color:var(--amber);font-size:14px;">★</span>':''}
      </div>
    </div>`;
  }).join('');
}

function renderActivityLog(){
  const container=document.getElementById('activityLog');
  if(!container)return;
  if(!STATE.activityLog?.length){
    container.innerHTML=`<div style="font-size:14px;color:var(--text-dim);padding:12px 0;font-family:var(--font-body);">No activity yet. Start solving problems!</div>`;
    return;
  }
  container.innerHTML=STATE.activityLog.slice(0,50).map(a=>`
    <div style="display:flex;align-items:center;gap:12px;padding:11px 16px;
                background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius);">
      <div style="width:6px;height:6px;border-radius:50%;background:var(--primary);box-shadow:var(--primary-glow-sm);flex-shrink:0;"></div>
      <div style="flex:1;font-size:13px;font-family:var(--font-body);">${escHtml(a.text)}</div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--amber);flex-shrink:0;">+${a.xp}</div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);flex-shrink:0;">${a.time}</div>
    </div>`).join('');
}

function confirmReset(){
  showModal('⚠ CONFIRM RESET',
    '<div style="color:var(--red);font-size:15px;line-height:1.7;">This permanently deletes ALL progress, XP, solved problems, timer sessions, and achievements. This cannot be undone.</div>',
    ()=>resetState());
}
