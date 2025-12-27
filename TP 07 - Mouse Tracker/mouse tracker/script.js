const imagen = document.querySelector(".raton");
const body = document.querySelector("body");

let mousePresionado = false;

body.addEventListener("mousedown", () => {
    mousePresionado = true;
});

body.addEventListener("mouseup", () => {
    mousePresionado = false;
});

body.addEventListener("mousemove", (evento) => {
if (mousePresionado) {
    imagen.style.top = evento.clientY + "px";
    imagen.style.left = evento.clientX + "px";
}
});
