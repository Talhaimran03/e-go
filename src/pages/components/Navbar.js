import React, { useState, useEffect } from 'react';
import './components_css/Navbar.css';
import Button from './Button.js';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Punti } from "../img/punti.svg";
import { ReactComponent as Home } from "../img/home.svg";
import { ReactComponent as Settings } from "../img/impostazioni.svg";

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
            <div className="row">
                <ul className='menu'>
                    <div className="col-4">
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
                    <div className="col-4">
                        <li>
                            <Link to='../settings' className={activeLink === 'settings' ? "link active" : "link"} onClick={() => handleLinkClick('settings')}>
                                <Button img={ Settings } testo="Impostazioni"/>   
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
