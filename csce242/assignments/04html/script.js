/* Assignment 7 – JavaScript (arrow functions + const) */

/* ============ Sunny Times ============ */
const sunnyCard = document.getElementById('sunny-card');
const sunnyLines = document.querySelectorAll('#sunny-lines .line');
const LYRICS = [
  'Here comes the sun',
  'Sun',
  'Sun',
  'Sun',
  'Here it comes'
];

// Fill lines when the card is clicked
const fillSunny = () => {
  sunnyLines.forEach((p, i) => { p.textContent = LYRICS[i] ?? ''; });
};
sunnyCard.addEventListener('click', fillSunny);

/* ============ Select A Color ============ */
const colorInput = document.getElementById('color-input');
const colorDemo  = document.getElementById('color-demo');
const colorCode  = document.getElementById('color-code');

const toHex = (val) => {
  // Normalize to #RRGGBB uppercase
  let v = String(val).trim();
  if (/^#[0-9a-f]{3}$/i.test(v)) {
    v = '#' + v.slice(1).split('').map((c) => c + c).join('');
  }
  return v.toUpperCase();
};

const applyColor = () => {
  const hex = toHex(colorInput.value);
  colorDemo.style.color = hex;
  colorCode.textContent = hex;
};

colorInput.addEventListener('input', applyColor);
applyColor(); // set initial state

/* ============ Image Change ============ */
const img = document.getElementById('weather-img');

// inline SVGs as data URIs (same aspect ratio)
const CLOUDY_SVG =
  "data:image/svg+xml;utf8," +
  "<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'><rect width='160' height='120' fill='%23e5f0ff'/><circle cx='55' cy='68' r='22' fill='white'/><circle cx='74' cy='62' r='24' fill='white' opacity='0.95'/><circle cx='96' cy='68' r='18' fill='white' opacity='0.95'/><rect x='0' y='80' width='160' height='40' fill='%238bb6ff'/><rect x='0' y='90' width='160' height='30' fill='%23689dff'/></svg>";

const SUNNY_SVG =
  "data:image/svg+xml;utf8," +
  "<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'><rect width='160' height='120' fill='%23fff7d6'/><circle cx='80' cy='60' r='24' fill='%23ffd54d'/><g stroke='%23ffb300' stroke-width='4'><line x1='80' y1='10' x2='80' y2='0'/><line x1='80' y1='120' x2='80' y2='110'/><line x1='10' y1='60' x2='0' y2='60'/><line x1='160' y1='60' x2='150' y2='60'/><line x1='22' y1='22' x2='14' y2='14'/><line x1='146' y1='106' x2='138' y2='98'/><line x1='22' y1='98' x2='14' y2='106'/><line x1='146' y1='14' x2='138' y2='22'/></g></svg>";

const toggleWeather = () => {
  const state = img.dataset.state;
  if (state === 'cloudy') {
    img.src = SUNNY_SVG;
    img.dataset.state = 'sunny';
  } else {
    img.src = CLOUDY_SVG;
    img.dataset.state = 'cloudy';
  }
};

img.addEventListener('click', toggleWeather);
