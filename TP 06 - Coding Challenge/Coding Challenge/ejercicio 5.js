// agregar anio de nacimiento

function agregarAnioNacimiento(personas) {
    const anioActual = new Date().getFullYear();

    return personas.map(persona => {
        return {
            ...persona, 
            anioNacimiento: anioActual - persona.edad
        };
    });
}

// Test
let personas = [
    { nombre: "Juan", edad: 19 },
    { nombre: "Mario", edad: 22 },
    { nombre: "Thiago", edad: 18 },
    { nombre: "Abril", edad: 17 },
    
];

console.log(agregarAnioNacimiento(personas));
