import React from 'react';
import './components_css/hero.css'
import bell from "../img/Bell.svg";
import user from "../img/user-image.svg";

function App() {

    const height = {
        fontSize: '1.6vh',
    };
    
  return (
    <div className='welcome'>
        <p> <b>Ciao, Mario </b> </p>
        <p style={height}> Stai facendo un buon lavoro! </p>
        <div className='notification'>
            <img src={bell} alt="Bell icon" />
        </div>
        <img className='user-icon' src={user} alt="user icon" />
    </div>
  );
}

export default App;
