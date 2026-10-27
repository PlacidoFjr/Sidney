(() => {
  'use strict';
  const key = 'sidney-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { const saved = localStorage.getItem(key); if (saved === 'light' || saved === 'dark') preference = saved; } catch { /* O tema continua funcionando sem armazenamento. */ }
  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#151515' : '#ffffff');
    document.querySelectorAll('.theme-toggle').forEach(button => {
      const label = theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }
  apply(preference || (system.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* A escolha vale para esta página. */ }
      apply(preference);
    }));
  });
  system.addEventListener('change', event => { if (!preference) apply(event.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    apply(preference || (system.matches ? 'dark' : 'light'));
  });
})();
