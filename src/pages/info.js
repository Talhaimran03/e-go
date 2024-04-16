/* import './css/home.css' */
import { Link } from 'react-router-dom';
/* import Navbar from "./components/Navbar"; */
import Logo from "./components/logo";
import bus from "./img/bus.png";
import cartella from "./img/cartella.svg";
import Union from "./img/Union.svg";
import EGOGOMMA from "./img/EGOGOMMA.png";
import cartella1 from "./img/cartella1.svg";
import cartellaPiccola from "./img/cartellaPiccola.svg";
import cartellaPiccola2 from "./img/cartellaPiccola2.png";
import "./css/totalPage.css";
import iphoneDef from "./img/iPhonedef.png";
import bg from "./img/bg.svg";

export default function Home() {
    return (
        <>

            <svg
                    version="1.1"
                    id="bgGrande"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1272 680"
                    xmlSpace="preserve"
                >
            
                <style type="text/css">
                {`.st0{fill:url(#Blocco_00000132060931026753572040000009978651570647462568_);}`}
                </style>
                <linearGradient
                id="Blocco_00000158011681888672957110000005131347568930586255_"
                gradientUnits="userSpaceOnUse"
                x1="628.95"
                y1="119.6"
                x2="628.95"
                y2="715.6"
                gradientTransform="matrix(1 0 0 1 0 -86)"
                >
                <stop offset="0" style={{ stopColor: '#4AA18B' }} />
                <stop offset="1" style={{ stopColor: '#1B3B33' }} />
                </linearGradient>
                <path
                id="Blocco"
                style={{ fill: 'url(#Blocco_00000158011681888672957110000005131347568930586255_)' }}
                d="M45.5,55.5c0-12.1,10.3-21.9,22.9-21.9h1121.1c12.7,0,22.9,9.8,22.9,21.9v552.2c0,12.1-10.3,21.9-22.9,21.9h-511c-12.7,0-22.9-9.8-22.9-21.9v-33.3c0-12.1-10.3-21.9-22.9-21.9h-173c-12.7,0-22.9-9.8-22.9-21.9v-33.7c0-12.1-10.3-21.9-22.9-21.9h-50c-12.7,0-22.9-9.8-22.9-21.9v-29.4c0-12.1-10.3-21.9-22.9-21.9H68.4c-12.7,0-22.9-9.8-22.9-21.9V55.5z"
                />
            </svg>
            <div className='bgPiccoloDiv'>
                <svg id='bgPiccolo' width="397" height="477" viewBox="0 0 397 477" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 25.5C0 11.6929 11.1929 0.5 25 0.5H372C385.807 0.5 397 11.6929 397 25.5V451.5C397 465.307 385.807 476.5 372 476.5H232.551C218.744 476.5 207.551 465.307 207.551 451.5V398.5C207.551 384.693 196.358 373.5 182.551 373.5H158.114C144.306 373.5 133.114 362.307 133.114 348.5V318.308C133.114 309.301 125.812 302 116.806 302V302C107.8 302 100.498 294.699 100.498 285.692V264C100.498 250.193 89.3055 239 75.4984 239H25C11.1929 239 0 227.807 0 214V25.5Z" fill="url(#paint0_linear_55_343)"/>
                    <defs>
                    <linearGradient id="paint0_linear_55_343" x1="198.5" y1="-3" x2="198.5" y2="473" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#4AA18B"/>
                    <stop offset="1" stop-color="#1B3B33"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>    
            <div className="pos-logo">
                <Logo></Logo>
            </div> 
            <div className='logoResponsive'>
                <img id='logoResp' src={EGOGOMMA}></img>
            </div>
            <div className='pos-navbar'>
                {/* <Navbar></Navbar> */}
                <div className='check'>
                    <input type="checkbox" id="menuToggle" />
                    <label htmlFor="menuToggle" className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>        

                    <nav id="menu1">
                        <ul>
                        <li><a id='home' href="#">Home</a></li>
                        <li><a href="#">Impostazioni</a></li>
                        <li><a href="#">Punti</a></li>
                        <li><a href="#">Contatti</a></li>
                        </ul>
                    </nav>
                </div>  
            </div>    

            <nav className='navbarDef'>
                <div className='navbarSx'>
                    <a href='#'><h4> Home </h4></a>
                    <a href='#'><h4> Impostazioni </h4></a>
                    <a href='#'><h4> Punti </h4></a>
                </div>
                <div className='imgEgo'>
                 <img className='imgEgo' src={EGOGOMMA}></img>
                </div>
                <div className='navbarDx'>
                    <a href='#'> <h4> Contattaci </h4></a>
                </div>
            </nav>
            <div className='contentMain'>
                <div className='contentSx'>
                    <div className='question'>
                        <h3 id='contentQuestion'> Cosa aspetti? </h3>
                    </div>
                    <div className='buttons'>
                        <button id='btnAccedi'> Accedi </button>                        
                        <button id='btnRegistrati'> Registrati </button>                        
                    </div>
                </div>
                <div className='imgContent'>
                    <img id='iphone' src={iphoneDef}></img>
                </div>
                <div className='contentUs'>
                    <p id='aboutUs'>
                        Il nostro obiettivo è quello di creare una web app che possa spingere tuttə ad utilizzare il più possibile i mezzi pubblici presenti sul territorio, 
                        usando la consapevolezza come primo approccio. 
                    </p>
                </div>
                <div className='endContentResp'>
                <div className='firstResp'>
                    <h1 id='firstpResp'> Lavoriamo per <br/> spronarti a prendere </h1>
                </div>
                <div className='secondResp'>
                    <h1 id='secondpResp'> consapevolmente</h1>
                </div>
                <div className='thirdResp'>
                    <h1 id='thirdpResp'>parte del cambiamento. </h1>
                </div>
            </div>
            </div>
            <div className='endContent'>
                <div className='first'>
                    <h1 id='firstp'> Lavoriamo per <br/> spronarti a prendere </h1>
                </div>
                <div className='second'>
                    <h1 id='secondp'> consapevolmente</h1>
                </div>
                <div className='third'>
                    <h1 id='thirpd'>parte del cambiamento. </h1>
                </div>
            </div>
        </>
    );
}