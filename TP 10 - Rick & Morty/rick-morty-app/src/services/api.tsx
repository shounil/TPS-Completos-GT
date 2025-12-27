import type { CharacterListResponse, Character } from "../types";

const BASE = "https://rickandmortyapi.com/api";

export async function fetchCharacters(
  page: number,
  name: string,
  status: "" | "alive" | "dead" | "unknown"
): Promise<CharacterListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (name.trim()) params.set("name", name.trim());
  if (status) params.set("status", status);

  const res = await fetch(`${BASE}/character?${params.toString()}`);
  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error("Error al cargar personajes");
  }
  return res.json();
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) throw new Error("Error al cargar el personaje");
  return res.json();
}
