export interface IStop {
  type: string;
  geometry: Geometry;
  properties: Properties;
  locationDistance?: number;
}
export interface Geometry {
  type: string;
  coordinates: number[] | null;
}
export interface Properties {
  name: string;
  atcoCode?: string;
  crs?: string;
  type: string;
  stopInfo: string;
  departures: string;
}
