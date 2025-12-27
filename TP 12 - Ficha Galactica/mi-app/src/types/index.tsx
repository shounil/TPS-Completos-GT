export interface SwapiList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Person {
  name: string;
  height: string;
  birth_year: string;
  url: string;
  homeworld: string;
}

export interface Planet {
  name: string;
}
