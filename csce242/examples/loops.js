document.getElementById("btn-display").onclick = () => {
    const displaySection = document.getElementById("loop result");
    const ul = document.createdElement("ul");
    displaySection.append(ul);

    for(let i=0; i<10; i++) {
        displaySection.innerHTML += i;
        const li = document.createElement("li");
    }
}