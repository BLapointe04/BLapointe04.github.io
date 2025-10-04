class Painting {
    constructor(name, artist, image, framed = false) {
      this.name = name;
      this.artist = artist;
      this.image = image;
      this.framed = framed;
    }
  
    getSection(index) {
      return `
        <div class="painting-row" data-index="${index}" tabindex="0">
          <img src="images/${this.image}" alt="${this.name}">
          <div class="painting-info">
            <h2>${this.name}</h2>
            <p>by ${this.artist}</p>
          </div>
        </div>
      `;
    }
  
    fillModal() {
      document.getElementById("modalTitle").textContent = this.name;
      document.getElementById("modalBy").textContent = `by ${this.artist}`;
  
      const wrapper = document.getElementById("modalImgWrap");
      wrapper.className = this.framed ? "modal-img framed" : "modal-img";
      wrapper.innerHTML = `<img src="images/${this.image}" alt="${this.name}">`;
    }
  }
  
  const paintings = [
    new Painting("Fries", "Snack Pack", "fries1.jpeg", true),
    new Painting("Chef", "Kitchen Crew", "chef1.jpeg", false),
    new Painting("Otter", "Sea Life", "otter.jpeg", true),
    new Painting("Burger", "Burger Set", "burger1.jpeg", false),
    new Painting("AO1", "AO Series", "ao1.jpeg", true)
  ];
  
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = paintings.map((p, i) => p.getSection(i)).join("");
  
  const modal = document.getElementById("infoModal");
  const closeBtn = document.getElementById("modalClose");
  
  function openModal(index) {
    paintings[index].fillModal();
    modal.style.display = "block";
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  
  gallery.addEventListener("click", e => {
    const row = e.target.closest(".painting-row");
    if (!row) return;
    openModal(Number(row.dataset.index));
  });
  
  gallery.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = e.target.closest(".painting-row");
    if (!row) return;
    openModal(Number(row.dataset.index));
  });
  
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  