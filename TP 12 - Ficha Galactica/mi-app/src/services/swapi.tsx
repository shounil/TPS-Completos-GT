import type { SwapiList, Person, Planet } from "../types";

const BASE = "https://swapi.dev/api";

export async function fetchPeoplePage1(): Promise<SwapiList<Person>> {
  const res = await fetch(`${BASE}/people/?page=1`);
  if (!res.ok) throw new Error("No se pudo cargar la lista de personajes");
  return res.json();
}

export async function fetchResource<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo cargar el recurso");
  return res.json();
}

export async function fetchPlanet(url: string): Promise<Planet> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo cargar el planeta");
  return res.json();
}
