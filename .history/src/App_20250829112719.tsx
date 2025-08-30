import React from 'react';
import reactLogo from './assets/react.svg';
import SimpleMap from './components/MapView';
import "leaflet/dist/leaflet.css";

function App() {

  return (
    <div>
      <h1>My Leaflet.js and React Map</h1>
      <SimpleMap />
    </div>
  )
}

export default App
