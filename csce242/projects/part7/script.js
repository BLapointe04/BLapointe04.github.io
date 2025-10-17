(function () {
    const btn = document.querySelector('.nav-toggle');
    if (btn) btn.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  })();
  
  (function () {
    document.querySelectorAll('.menu-item').forEach((row, i) => {
      const img = row.querySelector('img')?.src || '';
      const title = row.querySelector('h3')?.textContent || 'Item';
      const desc = row.querySelector('p')?.textContent || '';
      const price = row.querySelector('.price')?.textContent || '';
      const params = new URLSearchParams({ title, desc, price, img });
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => location.href = `item.html?${params.toString()}`);
    });
  })();
  
  (function () {
    if (!location.pathname.endsWith('item.html')) return;
    const q = new URLSearchParams(location.search);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('item-name', q.get('title') || '');
    set('item-desc', q.get('desc') || '');
    set('item-price', q.get('price') || '');
    const img = document.getElementById('item-img');
    if (img && q.get('img')) img.src = q.get('img');
  })();
  
  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');
    const show = (msg, ok=true) => {
      status.textContent = msg;
      status.style.color = ok ? 'green' : 'red';
      status.hidden = false;
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      try {
        const res = await fetch(form.dataset.endpoint, { method:'POST', body: new FormData(form) });
        if (res.ok) { form.reset(); show('Thanks! Your message was sent.'); }
        else show('Something went wrong.', false);
      } catch { show('Network error.', false); }
    });
    (function () {
        const form = document.getElementById('contact-form');
        if (!form) return;
      
        const statusBox = document.getElementById('form-status');
        const show = (msg, ok = true) => {
          statusBox.textContent = msg;
          statusBox.classList.remove('ok', 'err');
          statusBox.classList.add(ok ? 'ok' : 'err');
          statusBox.hidden = false;
        };
      
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
      
          if (!form.checkValidity()) {
            form.reportValidity();
            show('Please fix the highlighted fields.', false);
            return;
          }
      
          const endpoint = form.dataset.endpoint;
          if (!endpoint) {
            show('Form endpoint missing. Add your Formspree URL to data-endpoint.', false);
            return;
          }
      
          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Accept': 'application/json' },
              body: new FormData(form)
            });
      
            if (res.ok) {
              show('Thanks! Your message was sent.');
              form.reset();
            } else {
              show('Something went wrong. Please try again.', false);
            }
          } catch {
            show('Network error. Try again later.', false);
          }
        });
      })();
      
  })();
  