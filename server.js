/* ============================================================
   SERVER.JS — Local IDE Backend
   Auto-detects Python on Windows, Mac, Linux
   Run: node server.js
   Then open index.html in browser
   ============================================================ */

const express  = require('express');
const cors     = require('cors');
const { exec, execSync } = require('child_process');
const fs       = require('fs');
const path     = require('path');
const os       = require('os');

const app  = express();
const PORT = process.env.PORT || 3000; // ✅ Dynamic port for Render/Railway

app.use(cors());
app.use(express.json({ limit: '2mb' }));

/* ── Serve static files (so you can open via http://localhost:3000) ── */
app.use(express.static(path.join(__dirname)));

/* ── Auto-detect Python path ── */
function findPython() {
  const isWindows = os.platform() === 'win32';

  const candidates = [
    'python3',
    'python',
  ];

  // Add Windows-specific paths only on Windows
  if (isWindows) {
    candidates.push(
      process.env.LOCALAPPDATA + '\\Programs\\Python\\Python311\\python.exe',
      process.env.LOCALAPPDATA + '\\Programs\\Python\\Python312\\python.exe',
      process.env.LOCALAPPDATA + '\\Programs\\Python\\Python310\\python.exe',
      'C:\\Python311\\python.exe',
      'C:\\Python312\\python.exe',
      'C:\\Python310\\python.exe',
      process.env.USERPROFILE + '\\AppData\\Local\\Microsoft\\WindowsApps\\python3.exe',
    );
  } else {
    // Mac/Linux paths
    candidates.push(
      '/usr/bin/python3',
      '/usr/local/bin/python3',
      '/opt/homebrew/bin/python3',
    );
  }

  for (const candidate of candidates) {
    try {
      const quoted  = candidate.includes(' ') ? `"${candidate}"` : candidate;
      const version = execSync(`${quoted} --version 2>&1`, { timeout: 3000 }).toString().trim();
      if (version.toLowerCase().includes('python')) {
        console.log(`✅ Python found: ${candidate} (${version})`);
        return candidate;
      }
    } catch (e) {
      // Not found, try next
    }
  }
  return null;
}

const PYTHON_PATH = findPython();

if (!PYTHON_PATH) {
  console.error('❌ Python not found! Install Python 3.x and add to PATH.');
  console.error('   Download: https://www.python.org/downloads/');
} else {
  console.log(`🐍 Using Python: ${PYTHON_PATH}`);
}

/* ── POST /execute — run Python code ── */
app.post('/execute', (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ stdout: '', stderr: 'Error: No code provided', exitCode: 1 });
  }

  if (!PYTHON_PATH) {
    return res.status(500).json({
      stdout: '',
      stderr: 'Python not found on this machine.\nInstall Python 3.x from https://www.python.org/downloads/\nThen restart this server.',
      exitCode: 1
    });
  }

  // Write to temp file (handles multi-line code, imports, etc.)
  const tempFile = path.join(os.tmpdir(), `aiml_exec_${Date.now()}_${Math.random().toString(36).slice(2)}.py`);

  try {
    fs.writeFileSync(tempFile, code, 'utf8');
  } catch (e) {
    return res.status(500).json({ stdout: '', stderr: `Failed to write temp file: ${e.message}`, exitCode: 1 });
  }

  const quotedPython = PYTHON_PATH.includes(' ') ? `"${PYTHON_PATH}"` : PYTHON_PATH;
  const quotedFile   = `"${tempFile}"`;

  // ✅ Cross-platform command (no hardcoded Windows path)
  const isWindows = os.platform() === 'win32';
  const cmd = isWindows
    ? `set PYTHONIOENCODING=utf-8 && ${quotedPython} ${quotedFile}`
    : `PYTHONIOENCODING=utf-8 ${quotedPython} ${quotedFile}`;

  exec(cmd, { timeout: 10000 }, (error, stdout, stderr) => {
    // Always clean up temp file
    try { fs.unlinkSync(tempFile); } catch (e) {}

    res.json({
      stdout:   stdout   || '',
      stderr:   stderr   || '',
      exitCode: error?.code ?? 0
    });
  });
});

/* ── GET /status — health check ── */
app.get('/status', (req, res) => {
  res.json({
    ok: true,
    python: PYTHON_PATH || null,
    platform: os.platform(),
    version: PYTHON_PATH ? (() => {
      try {
        const q = PYTHON_PATH.includes(' ') ? `"${PYTHON_PATH}"` : PYTHON_PATH;
        return execSync(`${q} --version 2>&1`).toString().trim();
      } catch (e) { return 'unknown'; }
    })() : null
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   AI/ML ACADEMY — IDE Backend Server     ║');
  console.log(`║   Running on  http://localhost:${PORT}        ║`);
  console.log('║   Open index.html in your browser        ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
  console.log('Press Ctrl+C to stop.');
});
