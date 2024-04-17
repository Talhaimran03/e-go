import './css/activeHome.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import qr from './img/stop-ride.svg'
import Bus from './img/bus.svg'
import Map from './img/map.svg'
import Graph from './components/slider';
import Grafico from './components/graph';
import { checkSession } from './components/sessionService';
import React, { useEffect, useState} from 'react';
import { Ip } from './ip.js';
import axios from 'axios';

export default function ActiveHome() {
    const navigate = useNavigate();
    const [points, setPoints] = useState(0);
    const [userName, setUserName] = useState("User");

    const height = {
        fontSize: '12px',
    };

    const heightLink = {
        height: '10vh',
        display: 'block',
        width: '28vw',
        zIndex: '9999',
    };

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                // const [routes, setRoutes] = useState([]);

                if (!isLoggedIn.success) {
                    navigate('/login');
                }

                const token = localStorage.getItem('token');

                // get current user data
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get( `http://${Ip}:8080/ego/users/getUser`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    if (response && response.data && response.data.data) {
                        setPoints(response.data.data.actualPoints);
                        setUserName(response.data.data.name);
                    }
                    console.log(response.data);
                } catch (error) {
                    console.error('Errore:', error);
                }
        };

        fetchSession();
    }, [navigate]);

    return (
        <div className='home2'>
            <div className='window'>
            <div className='pos-navbar2'>
                <Navbar></Navbar>
            </div>
            <App name={userName} points={points}></App>
            <div className='background2'>
                <div className='points2'>
                    <b><p className='p2'> 145 </p></b>
                    <b><p className='p secondo2'> punti </p></b>
                </div>
                <div className='div-graphic2'>
                    <Graph points={points} />
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
                            <p> 10min </p>
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


