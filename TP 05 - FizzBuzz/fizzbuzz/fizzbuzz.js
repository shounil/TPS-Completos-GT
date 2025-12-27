let palabra1 = prompt("ingresa la primera palabra (fizz):");
let palabra2 = prompt("ingresa la segunda palabra (buzz):");

let fizz_num = Number(
    prompt("ingresa el número multiplo para la primera palabra:")
);
let buzz_num = Number(
    prompt("ingresa el número multiplo para la segunda palabra:")
);

let limite = Number(prompt("hasta que numero queres contar?"));

// función principal
function fizzBuzz2(palabra1, palabra2, fizz_num, buzz_num, limite) {
    let resultado = [];

    for (let i = 1; i <= limite; i++) {
        if (i % fizz_num === 0 && i % buzz_num === 0) {
            resultado.push(palabra1 + palabra2);
        } else if (i % fizz_num === 0) {
            resultado.push(palabra1);
        } else if (i % buzz_num === 0) {
            resultado.push(palabra2);
        } else {
            resultado.push(i);
    }
    }

    return resultado.join(", ");
}

// mostrar el resultado final
console.log(fizzBuzz2(palabra1, palabra2, fizz_num, buzz_num, limite));
