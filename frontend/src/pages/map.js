import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components/components_css/map.css';
import arrow from './img/arrow.svg';
import busstart from './img/bus-start.svg';
import timebus from './img/time-bus.svg';
import timebus2 from './img/time-bus2.svg';
import QrCode from './components/qrCode';
import App from './components/map.js';
import queryString from 'query-string';
import moment from 'moment';

export default function Map() {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    const stops = queryParams.stops ? JSON.parse(decodeURIComponent(queryParams.stops)) : null;

    console.log(stops)
    const height = {
        fontSize: '16px',
    };

    const heightSec = {
        fontSize: '25px',
    };

    if (!stops || Object.keys(stops).length === 0) {
        return <div>Loading...</div>;
    }

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
                    <p>{stops.startStopName}</p>
                    <p style={height}> Orario <b> partenza </b> </p>
                    <p style={heightSec}><b>{moment(stops.startTime).format('HH:mm')}</b></p>
                    <img className='bus' src={busstart} alt="bus"></img>
                    <div className='time-bus'>
                        <img src={timebus} alt="bus"></img>
                        <p>{stops.durationMinutes}min</p>
                    </div>

                    <div className='lower-text'>
                        <p>{stops.endStopName}</p>
                        <p style={height}> Orario <b> arrivo </b> </p>
                        <p style={heightSec}><b>{moment(stops.endTime).format('HH:mm')}</b></p>
                        <img src={timebus2} alt="bus"></img>
                    </div>
                </div>
                <div className='div-mappa'>
                    <App 
                        startLat={stops.startLatitude} 
                        startLong={stops.startLongitude} 
                        endLat={stops.endLatitude} 
                        endLong={stops.endLongitude} 
                    />
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
