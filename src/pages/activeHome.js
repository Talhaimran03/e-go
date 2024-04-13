import './css/activeHome.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import graph from './img/graph.svg'
import qr from './img/stop-ride.svg'
import Bus from './img/bus.svg'
import Map from './img/map.svg'
import Grafico from './components/graph';

export default function ActiveHome() {
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
        
        <div className='home2'>
            <div className='window'>
            <div className='pos-navbar2'>
                <Navbar></Navbar>
            </div>
            <App></App>
            <div className='background2'>
                <div className='points2'>
                    <b><p className='p2'> 145 </p></b>
                    <b><p className='p secondo2'> punti </p></b>
                </div>
                <div className='div-graphic2'>
                    <img className='graphic2' src={graph} alt="graphic" />
                </div>
                <div className='div-qr2'>
                    <Link to="/QrContainer2">
                        <img className='qr2' src={qr} alt="qr" />
                    </Link>
                </div>
                <div className='saving'>
                    
                    <Grafico></Grafico>
                </div>
            </div>
            <div className='slider-maps2'>
                <div className='maps2'> 
                <Link style={heightLink} to="/map"> 
                    <div className='interactive-map2'>
                     
                        <img className='map2' src={Map} alt="Map"></img>
                   
                </div>
                </Link>
                    

                {/*<div className='osm' dangerouslySetInnerHTML={{ __html: htmlFile }}></div> */}
                    
                    <div className='maps-p2'>
                        <p className='short-via2'> Stazione FS/Via XX...</p>
                        <p className='large-via2'>Stazione FS/Via XXV Aprile, 8, 37138 Verona VR</p>
                        <p style={height}> Orario percorrenza </p>
                        <div className='bus-icon2'>
                            <img className='busIcon2' src={Bus} alt="Bus"></img>
                            <p> 20min </p>
                        </div>
                    </div>
                </div>
                <div className='maps uno2'>
                </div>
                <div className='maps due2'>
                </div>
                <div className='maps tre2'>
                </div>
            </div>
            </div>
        </div>
    );
}


