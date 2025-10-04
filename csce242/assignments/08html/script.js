class Painting {
  constructor(name, artist, image, framed = false) {
    this.name = name;
    this.artist = artist;
    this.image = image;
    this.framed = framed;
  }

  getSection(index) {
    return `
      <div class="card" data-index="${index}" tabindex="0" aria-label="${this.name} by ${this.artist}">
        <span class="card__imgwrap">
          <img src="images/${this.image}" alt="${this.name}">
        </span>
        <div class="card__title">${this.name}</div>
        <div class="card__by">by ${this.artist}</div>
      </div>
    `;
  }

  fillModal() {
    document.getElementById("modalTitle").textContent = this.name;
    document.getElementById("modalBy").textContent = `by ${this.artist}`;
    const wrap = document.getElementById("modalImgWrap");
    wrap.className = this.framed ? "modal-img framed" : "modal-img";
    wrap.innerHTML = `<img src="images/${this.image}" alt="${this.name}">`;
  }
}

const paintings = [
  new Painting("Gorilla", "Wildlife", "gorilla.jpeg", true),
  new Painting("Chef", "Kitchen Crew", "chef1.jpeg", false),
  new Painting("Otter", "Sea Life", "otter.jpeg", true),
  new Painting("Burger", "Burger Set", "burger1.jpeg", false),
  new Painting("Fries", "Snack Pack", "fries1.jpeg", true)
];

const container = document.getElementById("main");
container.innerHTML = paintings.map((p, i) => p.getSection(i)).join("");

const modal = document.getElementById("infoModal");
const closeBtn = document.getElementById("modalClose");

function openModal(index) {
  paintings[index].fillModal();
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

container.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  openModal(Number(card.dataset.index));
});

container.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".card");
  if (!card) return;
  openModal(Number(card.dataset.index));
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
