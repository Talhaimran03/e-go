import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import Bus from './img/bus.svg'
import Map from './img/map.svg'
import Grafico from './components/graph';
import Graph from './components/slider';
import QrCodeHome from './components/qrCodeHome.js';

export default function Home() {
    const height = {
        fontSize: '12px',
    };

    const heightLink = {
        height: '10vh',
        display: 'block',
        width: '28vw',
        zIndex: '9999',
    };

{/*
   const htmlFile = `
   <!DOCTYPE html>
   <html>
   <head>
       <title>Mappa con percorso e fermate del bus</title>
       <!-- Aggiungi il CSS di Leaflet -->
       <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
   </head>
   <body>
       <h1>Percorso con fermate del bus</h1>
       <div id="map" style="width: 600px; height: 450px;"></div>
   
       <!-- Aggiungi il JavaScript di Leaflet -->
       <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
       <script>
           // Crea una mappa utilizzando Leaflet
           const map = L.map('map').setView([45.45742120, 10.94631000], 16);
           
           // Imposta il massimo livello di zoom
           map.setMaxZoom(18);
   
           // Aggiungi uno strato di mappa di OpenStreetMap
           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; OpenStreetMap contributors'
           }).addTo(map);
   
           // Aggiungi il percorso alla mappa
           function addRouteToMap(route) {
               const routeCoordinates = route.routes[0].geometry.coordinates;
               const latLngs = routeCoordinates.map(coord => [coord[1], coord[0]]);
               L.polyline(latLngs, { color: 'blue' }).addTo(map);
           }
   
           // Aggiungi i segnaposto delle fermate del bus
           function addBusStopsToMap() {
               // Coordinate delle fermate del bus
               const busStops = [
                   { lat: 45.45742120, lng: 10.94631000, name: 'Fermata inizio bus' },
                   { lat: 45.46287260, lng: 10.93376780, name: 'Fermata fine bus' }
               ];
   
               // Aggiungi i segnaposto delle fermate del bus alla mappa
               busStops.forEach(stop => {
                   L.marker([stop.lat, stop.lng]).addTo(map).bindPopup(stop.name);
               });
           }
   
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
       </script>
   </body>
   </html>
   
            `;*/}


    return (
        
        <div className='home'>
            
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <App></App>
            <div className='background'>
                <div className='points'>
                    <b><p className='p'> 145 </p></b>
                    <b><p className='p secondo'> punti </p></b>
                </div>
                <div className='div-graphic'>

                    <Graph></Graph>
                </div>
                <div className='div-qr'>
                    <Link to="/Qr">
                        <QrCodeHome className='qr'/>
                    </Link>
                </div>
                
                <div className='saving'>
                    
                    <Grafico></Grafico>
                </div>
                
            </div>
            <div className='slider-maps'>
                <div className='maps'> 
                <Link style={heightLink} to="/map"> 
                    <div className='interactive-map'>
                     
                        <img className='map' src={Map} alt="Map"></img>
                   
                </div>
                </Link>
                    

                {/*<div className='osm' dangerouslySetInnerHTML={{ __html: htmlFile }}></div> */}
                    
                    <div className='maps-p'>
                        <p className='short-via'> Stazione FS/Via XX...</p>
                        <p className='large-via'>Stazione FS/Via XXV Aprile, 8, 37138 Verona VR</p>
                        <p style={height}> Orario percorrenza </p>
                        <div className='bus-icon'>
                            <img className='busIcon' src={Bus} alt="Bus"></img>
                            <p> 20min </p>
                        </div>
                    </div>
                </div>
                <div className='maps uno'>
                </div>
                <div className='maps due'>
                </div>
                <div className='maps tre'>
                </div>
            </div>
        </div>
    );
}


