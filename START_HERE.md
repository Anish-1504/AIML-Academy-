# AI/ML Academy — How to Run Locally

## One-time setup (do this once)

```bash
# 1. Make sure Node.js is installed (https://nodejs.org)
node --version    # should print v18 or higher

# 2. Install backend dependencies
npm install
```

## Every time you want to use the IDE

```bash
# Start the backend server (keep this terminal open)
npm start
```

You'll see:
```
╔══════════════════════════════════════════╗
║   AI/ML ACADEMY — IDE Backend Server     ║
║   Running on  http://localhost:3001       ║
╚══════════════════════════════════════════╝
✅ Python found: python3 (Python 3.11.x)
```

Then open `index.html` in your browser — OR go to `http://localhost:3001`

## The IDE will show:
- **● LOCAL (Python 3.x)** — real execution, fully offline
- **● REMOTE (Piston API)** — free cloud fallback (if server not running)

## Keyboard shortcuts in the IDE
- `Ctrl + Enter` — Run code
- `Tab` — Insert 4 spaces
- `( [ { " '` — Auto-closes the bracket

## Python not found?
The server auto-detects Python. If it fails:
1. Install Python from https://www.python.org/downloads/
2. During install, check ✅ "Add Python to PATH"
3. Restart your terminal and run `npm start` again

## Troubleshooting
- Port 3001 in use? Edit `PORT = 3001` in `server.js` to another number, and also update `http://localhost:3001` in `js/pages/ide.js`
- CORS error? The server already has CORS enabled for all origins
