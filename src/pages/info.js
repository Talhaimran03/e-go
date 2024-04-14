import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import bus from "./img/bus.png";
import cartella from "./img/cartella.svg";
import Union from "./img/Union.svg";
import EGOGOMMA from "./img/EGOGOMMA.png";
import cartella1 from "./img/cartella1.svg";
import cartellaPiccola from "./img/cartellaPiccola.svg";
import cartellaPiccola2 from "./img/cartellaPiccola2.png";

export default function Home() {
    return (
        <>
            <div className="pos-logo">
                <Logo></Logo>
            </div> 
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
                <div className='fotoego col-12 col-res-12'>
                    <img className='imgResp' src={EGOGOMMA}></img>
                </div>
            </div>
            <div className='cartella'>
                <img src={cartella1}></img>
            </div>
            <div className='cartellaPiccola'>
                <img src={cartellaPiccola2}></img>
            </div>
          <div className='infoPage col-12'>
                <div className='spiegazione col-6'>
                    <div className='suDiNoi'>
                        <h2>IL NOSTRO PROGETTO </h2>
                    </div>
                    <p id='progetto'> 
                        
                        Siamo un team di 5 ragazzi che studiano presso il corso ITS Last Academy di Verona con indirizzo in Web Development. <br />
                        <br/>
                        Il nostro obiettivo è quello di creare una web app che possa spingere tuttə ad utilizzare il più possibile i mezzi pubblici presenti sul territorio, usando la consapevolezza come primo approccio. <br />
                        Ma come faremo a renderti più consapevole?<br/>
                        Ti mostreremo quanta CO2 avresti consumato utilizzando un mezzo privato in base alle tratte che farai con un mezzo pubblico. <br/>
                        
                    </p>
                </div>
                <div className='infoCall col-4'>
                    <div className='callToAction col-12'> 
                        <div className='call col-5'>
                            <p id='fraseCall'> Provala anche tu: </p>
                            
                            <p id='puntiCall'>  
                                <br />
                                    • aiuti l'ambiente. <br />
                                    <br />
                                    • guadagni fantastici premi. <br />
                                    <br />
                                    • farai parte di una comunità consapevole.
                            </p>
                    </div>
                        <div className='bottoni col-3'>
                            <div className='col-3 scarica'><button id='scarica'> Scarica </button></div>
                            <br />
                            <div className='col-3 registra'><button id='registratiCall'> <img className='union' src={Union}></img>Registrati </button></div>
                        </div>
                    </div>              
                </div>    
            </div>    
        </>
    );
}