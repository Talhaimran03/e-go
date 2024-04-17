import './css/home.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import App from './components/hero.js'
import './components/components_css/hero.css'
import Bus from './img/bus.svg'
import Map from './img/map.svg'
import Grafico from './components/graph';
import Graph from './components/slider';
import QrCodeHome from './components/qrCodeHome.js';
import { Ip } from './ip.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { checkSession } from './components/sessionService';


export default function Home() {
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
                
                // getRoutesOfUser
                // try {
                //     const response = await axios.get(
                //       'http://localhost:8080/ego/routes/getRoutesOfUser',
                //       {
                //           headers: {
                //               'Content-Type': 'application/json',
                //               'Authorization': `Bearer ${token}`
                //           },
                //           withCredentials: true
                //       });
                //     setRoutes(response.data);
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

        };

        fetchSession();
    }, [navigate]);


    return (
        
        <div className='home'>
            
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <App name={userName} points={points}></App>
            <div className='background'>
                <div className='points'>
                    <b><p className='p'> {points} </p></b>
                    <b><p className='p secondo'> punti </p></b>
                </div>
                <div className='div-graphic'>
                    <Graph points={points} />
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
                        <p className='short-via'> Percorso 1</p>
                        <p className='large-via'>Percorso 1</p>
                        <p style={height}> Orario percorrenza </p>
                        <div className='bus-icon'>
                            <img className='busIcon' src={Bus} alt="Bus"></img>
                            <p> 10min </p>
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


