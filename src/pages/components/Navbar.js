<<<<<<< Updated upstream
import './css/Navbar.css';
import Buttons from './Buttons.js';
import { Link } from 'react-router-dom';


function Navbar() {
    return(
        <ul className='menu'>
            <li>
                <Link to='../points'>
                    <Buttons img="../../img/punti.jpeg" testo="ef"/>
                </Link>
            </li>
            <li>
                <Link to='../home'>
                    <Buttons img="../../img/punti.jpeg" testo="ef"/>
                </Link>
            </li>
            <li>
                <Link to='../settings'>
                    <Buttons img="../../img/punti.jpeg" testo="ef"/>
                </Link>
            </li>
        </ul>
=======
import './components_css/Navbar.css';
import Buttons from './Buttons.js';
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
                            <Link to='../points' activeClassName="active">
                                <Buttons img={ Punti } testo="Punti"/>                    
                            </Link>
                        </li>
                    </div>
                    <div className="col-4">
                        <li>
                            <Link to='../' activeClassName="">
                                <Buttons img={ Home } testo="Home"/>   
                            </Link>
                        </li>
                    </div>
                    <div className="col-4">
                        <li>
                            <Link to='../settings' activeClassName="">
                                <Buttons img={ Settings } testo="Impostazioni"/>   
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
>>>>>>> Stashed changes
    );
}

export default Navbar;