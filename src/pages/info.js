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
            <div className='bus'>
                <img src={bus}></img>
            </div>
            <div className='suDiNoi'>
                <h2>IL NOSTRO PROGETTO </h2>
            </div>
            <div>
                <p id='progetto'> 
                    
                    Siamo un team di 5 ragazzi che studiano presso il corso ITS Last Academy di Verona con indirizzo in Web Development. <br />
                    <br/>
                    Il nostro obiettivo è quello di creare una web app che possa spingere tuttə ad utilizzare il più possibile i mezzi pubblici presenti sul territorio, usando la consapevolezza come primo approccio. <br />
                    Ma come faremo a renderti più consapevole?<br/>
                    Ti mostreremo quanta CO2 avresti consumato utilizzando un mezzo privato in base alle tratte che farai con un mezzo pubblico. <br/>
                    <br/>
                    <br/>
                    <h3 id='surprise'><strong>Ma le cose belle non sono finite! </strong></h3>
                    <br/>
                    <br/>
                    Come funziona, dunque, la nostra web app? <br/>
                    Come primo passo dovrai registrarti per creare il tuo profilo personale.<br/>
                    Una volta eseguito l’accesso avrai a disposizione il grafico della CO2 risparmiata, il calcolo dei punti guadagnati e tutte le impostazioni necessarie. <br/>
                    <br/>
                    Il calcolo dei punti viene effettuato in base alle tratte che percorrerai a bordo di un mezzo pubblico, scansionando tramite la nostra web app il QR code presente sul mezzo, in modo da far partire il tracking. <br/>
                    <br/>
                    Una volta conclusa la tua corsa dovrai chiudere la tratta sempre tramite la nostra web app, così da poterci permettere di calcolare la distanza che hai percorso e di aggiornare il tuo grafico personale.<br/>
                    <br/>
                    Il pezzo forte?<br/>
                    Dopo ogni utilizzo di un mezzo pubblico otterrai dei punti che potrai poi riscattare, scegliendo tra fantastici premi e sconti. <br/>
                    <br/>
                    Di seguito una lista dei nostri partner:<br/>
                    <br/>
                    <ul>
                        <li>Bit Mobility</li>
                        <li>Amazon</li>
                        <li>Zalando</li>
                        <li>JustEat</li>
                        <li>Steam</li>
                    </ul>

                    </p>
            </div>
        </>
    );
}