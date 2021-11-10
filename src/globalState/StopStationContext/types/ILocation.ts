export interface ILocation {
  id: string;
  name: string;
  address: string;
  location: Location;
  score: number;
  attributes: Attributes;
  extent: Extent;
}
export interface Location {
  x: number;
  y: number;
}
export interface Attributes {}
export interface Extent {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}
