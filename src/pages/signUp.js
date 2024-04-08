import './components/components_css/signUp.css';
import { ReactComponent as BkgSignUp } from "./img/BkgSignUp.svg";
import { ReactComponent as Icongoogle } from "./img/Google__G__logo.svg";
import { ReactComponent as Arrowreturn } from "./img/Indietro.svg";
import { ReactComponent as Emailicon } from "./img/email-icon.svg";
import { ReactComponent as Iconautente } from "./img/icona_utente.svg";
import { ReactComponent as Calendaricon } from "./img/calendar_month.svg";
import { ReactComponent as Pswicon } from "./img/icona_lucchetto.svg";

function Sign() {
    return (
        <div>
            <div className='BkgSignUp'>
                <BkgSignUp></BkgSignUp>
            </div>
            <div className='arrowreturn'>
                <Arrowreturn></Arrowreturn>
                </div>
            <div className='flexcount'>
                <div className='count1'>1</div>
                <div className='count2'>2</div>
            </div>
            <div>
                <h1 className='sign'>REGISTRATI</h1>
            </div>
                <div className='emailicon'><Emailicon></Emailicon></div>
                <div className='iconautente'><Iconautente></Iconautente></div>
                <div className='iconautentesurname'><Iconautente></Iconautente></div>
                <div className='calendaricon'><Calendaricon></Calendaricon></div>
                <div className='pswicon'><Pswicon></Pswicon></div>
                <div className='pswiconrepeat'><Pswicon></Pswicon></div>
            <form className='alignboxsign'>
                <input type="text" className='boxemail' placeholder='email' />
                <input type="text" className='boxemail' placeholder='nome' />
                <input type="text" className='boxemail' placeholder='cognome' />
                <input type="text" className='boxemail' placeholder='data di nascita' />
                <input type="text" className='boxemail' placeholder='password' />
                <input type="text" className='boxemail' placeholder='ripeti password' />
            </form>
            <div className='arrowavanti'><Arrowreturn></Arrowreturn></div>
            <div className='buttonalign'>
                <input type="submit" class="buttonsign" value=""></input>
                <input type="submit" class="buttongoogle" value=""></input>
                <div className='logogoogle'><Icongoogle></Icongoogle></div>
            </div>
        </div>
    )
}
export default Sign;