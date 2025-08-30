import React, { useState } from "react";
import EarthquakeFetcher from "./api/EarthquakeFetcher";

function App() {
  const [data, setData] = useState<any>(null);

  return (
    <div>
      <h1 className="text-xl font-bold">🌍 Earthquake Visualizer</h1>
      
      <EarthquakeFetcher 
        minMagnitude={3}
        timeRange="day"
        onData={(feed) => setData(feed)}
      />

      {data && (
        <div>
          <p>Total Earthquakes: {data.count}</p>
          <ul>
            {data.earthquakes.slice(0, 5).map((eq) => (
              <li key={eq.id}>
                {eq.title} — {new Date(eq.time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
