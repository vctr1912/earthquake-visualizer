import React, { useEffect, useState } from "react";

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

interface EarthquakeFetcherProps {
  minMagnitude?: number;  // default: 0
  timeRange?: "hour" | "day" | "week" | "month"; // default: day
  onData: (data: EarthquakeFeed) => void;
}

const EarthquakeFetcher: React.FC<EarthquakeFetcherProps> = ({
  minMagnitude = 0,
  timeRange = "day",
  onData,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      setLoading(true);

      // USGS API URL based on time & magnitude
      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const feed: EarthquakeFeed = {
          count: data.metadata.count,
          earthquakes: data.features
            .map((f: any): Earthquake => {
              const [longitude, latitude, depth] = f.geometry.coordinates;
              return {
                id: f.id,
                magnitude: f.properties.mag,
                place: f.properties.place,
                time: f.properties.time,
                latitude,
                longitude,
                depth,
                title: f.properties.title,
              };
            })
            .filter((eq: Earthquake) => (eq.magnitude ?? 0) >= minMagnitude),
        };

        onData(feed);
      } catch (err) {
        console.error("Failed to fetch earthquake data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, [minMagnitude, timeRange, onData]);

  return <>{loading && <p>Loading earthquakes...</p>}</>;
};

export default EarthquakeFetcher;
