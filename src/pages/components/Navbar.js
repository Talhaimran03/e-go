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
    );
}

export default Navbar;