import {Link} from "react-router-dom"
import './css/NotFound.css'
import Ego from './img/ego.svg'

const NotFound = () => {

    return (
        <div class="banner__container">
            <div class="banner__track track1">
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
            </div>
            <div class="banner__track track2">
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
            </div>
            <div class="banner__track track3">
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
            </div>


            <div class="banner__trackUno track5">
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
            </div>
            <div class="banner__trackUno track4">
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
                <p class="banner__text404">404</p>
            </div>
            <div class="banner__trackUno track6">
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
                <p class="banner__text404">Errore</p>
            </div>


            <div className="overlayer">
                <div className="egoLogo">
                    <img src={Ego} alt="Logo"></img>                
                </div>
                <p className="funny"> OOPS... </p>
                <p className="informative"> Impossibile trovare la pagina che stai cercando </p>
                <Link to="/">
                    <div className="turnBack">
                        <p>Torna alla Home</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;    