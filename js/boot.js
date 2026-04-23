/* ============================================================
   BOOT.JS v3 — Enhanced terminal boot sequence
   ============================================================ */

function runBoot() {
  const logEl    = document.getElementById('bootLog');
  const barEl    = document.getElementById('bootBar');
  const barGlow  = document.getElementById('bootBarGlow');
  const pctEl    = document.getElementById('bootPct');
  const statusEl = document.getElementById('bootStatus');
  const clockEl  = document.getElementById('bootClock');
  const screen   = document.getElementById('bootScreen');
  const app      = document.getElementById('app');

  const total    = BOOT_MESSAGES.length;
  let   done     = false;

  // Boot clock (shows real time during boot)
  const clockInt = setInterval(() => {
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('en-GB');
  }, 1000);
  if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('en-GB');

  // Status label cycle
  const statusLabels = ['LOADING...', 'MOUNTING FS', 'INIT MODULES', 'LOADING AI/ML', 'ALMOST READY', 'ONLINE'];

  function finishBoot() {
    if (done) return;
    done = true;
    clearInterval(clockInt);

    // Fill bar to 100%
    setBar(100);
    if (statusEl) statusEl.textContent = 'BOOT COMPLETE';

    // Flash logo once
    const logo = document.getElementById('bootLogo');
    if (logo) { logo.style.animation = 'none'; logo.style.textShadow = '0 0 30px #00ff41, 0 0 60px rgba(0,255,65,0.8), 0 0 120px rgba(0,255,65,0.4)'; }

    setTimeout(() => {
      screen.classList.add('fade-out');
      app.classList.remove('hidden');
      setTimeout(() => { screen.style.display = 'none'; }, 1000);
      Router.init();
      startClock();
    }, 700);
  }

  // Skip on any keypress
  document.addEventListener('keydown', finishBoot, { once: true });
  // Skip on click too
  screen.addEventListener('click', finishBoot, { once: true });

  function setBar(pct) {
    const p = Math.min(100, Math.round(pct));
    if (barEl)   barEl.style.width   = `${p}%`;
    if (barGlow) barGlow.style.width = `${p}%`;
    if (pctEl)   pctEl.textContent   = `${p}%`;
  }

  BOOT_MESSAGES.forEach((msg, i) => {
    setTimeout(() => {
      if (done) return;

      // Append log line
      const div = document.createElement('div');
      div.className = `line ${msg.cls}`;

      // Simulate typing for last few lines
      if (i >= total - 3) {
        div.textContent = '';
        logEl.appendChild(div);
        logEl.scrollTop = logEl.scrollHeight;
        let ci = 0;
        const typeInt = setInterval(() => {
          if (ci < msg.text.length) { div.textContent += msg.text[ci++]; }
          else clearInterval(typeInt);
        }, 18);
      } else {
        div.textContent = msg.text;
        logEl.appendChild(div);
        logEl.scrollTop = logEl.scrollHeight;
      }

      // Progress bar + percentage
      const pct = ((i + 1) / total) * 100;
      setBar(pct);

      // Status label
      if (statusEl) {
        const si = Math.min(Math.floor(pct / 20), statusLabels.length - 1);
        statusEl.textContent = statusLabels[si];
      }

      // Last message → trigger finish
      if (i === total - 1) {
        setTimeout(finishBoot, 900);
      }
    }, msg.delay);
  });
}

// utils.js calls this but we don't need topbar clock during boot anymore
function startClock() { /* clock removed from topbar */ }
