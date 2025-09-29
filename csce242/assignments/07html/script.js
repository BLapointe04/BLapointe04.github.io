// associative arrays (objects) — replace filenames with yours in ./images/
const beforeImages = {
    "Barbie": "../../assignments/images/seaotter.jpeg",
    "Milo":   "../../assignments/images/seaotter.jpeg",
    "Luna":   "../../assignments/images/seaotter.jpeg",
    "Rocky":  "../../assignments/images/seaotter.jpeg",
    "Pip":    "../../assignments/images/seaotter.jpeg"
  };
  
  const afterImages = {
    "Barbie": "../../assignments/images/otter.jpeg",
    "Milo":   "../../assignments/images/otter.jpeg",
    "Luna":   "../../assignments/images/otter.jpeg",
    "Rocky":  "../../assignments/images/otter.jpeg",
    "Pip":    "../../assignments/images/otter.jpeg"
  };
  
  // helpers (arrow functions)
  const el = (sel) => document.querySelector(sel);
  const make = (tag, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  };
  
  // render gallery from beforeImages
  const buildGallery = () => {
    const gallery = el("#gallery");
    gallery.innerHTML = "";
  
    Object.keys(beforeImages).forEach((name) => {
      const src = beforeImages[name];
  
      const card = make("div", "card");
      const img = make("img");
      img.src = src;
      img.alt = `${name} before adoption`;
  
      const overlay = make("div", "overlay");
      overlay.innerHTML = `<span class="title">${name}</span>Please adopt ${name}`;
  
      // click → open popup with after image + title
      card.addEventListener("click", () => openPopup(name));
  
      card.appendChild(img);
      card.appendChild(overlay);
      gallery.appendChild(card);
    });
  };
  
  // popup logic
  const openPopup = (name) => {
    const popup = el("#popup");
    const title = el("#popup-title");
    const img = el("#popup-img");
  
    title.textContent = `${name} after adoption`;
    img.src = afterImages[name] || beforeImages[name]; // fallback if missing
    img.alt = `${name} after adoption`;
  
    popup.classList.remove("hidden");
    popup.setAttribute("aria-hidden", "false");
  };
  
  const closePopup = () => {
    const popup = el("#popup");
    popup.classList.add("hidden");
    popup.setAttribute("aria-hidden", "true");
  };
  
  // events
  window.addEventListener("DOMContentLoaded", () => {
    buildGallery();
  
    el("#close").addEventListener("click", closePopup);
    el("#popup").addEventListener("click", (e) => {
      if (e.target.id === "popup") closePopup(); // click backdrop
    });
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  });
  