
const toggleBtn = document.getElementById('toggleBtn');
const menuList = document.getElementById('menuList');

toggleBtn.addEventListener('click', function () {
  const showing = menuList.classList.toggle('show');
  toggleBtn.textContent = showing ? 'Menu ▲' : 'Menu ▼';
  toggleBtn.setAttribute('aria-expanded', showing ? 'true' : 'false');
});


menuList.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && e.target.matches('li[data-goto]')) {
    goTo(e.target.getAttribute('data-goto'));
  }
});


function goTo(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // close the small menu after navigating
  if (menuList.classList.contains('show')) {
    menuList.classList.remove('show');
    toggleBtn.textContent = 'Menu ▼';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

menuList.addEventListener('click', function (e) {
  if (e.target.matches('li[data-goto]')) {
    goTo(e.target.getAttribute('data-goto'));
  }
});


const days = document.getElementById('days');
const daysOut = document.getElementById('daysOut');
const plantPic = document.getElementById('plantPic');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');

function updatePlant() {
  const d = parseInt(days.value, 10);
  daysOut.textContent = d;
  line1.textContent = `It’s been ${d} ${d === 1 ? 'day' : 'days'} since watering your plant`;

  if (d >= 1 && d <= 2) {
    plantPic.textContent = '🌱';                         // healthy
    line2.textContent = 'Your plant is healthy and happy';
  } else if (d >= 3 && d <= 5) {
    plantPic.textContent = '💧🌿';                      // needs water
    line2.textContent = 'Your plant needs watering';
  } else if (d >= 6 && d <= 9) {
    plantPic.textContent = '🥀';                         // drooping
    line2.textContent = 'Leaves are dropping, water soon';
  } else {                                              // 10–12
    plantPic.textContent = '🪴✖️';                      // gone
    line2.textContent = 'Sorry, your plant is no longer with us';
  }
}

days.addEventListener('input', updatePlant);
updatePlant();


const clockEl = document.getElementById('clockTime');

function formatTime(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h < 12 ? 'am' : 'pm';
  h = h % 12;
  if (h === 0) h = 12;
  const mm = String(m).padStart(2, '0');
  return `${h}:${mm} ${ampm}`;
}

function drawClock() {
  clockEl.textContent = formatTime(new Date());
}


drawClock();
setInterval(drawClock, 60000);
