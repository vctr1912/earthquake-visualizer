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
