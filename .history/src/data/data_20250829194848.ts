export const mapLayers = [
    {
      id: 'openstreetmap',
      name: 'Street Map',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      id: 'satellite',
      name: 'Satellite Map',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
    },
    {
      id: 'terrain',
      name: 'Terrain Map',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
    },
    {
      id: 'dark',
      name: 'Dark Map',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ];


    // Define time range options
export const timeRangeOptions = [
    { id: 'day', name: 'Last 24 hours' },
    { id: 'hour', name: 'Last 1 hour' },
    { id: 'week', name: 'Last 7 days' },
    { id: 'month', name: 'Last 30 days' }
  ];

  // Define magnitude options
export const magnitudeOptions = [
    { id: 'all', name: '0.0 & above' },
    { id: '1.0', name: '1.0 & above' },
    { id: '2.5', name: '2.5 & above' },
    { id: '4.5', name: '4.5 & above' }
  ];
