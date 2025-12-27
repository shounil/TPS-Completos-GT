// TP Puedo jubilarme

function calcularJubilacion() {
let edad = Number(prompt("ingresá tu edad:"));
let genero = prompt("ingresá tu género (f o m):");

if (genero === "f" && edad >= 60) {
    console.log("podés jubilarte (mujer, 60+)");
} else if (genero === "m" && edad >= 65) {
    console.log("podés jubilarte (hombre, 65+)");
} else {
    console.log("todavía no podés jubilarte.");
}
}

calcularJubilacion(); // ejecutamos la función
