// Ejercicio 2: The Biggest One

function biggestOne(num1, num2, palabra) {
    if (num1 > num2) {
        return num1;
    } else if (num2 > num1) {
        return num2;
    } else {
        let primera = palabra[0];
        let ultima = palabra[palabra.length - 1];
        return primera + ultima;
    }
}
console.log(biggestOne(16, 2, "Haz"));
console.log(biggestOne(3, 3, "Haz"));
