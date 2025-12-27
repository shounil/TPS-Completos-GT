const words = [
  'californication','plataforma5','black','summer','flea','aeroplane','peppers',
  'unlimited','arcadium','love','getaway','stadium','quixoticelixer','quarter',
  'snow','dylan','zephyr','funky','chili'
];

const randomWordEl = document.getElementById("randomWord");
const textEl = document.getElementById("text");
const timeEl = document.getElementById("timeSpan");
const scoreEl = document.getElementById("score");
const endgameEl = document.getElementById("end-game-container");
const mainEl = document.querySelector(".main");

let palabraAleatoria;
let score = 0;
let time = 10;

textEl.focus();

function randomWords() {
  return words[Math.floor(Math.random() * words.length)];
}

function addToDOM() {
  palabraAleatoria = randomWords();
  randomWordEl.innerText = palabraAleatoria;
}

addToDOM();

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function actualizarTiempo() {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

let timeInterval = setInterval(actualizarTiempo, 1000);

textEl.addEventListener("input", (e) => {
  const palabraIngresada = e.target.value;
  if (palabraIngresada === palabraAleatoria) {
    addToDOM();
    updateScore();
    e.target.value = "";
    time += 3;
    actualizarTiempo();
  }
});

function gameOver() {
  mainEl.style.display = "none";
  endgameEl.innerHTML = `
    <h2>⏰ ¡Tiempo terminado!</h2>
    <p>Tu puntaje final: ${score}</p>
    <button onclick="location.reload()">Reiniciar</button>
  `;
  endgameEl.style.display = "block";
}
