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
                        <img className='map' src={Map} alt="Map"></img>
                    </div>
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


