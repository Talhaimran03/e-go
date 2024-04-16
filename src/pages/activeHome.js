import './css/activeHome.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import qr from './img/stop-ride.svg'
import Bus from './img/bus.svg'
import Map from './img/map.svg'
import Graph from './components/slider';
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
                    <Graph></Graph>
                </div>
                <div className='div-qr2'>
                    <Link to="/QrContainer2">
                        <img className='qr2' src={qr} alt="qr" />
                    </Link>
                </div>
                <div className='saving2'>
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


