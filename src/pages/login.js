import './components/components_css/login.css';
import Logo from "./components/logo.js";
import { ReactComponent as Background } from "./img/background.svg";
import { ReactComponent as Icongoogle } from "./img/Google__G__logo.svg";
import { ReactComponent as Iconuser } from "./img//icona_utente.svg";
import { ReactComponent as Iconpwd } from "./img/icona_lucchetto.svg";

function Login() {
    return (
        <div>
            <div className='margine'>
                <div className='background'></div>
            </div>
            <div className='flexshapelogo'>
                <div className='shapelogo'>
                    <Logo></Logo>
                </div>
            </div>



            <form className='flexform'>

                <div className='containerform'>
                    <div><Iconuser></Iconuser></div>
                    <input type="text" className='email' placeholder="Email" required />
                </div>

                <div className='containerform'>
                    <div><Iconpwd></Iconpwd></div>
                    <input type="password" className='email' placeholder="Password" required />
                </div>

                <input type='submit' className='accedi' value="ACCEDI"></input>
                <h3 className='pwddimenticata'>password dimenticata?</h3>
           
                <button type='submit' className='signUp'>REGISTRATI</button>
            

            <div className='buttonflex'>
                <button class="buttongooglelogin" value="">
                    <Icongoogle></Icongoogle>
                </button>
            </div>
            </form>
        </div>
    );
}

export default Login;