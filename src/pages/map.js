import App from './components/map.js';
import { Link } from 'react-router-dom';
import './components/components_css/map.css';
import arrow from './img/arrow.svg'
import busstart from './img/bus-start.svg'
import timebus from './img/time-bus.svg'
import timebus2 from './img/time-bus2.svg'
import QrCode from './components/qrCode';

export default function Map() {
    const height = {
        fontSize: '16px',
    };

    const heightSec = {
        fontSize: '25px',
    };

    return (
        <div className='map-page'>
            <Link to="/"> 
                <div className='back'>
                    <img className='arrow' src={arrow} alt="arrow"></img>
                </div>
            </Link>
            <div className='last-ride'>
                <b><p> Ultimo percorso </p></b>
            </div>

            <div className='scheda'>
                <div className='upper-text'>
                    <p> Stazione FS </p>
                    <p style={height}> Orario <b> partenza </b> </p>
                    <p style={heightSec}> <b>15:10 </b></p>
                    <img className='bus' src={busstart} alt="bus"></img>
                    <div className='time-bus'>
                        <img src={timebus} alt="bus"></img>
                        <p> 20min </p>
                    </div>

                    <div className='lower-text'>
                        <p> Via XX Settembre </p>
                        <p style={height}> Orario <b> arrivo </b> </p>
                        <p style={heightSec}> <b>15:20 </b></p>
                        <img src={timebus2} alt="bus"></img>
                    </div>
                </div>
                <div className='div-mappa'>
                    <App></App>
                </div>
            </div>
            <Link to="/Qr">
                <div className="qrPosition-points4">
                    <QrCode />
                </div>
            </Link>
        </div>
    );
}