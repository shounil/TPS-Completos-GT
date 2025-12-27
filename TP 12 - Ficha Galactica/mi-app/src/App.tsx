import StarForm from "./components/StarForm";

export default function App(){
  return (
    <div className="container" style={{display:"grid", gap:16}}>
      <h1 className="h1">Ficha galáctica — Star Wars</h1>
      <StarForm />
      <hr className="hr" />
      <div className="small">TP 12 GENERACION T - SOSA THIAGO</div>
    </div>
  );
}
