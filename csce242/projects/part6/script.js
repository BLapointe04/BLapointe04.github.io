
const JSON_URL = 'https://blapointe04.github.io/csce242/projects/part6/menu.json';

// --- Mobile nav toggle (keeps your existing behavior) ---
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const navBtn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('header nav') || document.querySelector('nav');

  if (navBtn && navBtn.hasAttribute('onclick')) navBtn.removeAttribute('onclick');
  if (navBtn) navBtn.addEventListener('click', () => body.classList.toggle('nav-open'));
  if (nav) nav.addEventListener('click', e => {
    if (e.target && e.target.tagName === 'A') body.classList.remove('nav-open');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') body.classList.remove('nav-open'); });
});

// --- JSON helpers ---
async function fetchJSON() {
  const r = await fetch(JSON_URL, { cache: 'no-store' });
  if (!r.ok) throw new Error(`Failed to load JSON (${r.status})`);
  return r.json();
}

function cardHTML(it) {
  return `
    <a class="card" href="item.html?id=${it._id}" style="text-decoration:none;color:inherit;">
      <img src="${it.img_name}" alt="${it.name}" class="img-cover">
      <div class="card-body">
        <h3>${it.name}</h3>
        <p class="muted">${it.description}</p>
        <div class="price">$${Number(it.price).toFixed(2)}</div>
      </div>
    </a>`;
}

function detailHTML(it) {
  return `
    <article class="card">
      <img src="${it.img_name}" alt="${it.name}" style="max-width:100%;height:auto;border-radius:12px;margin:8px 0 12px;">
      <h1>${it.name}</h1>
      <p class="lead">${it.description}</p>
      <ul style="padding-left:18px;">
        <li><strong>Category:</strong> ${it.category}</li>
        <li><strong>Price:</strong> $${Number(it.price).toFixed(2)}</li>
        <li><strong>ID:</strong> ${it._id}</li>
      </ul>
      <p><a class="btn" href="index.html">← Back to Gallery</a></p>
    </article>`;
}

async function renderGallery() {
  const mount = document.getElementById('gallery');
  if (!mount) return;
  try {
    const data = await fetchJSON();
    mount.innerHTML = data.map(cardHTML).join('');
  } catch (e) {
    console.error(e);
    mount.innerHTML = '<p class="card" style="padding:14px;">Error loading data.</p>';
  }
}

async function renderItem() {
  const mount = document.getElementById('item');
  if (!mount) return;
  try {
    const id = Number(new URLSearchParams(location.search).get('id'));
    const data = await fetchJSON();
    const it = data.find(x => x._id === id);
    mount.innerHTML = it ? detailHTML(it) : '<h1>Item not found</h1>';
  } catch (e) {
    console.error(e);
    mount.innerHTML = '<p class="card" style="padding:14px;">Error loading item.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  renderItem();
});
