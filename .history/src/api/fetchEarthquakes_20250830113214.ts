// Base URL for the USGS Earthquake GeoJSON feed
const BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

export async function fetchEarthquakes(
  magnitude: string = "all",
  timeRange: string = "day"
): Promise<Earthquake[]> {

  // Construct the URL for the GeoJSON feed
  const url = `${BASE_URL}/${magnitude}_${timeRange}.geojson`;

  try {
    // Fetch data from the USGS API
    const response = await fetch(url);

    // Throw error if response is not OK (e.g., network error, 404)
    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }

    // Parse JSON response
    const data = await response.json();

    // Transform the USGS GeoJSON features into our Earthquake object structure
    return data.features.map((feature: any) => ({
      id: feature.id, // Unique earthquake ID
      magnitude: feature.properties.mag, // Magnitude
      place: feature.properties.place, // Location description
      time: feature.properties.time, // Timestamp in milliseconds
      position: [
        feature.geometry.coordinates[1], // Latitude
        feature.geometry.coordinates[0], // Longitude
        feature.geometry.coordinates[2], // Depth (in km)
      ],
    }));

  } catch (error: any) {
    // Log error and re-throw to be handled by calling code
    console.error("Error fetching earthquakes:", error);
    throw error;
  }
}
