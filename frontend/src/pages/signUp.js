// Sign.js

// import React, { useState } from 'react';
import axios from 'axios';
import './css/signUp.css';
import SignUpSection from "./components/signUpSection";
import { ReactComponent as Emailicon } from "./img/email-icon.svg";
import { ReactComponent as Iconautente } from "./img/icona_utente.svg";
import { ReactComponent as Calendaricon } from "./img/calendar_month.svg";
import { ReactComponent as Pswicon } from "./img/icona_lucchetto.svg";
import { ReactComponent as Arrowreturn } from "./img/Indietro.svg";

function Sign() {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordConfirm = e.target.passwordConfirm.value;
        const name = e.target.name.value;
        const surname = e.target.surname.value;
        const birthDate = e.target.birthDate.value;
    
        const userData = {
            email,
            password,
            passwordConfirm,
            name,
            surname,
            birthDate
        };
    
        console.log(userData);
    
        try {
            const response = await axios.post('http://localhost:8080/ego/users/addUser', userData);
            console.log(response.data);
            // Gestisci la risposta positiva qui, ad esempio, reindirizza a un'altra pagina
        } catch (error) {
            console.error('Errore:', error.response.data);
            // Gestisci la risposta negativa qui, ad esempio, mostra un messaggio di errore all'utente
        }
    };
    

    return (
        <div>
            <div className='arrowreturn'>
                <Arrowreturn></Arrowreturn>
            </div>
            <form onSubmit={handleSubmit}>
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
                            <SignUpSection icon={Emailicon} text="Email" type="email" name="email" />
                        </div>
                        <div>
                            <SignUpSection icon={Iconautente} text="Nome" type="text" name="name" />
                        </div>
                        <div>
                            <SignUpSection icon={Iconautente} text="Cognome" type="text" name="surname" />
                        </div>
                        <div>
                            <SignUpSection icon={Calendaricon} text="Data di nascita" type='date' name="birthDate" />
                        </div>
                        <div>
                            <SignUpSection icon={Pswicon} text="password" type='password' name="password" />
                        </div>
                        <div>
                            <SignUpSection icon={Pswicon} text="ripeti password" type='password' name="passwordConfirm" />
                        </div>
                    </div>
                </div>
                <div className='suReturnShape'>
                    <button type="submit" className='suinvia'><Arrowreturn></Arrowreturn></button>
                </div>
                <div className='sumarginfooter'></div>
            </form>
        </div>
    );
}

export default Sign;
