// evaluador de rendimiento

const evaluar = (nota) => {
    let mensaje;

    if (nota >= 0 && nota < 2) {
        mensaje = "muy mal";
    } else if (nota >= 2 && nota < 5) {
        mensaje = "mal";
    } else if (nota >= 5 && nota < 7) {
        mensaje = "tan cerca pero tan lejos";
    } else if (nota >= 7 && nota < 9) {
        mensaje = "bien ahi";
    } else if (nota >= 9 && nota <= 10) {
        mensaje = "muy bien!!";
    } else {
        mensaje = "nota invalida";
    }

    return mensaje;
}
let notaUsuario = Number(prompt("Ingrese una nota del 0 al 10"));

console.log(evaluar(notaUsuario));
