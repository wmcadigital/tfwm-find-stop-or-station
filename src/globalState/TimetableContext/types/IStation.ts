export interface IStation {
  id: string | null;
  name: string;
  address?: string[] | null;
  postcode: string;
  nationalLocationCode: string;
  sixteenCharacterName: string;
  lat: number;
  lon: number;
  hasDisruptions: boolean;
  disruptionSeverity: string;
  lines?: string[] | null;
  disruptionTimeWindow?: null;
  updatedAt?: null;
  mode: string;
}
