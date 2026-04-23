/* ============================================================
   MATRIX.JS — Matrix rain background effect
   ============================================================ */

(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 14;
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#00ff41';
      ctx.globalAlpha = Math.random() * 0.5 + 0.3;
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    ctx.globalAlpha = 1;
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();
