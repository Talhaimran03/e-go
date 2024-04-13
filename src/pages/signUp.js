import './css/signUp.css';
import SignUpSection from "./components/signUpSection";
import { ReactComponent as Emailicon } from "./img/email-icon.svg";
import { ReactComponent as Arrowreturn } from "./img/Indietro.svg";
import { ReactComponent as Iconautente } from "./img/icona_utente.svg";
import { ReactComponent as Calendaricon } from "./img/calendar_month.svg";
import { ReactComponent as Pswicon } from "./img/icona_lucchetto.svg";

export default function Sign() {
    return (
        <div>
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
            <div className='sualign'>
            <div className='sushaperegister'>

                <div>
                    <SignUpSection icon={Emailicon} text="Email" type="email"></SignUpSection>
                </div>
                <div>
                    <SignUpSection icon={Iconautente} text="Nome" type="text"></SignUpSection>
                </div>
                <div>
                    <SignUpSection icon={Iconautente} text="Cognome" type="text"></SignUpSection>
                </div>
                <div>
                    <SignUpSection icon={Calendaricon} text="Data di nascita" type='date'></SignUpSection>
                </div>
                <div>
                    <SignUpSection icon={Pswicon} text="password" type='password' required></SignUpSection>
                </div>
                <div>
                    <SignUpSection icon={Pswicon} text="ripeti password" type='password'></SignUpSection>
                </div>

            </div>
            </div>

                <div className='suReturnShape' >
                    <button className='suinvia'><Arrowreturn></Arrowreturn></button>
                </div>
            <div className='sumarginfooter'></div>
        </div>

    );
};
