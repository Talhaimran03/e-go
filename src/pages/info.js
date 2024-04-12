import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import bus from "./img/bus.png";

export default function Home() {
    return (
        <>
            <div className="pos-logo">
                <Logo></Logo>
            </div> 
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <div className='suDiNoi'>
                <h2>IL NOSTRO PROGETTO </h2>
            </div>
            <div className='spiegazione'>
                <p id='progetto'> 
                    
                    Siamo un team di 5 ragazzi che studiano presso il corso ITS Last Academy di Verona con indirizzo in Web Development. <br />
                    <br/>
                    Il nostro obiettivo è quello di creare una web app che possa spingere tuttə ad utilizzare il più possibile i mezzi pubblici presenti sul territorio, usando la consapevolezza come primo approccio. <br />
                    Ma come faremo a renderti più consapevole?<br/>
                    Ti mostreremo quanta CO2 avresti consumato utilizzando un mezzo privato in base alle tratte che farai con un mezzo pubblico. <br/>
                    
                    </p>

                <div className='callToAction col-9'> 
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
                    <button id='scarica'> Scarica App </button>
                    <button id='registratiCall'> Registrati </button>
                   </div>
                </div>
            </div>
        </>
    );
}