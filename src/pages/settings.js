import './css/settings.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import User from "./img/user.svg";
import SettingSection from './components/SettingSection';


export default function Settings() {
    return (
        <>
            <div className='container'>
                <div className="userPosition">
                    <img src={ User } alt="user" />
                </div>
                <div className="settings">
                    <SettingSection icon={ User } text="Profilo"/>
                </div>
            </div>

            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
};