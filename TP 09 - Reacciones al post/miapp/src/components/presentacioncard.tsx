// import Core from "smooothy";

type Props ={
    nombre: string;
    apellido: string;
    onSaludar: (nombre: string, apellido: string) => void;
}

function presentacioncard({ nombre, apellido, onSaludar}: Props){
    return(
        <>
        <h2>Presentacion</h2>
        <p>Nombre: {nombre}</p>
        <p>Apellido: {apellido}</p>
        <button onClick={() => onSaludar (nombre, apellido)}>Saludar</button>

        <div style={{marginTop: '1Rem'}}> </div>
            <canvas></canvas>
        </>
    )
}

export default presentacioncard