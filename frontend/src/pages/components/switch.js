import React, { useState, useEffect } from 'react';
import './components_css/switch.css';
import { Link, useLocation } from 'react-router-dom';

function Switch() {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        setActiveLink(pathname.split('/')[1] || 'home');
    }, [location]);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    return (
        <div className='position-switch'>
            <div className="row-switch">
                <div className="col-6-switch">
                    <div className={`section-switch ${activeLink === 'points' ? 'active' : ''}`}>
                        <Link to='../points' className='switch' onClick={() => handleLinkClick('points')}>
                            <p className='text-switch'>Riscatta</p>                 
                        </Link>
                    </div>
               </div>
                <div className="col-6-switch">
                    <div className={`section-switch ${activeLink === 'ranking' ? 'active' : ''}`}>
                        <Link to='../ranking' className='switch' onClick={() => handleLinkClick('ranking')}>
                            <p className='text-switch'>Classifica</p>                 
                        </Link>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Switch;
