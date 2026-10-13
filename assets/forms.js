/* Alfa Dev · form delivery via Web3Forms (https://web3forms.com), shared by every page.
   Paste the access key generated at web3forms.com below. The key is meant to be public
   (it only allows sending to the inbox it was created for). While it is empty the forms
   fall back to opening the visitor's e-mail app with the message pre-filled. */
(function () {
  'use strict';
  var WEB3FORMS_KEY = 'b510e65c-5d56-4ef0-b698-020bdd48a8e4';
  var ENDPOINT = 'https://api.web3forms.com/submit';

  var en = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  var T = en ? {
    sending: 'Sending…', okTitle: 'Message sent!', okText: 'We got it and will reply soon to the e-mail you provided.',
    again: 'Send another message', fail: 'We couldn’t send it right now. Please try again or write to '
  } : {
    sending: 'Enviando…', okTitle: 'Mensagem enviada!', okText: 'Recebemos o seu contato e respondemos em breve no e-mail informado.',
    again: 'Enviar outra mensagem', fail: 'Não foi possível enviar agora. Tente de novo ou escreva para '
  };

  var css = '' +
    'form[data-alfa-form][hidden]{display:none!important}' +
    '.af-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}' +
    '.af-busy{pointer-events:none;opacity:.75}' +
    '.af-spin{display:inline-block;width:1em;height:1em;border-radius:50%;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;animation:af-spin .8s linear infinite}' +
    '@keyframes af-spin{to{transform:rotate(360deg)}}' +
    '.af-err{flex-basis:100%;margin:4px 0 0;font-size:.85rem;color:#FF9DB4}' +
    '.af-err a{color:inherit}' +
    '.af-ok{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:clamp(22px,3vw,32px);border-radius:18px;' +
      'background:linear-gradient(160deg,rgba(43,182,115,.14),rgba(18,14,30,.6));border:1px solid rgba(123,224,176,.35);color:#F3F0FA}' +
    '.af-ok__ic{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(43,182,115,.2);color:#7BE0B0;' +
      'box-shadow:0 0 0 6px rgba(43,182,115,.08);animation:af-pop .5s cubic-bezier(.3,1.6,.5,1) both}' +
    '.af-ok__ic svg{width:22px;height:22px}' +
    '.af-ok h3{margin:4px 0 0;font-size:1.25rem;font-weight:600;letter-spacing:-.02em}' +
    '.af-ok p{margin:0;color:#CFC8E2;line-height:1.5;max-width:34em}' +
    '.af-ok button{margin-top:6px;background:none;border:0;padding:0;color:#C4A8FF;font:inherit;font-weight:500;cursor:pointer;text-decoration:underline;text-underline-offset:4px}' +
    '@keyframes af-pop{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}' +
    '@media (prefers-reduced-motion:reduce){.af-spin,.af-ok__ic{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // honeypot on every form that uses this script
  function armHoneypot(form) {
    if (form.querySelector('input[name="botcheck"]')) return;
    var hp = document.createElement('input');
    hp.type = 'checkbox'; hp.name = 'botcheck'; hp.className = 'af-hp'; hp.tabIndex = -1;
    hp.setAttribute('autocomplete', 'off'); hp.setAttribute('aria-hidden', 'true');
    form.appendChild(hp);
  }
  Array.prototype.forEach.call(document.querySelectorAll('form[data-alfa-form]'), armHoneypot);

  function mailto(to, subject, body) {
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function success(form) {
    var box = document.createElement('div');
    box.className = 'af-ok'; box.setAttribute('role', 'status'); box.tabIndex = -1;
    box.innerHTML = '<span class="af-ok__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>' +
      '<h3>' + T.okTitle + '</h3><p>' + T.okText + '</p><button type="button">' + T.again + '</button>';
    form.hidden = true;
    form.parentNode.insertBefore(box, form.nextSibling);
    box.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    box.querySelector('button').addEventListener('click', function () {
      form.reset(); form.classList.remove('was-validated'); form.hidden = false; box.remove();
      var first = form.querySelector('input:not([type=hidden]):not(.af-hp), textarea'); if (first) first.focus();
    });
  }

  /* opts: { subject, body, fields: {label: value}, name, email, to } */
  function send(form, opts) {
    if (!WEB3FORMS_KEY) { mailto(opts.to, opts.subject, opts.body); return; }
    var hp = form.querySelector('input[name="botcheck"]');
    if (hp && hp.checked) return;                                    // bot
    var btn = form.querySelector('[type="submit"]'), label = btn ? btn.innerHTML : '';
    var err = form.querySelector('.af-err'); if (err) err.remove();
    if (btn) { btn.disabled = true; btn.classList.add('af-busy'); btn.innerHTML = '<span class="af-spin" aria-hidden="true"></span> ' + T.sending; }

    var payload = { access_key: WEB3FORMS_KEY, subject: opts.subject, from_name: 'Site Alfa Dev', botcheck: false,
      replyto: opts.email || '', name: opts.name || '', email: opts.email || '', message: opts.body, pagina: location.pathname };
    for (var k in opts.fields) payload[k] = opts.fields[k];

    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j || !res.j.success) throw new Error((res.j && res.j.message) || 'send failed');
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: 'web3forms', page: location.pathname });
        success(form);
      })
      .catch(function () {
        var p = document.createElement('p');
        p.className = 'af-err'; p.setAttribute('role', 'alert');
        p.innerHTML = T.fail + '<a href="mailto:' + opts.to + '">' + opts.to + '</a>.';
        (btn && btn.parentNode ? btn.parentNode : form).appendChild(p);
      })
      .then(function () { if (btn) { btn.disabled = false; btn.classList.remove('af-busy'); btn.innerHTML = label; } });
  }

  /* fire-and-forget delivery with no UI, for flows that must not wait (e.g. the game demo sign-up) */
  function lead(subject, fields) {
    if (!WEB3FORMS_KEY) return;
    var payload = { access_key: WEB3FORMS_KEY, subject: subject, from_name: 'Site Alfa Dev', botcheck: false, pagina: location.pathname };
    for (var k in fields) payload[k] = fields[k];
    fetch(ENDPOINT, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { if (r.ok && typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: 'web3forms', page: location.pathname }); })
      .catch(function () { /* the demo keeps working offline */ });
  }

  window.alfaForms = { send: send, lead: lead, configured: function () { return !!WEB3FORMS_KEY; } };
})();
