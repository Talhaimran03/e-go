import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import graph from './img/graph.svg'
import qr from './img/qr.svg'
import Bus from './img/bus.svg'
import Map from './img/map.svg'

export default function Home() {
    const height = {
        fontSize: '12px',
    };


    {/*const htmlFile = `
    <!DOCTYPE html>
    <html>
      <head>
        
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
        
      </head>
      <body>
        <div id="my-map" style="width: 800px; height: 600px; border-radius: 10px">
        <iframe width="70" height="70" 
        src="https://www.openstreetmap.org/export/embed.html?bbox=10.979745984077455%2C45.428726496973376%2C10.984252095222473%2C45.43135797978953&amp;layer=mapnik&amp;marker=45.43004225371731%2C10.981999039649963" 
            ></iframe><br/><small>
        <a href="https://www.openstreetmap.org/?mlat=45.43004&amp;mlon=10.98200#map=18/45.43004/10.98200"></a>
        </small>
        </div>
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script>
          var mapOptions = {
            center: [45.42989355027215, 10.983624458312988],
            zoom: 16
          };
          
          var map = new L.map('my-map', mapOptions);
          
          var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
          
          map.addLayer(layer);
        </script>
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
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
                    <img className='graphic' src={graph} alt="graphic" />
                </div>
                <div className='div-qr'>
                    <Link to="#">
                        <img className='qr' src={qr} alt="qr" />
                    </Link>
                </div>
                <div className='saving'>
                    <b><p> CO2 RISPARMIATA </p></b>
                </div>
            </div>
            <div className='slider-maps'>
                <div className='maps'> 
                <div className='interactive-map'>
                    <Link to="https://www.openstreetmap.org/way/856788719" rel='noopener' target='_blank'>     
                        <img className='map' src={Map} alt="Map"></img>
                    </Link>
                </div>
                    

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


