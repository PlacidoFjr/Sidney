(() => {
  'use strict';
  const config = window.SALON_CONFIG;
  const waUrl = text => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() { navigation.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menu'); }
  menuToggle.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = waUrl(link.dataset.whatsapp); });

  const bookingForm = document.querySelector('#booking-form');
  const bookingService = document.querySelector('#booking-service');
  const bookingDay = document.querySelector('#booking-day');
  const today = new Date();
  const saoPauloDate = new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Sao_Paulo', year:'numeric',month:'2-digit',day:'2-digit'}).format(today);
  if (bookingDay) bookingDay.min = saoPauloDate;
  const requestedService = new URLSearchParams(location.search).get('servico');
  if (bookingService && Array.from(bookingService.options).some(option => option.value === requestedService)) bookingService.value = requestedService;
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { if (bookingService) bookingService.value = link.dataset.service; }));
  bookingForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const data = new FormData(bookingForm);
    const name = String(data.get('name') || '').trim();
    const service = String(data.get('service') || '');
    const day = String(data.get('day') || '');
    const note = String(data.get('note') || '').trim();
    const lines = [name ? `Olá! Meu nome é ${name}.` : 'Olá!', 'Conheci o site do Sidney Cabeleireiros e gostaria de consultar um atendimento.', `Serviço: ${service}.`];
    if (day) { const [year, month, date] = day.split('-'); lines.push(`Data de preferência: ${date}/${month}/${year}.`); }
    if (note) lines.push(`Observação: ${note}`);
    lines.push('Podem confirmar os valores e horários disponíveis?');
    const url = waUrl(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
    const status = document.querySelector('#booking-status');
    status.replaceChildren(document.createTextNode('Mensagem preparada. Se o WhatsApp não abriu, '));
    const fallback = document.createElement('a'); fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer'; fallback.textContent = 'clique aqui para continuar'; status.append(fallback, document.createTextNode('.'));
  });

  const toggle = document.querySelector('#chat-toggle');
  const panel = document.querySelector('#chat-panel');
  const input = document.querySelector('#chat-input');
  const messages = document.querySelector('#chat-messages');
  const options = document.querySelector('#chat-options');
  let started = false;
  let returnFocus = toggle;
  function setChat(open, source = toggle) {
    panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('is-open', open);
    if (open) {
      returnFocus = source;
      if (!started) { addMessage(config.welcome, 'assistant'); started = true; }
      input.focus();
    } else returnFocus.focus();
  }
  toggle.addEventListener('click', () => setChat(panel.hidden));
  document.querySelector('#chat-close').addEventListener('click', () => setChat(false));
  document.querySelectorAll('.chat-open').forEach(button => button.addEventListener('click', () => setChat(true, button)));
  function prepareBooking(service) {
    if (!bookingService) {
      const destination = new URL('index.html', location.href);
      if (service) destination.searchParams.set('servico', service);
      destination.hash = 'agendar';
      location.assign(destination.href);
      return;
    }
    if (service) bookingService.value = service;
    setChat(false);
    document.querySelector('#agendar').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    bookingService.focus({preventScroll:true});
  }
  function addMessage(text, sender, answer, question = '') {
    const bubble = document.createElement('div'); bubble.className = `chat-message ${sender}`;
    const label = document.createElement('span'); label.className = 'sr-only'; label.textContent = sender === 'assistant' ? 'Assistente: ' : 'Você: ';
    const paragraph = document.createElement('p'); paragraph.textContent = text; bubble.append(label, paragraph);
    if (answer?.action) {
      const action = document.createElement(answer.action === 'booking' ? 'button' : 'a'); action.className = 'chat-action';
      if (answer.action === 'booking') { action.type = 'button'; action.textContent = 'Preparar pedido de agendamento'; action.addEventListener('click', () => prepareBooking(answer.service)); }
      else { action.target = '_blank'; action.rel = 'noopener noreferrer'; action.href = answer.action === 'maps' ? config.maps : waUrl(question ? `Olá! Vim pelo site e tenho esta dúvida: ${question}` : 'Olá! Vim pelo site e gostaria de conversar com a equipe do Sidney Cabeleireiros.'); action.textContent = answer.action === 'maps' ? 'Abrir localização' : 'Continuar com a equipe'; }
      bubble.append(action);
    }
    messages.append(bubble);
    while (messages.children.length > 60) messages.firstElementChild.remove();
    messages.scrollTop = messages.scrollHeight;
  }
  config.topics.forEach(topic => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = topic.label;
    button.addEventListener('click', () => { addMessage(topic.label, 'visitor'); const answer = config.answers[topic.id]; addMessage(answer.text, 'assistant', answer, topic.label); }); options.append(button);
  });
  document.querySelector('#chat-form').addEventListener('submit', event => {
    event.preventDefault(); const question = input.value.trim(); if (!question) return;
    addMessage(question, 'visitor'); input.value = '';
    const normalized = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const intent = config.rules.find(rule => rule.pattern.test(normalized))?.intent || 'unknown';
    const answer = config.answers[intent]; addMessage(answer.text, 'assistant', answer, question); input.focus();
  });

  const photoDialog = document.querySelector('#photo-dialog');
  let activePhotos = [];
  let activePhotoIndex = 0;
  function showPhoto(index) {
    activePhotoIndex = (index + activePhotos.length) % activePhotos.length;
    const button = activePhotos[activePhotoIndex];
    const image = document.querySelector('#photo-full'); image.src = button.dataset.photo; image.alt = button.querySelector('img').alt;
    document.querySelector('#photo-caption').textContent = button.dataset.caption;
    const counter = document.querySelector('#photo-counter');
    if (counter) counter.textContent = `${activePhotoIndex + 1} / ${activePhotos.length}`;
    const source = document.querySelector('#photo-source');
    if (source) { source.hidden = !button.dataset.source; if (button.dataset.source) source.href = button.dataset.source; }
    const request = document.querySelector('#photo-request');
    if (request) request.href = waUrl(`Olá! Vi no portfólio o trabalho “${button.dataset.title}” e gostaria de consultar um visual semelhante. Publicação: ${button.dataset.source}`);
    if (!photoDialog.open) photoDialog.showModal();
  }
  document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
    activePhotos = Array.from(document.querySelectorAll('[data-photo]')).filter(photo => !photo.closest('[hidden]'));
    showPhoto(activePhotos.indexOf(button));
  }));
  document.querySelector('#photo-previous')?.addEventListener('click', () => showPhoto(activePhotoIndex - 1));
  document.querySelector('#photo-next')?.addEventListener('click', () => showPhoto(activePhotoIndex + 1));
  document.querySelector('#photo-close').addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
  document.addEventListener('keydown', event => {
    if (photoDialog.open && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); showPhoto(activePhotoIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
    if (event.key === 'Escape') { if (!panel.hidden) setChat(false); closeMenu(); }
  });
})();
