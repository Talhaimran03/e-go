import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [route, setRoute] = useState([]);
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    // Effettua la richiesta HTTP GET per ottenere il percorso
    const baseUrl = 'https://router.project-osrm.org/route/v1/driving/';
    const coordinates = '10.94631000,45.45742120;10.93376780,45.46287260';
    const options = '?steps=true&geometries=geojson';
    const requestUrl = baseUrl + coordinates + options;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        // Aggiungi il percorso alla mappa
        addRouteToMap(data);
        
        // Aggiungi i segnaposto delle fermate del bus alla mappa
        addBusStopsToMap();
      })
      .catch(error => {
        console.error('Si è verificato un errore durante la richiesta di routing:', error);
      });
  }, []);

  const addRouteToMap = (routeData) => {
    // Aggiungi il percorso alla mappa
    const routeCoordinates = routeData.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    setRoute(routeCoordinates);
  };

  const addBusStopsToMap = () => {
    // Coordinate delle fermate del bus
    const busStopsData = [
      { lat: 45.45742120, lng: 10.94631000, name: 'Fermata inizio bus' },
      { lat: 45.46287260, lng: 10.93376780, name: 'Fermata fine bus' }
    ];
    setBusStops(busStopsData);
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer center={[45.45742120, 10.94631000]} zoom={16} style={{ height: '100%', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
        {route.length > 0 && <Polyline positions={route} color='blue' />}
        {busStops.map(stop => (
          <Marker position={[stop.lat, stop.lng]} key={stop.name}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
