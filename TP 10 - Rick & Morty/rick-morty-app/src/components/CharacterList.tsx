import { useEffect, useMemo, useRef, useState } from "react";
import "../index.css";
import { fetchCharacters } from "../services/api";
import type { Character } from "../types";

type Props = {
  onSelect: (character: Character) => void;
  initialPage: number;
  initialName: string;
  initialStatus: "" | "alive" | "dead" | "unknown";
  onListStateChange: (s: { page:number; name:string; status:""|"alive"|"dead"|"unknown" }) => void;
};

export default function CharacterList({
  onSelect, initialPage, initialName, initialStatus, onListStateChange
}: Props){
  const [page, setPage] = useState(initialPage);
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<""|"alive"|"dead"|"unknown">(initialStatus);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Character[]>([]);
  const [pages, setPages] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    fetchCharacters(page, name, status)
      .then((data) => {
        if (cancel) return;
        setList(data.results || []);
        setPages(data.info.pages || 0);
      })
      .catch(() => {
        if (cancel) return;
        setList([]);
        setPages(0);
      })
      .finally(() => !cancel && setLoading(false));
    return () => { cancel = true; };
  }, [page, name, status]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement === inputRef.current) {
        setPage(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    onListStateChange({ page, name, status });
  }, [page, name, status, onListStateChange]);

  const pageNumbers = useMemo(() => {
    const total = pages;
    if (total <= 1) return [1];
    const windowSize = 7;
    let start = Math.max(1, page - Math.floor(windowSize/2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const arr:number[] = [];
    for (let i=start; i<=end; i++) arr.push(i);
    return arr;
  }, [page, pages]);

  return (
    <div style={{display:"grid", gap:16}}>
      {/* Buscador y filtro */}
      <div className="row">
        <input
          ref={inputRef}
          className="input grow"
          placeholder="Buscar por nombre…"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <select
          className="select"
          value={status}
          onChange={(e)=>{ setStatus(e.target.value as any); setPage(1); }}
        >
          <option value="">Estado: Todos</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <button className="btn" onClick={()=>setPage(1)}>🔎 Buscar</button>
      </div>

      {/* Grilla */}
      {loading ? (
        <div className="character-grid">
          {Array.from({length:6}).map((_,i)=>(
            <div className="card skel-card" key={i}>
              <div className="skel-box skel-img"></div>
              <div className="skel-box skel-line"></div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div style={{textAlign:"center", padding:"48px 0", opacity:.85}}>
          No se encontraron personajes.
        </div>
      ) : (
        <div className="character-grid">
          {list.map((ch)=>(
            <div className="card" key={ch.id} onClick={()=>onSelect(ch)} role="button" tabIndex={0}
              onKeyDown={(e)=>{ if(e.key==="Enter"){ onSelect(ch); }}}>
              <img src={ch.image} alt={ch.name} />
              <div className="title">{ch.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="pagination">
        <button className="btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>◀</button>
        {pageNumbers.map((n)=>(
          <button
            key={n}
            className={`page-btn ${n===page ? "active":""}`}
            onClick={()=>setPage(n)}
            aria-current={n===page ? "page": undefined}
          >{n}</button>
        ))}
        <button className="btn" onClick={()=>setPage(p=>Math.min(pages || p+1, p+1))} disabled={pages===0 || page>=pages}>▶</button>
      </div>
    </div>
  );
}
