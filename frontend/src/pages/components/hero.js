import React from 'react';
import { Link } from 'react-router-dom';
import './components_css/hero.css';
import bell from "../img/Bell.svg";
import user from "../img/user-image.svg";
import { render } from '@testing-library/react';

function App() {

    const height = {
        fontSize: '1.6vh',
    };

    return (
        <div className='welcome'>
            <div className='div-welcome'>
                <p> <b>Ciao, Mario </b> </p>
                <p style={height}> Stai facendo un buon lavoro! </p>
            </div>
            <div className='notification'>
                <img src={bell} alt="Bell icon" id='bell-hero' />
            </div>
            <Link to='../settings'>
                <img className='user-icon' src={user} alt="user icon" />
            </Link>
        </div>
    );
}


export default App;
