// -----------------------------
// Variables DOM
// -----------------------------
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
const header = document.querySelector("header");

// -----------------------------
// Variables del juego
// -----------------------------
let numSquares = 6;         // por defecto Hard (6)
let colors;                 // arreglo de colores actual
let pickedColor;            // color ganador
let h1DefaultBg = header.style.backgroundColor;

// -----------------------------
// Inicializar
// -----------------------------
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// -----------------------------
function setupModeButtons() {
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // manejamos la clase selected
      modeButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // numSquares según texto del botón (Easy -> 3, Hard -> 6)
      numSquares = (btn.textContent.trim().toLowerCase() === "easy") ? 3 : 6;
      reset();
    });
  });
}

// -----------------------------
function setupSquares() {
  squares.forEach((sq, i) => {
    sq.addEventListener("click", function() {
      // obtener el color actual (del pseudo-elemento usamos style.backgroundColor del elemento)
      // en este diseño, seteo color en sq.style.backgroundColor
      const clickedColor = sq.style.backgroundColor;

      if (!clickedColor) return; // seguridad

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        changeColors(pickedColor);
        header.style.boxShadow = `0 8px 40px rgba(120,60,255,0.35), 0 0 80px ${pickedColor}`;
        resetButton.textContent = "Play Again?";
      } else {
        // "apagar" el cuadrado: lo ocultamos con clase hidden
        sq.classList.add("hidden");
        messageDisplay.textContent = "Intentá nuevamente";
      }
    });
  });
}

// -----------------------------
function reset() {
  // generar array de colores
  colors = generateRandomColors(numSquares);
  // elegir el ganador
  pickedColor = pickColor();
  // mostrar el RGB en el h1
  colorDisplay.textContent = pickedColor;
  // resetear texto y botón
  messageDisplay.textContent = "";
  resetButton.textContent = "Nuevos Colores";
  // reset header estilos
  header.style.boxShadow = `0 6px 30px rgba(110,60,255,0.12)`;

  // asignar colores a cuadrados y mostrar/ocultar según numSquares
  squares.forEach((sq, i) => {
    // quitar clase hidden por si venía de antes
    sq.classList.remove("hidden");
    if (colors[i]) {
      sq.style.display = "block";
      sq.style.backgroundColor = colors[i];
      // también seteo pseudo via after: lo resolvemos con backgroundColor en el elemento
    } else {
      // ocultar cuadrados extra (modo Easy)
      sq.style.display = "none";
    }
  });
}

// -----------------------------
resetButton.addEventListener("click", () => {
  reset();
});

// -----------------------------
function changeColors(color) {
  // cambiar todos los cuadrados al color ganador y asegurar que estén visibles
  squares.forEach(sq => {
    sq.style.display = "block";
    sq.classList.remove("hidden");
    sq.style.backgroundColor = color;
  });
}

// -----------------------------
function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// -----------------------------
function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// -----------------------------
function randomColor() {
  // r, g, b entre 0 y 255
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
