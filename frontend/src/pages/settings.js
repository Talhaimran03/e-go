import './css/settings.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import User from "./img/user.svg";

import SettingSection from './components/SettingSection';
import Profile from "./img/profile.svg";
import Bell_light from "./img/bell_light.svg";
import ChangePassword from "./img/changePassword.svg";
import Privacy from "./img/privacy.svg";
import Security from "./img/security.svg";
import Help from "./img/help.svg";
import Logout from "./img/logout.svg";
import { checkSession } from './components/sessionService';
import React, { useEffect} from 'react';

export default function Settings() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }
        };

        fetchSession();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <div className='containerSettings'>
                <div className="userPosition">
                    <img src={ User } alt="user" id="userSize-settings"/>
                </div>
                <div className="settings">
                    <SettingSection icon={ Profile } text="Profilo"/>
                    <SettingSection icon={ Bell_light } text="Notifiche"/>
                    <SettingSection icon={ ChangePassword } text="Cambio password"/>
                    <SettingSection icon={ Privacy } text="Privacy"/>
                    <SettingSection icon={ Security } text="Sicurezza"/>
                    <SettingSection icon={ Help } text="Aiuto"/>
                    <button onClick={handleLogout} id='esci-settings'>
                        <SettingSection icon={ Logout } text="Esci"/>
                    </button>
                </div>
            </div>

            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
};