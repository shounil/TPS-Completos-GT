import { useEffect } from "react";
import "../index.css";
import type { Character } from "../types";

type Props = { character: Character; onBack: () => void; };

export default function CharacterDetail({ character, onBack }: Props){
  useEffect(()=>{
    const handler = (e: KeyboardEvent)=>{ if(e.key==="Escape") onBack(); };
    window.addEventListener("keydown", handler);
    return ()=> window.removeEventListener("keydown", handler);
  }, [onBack]);

  return (
    <div className="detail-wrap" style={{display:"grid", gap:16}}>
      <div>
        <button className="btn" onClick={onBack}>← Volver</button>
      </div>

      <div className="detail-card">
        <div className="detail-top">
          <img className="detail-img" src={character.image} alt={character.name} />
          <div style={{flex:1}}>
            <div className="h1" style={{marginBottom:8}}>{character.name}</div>
            <div className="badges">
              <span className="badge">{character.status}</span>
              <span className="badge">{character.species}</span>
              {character.gender !== "unknown" && <span className="badge">{character.gender}</span>}
            </div>
            <div style={{marginTop:10}} className="small-dim">
              <div><strong>Origen:</strong> {character.origin?.name || "—"}</div>
              <div><strong>Ubicación actual:</strong> {character.location?.name || "—"}</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontWeight:700, marginBottom:6}}>Apariciones (episodios):</div>
          <ul className="list">
            {character.episode.slice(0,20).map((epUrl)=>{
              const id = epUrl.split("/").pop();
              return <li key={epUrl}>Episodio #{id}</li>;
            })}
            {character.episode.length > 20 && (
              <li>… y {character.episode.length - 20} más</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
