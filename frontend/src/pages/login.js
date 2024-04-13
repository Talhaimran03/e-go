import React, { useState } from 'react';
import axios from 'axios';
import './components/components_css/login.css';
import Logo from "./components/logo.js";
import { ReactComponent as Icongoogle } from "./img/Google__G__logo.svg";
import { ReactComponent as Iconuser } from "./img//icona_utente.svg";
import { ReactComponent as Iconpwd } from "./img/icona_lucchetto.svg";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // Ottieni la funzione di navigazione
    const [error, setError] = useState(null); // Stato per memorizzare gli errori

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('http://localhost:8080/ego/users/login', {
                email: email,
                password: password
            });
            console.log(response.data);
            if (response.data.success) {
                navigate('/');
            } else {
                // Se il login non è riuscito, imposta lo stato degli errori
                setError(response.data.errors);
            }
        } catch (error) {
            // Gestisci altri tipi di errori, ad esempio errori di rete
            console.error('Errore durante il login:', error);
        }
    };

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

            <form className='flexform' onSubmit={handleSubmit}>
                <div className='containerform'>
                    <div><Iconuser></Iconuser></div>
                    <input type="text" className='email' placeholder="Email" name="email" required />
                </div>

                <div className='containerform'>
                    <div><Iconpwd></Iconpwd></div>
                    <input type="password" className='email' placeholder="Password" name="password" required />
                </div>

                <input type='submit' className='accedi' value="ACCEDI"></input>
                <h3 className='pwddimenticata'>password dimenticata?</h3>
                <Link className='signUp' to='/signUp'>REGISTRATI</Link>
            </form>

            <div className='buttonflex'>
                <button className="buttongooglelogin" value="">
                    <Icongoogle></Icongoogle>
                </button>
            </div>

            {/* Visualizza gli errori se presenti */}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Login;