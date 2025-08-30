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
  position: [number, number];
  title: string;
  description: string;
  color?: string;
  size?: number;
}