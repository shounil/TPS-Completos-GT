//dispenserGaseosas

function dispenserGaseosas(gaseosas, unidades) {
    let gaseosasEnStock = {};

    for (let i = 0; i < gaseosas.length; i++) {
        gaseosasEnStock[gaseosas[i]] = unidades[i];
    }

    return function consultar(nombreGaseosa) {
        if (gaseosasEnStock[nombreGaseosa] > 0) {
            return `${nombreGaseosa} esta en stock, ${gaseosasEnStock[nombreGaseosa]} unidades`;
        } else if (gaseosasEnStock[nombreGaseosa] === 0) {
            return `${nombreGaseosa} esta agotada`;
        } else {
            return `${nombreGaseosa} no es una marca con la que trabajamos`;
        }
    }
}

let gaseosas = ["cocacola", "sprite", "fanta", "seven up"];
let unidades = [1, 2, 3, 4];

let consultarStock = dispenserGaseosas(gaseosas, unidades);

console.log(consultarStock("sprite"));// hay dos unidades d sprite
console.log(consultarStock("pepsi"));// no laburamos con pepsi
console.log(consultarStock("cocacola"));// hay una sola cocacola 
