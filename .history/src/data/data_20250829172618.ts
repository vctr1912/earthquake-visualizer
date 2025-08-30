export const mapLayers = [
    {
      id: 'openstreetmap',
      name: 'Street Map',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      id: 'satellite',
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
    },
    {
      id: 'terrain',
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ];


    // Define time range options
export const timeRangeOptions = [
    { id: '1day', name: '1 Day' },
    { id: '1week', name: '1 Week' },
    { id: '1month', name: '1 Month' }
  ];

  // Define magnitude options
export const magnitudeOptions = [
    { id: 'minor', name: 'Minor (0.0 - 3.9)' },
    { id: 'moderate', name: 'Moderate (4.0 - 5.9)' },
    { id: 'major', name: 'Major (6.0 & above)' }
  ];
