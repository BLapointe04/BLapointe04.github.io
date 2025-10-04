class Painting {
  constructor(name, artist, image) {
    this.name = name;
    this.artist = artist;
    this.image = image;
  }

  getSection() {
    return `
      <div class="card">
        <img src="images/${this.image}" alt="${this.name}">
        <h2>${this.name}</h2>
        <p>by ${this.artist}</p>
      </div>
    `;
  }
}

const paintings = [
  new Painting("Gorilla", "Wildlife", "gorilla.jpeg"),
  new Painting("Chef", "Kitchen Crew", "chef1.jpeg"),
  new Painting("Otter", "Sea Life", "otter.jpeg"),
  new Painting("Burger", "Burger Set", "burger1.jpeg"),
  new Painting("Fries", "Snack Pack", "fries1.jpeg")
];

const container = document.getElementById("main");
container.innerHTML = paintings.map(p => p.getSection()).join("");
