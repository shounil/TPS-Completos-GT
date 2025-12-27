import { useEffect, useMemo, useState } from "react";
import { fetchPeoplePage1, fetchResource, fetchPlanet } from "../services/swapi";
import type { Person, Planet } from "../types";

type SavedFicha = {
  url: string;
  apodo: string;
  favorito: boolean;
  person: Pick<Person, "name" | "height" | "birth_year" | "homeworld">;
  planetName?: string;
};

const STORAGE_KEY = "ficha_galactica_v1";

export default function StarForm(){

  const [people, setPeople] = useState<Person[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [errorList, setErrorList] = useState<string | null>(null);

  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [person, setPerson] = useState<Person | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loadingPerson, setLoadingPerson] = useState(false);

  const [apodo, setApodo] = useState("");
  const [favorito, setFavorito] = useState(false);
  const apodoError = useMemo(()=> apodo.trim().length>0 && apodo.trim().length < 2 ? "El apodo debe tener al menos 2 caracteres" : "", [apodo]);

  const [saved, setSaved] = useState<SavedFicha | null>(null);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        const parsed: SavedFicha = JSON.parse(raw);
        setSaved(parsed);
        setApodo(parsed.apodo);
        setFavorito(parsed.favorito);
        setSelectedUrl(parsed.url);
      }
    }catch{ /* ignore */ }
  }, []);

  useEffect(()=>{
    let cancel = false;
    setLoadingList(true);
    fetchPeoplePage1()
      .then((d)=>{
        if(cancel) return;
        setPeople(d.results);
        if(!saved && d.results[0]) setSelectedUrl(d.results[0].url);
      })
      .catch((e)=>!cancel && setErrorList(e.message || "Error desconocido"))
      .finally(()=>!cancel && setLoadingList(false));
    return ()=>{ cancel = true; };
  }, []); 

  useEffect(()=>{
    if(!selectedUrl) { setPerson(null); setPlanet(null); return; }
    let cancel=false;
    setLoadingPerson(true);
    fetchResource<Person>(selectedUrl)
      .then(async (p)=>{
        if(cancel) return;
        setPerson(p);
        setPlanet(null);
        if(p.homeworld){
          try{
            const pl = await fetchPlanet(p.homeworld);
            if(!cancel) setPlanet(pl);
          }catch{/* opcional */}
        }
      })
      .finally(()=>!cancel && setLoadingPerson(false));
    return ()=>{ cancel=true; };
  }, [selectedUrl]);

  function onSave(){
    if(apodoError) return;
    if(!person) return;
    const payload: SavedFicha = {
      url: selectedUrl,
      apodo: apodo.trim(),
      favorito,
      person: { name: person.name, height: person.height, birth_year: person.birth_year, homeworld: person.homeworld },
      planetName: planet?.name
    };
    setSaved(payload);
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); }catch{ /* ignore */ }
  }

  function onClear(){
    setSaved(null);
    try{ localStorage.removeItem(STORAGE_KEY); }catch{}
  }

  return (
    <div className="card" style={{display:"grid", gap:16}}>
      <div className="col">
        <label>Personaje</label>
        {loadingList ? (
          <div className="skeleton" style={{height:40}} />
        ) : errorList ? (
          <div className="alert err">{errorList}</div>
        ) : (
          <select
            className="select"
            value={selectedUrl}
            onChange={(e)=>setSelectedUrl(e.target.value)}
          >
            {people.map(p=>(
              <option key={p.url} value={p.url}>{p.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className="col">
        <label>Vista previa</label>
        <div className="card" style={{display:"grid", gap:8, padding:12}}>
          {loadingPerson || !person ? (
            <>
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
            </>
          ) : (
            <div className="kv">
              <b>Nombre</b><div>{person.name}</div>
              <b>Altura</b><div>{person.height} cm</div>
              <b>Nacimiento</b><div>{person.birth_year}</div>
              {planet && (<><b>Planeta</b><div>{planet.name}</div></>)}
            </div>
          )}
        </div>
        <div className="small">Se actualiza al cambiar el select, sin recargar.</div>
      </div>

      <div className="col">
        <label>Tu ficha</label>
        <div className="row">
          <input
            className="input"
            placeholder="Apodo en tu ficha"
            value={apodo}
            onChange={(e)=>setApodo(e.target.value)}
          />
          <label className="checkbox">
            <input type="checkbox" checked={favorito} onChange={(e)=>setFavorito(e.target.checked)} />
            ¿Es tu favorito?
          </label>
          <button className="btn primary" onClick={onSave} disabled={!!apodoError || !person}>Guardar ficha</button>
          {saved && <button className="btn" onClick={onClear}>Limpiar guardado</button>}
        </div>
        {apodoError && <div className="alert warn" style={{marginTop:8}}>{apodoError}</div>}
      </div>

      <div className="col">
        <label>Resumen</label>
        <div className="card" style={{display:"grid", gap:8}}>
          {saved ? (
            <>
              <div className="small">Guardado en localStorage.</div>
              <div className="kv">
                <b>Personaje</b><div>{saved.person.name}</div>
                <b>Altura</b><div>{saved.person.height} cm</div>
                <b>Nacimiento</b><div>{saved.person.birth_year}</div>
                {saved.planetName && (<><b>Planeta</b><div>{saved.planetName}</div></>)}
                <b>Apodo</b><div className="mono">{saved.apodo}</div>
                <b>Favorito</b><div>{saved.favorito ? "Sí" : "No"}</div>
              </div>
            </>
          ) : (
            <div className="small">Todavía no guardaste la ficha.</div>
          )}
        </div>
      </div>
    </div>
  );
}
