const drawBtn = document.getElementById("drawBtn");
const sky = document.getElementById("sky");

drawBtn.addEventListener("click", () => {
  sky.innerHTML = "";
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  document.querySelector(".scene").style.backgroundColor = isNight ? "black" : "skyblue";

  for (let i = 0; i < 6; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = `${50 + i * 140}px`;
    sky.appendChild(cloud);
  }

  for (let i = 0; i < 6; i++) {
    const tree = document.createElement("div");
    tree.classList.add("tree");
    tree.style.left = `${60 + i * 140}px`;

    const leaves = document.createElement("div");
    leaves.classList.add("leaves");
    const trunk = document.createElement("div");
    trunk.classList.add("trunk");

    tree.appendChild(leaves);
    tree.appendChild(trunk);
    sky.appendChild(tree);
  }

  const star = document.createElement("div");
  star.classList.add(isNight ? "moon" : "sun");
  sky.appendChild(star);
});
