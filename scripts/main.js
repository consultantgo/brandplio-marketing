/* Brandplio — Home page interactions
 * Single ES module, native Web Animations API for the hero sequence.
 */

/* ——— Theme toggle ——— */
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');

function currentTheme() {
  const explicit = html.getAttribute('data-theme');
  if (explicit) return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

toggle?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  try { localStorage.setItem('bp:theme', next); } catch (_) {}
});

/* ——— Sticky nav scroll state ——— */
const nav = document.getElementById('nav');
const setScrolled = () => nav?.setAttribute('data-scrolled', String(window.scrollY > 8));
setScrolled();
window.addEventListener('scroll', setScrolled, { passive: true });

/* ——— Year ——— */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* ——— Use-case tabs ——— */
const tabs = document.querySelectorAll('[data-case]');
const panels = document.querySelectorAll('[data-panel]');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.getAttribute('data-case');
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach((p) => {
      p.setAttribute('data-active', String(p.getAttribute('data-panel') === key));
    });
  });
});

/* ——— Copy button for code blocks ———
 * Copies the active pane of whatever code container it sits in
 * (.code  — home page,  .codeblock  — developers page).
 */
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const scope = btn.closest('.code, .codeblock');
    if (!scope) return;
    const active = scope.querySelector(
      '.codeblock__pane[data-active="true"], .code__body'
    );
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.innerText);
      const prev = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => (btn.textContent = prev), 1400);
    } catch (_) {}
  });
});

/* ——— Code tabs (dev page) ——— */
document.querySelectorAll('[data-codetabs]').forEach((block) => {
  const tabs = block.querySelectorAll('.codeblock__tab[data-tab]');
  const panes = block.querySelectorAll('.codeblock__pane[data-pane]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-tab');
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      panes.forEach((p) => {
        p.setAttribute('data-active', String(p.getAttribute('data-pane') === key));
      });
    });
  });
});

/* ——— Analyzer mode toggle (product page Extract section) ——— */
document.querySelectorAll('[data-analyzer]').forEach((root) => {
  const tabs = root.querySelectorAll('[data-analyzer-mode]');
  const panes = root.querySelectorAll('[data-analyzer-pane]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-analyzer-mode');
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      panes.forEach((p) => {
        p.setAttribute('data-active', String(p.getAttribute('data-analyzer-pane') === key));
      });
    });
  });
});

/* ——— Endpoint selector (dev page API reference) ——— */
document.querySelectorAll('[data-endpoints]').forEach((block) => {
  const buttons = block.querySelectorAll('.endpoint[data-endpoint]');
  const details = block.querySelectorAll('.endpoint__detail[data-detail]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-endpoint');
      buttons.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
      details.forEach((d) => {
        d.setAttribute('data-active', String(d.getAttribute('data-detail') === key));
      });
    });
  });
});

/* Hero diagram is now animated in pure CSS — see `styles/home.css`
 * (@keyframes bp-scan / bp-extract / bp-bar-fill / bp-dot-pop / bp-fan-draw
 *  / bp-tool-fade). Runs once on load, no loop.
 */
