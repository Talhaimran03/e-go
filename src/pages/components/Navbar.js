import React, { useState, useEffect } from 'react';
import './components_css/Navbar.css';
import Button from './Button.js';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Punti } from "../img/punti.svg";
import { ReactComponent as Home } from "../img/home.svg";
import { ReactComponent as Settings } from "../img/impostazioni.svg";
import EGOGOMMA from "../img/EGOGOMMA.png"; 

function Navbar() {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;
        // Set the initial active link based on the pathname
        setActiveLink(pathname.split('/')[1] || 'home');
    }, [location]);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    return(
        <div className="navbar">
            <div className="row-landinPage">
                <ul className='menu'>
                    <div className='logo'>
                        <img src={EGOGOMMA} id='logo4'></img>
                    </div>
                    <div className="col-4 punti">
                        <li>
                            <Link to='../points' className={activeLink === 'points' ? "link active" : "link"} onClick={() => handleLinkClick('points')}>
                                <Button img={ Punti } testo="Punti"/>                    
                            </Link>
                        </li>
                    </div>
                    <div className="col-4">
                        <li>
                            <Link to='../' className={activeLink === 'home' ? "link active" : "link"} onClick={() => handleLinkClick('home')}>
                                <Button img={ Home } testo="Home"/>   
                            </Link>
                        </li>
                    </div>
                    <div className='col-6 containerLink'>
                        <div className="col-4 Home1">
                                <li id='homeid'>
                                <Link to='/landingPage'>Home</Link> 
                                </li>
                            </div>
                            <div className="col-4 info">
                                <li id='infoid'>
                                <Link to='/info'>Info</Link> 
                                </li>                            
                            </div>
                            <div className="col-4 impostazioni1">
                                <li id='impoid'>
                                <Link to='/impostazioni'>Impostazioni</Link> 
                                </li>                         
                            </div>
                            <div className="col-4 Punti1">
                                <li id='puntiid'>
                                <Link to='/landingPage'>Punti</Link> 
                                </li>
                            </div>
                    </div>
                    <div className="col-4 settings">
                        <li>
                            <Link to='../settings' className={activeLink === 'settings' ? "link active" : "link"} onClick={() => handleLinkClick('settings')}>
                                <Button img={ Settings } testo="Impostazioni"/>   
                            </Link>
                        </li>
                    </div>
                    <div className='col-4 containerLogin'>
                        <div className="col-4 registrati">
                            <li id='registrati1'>
                            <Link to='/registrati'>Registrati</Link> 
                            </li>
                        </div>
                        <div className="col-4 login">
                            <li id='login1'>
                            <Link to='/login'>Login</Link> 
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    
    );
}

export default Navbar;