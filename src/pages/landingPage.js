import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import mask from "./img/mask.png";
import logo4 from "./img/logo4.png";


export default function LandingPage() {
    return (
        <div className='home'>
            {/* <div className="pos-logo">
                <Logo></Logo>
            </div> */}
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <div className='col-12 containerLanding'>
                <div className='col-6 imgMockup'>
                    <img src={mask}></img>
                </div>
                <div className='col-6 frasi'>
                    <h1 className='frase1'>Lavoriamo per spronarti a prendere </h1>
                    <h1 className='frase2'>consapevolmente </h1>
                    <h1 className='frase3'>parte del cambiamento.</h1>
                </div>
            </div>
            <footer>
                <div className="containerFooter">
                    <div className="rowFooter">
                        <div className="col-4">
                            <img id='logoFooter' src={logo4}></img>
                            <p id='sottoLogo'> La comunità verso una consapevolezza migliore</p>
                            
                        </div>
                        <div className="col-2 menuFooter">
                            <h3>Contatti</h3>
                            <ul>
                            <li> <p id='mail'>Email: info@tuazienda.com</p></li>
                            <li> <p id='telefono'> Telefono: 123-456-7890</p></li>
                            <li><a href="/contatti">Contatti</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="col-2 menuFooter">
                            <h3>Link Utili</h3>
                            <ul>
                            <li><a href="/">Contatti</a></li>
                            <li><a href="/chi-siamo">Chi siamo</a></li>
                            <li><a href="/contatti">Contatti</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            </ul>
                        </div>
                      
                    </div>
                </div>
            </footer>
        </div>
    );
}