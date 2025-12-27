//FrootLoop
lefrutasYVerduras = [{ fruta: "banana" },{ verdura: "apio" },{ fruta: "manzana" },{ fruta: "frutilla" },{ verdura: "zanahoria" },{ fruta: "kiwi" },{ fruta: "sandia" },{ fruta: "melon" },{ verdura: "repollo" },{ fruta: "mango" }
];

function filtrarFrutas(lista) {
    const frutas = lista
        .filter(item => item.fruta)
        .map(item => item.fruta);

    return { frutas };
}

console.log(filtrarFrutas(frutasYVerduras));
