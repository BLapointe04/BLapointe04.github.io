
const JSON_URL = 'https://Blapointe04.github.io/BLapointe04.github.io/csce242/projects/part6/menu.json';

// --- Mobile nav toggle ---
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
  if (!r.ok) throw new Error('Failed to load JSON');
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
      <img src="${it.img_name}" alt="${it.name}" style="max-width:100%;border-radius:12px;">
      <h1>${it.name}</h1>
      <p>${it.description}</p>
      <ul>
        <li><strong>Category:</strong> ${it.category}</li>
        <li><strong>Price:</strong> $${it.price.toFixed(2)}</li>
        <li><strong>ID:</strong> ${it._id}</li>
      </ul>
      <p><a class="btn" href="index.html">← Back to Gallery</a></p>
    </article>`;
}

async function renderGallery() {
  const box = document.getElementById('gallery');
  if (!box) return;
  try {
    const data = await fetchJSON();
    box.innerHTML = data.map(cardHTML).join('');
  } catch {
    box.innerHTML = '<p>Error loading menu data.</p>';
  }
}

async function renderItem() {
  const box = document.getElementById('item');
  if (!box) return;
  try {
    const id = Number(new URLSearchParams(location.search).get('id'));
    const data = await fetchJSON();
    const it = data.find(x => x._id === id);
    box.innerHTML = it ? detailHTML(it) : '<h1>Item not found</h1>';
  } catch {
    box.innerHTML = '<p>Error loading item data.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  renderItem();
});
