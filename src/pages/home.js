import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import App from './components/hero.js'
import './components/components_css/hero.css'
import background from './img/background.svg'
import graph from './img/graph.svg'
import qr from './img/qr.svg'

export default function Home() {
    return (
        <div className='home'>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <App></App>
            <div className='background'>
                <img src={background} alt="background" />
            </div>
            <div className='points'>
                <b><p> 145 punti </p></b>
            </div>
            <img className='graphic' src={graph} alt="graphic" />
            <Link to="#">
                <img className='qr' src={qr} alt="qr" />
            </Link>
            <div className='saving'>

            </div>
            <b><p className='path'> Ultimo percorso </p></b>
            <div className='slider-maps'>
                <div className='maps'>
                </div>
                <div className='maps uno'>
                </div>
                <div className='maps due'>
                </div>
            </div>
        </div>
    );
}


