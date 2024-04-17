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
import { Ip } from './ip.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect} from 'react';
import { checkSession } from './components/sessionService';


export default function Home() {
    const navigate = useNavigate();

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
                if (!isLoggedIn.success) {
                    navigate('/login');
                }

                const token = localStorage.getItem('token');

                // getAllUsers
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get( `http://${Ip}:8080/ego/users/getAllUsers`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Errore:', error);
                }

        };

        fetchSession();
    }, [navigate]);


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


