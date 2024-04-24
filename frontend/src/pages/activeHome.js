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
import React, { useEffect, useState } from 'react';
import { Ip } from './ip.js';
import axios from 'axios';

export default function ActiveHome() {
    const navigate = useNavigate();
    const [points, setPoints] = useState(0);
    const [userName, setUserName] = useState("User");
    const [routes, setRoutes] = useState({});
    const [CO2Savings, setCO2Savings] = useState({});
    const [userRouteStops, setUserRouteStops] = useState({});

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

            // get current user data
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://${Ip}:8080/ego/users/getUser`, {
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
            try {
                const response = await axios.get(
                    'http://localhost:8080/ego/routes/getRoutesOfUser',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                setRoutes(response.data);
                // console.log(response.data);

                const activeRoute = response.data.data.find(route => route.active === true);
                if (activeRoute) {
                    const startTime = new Date(activeRoute.startTime);
                    const currentTime = new Date();
                    const elapsedTime = (currentTime - startTime) / (1000 * 60);
                    if (elapsedTime > 50) {
                        navigate('../');
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Errore:', error.response);
            }

            // getUserAverageCO2Savings
            try {
                const response = await axios.get(
                    'http://localhost:8080/ego/users/getUserAverageCO2Savings',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                setCO2Savings(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error('Errore:', error);
            }
            
            // getUserRouteStops
            try {
                const response = await axios.get(
                    'http://localhost:8080/ego/routes/getUserRouteStops',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                setUserRouteStops(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.response.data);
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
                        <b><p className='p2'> {points} </p></b>
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
                        <Grafico CO2Savings={CO2Savings}></Grafico>
                    </div>
                </div>
                <div className='slider-maps2'>
                    {Object.entries(userRouteStops).map(([routeId, stops]) => (
                        <div className='maps'>
                        <Link
                            key={routeId}
                            style={heightLink}
                            to={{
                                pathname: '/map',
                                search: `?stops=${encodeURIComponent(JSON.stringify(stops))}`
                            }}
                        >
                                <div className="firstMaps-home">
                                    <div className='interactive-map'>
                                        <img className='map' src={Map} alt="Map"></img>
                                    </div>
                                </div>
                        </Link>
                                <div className='maps-p'>
                                    <p className='short-via'>{stops.startStopName}</p>
                                    <p className='large-via'>{stops.endStopName}</p>
                                    <p style={height}> Orario percorrenza </p>
                                    <div className='bus-icon'>
                                        <img className='busIcon' src={Bus} alt="Bus"></img>
                                        <p> {stops.durationMinutes}min </p>
                                    </div>
                                </div>
                            </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
}


