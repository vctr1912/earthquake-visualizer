const BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

export async function fetchEarthquakes(
  magnitude: string = "all",
  timeRange: string = "day"
): Promise<Earthquake[]> {
  try {
    const url = `${BASE_URL}/${magnitude}_${timeRange}.geojson`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }

    const data = await response.json();

    // Transform GeoJSON into Earthquake[]
    const earthquakes: Earthquake[] = data.features.map((feature: any) => ({
      id: feature.id,
      magnitude: feature.properties.mag,
      place: feature.properties.place,
      time: feature.properties.time,
      position: [
        feature.geometry.coordinates[1], // latitude
        feature.geometry.coordinates[0], // longitude
        feature.geometry.coordinates[2], // depth
      ],
    }));

    return earthquakes;
  } catch (error) {
    console.error("Error fetching earthquakes:", error);
    return [];
  }
}
