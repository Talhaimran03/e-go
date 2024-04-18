import './css/points.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import Card from './components/card';
import QrCode from './components/qrCode';

import bitmobility from "./img/bitmobility.svg";
import atv from "./img/atv.svg";
import helbiz from "./img/helbiz.svg";
import bird from "./img/bird.svg";
import veronaBike from "./img/veronaBike.svg";
import lime from "./img/lime.svg";
import dott from "./img/dott.svg";
import zalando from "./img/zalando.svg";

import { checkSession } from './components/sessionService';
import React, { useEffect, useState } from 'react';
import { Ip } from './ip.js';
import axios from 'axios';


export default function Points() {

    const navigate = useNavigate();
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }

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
                    }
                    // console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                }
        };

        fetchSession();
    }, [navigate]);

    return (
        <div className='body-points'>
            <div className='positionSwitch-points'>
                <Switch></Switch>
            </div>
            <div className="bodyContainer-points">
                <div className="container-points">
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo Bitmobility" points={`${points} di 1000 punti`} />
                        <Card img={ atv } text="Bonus Regalo Atv" points={`${points} di 1000 punti`} />
                    </div>
                    <div className="row-points">
                        <Card img={ lime } text="Bonus Regalo Lime" points={`${points} di 1000 punti`} />
                        <Card img={ bird } text="Bonus Regalo Bird" points={`${points} di 1000 punti`} />
                    </div>
                    <div className="row-points">
                        <Card img={ veronaBike } text="Bonus Regalo Verona Bike" points={`${points} di 1000 punti`} />
                        <Card img={ helbiz } text="Bonus Regalo Helbiz" points={`${points} di 1000 punti`} />
                    </div>
                </div>
                <div className='container-points'>
                    <div className="row-points">
                        <Card img={ dott } text="Bonus Regalo Dott" points={`${points} di 1000 punti`} />
                        <Card img={ zalando } text="Bonus Regalo Zalando" points={`${points} di 1000 punti`} />
                    </div>
                </div>
            </div>
            <Link to="/Qr">
                <div className="qrPosition-points">
                    <QrCode />
                </div>
            </Link>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </div>
    );
};