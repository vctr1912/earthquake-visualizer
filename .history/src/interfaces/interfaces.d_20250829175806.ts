interface EarthquakeFeed {
  count: number;
  earthquakes: Earthquake[];
}

interface Earthquake {
  id: string;
  magnitude: number | null;
  place: string;
  time: number;
  latitude: number;
  longitude: number;
  depth: number;
  title: string;
}

interface MapLayer {
  id: string;
  name: string;
  url: string;
  attribution: string;
}

interface MarkerData {
  id: string;
  magnitude: number,
  place: string;
  time: number
  position: [number, number, number];
}