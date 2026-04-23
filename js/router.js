/* ============================================================
   ROUTER.JS — Client-side page navigation
   ============================================================ */

const Router = {
  current: 'home',

  renderers: {
    home:     renderHome,
    roadmap:  renderRoadmap,
    ide:      renderIDE,
    timer:    renderTimer,
    projects: renderProjects,
    progress: renderProgress,
  },

  go(page) {
    if (!this.renderers[page]) return;

    // Hide all pages
    qsa('.page').forEach(p => p.classList.remove('active'));
    // Deactivate nav
    qsa('.nav-btn').forEach(b => b.classList.remove('active'));

    // Show target page
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    // Activate nav btn
    const navBtn = document.querySelector(`[data-page="${page}"]`);
    if (navBtn) navBtn.classList.add('active');

    // Render page content
    this.renderers[page]();
    this.current = page;

    // Update URL hash
    history.replaceState(null, '', `#${page}`);
  },

  init() {
    // Bind nav buttons
    document.getElementById('mainNav').addEventListener('click', e => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      const page = btn.dataset.page;
      this.go(page);
    });

    // Handle hash on load
    const hash = location.hash.replace('#', '');
    const startPage = this.renderers[hash] ? hash : 'home';
    this.go(startPage);
  }
};
