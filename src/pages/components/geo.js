import React, { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';

const LocationComponent = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      // Crea un oggetto con i dati di localizzazione
      const locationData = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      // Salva i dati nel file JSON
      const jsonData = JSON.stringify(locationData);
      localStorage.setItem('locationData', jsonData);
    }
  }, [coords]);

  if (!isGeolocationAvailable) {
    return <div>Il tuo browser non supporta la geolocalizzazione.</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>La geolocalizzazione non è abilitata.</div>;
  }

  if (coords) {
    return (
      <div>
        <p>Latitudine: {coords.latitude}</p>
        <p>Longitudine: {coords.longitude}</p>
      </div>
    );
  }

  return <div>Recupero dei dati di localizzazione...</div>;
};

export default LocationComponent;
