import React from 'react';
import { Link } from 'react-router-dom';
import './components_css/hero.css';
import bell from "../img/Bell.svg";
import user from "../img/user-image.svg";

function App({ name, points }) {

    const height = {
        fontSize: '1.6vh',
    };

    return (
        <div className='welcome'>
            <div className='div-welcome'>
                <p> <b>Ciao, {name} </b> </p>
                {points > 0 ? <p style={height}>Stai facendo un buon lavoro!</p> : <p style={height}>Inizia a risparmiare CO2</p>}
            </div>
            <div className="div2-welcome">

                <div className='notification'>
                    <img src={bell} alt="Bell icon" id='bell-hero' />
                </div>
                <Link to='../settings'>
                    <img className='user-icon' src={user} alt="user icon" />
                </Link>
            </div>
        </div>
    );

}


export default App;
