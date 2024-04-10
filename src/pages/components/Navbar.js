import './components_css/Navbar.css';
import Buttons from './Buttons.js';
import { Link } from 'react-router-dom';

import { ReactComponent as Punti } from "../img/punti.svg";
import { ReactComponent as Home } from "../img/home.svg";
import { ReactComponent as Settings } from "../img/impostazioni.svg";



function Navbar() {
    return(
        <div className="navbar">
            <div className="rowNavbar">
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