# AIML::ACADEMY — Hacker Edition
> Your complete 3-month pipeline from Python beginner to AIML Engineer.

---

## 📁 Project Structure

```
aiml-hacker-academy/
│
├── index.html              ← Main entry point
│
├── css/
│   ├── reset.css           ← CSS reset
│   ├── theme.css           ← CSS variables (colors, fonts) — EDIT THIS TO RETHEME
│   ├── layout.css          ← Topbar, pages, modal, toast layout
│   ├── components.css      ← Buttons, cards, badges, progress bars
│   └── animations.css      ← Keyframes, glitch, typewriter, stagger
│
└── js/
    ├── data.js             ← ALL CONTENT (roadmap, problems, projects) — EDIT THIS
    ├── state.js            ← LocalStorage state management
    ├── utils.js            ← Toast, modal, DOM helpers
    ├── matrix.js           ← Matrix rain background
    ├── router.js           ← Client-side page router
    ├── boot.js             ← Boot screen sequence
    ├── main.js             ← App entry point
    │
    └── pages/
        ├── home.js         ← Home dashboard
        ├── roadmap.js      ← 3-month roadmap + week tracking
        ├── ide.js          ← Python IDE with timer + solution panel
        ├── timer.js        ← Focus timer with complexity presets
        ├── projects.js     ← Project cards + unlock system
        └── progress.js     ← Heatmap, achievements, activity log
```

---

## 🚀 Quick Deploy Options

### Option 1: Netlify Drop (Easiest — 30 seconds)
1. Go to https://app.netlify.com/drop
2. Drag the entire `aiml-hacker-academy/` folder onto the page
3. Done — you get a live URL instantly

### Option 2: Vercel CLI
```bash
npm install -g vercel
cd aiml-hacker-academy
vercel
```

### Option 3: GitHub Pages
```bash
cd aiml-hacker-academy
git init
git add .
git commit -m "init: AIML Academy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aiml-academy.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Source: main branch → Save
Live at: `https://YOUR_USERNAME.github.io/aiml-academy`

### Option 4: Local Development
```bash
# Python
python3 -m http.server 3000

# Node
npx serve .

# VS Code
# Install "Live Server" extension → Right-click index.html → Open with Live Server
```

---

## ✏️ How to Customise

### Change colors / theme
Edit `css/theme.css` → modify the `:root` CSS variables.

### Add a new problem to the IDE
Open `js/data.js` → add an object to the `PROBLEMS` array:
```js
{
  id: "x1",              // unique id
  group: "My Group",     // sidebar group name
  name: "Short Name",    // sidebar label
  diff: "easy",          // easy | medium | hard
  xp: 30,               // XP rewarded on solve
  problem: "Full Title", // shown in problem statement
  desc: "Description of the problem. Can use \\n for newlines.",
  starter: `# starter code here`,
  solution: `# full solution here`,
  hint: "One-line hint for the learner."
}
```

### Add a new roadmap week
Open `js/data.js` → find the `ROADMAP` array → add to the relevant phase's `weeks` array:
```js
{
  num: 13,
  title: "Week Title",
  topics: ["Topic1", "Topic2", "Topic3"],
  xp: 200,
  resources: ["https://docs.example.com"]
}
```

### Add a new project
Open `js/data.js` → add to the `PROJECTS` array:
```js
{
  phase: "Month X // Week Y",
  title: "Project Title",
  desc: "What you'll build.",
  tech: ["Python", "FastAPI"],
  xp: 400,
  unlockWeek: 8,    // unlocks when user completes this many weeks
  difficulty: "medium"
}
```

### Change boot messages
Edit the `BOOT_MESSAGES` array in `js/data.js`.

### Connect real Python execution
The IDE's RUN button calls the Anthropic API to simulate Python output.
To use a real Python backend, replace the `fetch` call in `js/pages/ide.js`
inside the `runCode()` function with your own endpoint:

```js
// Replace the fetch in runCode() with:
const resp = await fetch('http://localhost:8000/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code })
});
const data = await resp.json();
const text = data.output;
```

Example FastAPI backend (save as `server.py`):
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess, sys

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class CodeRequest(BaseModel):
    code: str

@app.post("/run")
def run_code(req: CodeRequest):
    try:
        result = subprocess.run(
            [sys.executable, "-c", req.code],
            capture_output=True, text=True, timeout=10
        )
        output = result.stdout or result.stderr
    except subprocess.TimeoutExpired:
        output = "TimeoutError: Code took too long to execute"
    except Exception as e:
        output = f"Error: {str(e)}"
    return {"output": output}
```

Run with: `uvicorn server:app --reload --port 8000`

---

## 🔧 Tech Stack
- **Pure HTML + CSS + Vanilla JS** — zero dependencies, zero build tools
- **LocalStorage** — all progress persists in browser
- **Anthropic API** — used in IDE for code execution simulation
- **Google Fonts** — Share Tech Mono, Orbitron, VT323

---

## 📝 License
MIT — Do whatever you want with it.
# AIML_Learning_Acedamy-
