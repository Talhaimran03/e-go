import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import mask from "./img/mask.png";
import logo4 from "./img/logo4.png";
import EGOGOMMA from "./img/EGOGOMMA.png";
import Footer from "./footer";
import './css/landingPage.css';
import iPhonedef from "./img/iPhonedef.png";

export default function LandingPage() {
    return (

        <div className='home'>
            {/* <div className="pos-logo">
                <Logo></Logo>
            </div> */}
            
            <div className='pos-navbar'>
                <Navbar></Navbar>
                <div className='check'>
                    <input type="checkbox" id="menuToggle" />
                    <label htmlFor="menuToggle" className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>        

                    <nav id="menu1">
                        <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Chi Siamo</a></li>
                        <li><a href="#">Servizi</a></li>
                        <li><a href="#">Contatti</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='fotoego col-12'>
                    <img className='imgResp' src={EGOGOMMA}></img>
                </div>
                <div className='frasiResp col-12'>
                    <p className='frasiResp'> Lavoriamo per spronarti a prendere </p>
                    <p className='frasiResp2'> consapevolmente </p>
                    <p className='frasiResp3'> parte del cambiamento. </p>
                </div>
                <div className='fotoIphone col-12'>
                    <img className='iphone' src={iPhonedef}></img>
                </div>
                <footer className='footResp col-12'>
                    <div className="containerFooterResp">
                    
                            <div className="col-2">
                                <p id='sottoLogo'> ego.project.work@gmail.com</p>
                                
                            </div>
                            <div className="col-8 menuFooter row">
                                    <a href="/landingPage" id='linkHome col-2'>HOME</a>                             
                                    <a href="/info" id='linkInfo col-2'>INFO</a>
                                    <a href='/contatti' id='linkContattti'> CONTATTI</a>
                                    <a href='/contatti' id='linkImpo col-2'> IMPOSTAZIONI</a>
                                    <a href='/contatti' id='linkPunti col-2'> PUNTI</a>
                            </div>
                            <div className='col-2 copyy'>
                                <p id='copy'> © Copyright 2024. All rights reserved </p>
                            </div>
                            <div className='col-2 sottomenu row'>
                                <p id='sottom'>Telefono: 045-456-7890 <br/> Lungadige Galtarossa 21 <br/> Verona, 37133</p>
                            </div>

                            
                    
                    </div>    
            </footer>
            
            </div>
            <div className='col-12 containerLanding'>
                <div className='col-6 imgMockup'>
                    <img src={iPhonedef}></img>
                </div>
                <div className='col-6 frasi'>
                    <h1 className='frase1'>Lavoriamo per spronarti a prendere </h1>
                    <h1 className='frase2'>consapevolmente </h1>
                    <h1 className='frase3'>parte del cambiamento.</h1>
                </div>
            </div>
            <footer>
                <div className="containerFooter row">
                
                        <div className="col-4">
                            <img id='logoFooter' src={EGOGOMMA}></img>
                            <p id='sottoLogo'> ego.project.work@gmail.com</p>
                            
                        </div>
                        <div className="col-8 menuFooter row">
                                <a href="/landingPage" id='linkHome col-2'>HOME</a>                             
                                <a href="/info" id='linkInfo col-2'>INFO</a>
                                <a href='/contatti' id='linkContattti'> CONTATTI</a>
                                <a href='/contatti' id='linkImpo col-2'> IMPOSTAZIONI</a>
                                <a href='/contatti' id='linkPunti col-2'> PUNTI</a>
                        </div>
                        <div className='col-2 copyy'>
                            <p id='copy'> © Copyright 2024. All rights reserved </p>
                        </div>
                        <div className='col-2 sottomenu row'>
                            <p id='sottom'>Telefono: 045-456-7890 <br/> Lungadige Galtarossa 21 <br/> Verona, 37133</p>
                        </div>

                        
                
                </div>    
            </footer>
        </div>
    );
}