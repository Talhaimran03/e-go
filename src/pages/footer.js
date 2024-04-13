import './css/home.css';
import EGOGOMMA from "./img/EGOGOMMA.png";


export default function Footer(){
    return ( 
        <footer>
            <div className="containerFooter row">
                <div className="rowFooter">
                    <div className="col-4">
                        <img id='logoFooter' src={EGOGOMMA}></img>
                        <p id='sottoLogo'> ego.project.work@gmail.com</p>
                        
                    </div>
                    <div className="col-2 menuFooter row">
                            <a href="/landingPage">Home</a>                             
                            <a href="/info">Info</a>
                            <a href='/contatti'> Contatti</a>
                    </div>
                    <div className='col-2 sottomenu row'>
                        <p id='sottom'>Telefono: 045-456-7890 <br/> Lungadige Galtarossa 21 <br/> Verona, 37133</p>
                    </div>

                    
                </div>
            </div>    
        </footer>
        
    )
}