interface MapLayer {
  id: string;
  name: string;
  url: string;
  attribution: string;
}

interface Earthquake {
  id: string;
  magnitude: number,
  place: string;
  time: number
  position: [number, number, number];
}