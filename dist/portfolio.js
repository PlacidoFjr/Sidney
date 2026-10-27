(() => {
  'use strict';
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const works = Array.from(document.querySelectorAll('[data-categories]'));
  const count = document.querySelector('#work-count');
  function applyFilter(category, updateUrl) {
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    let visible = 0;
    works.forEach(work => { work.hidden = category !== 'todos' && !work.dataset.categories.split(' ').includes(category); if (!work.hidden) visible++; });
    count.textContent = `${visible} ${visible === 1 ? 'registro' : 'registros'}`;
    if (updateUrl) { const url = new URL(location.href); if (category === 'todos') url.searchParams.delete('categoria'); else url.searchParams.set('categoria',category); history.replaceState(null, '',url); }
  }
  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter,true)));
  const initial = new URLSearchParams(location.search).get('categoria');
  if (filters.some(button => button.dataset.filter === initial)) applyFilter(initial,false);
  document.querySelectorAll('[data-work-request]').forEach(link => { link.href = `https://wa.me/${window.SALON_CONFIG.whatsapp}?text=${encodeURIComponent(`Olá! Vi no portfólio o trabalho “${link.dataset.workRequest}” e gostaria de consultar um visual semelhante. Publicação: ${link.dataset.origin}`)}`; });
})();
