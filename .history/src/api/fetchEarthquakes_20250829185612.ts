const BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summar";

export async function fetchEarthquakes(
  magnitude: string = "all",
  timeRange: string = "day"
): Promise<Earthquake[]> {
  const url = `${BASE_URL}/${magnitude}_${timeRange}.geojson`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }

    const data = await response.json();

    // Transform GeoJSON into Earthquake[]
    return data.features.map((feature: any) => ({
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
  } catch (error: any) {
    console.error("Error fetching earthquakes:", error);
    throw error; //rethrow so UI can handle it
  }
}
