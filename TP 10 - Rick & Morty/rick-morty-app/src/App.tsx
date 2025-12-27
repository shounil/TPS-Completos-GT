import { useCallback, useState } from "react";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import type { Character } from "./types";

export default function App() {
  const [selected, setSelected] = useState<Character | null>(null);
  const [listState, setListState] = useState<{page:number; name:string; status:""|"alive"|"dead"|"unknown"}>({
    page:1, name:"", status:""
  });

  const handleSelect = useCallback((ch: Character) => setSelected(ch), []);
  const handleBack = useCallback(() => setSelected(null), []);

  return (
    <div className="container">
      <h1 className="h1">Rick & Morty — Personajes</h1>
      {selected ? (
        <CharacterDetail character={selected} onBack={handleBack} />
      ) : (
        <CharacterList
          onSelect={handleSelect}
          initialPage={listState.page}
          initialName={listState.name}
          initialStatus={listState.status}
          onListStateChange={setListState}
        />
      )}
      <hr className="hr" />
      <div style={{fontSize:12, opacity:.6}}>TP 10 GENERACION T - HECHO POR SOSA THIAGO </div>
    </div>
  );
}
