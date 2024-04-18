import './css/ranking.css';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import RankingSection from './components/rankingSection';
import User from './img/user.svg';
import QrCode from './components/qrCode';
import { Link, useNavigate } from 'react-router-dom';
import { checkSession } from './components/sessionService';
import React, { useEffect, useState } from 'react';
import { Ip } from './ip.js';
import axios from 'axios';

export default function Ranking() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }

                // getAllUsers
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://${Ip}:8080/ego/users/getAllUsers`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    if (response && response.data && Array.isArray(response.data.data)) {
                        setUsers(response.data.data);
                    }                    
                    console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                }
        };

        fetchSession();
    }, [navigate]);
    
    return (
        <>
            <div className='positionSwitch-ranking'>
                <Switch></Switch>
            </div>

            <div className="container-ranking">
                {users.map((user, index) => (
                    <RankingSection
                        key={index + 1}
                        number={index + 1}
                        icon={User}
                        text={user.name}
                        points={`${user.totalPoints}p.`}
                    />
                ))}
            </div>
            <Link to="/Qr">
                <div className="qrPosition-ranking">
                    <QrCode />
                </div>
            </Link>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
}