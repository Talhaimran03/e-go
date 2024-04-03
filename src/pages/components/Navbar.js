import './components_css/Navbar.css';
import Button from './Button.js';
import { Link } from 'react-router-dom';

import { ReactComponent as Punti } from "../img/punti.svg";
import { ReactComponent as Home } from "../img/home.svg";
import { ReactComponent as Settings } from "../img/impostazioni.svg";



function Navbar() {
    return(
        <div className="navbar">
            <div className="row">
                <ul className='menu'>
                    <div className="col-4">
                        <li>
                            <Link to='../points'>
                                <Button img={ Punti } testo="Punti"/>                    
                            </Link>
                        </li>
                    </div>
                    <div className="col-4">
                        <li>
                            <Link to='../' className="active">
                                <Button img={ Home } testo="Home"/>   
                            </Link>
                        </li>
                    </div>
                    <div className="col-4">
                        <li>
                            <Link to='../settings'>
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