import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import busIcon from '../img/bus-stop.png';

const App = ({ startLat, startLong, endLat, endLong }) => {
  const [route, setRoute] = useState([]);
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    if (startLat && startLong && endLat && endLong) {
      const baseUrl = 'https://router.project-osrm.org/route/v1/driving/';
      const coordinates = `${startLong},${startLat};${endLong},${endLat}`;
      const options = '?steps=true&geometries=geojson';
      const requestUrl = baseUrl + coordinates + options;

      fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
          addRouteToMap(data);
          addBusStopsToMap(startLat, startLong, endLat, endLong);
        })
        .catch(error => {
          console.error('Si è verificato un errore durante la richiesta di routing:', error);
        });
    }
  }, [startLat, startLong, endLat, endLong]);

  const addRouteToMap = (routeData) => {
    const routeCoordinates = routeData.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    setRoute(routeCoordinates);
  };

  const addBusStopsToMap = (startLat, startLong, endLat, endLong) => {
    const busStopsData = [
      { lat: parseFloat(startLat), lng: parseFloat(startLong), name: 'Fermata inizio bus' },
      { lat: parseFloat(endLat), lng: parseFloat(endLong), name: 'Fermata fine bus' }
    ];
    setBusStops(busStopsData);
  };

  const customIcon = L.icon({
    iconUrl: busIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer center={[startLat, startLong]} zoom={16} style={{ height: '100%', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
        {route.length > 0 && <Polyline positions={route} color='blue' />}
        {busStops.map((stop, index) => (
          <Marker position={[stop.lat, stop.lng]} key={index} icon={customIcon}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
