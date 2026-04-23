/* ============================================================
   IDE v4 — HackerRank-inspired layout
   Execution priority: Local Server (3001) → Piston API → Error
   ============================================================ */

let currentProblem   = null;
let solTimerInterval = null;
let solTimerSecs     = 120;
let solUnlocked      = false;
let solPaused        = false;
let ideTimerRunning  = false;
let ideTimerInterval = null;
let ideTimerSecs     = 0;
let serverOnline     = false;
let activeTab        = 'output'; // 'output' | 'solution' | 'hint'

/* Check if local server is running on load */
async function checkLocalServer() {
  try {
    const r = await fetch('http://localhost:3001/status', { signal: AbortSignal.timeout(1500) });
    if (r.ok) {
      const d = await r.json();
      serverOnline = d.ok && !!d.python;
      updateServerBadge(serverOnline, d.python ? d.version : null);
      return serverOnline;
    }
  } catch(e) {}
  serverOnline = false;
  updateServerBadge(false, null);
  return false;
}

function updateServerBadge(online, version) {
  const badge = document.getElementById('serverBadge');
  if (!badge) return;
  if (online) {
    badge.innerHTML = `<span style="color:var(--green);">● LOCAL</span> <span style="color:var(--text-dim);font-size:10px;">${version||'Python'}</span>`;
    badge.title = 'Local server running — real Python execution';
  } else {
    badge.innerHTML = `<span style="color:var(--amber);">● REMOTE</span> <span style="color:var(--text-dim);font-size:10px;">Piston API</span>`;
    badge.title = 'Using Piston API. Run server.js for local execution.';
  }
}

/* =================== RENDER =================== */
function renderIDE() {
  const page = document.getElementById('page-ide');
  page.innerHTML = `
  <!-- ═══ LAYOUT: SIDEBAR | PROBLEM + EDITOR | PANEL ═══ -->
  <div style="display:grid;grid-template-columns:260px 1fr 340px;height:calc(100vh - var(--topbar-h));overflow:hidden;">

    <!-- ══ COL 1: PROBLEM LIST ══ -->
    <div style="background:var(--surface);border-right:1px solid var(--border2);display:flex;flex-direction:column;overflow:hidden;">
      <!-- Header -->
      <div style="padding:12px 14px;background:var(--surface2);border-bottom:1px solid var(--border2);flex-shrink:0;">
        <div style="font-family:var(--font-display);font-size:11px;color:var(--primary);letter-spacing:2px;margin-bottom:8px;">PROBLEMS</div>
        <input id="searchProblems" class="input" style="font-size:12px;padding:5px 9px;margin-bottom:6px;" placeholder="🔍  Search..." oninput="filterProblems(this.value)"/>
        <div style="display:flex;gap:4px;">
          <button id="tabAll"      onclick="filterByType('all')"       style="flex:1;padding:4px;font-family:var(--font-mono);font-size:9px;border:1px solid var(--border2);background:var(--primary-ghost);color:var(--primary);cursor:pointer;letter-spacing:1px;border-radius:2px;">ALL</button>
          <button id="tabCoding"   onclick="filterByType('coding')"    style="flex:1;padding:4px;font-family:var(--font-mono);font-size:9px;border:1px solid var(--border2);background:transparent;color:var(--text-dim);cursor:pointer;letter-spacing:1px;border-radius:2px;">CODE</button>
          <button id="tabInterview" onclick="filterByType('interview')" style="flex:1;padding:4px;font-family:var(--font-mono);font-size:9px;border:1px solid var(--border2);background:transparent;color:var(--text-dim);cursor:pointer;letter-spacing:1px;border-radius:2px;">INTERVIEW</button>
        </div>
      </div>
      <!-- Problem list -->
      <div style="overflow-y:auto;flex:1;" id="problemList">${buildProblemList(ALL_PROBLEMS)}</div>
      <!-- Footer stats -->
      <div style="padding:8px 14px;border-top:1px solid var(--border2);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);">${problemsSolved()}/${ALL_PROBLEMS.length} solved</span>
        <span id="serverBadge" style="font-family:var(--font-mono);font-size:10px;cursor:help;">● checking...</span>
      </div>
    </div>

    <!-- ══ COL 2: PROBLEM STATEMENT + EDITOR + OUTPUT ══ -->
    <div style="display:flex;flex-direction:column;overflow:hidden;background:var(--void);">

      <!-- Problem statement bar -->
      <div id="problemStatement" style="padding:14px 20px;border-bottom:1px solid var(--border2);background:var(--surface);flex-shrink:0;max-height:190px;overflow-y:auto;">
        <div style="color:var(--text-dim);font-size:14px;font-style:italic;">← Select a problem to begin</div>
      </div>

      <!-- Editor toolbar (HackerRank style) -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;
                  height:38px;background:var(--surface2);border-bottom:1px solid var(--border2);flex-shrink:0;">
        <!-- Left: file info + language -->
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="terminal-dot dot-red"></span>
          <span class="terminal-dot dot-yellow"></span>
          <span class="terminal-dot dot-green"></span>
          <span id="editorFilename" style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-left:4px;">solution.py</span>
          <span style="background:rgba(79,140,255,0.1);border:1px solid rgba(79,140,255,0.25);
                       color:var(--primary);font-family:var(--font-mono);font-size:10px;
                       padding:1px 8px;border-radius:2px;letter-spacing:1px;">Python 3</span>
        </div>
        <!-- Right: actions -->
        <div style="display:flex;align-items:center;gap:6px;">
          <!-- Stopwatch -->
          <div style="display:flex;align-items:center;gap:4px;padding:3px 8px;
                      background:var(--code-bg);border:1px solid var(--border2);border-radius:2px;">
            <span id="ideTimerDisplay" style="font-family:var(--font-crt);font-size:20px;color:var(--amber);min-width:44px;">00:00</span>
            <button onclick="toggleIdeTimer()" id="ideTimerBtn" title="Start/Pause stopwatch"
              style="font-size:13px;color:var(--text-dim);background:none;border:none;cursor:pointer;padding:0 2px;line-height:1;">▶</button>
            <button onclick="resetIdeTimer()" title="Reset stopwatch"
              style="font-size:12px;color:var(--text-dim);background:none;border:none;cursor:pointer;padding:0 2px;line-height:1;">↺</button>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="clearEditor()" title="Clear editor" style="font-size:11px;">✕ Clear</button>
          <button class="btn btn-amber btn-sm" onclick="showHint()" style="font-size:11px;">💡 Hint</button>
          <button class="btn btn-primary" onclick="runCode()" id="runBtn"
            style="font-size:12px;padding:5px 18px;font-weight:700;letter-spacing:1px;">▶  RUN</button>
        </div>
      </div>

      <!-- Code editor (clean flex layout) -->
      <div class="editor-wrapper" style="flex:1;display:flex;overflow:hidden;min-height:0;background:var(--code-bg);">
        <!-- Line numbers (left) -->
        <div id="lineNumbers" class="line-numbers"
          style="width:45px;padding:10px 8px;background:rgba(0,0,0,0.3);color:var(--text-dim);
                 text-align:right;user-select:none;pointer-events:none;border-right:1px solid var(--border);
                 font-family:'Share Tech Mono',monospace;font-size:13.5px;line-height:1.8;overflow:hidden;
                 white-space:pre;flex-shrink:0;"></div>
        <!-- Code editor textarea (right) -->
        <textarea id="codeEditor" spellcheck="false" autocorrect="off" autocapitalize="off"
          style="flex:1;padding:10px 16px;background:transparent;color:var(--cyan);caret-color:var(--cyan);
                 font-family:'Share Tech Mono',monospace;font-size:13.5px;line-height:1.8;
                 border:none;outline:none;resize:none;tab-size:4;white-space:pre;overflow:auto;"
          onkeydown="handleEditorKey(event)"
          oninput="syncEditor(this)"
          onscroll="syncLineNumbers(this)"
          placeholder="# Select a problem from the sidebar..."></textarea>
      </div>

      <!-- Output / Test Results area -->
      <div style="height:190px;border-top:1px solid var(--border2);flex-shrink:0;display:flex;flex-direction:column;background:var(--code-bg);">
        <!-- Tabs (like HackerRank) -->
        <div style="display:flex;align-items:center;background:var(--surface2);border-bottom:1px solid var(--border2);flex-shrink:0;">
          <button onclick="switchOutputTab('output')" id="outTabOutput"
            style="padding:7px 16px;font-family:var(--font-mono);font-size:11px;letter-spacing:1px;
                   border:none;background:var(--code-bg);color:var(--text);cursor:pointer;
                   border-bottom:2px solid var(--primary);border-right:1px solid var(--border2);">
            OUTPUT
          </button>
          <button onclick="switchOutputTab('testcase')" id="outTabTestcase"
            style="padding:7px 16px;font-family:var(--font-mono);font-size:11px;letter-spacing:1px;
                   border:none;background:transparent;color:var(--text-dim);cursor:pointer;
                   border-bottom:2px solid transparent;border-right:1px solid var(--border2);">
            TEST CASES
          </button>
          <div style="flex:1;"></div>
          <div id="execInfo" style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);padding:0 14px;"></div>
        </div>
        <!-- Tab content -->
        <div style="flex:1;overflow-y:auto;padding:10px 16px;" id="outputPanel">
          <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;">Click RUN to execute your code...</span>
        </div>
      </div>

    </div><!-- end col2 -->

    <!-- ══ COL 3: PROBLEM DETAIL + SOLUTION PANEL ══ -->
    <div style="background:var(--surface);border-left:1px solid var(--border2);display:flex;flex-direction:column;overflow:hidden;">

      <!-- Tabs (Description / Solution) -->
      <div style="display:flex;background:var(--surface2);border-bottom:1px solid var(--border2);flex-shrink:0;">
        <button onclick="switchRightTab('desc')" id="rTabDesc"
          style="flex:1;padding:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:1px;
                 border:none;background:var(--surface2);color:var(--text);cursor:pointer;
                 border-bottom:2px solid var(--primary);">
          DESCRIPTION
        </button>
        <button onclick="switchRightTab('solution')" id="rTabSolution"
          style="flex:1;padding:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:1px;
                 border:none;background:transparent;color:var(--text-dim);cursor:pointer;
                 border-bottom:2px solid transparent;">
          SOLUTION 🔒
        </button>
      </div>

      <!-- Description panel -->
      <div id="rightPanelDesc" style="flex:1;overflow-y:auto;padding:18px;display:block;">
        <div style="color:var(--text-dim);font-size:14px;font-family:var(--font-body);font-style:italic;line-height:1.8;">
          Select a problem from the sidebar.<br/><br/>
          The full description, constraints, and examples will appear here.
        </div>
      </div>

      <!-- Solution panel (hidden initially) -->
      <div id="rightPanelSolution" style="flex:1;overflow-y:auto;padding:18px;display:none;">
        <div id="solPanel">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;gap:14px;color:var(--text-dim);text-align:center;">
            <div style="font-size:32px;opacity:.25;">🔒</div>
            <div style="font-size:14px;font-family:var(--font-body);">Select a problem first</div>
          </div>
        </div>
      </div>

      <!-- Solution timer footer -->
      <div style="border-top:1px solid var(--border2);padding:10px 16px;background:var(--surface2);flex-shrink:0;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);">SOLUTION UNLOCKS IN</span>
          <span id="solTimerDisplay" style="font-family:var(--font-crt);font-size:22px;color:var(--amber);">2:00</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button id="solPauseBtn" onclick="pauseSolTimer()" class="btn btn-amber btn-sm" style="font-size:11px;padding:3px 10px;display:none;">⏸</button>
          <button onclick="forceUnlockSol()" class="btn btn-violet btn-sm" style="font-size:11px;padding:3px 10px;">Unlock Now</button>
        </div>
      </div>

    </div><!-- end col3 -->

  </div><!-- end grid -->
  `;
  page.innerHTML += `
  <div class="ide-demo">
    <h3>Demo Code Runner</h3>

    <textarea id="demoCode" placeholder="Write Python code here..."></textarea>

    <button class="btn btn-primary" onclick="runDemo()" style="margin-top:10px;">Run Code</button>

    <pre id="demoOutput"></pre>
  </div>
`;
  initEditor();
  checkLocalServer();
}

/* =================== TAB SWITCHING =================== */
function switchOutputTab(tab) {
  const tabs = { output:'outTabOutput', testcase:'outTabTestcase' };
  Object.entries(tabs).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.background    = key === tab ? 'var(--code-bg)' : 'transparent';
    el.style.color         = key === tab ? 'var(--text)'    : 'var(--text-dim)';
    el.style.borderBottom  = key === tab ? '2px solid var(--primary)' : '2px solid transparent';
  });
  if (tab === 'testcase') {
    document.getElementById('outputPanel').innerHTML = buildTestCases();
  }
}

function switchRightTab(tab) {
  const desc = document.getElementById('rightPanelDesc');
  const sol  = document.getElementById('rightPanelSolution');
  const btnD = document.getElementById('rTabDesc');
  const btnS = document.getElementById('rTabSolution');
  if (tab === 'desc') {
    desc.style.display = 'block'; sol.style.display = 'none';
    if(btnD){ btnD.style.borderBottom='2px solid var(--primary)'; btnD.style.color='var(--text)'; }
    if(btnS){ btnS.style.borderBottom='2px solid transparent'; btnS.style.color='var(--text-dim)'; }
  } else {
    desc.style.display = 'none'; sol.style.display = 'block';
    if(btnS){ btnS.style.borderBottom='2px solid var(--primary)'; btnS.style.color='var(--text)'; }
    if(btnD){ btnD.style.borderBottom='2px solid transparent'; btnD.style.color='var(--text-dim)'; }
  }
}

function buildTestCases() {
  if (!currentProblem || !currentProblem.examples) {
    return '<div style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;">No test cases for this problem.</div>';
  }
  return `
    <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:8px;letter-spacing:2px;">SAMPLE TEST CASES</div>
    <pre style="font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--code-string);line-height:1.8;white-space:pre-wrap;">${escHtml(currentProblem.examples)}</pre>`;
}

/* =================== PROBLEM LIST =================== */
function buildProblemList(problems) {
  const groups = [...new Set(problems.map(p => p.group))];
  return groups.map(g => {
    const items = problems.filter(p => p.group === g);
    if (!items.length) return '';
    const solved = items.filter(p => STATE.solved[p.id]).length;
    return `
      <div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text-dim);
                    padding:8px 14px 4px;text-transform:uppercase;letter-spacing:2px;
                    display:flex;justify-content:space-between;align-items:center;
                    background:rgba(0,0,0,0.2);">
          <span>${g}</span>
          <span style="color:${solved===items.length?'var(--green)':'var(--text-dim)'};">${solved}/${items.length}</span>
        </div>
        ${items.map(p => {
          const done = !!STATE.solved[p.id];
          const isIV = p.type === 'interview';
          const diffColor = p.diff==='easy'?'var(--green)':p.diff==='medium'?'var(--amber)':'var(--red)';
          return `
            <div class="prob-row" id="pr-${p.id}" onclick="loadProblem('${p.id}')"
              style="display:flex;align-items:center;padding:8px 14px;cursor:pointer;
                     border-left:2px solid ${done?'var(--green)':'transparent'};
                     transition:background .1s;gap:8px;"
              onmouseover="this.style.background='var(--surface2)'"
              onmouseout="this.style.background=''"
              title="${p.problem}">
              <!-- Difficulty dot -->
              <div style="width:7px;height:7px;border-radius:50%;background:${diffColor};flex-shrink:0;
                          box-shadow:0 0 5px ${diffColor}80;"></div>
              <!-- Name -->
              <span style="font-family:var(--font-body);font-size:12px;font-weight:500;flex:1;
                           color:${done?'var(--green)':'var(--text)'};
                           white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</span>
              <!-- Badges -->
              <div style="display:flex;align-items:center;gap:3px;flex-shrink:0;">
                ${isIV?`<span style="font-size:8px;color:var(--violet);font-family:var(--font-mono);padding:1px 5px;border:1px solid rgba(168,85,247,.3);border-radius:1px;">IV</span>`:''}
                ${done?`<span style="color:var(--green);font-size:11px;font-weight:bold;">✓</span>`:''}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }).join('');
}

function filterProblems(q) {
  const filtered = q.trim()
    ? ALL_PROBLEMS.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.group.toLowerCase().includes(q.toLowerCase()) ||
        p.problem.toLowerCase().includes(q.toLowerCase()))
    : ALL_PROBLEMS;
  const list = document.getElementById('problemList');
  if (list) list.innerHTML = buildProblemList(filtered) ||
    '<div style="padding:16px;font-size:12px;color:var(--text-dim);">No results found.</div>';
}

let _typeFilter = 'all';
function filterByType(type) {
  _typeFilter = type;
  // Update tab button styles
  ['all','coding','interview'].forEach(t => {
    const btn = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (!btn) return;
    const active = t === type;
    btn.style.background = active ? 'var(--primary-ghost)' : 'transparent';
    btn.style.color = active ? 'var(--primary)' : 'var(--text-dim)';
    btn.style.borderColor = active ? 'rgba(79,140,255,.4)' : 'var(--border2)';
  });
  const filtered = type === 'all' ? ALL_PROBLEMS : ALL_PROBLEMS.filter(p => p.type === type);
  const list = document.getElementById('problemList');
  if (list) list.innerHTML = buildProblemList(filtered);
}

/* =================== LOAD PROBLEM =================== */
function loadProblem(id) {
  const p = ALL_PROBLEMS.find(pr => pr.id === id);
  if (!p) return;
  currentProblem = p;

  // Highlight active row
  document.querySelectorAll('.prob-row').forEach(el => el.style.background = '');
  const activeRow = document.getElementById(`pr-${id}`);
  if (activeRow) activeRow.style.background = 'var(--surface2)';

  // Update problem statement strip (top of editor column)
  document.getElementById('problemStatement').innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
      <span style="font-family:var(--font-display);font-size:14px;color:var(--text-bright);">${p.problem}</span>
      <span class="badge badge-${p.diff}">${p.diff}</span>
      ${p.type==='interview'?'<span class="badge badge-ai">Interview</span>':''}
      <span style="margin-left:auto;font-family:var(--font-mono);font-size:11px;color:var(--amber);">+${p.xp} XP</span>
    </div>
    <div style="font-size:13px;color:var(--text-dim);line-height:1.7;font-family:var(--font-body);white-space:pre-line;">${escHtml(p.desc)}</div>`;

  // Update right panel description
  document.getElementById('rightPanelDesc').innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:8px;">PROBLEM</div>
      <div style="font-family:var(--font-display);font-size:15px;color:var(--text-bright);margin-bottom:10px;">${p.problem}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
        <span class="badge badge-${p.diff}">${p.diff.toUpperCase()}</span>
        ${p.type==='interview'?'<span class="badge badge-ai">INTERVIEW</span>':'<span class="badge badge-cyan">CODING</span>'}
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--amber);margin-left:auto;">+${p.xp} XP</span>
      </div>
    </div>
    <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:8px;">DESCRIPTION</div>
    <div style="font-size:13px;color:var(--text);line-height:1.8;font-family:var(--font-body);white-space:pre-line;margin-bottom:16px;">${escHtml(p.desc)}</div>
    ${p.examples ? `
    <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:8px;">EXAMPLES</div>
    <div style="background:var(--code-bg);border:1px solid var(--border2);padding:12px;border-radius:var(--radius);font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--code-string);line-height:1.8;white-space:pre-wrap;">${escHtml(p.examples)}</div>` : ''}
    <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border2);font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:8px;">HINT</div>
    <div style="font-size:13px;color:var(--text-dim);font-family:var(--font-body);line-height:1.7;background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,0.15);padding:10px 12px;border-radius:var(--radius);">💡 ${escHtml(p.hint)}</div>
  `;

  // Load starter code into editor
  const ta = document.getElementById('codeEditor');
  if (ta) { ta.value = p.starter; syncEditor(ta); }

  document.getElementById('editorFilename').textContent = `${p.id}.py`;

  // Reset output area
  document.getElementById('outputPanel').innerHTML =
    '<span style="color:var(--text-dim);font-family:var(--font-mono);font-size:12px;">Click ▶ RUN to execute your code...</span>';
  document.getElementById('execInfo').textContent = '';

  // Reset solution timer + switch to desc tab
  switchRightTab('desc');
  resetSolTimer();

  toast(`Loaded: ${p.name}`, 'cyan');
}

/* =================== EDITOR =================== */
function initEditor() {
  const ta = document.getElementById('codeEditor');
  if (!ta) return;
  ta.value = '# Welcome to AI/ML Academy IDE\n# Select a problem from the sidebar to begin\n\nprint("Hello, Engineer! 🚀")\n';
  syncEditor(ta);
}

function syncEditor(ta) {
  syncLineNumbers(ta);
}

function syncLineNumbers(ta) {
  const lineNums = document.getElementById('lineNumbers');
  if (!lineNums) return;
  
  const lines = ta.value.split('\n').length;
  let nums = '';
  for (let i = 1; i <= lines; i++) {
    nums += i + '\n';
  }
  lineNums.textContent = nums;
  // Sync scroll
  lineNums.scrollTop = ta.scrollTop;
}

function clearEditor() {
  const ta = document.getElementById('codeEditor');
  if (ta) { ta.value = ''; syncEditor(ta); }
}

/* ── SIMPLE SYNTAX HIGHLIGHTING (for display only) ── */
function syntaxHighlight(code) {
  code = escHtml(code);
  // Simple regex-based highlighting for display
  code = code.replace(/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None)\b/g,
    '<span style="color:#82aaff;font-weight:600;">$1</span>');
  code = code.replace(/(#[^\n]*)/g, '<span style="color:#546e7a;">$1</span>');
  return code;
}

/* ── KEYBOARD SHORTCUTS ── */
function handleEditorKey(e) {
  // Tab → 4 spaces
  if (e.key === 'Tab') {
    e.preventDefault();
    const ta = e.target;
    const s = ta.selectionStart, en = ta.selectionEnd;
    ta.value = ta.value.substring(0, s) + '    ' + ta.value.substring(en);
    ta.selectionStart = ta.selectionEnd = s + 4;
    syncEditor(ta);
    return;
  }
  // Ctrl+Enter → Run
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    runCode();
    return;
  }
  // Auto-close brackets
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  if (pairs[e.key]) {
    const ta = e.target;
    const s = ta.selectionStart, en = ta.selectionEnd;
    if (s === en) { // no selection — just insert pair
      e.preventDefault();
      const close = pairs[e.key];
      ta.value = ta.value.substring(0, s) + e.key + close + ta.value.substring(en);
      ta.selectionStart = ta.selectionEnd = s + 1;
      syncEditor(ta);
    }
  }
}

/* =================== SOLUTION TIMER =================== */
function resetSolTimer() {
  clearInterval(solTimerInterval);
  solTimerSecs = 120; solUnlocked = false; solPaused = false;
  updateSolDisplay();
  const btn = document.getElementById('solPauseBtn');
  if (btn) btn.style.display = 'none';

  document.getElementById('solPanel').innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                gap:14px;color:var(--text-dim);text-align:center;height:220px;">
      <div style="font-size:32px;opacity:.2;">🔒</div>
      <div style="font-family:var(--font-body);font-size:14px;">
        Unlocks in <span id="solCountdown" style="color:var(--amber);font-family:var(--font-crt);font-size:22px;">2:00</span>
      </div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-ghost);">
        Try coding first — then check
      </div>
    </div>`;

  solTimerInterval = setInterval(() => {
    if (solPaused) return;
    solTimerSecs--;
    updateSolDisplay();
    const cd = document.getElementById('solCountdown');
    if (cd) cd.textContent = fmtTime(solTimerSecs);
    if (solTimerSecs <= 0) { clearInterval(solTimerInterval); solUnlocked = true; showSolution(); }
  }, 1000);

  if (btn) btn.style.display = 'inline-flex';
}

function pauseSolTimer() {
  solPaused = !solPaused;
  const btn = document.getElementById('solPauseBtn');
  if (btn) btn.textContent = solPaused ? '▶ Resume' : '⏸ Pause';
  toast(solPaused ? 'Solution timer paused' : 'Solution timer resumed', 'amber');
}

function updateSolDisplay() {
  const el = document.getElementById('solTimerDisplay');
  if (!el) return;
  el.textContent = fmtTime(solTimerSecs);
  el.style.color = solTimerSecs < 30 ? 'var(--red)' : solTimerSecs < 60 ? 'var(--amber)' : 'var(--amber)';
}

function forceUnlockSol() {
  clearInterval(solTimerInterval);
  solUnlocked = true;
  showSolution();
  switchRightTab('solution');
}

function showSolution() {
  if (!currentProblem) return;
  document.getElementById('solPanel').innerHTML = `
    <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:2px;margin-bottom:10px;">OPTIMAL SOLUTION</div>
    <div style="background:var(--code-bg);border:1px solid var(--border2);border-radius:var(--radius);padding:14px;overflow-x:auto;margin-bottom:14px;">
      <pre style="font-family:'Share Tech Mono',monospace;font-size:12px;line-height:1.8;white-space:pre;margin:0;">${syntaxHighlight(escHtml(currentProblem.solution))}</pre>
    </div>
    <button onclick="loadSolutionToEditor()" class="btn btn-cyan btn-sm" style="width:100%;justify-content:center;margin-bottom:10px;">
      ↙ Load Solution into Editor
    </button>
    <div style="padding:10px 12px;background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,.2);border-radius:var(--radius);">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--amber);letter-spacing:2px;margin-bottom:4px;">KEY INSIGHT</div>
      <div style="font-size:12px;color:var(--text-dim);font-family:var(--font-body);line-height:1.6;">${escHtml(currentProblem.hint)}</div>
    </div>`;
  switchRightTab('solution');
}

function loadSolutionToEditor() {
  if (!currentProblem) return;
  const ta = document.getElementById('codeEditor');
  if (ta) { ta.value = currentProblem.solution; syncEditor(ta); }
  toast('Solution loaded into editor', 'green');
}

function showHint() {
  if (!currentProblem) { toast('Select a problem first', 'amber'); return; }
  document.getElementById('outputPanel').innerHTML =
    `<div style="color:var(--amber);font-family:var(--font-mono);font-size:12px;line-height:1.8;">
       💡 <strong>HINT:</strong> ${escHtml(currentProblem.hint)}
     </div>`;
}

/* =================== IDE STOPWATCH =================== */
function toggleIdeTimer() {
  const btn = document.getElementById('ideTimerBtn');
  if (!ideTimerRunning) {
    ideTimerRunning = true;
    if (btn) btn.textContent = '⏸';
    ideTimerInterval = setInterval(() => { ideTimerSecs++; updateIdeTimerDisplay(); }, 1000);
  } else {
    ideTimerRunning = false;
    clearInterval(ideTimerInterval);
    if (btn) btn.textContent = '▶';
  }
}

function resetIdeTimer() {
  clearInterval(ideTimerInterval);
  ideTimerRunning = false; ideTimerSecs = 0;
  updateIdeTimerDisplay();
  const btn = document.getElementById('ideTimerBtn');
  if (btn) btn.textContent = '▶';
}

function updateIdeTimerDisplay() {
  const el = document.getElementById('ideTimerDisplay');
  if (el) el.textContent = fmtTime(ideTimerSecs);
}

function fmtTime(s) {
  const m = Math.floor(Math.abs(s) / 60);
  const sec = Math.abs(s) % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

/* =================== CODE EXECUTION =================== */
async function runCode() {
  const code = document.getElementById('codeEditor').value.trim();
  const outEl = document.getElementById('outputPanel');

  if (!code) { toast('Write some code first!', 'amber'); return; }

  outEl.innerHTML = `<span style="color:var(--primary);font-family:var(--font-mono);font-size:12px;">
    <span style="animation:blink 0.6s step-end infinite;display:inline-block;">▌</span> Executing...
  </span>`;

  // Start stopwatch automatically
  if (!ideTimerRunning) toggleIdeTimer();

  try {
    const resp = await fetch('http://localhost:3000/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await resp.json();
    const output = data.stdout || data.stderr || "No output";
    const isErr = !!data.stderr && !data.stdout;

    // Clean output rendering
    outEl.textContent = output;
    handleSolveCheck(isErr);

  } catch (err) {
    outEl.innerHTML = `
      <div style="font-family:var(--font-mono);font-size:12px;line-height:2;">
        <div style="color:var(--red);">✗ Error: ${err.message}</div>
        <div style="color:var(--text-dim);margin-top:8px;">
          Make sure the backend server is running:<br/>
          <span style="color:var(--cyan);">  npm start</span><br/>
          Server should be on <span style="color:var(--cyan);">http://localhost:3000</span>
        </div>
      </div>`;
  }
}

function renderOutput(text, isError) {
  const lines = text.trim().split('\n');
  const out = document.getElementById('outputPanel');

  // Status bar
  const statusColor = isError ? 'var(--red)' : 'var(--green)';
  const statusText  = isError ? '✗ Runtime Error' : '✓ Execution Complete';

  out.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;
                padding-bottom:8px;border-bottom:1px solid var(--border2);">
      <span style="color:${statusColor};font-family:var(--font-mono);font-size:11px;">${statusText}</span>
    </div>
    ${lines.map(l => {
      const isErr = /error|traceback|exception/i.test(l);
      const isWarn = /warning/i.test(l);
      const color = isErr ? 'var(--red)' : isWarn ? 'var(--amber)' : '#c3e88d';
      return `<div style="font-family:'Share Tech Mono',monospace;font-size:12.5px;
                          line-height:1.85;color:${color};">${escHtml(l)}</div>`;
    }).join('')}`;
}

function handleSolveCheck(isError) {
  if (!currentProblem || isError || STATE.solved[currentProblem.id]) return;
  STATE.solved[currentProblem.id] = true;
  addXP(currentProblem.xp, `💻 Solved: ${currentProblem.problem}`);

  // Show XP toast in output
  const out = document.getElementById('outputPanel');
  if (out) {
    out.innerHTML += `
      <div style="margin-top:12px;padding:10px 14px;
                  background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);
                  border-radius:var(--radius);font-family:var(--font-mono);font-size:12px;">
        <span style="color:var(--green);">✓ PROBLEM SOLVED</span>
        <span style="color:var(--text-dim);margin-left:8px;">+${currentProblem.xp} XP earned</span>
      </div>`;
  }

  // Update sidebar
  const row = document.getElementById(`pr-${currentProblem.id}`);
  if (row) {
    row.style.borderLeftColor = 'var(--green)';
    const nameEl = row.querySelector('span:nth-child(2)');
    if (nameEl) nameEl.style.color = 'var(--green)';
  }

  // Update solved counter in sidebar footer
  const footer = document.querySelector('#page-ide [style*="border-top"]');
  if (footer) footer.querySelector('span').textContent = `${problemsSolved()}/${ALL_PROBLEMS.length} solved`;
}

/* =================== DEMO RUNNER =================== */
async function runDemo() {
  const code = document.getElementById('demoCode').value.trim();
  const outputBox = document.getElementById('demoOutput');

  if (!code) { outputBox.textContent = "Write some code first!"; return; }

  outputBox.textContent = "Running...";

  try {
    const resp = await fetch('http://localhost:3000/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await resp.json();
    const output = data.stdout || data.stderr || "No output";

    outputBox.textContent = output;

  } catch (err) {
    outputBox.textContent = "Error: " + err.message;
  }
}