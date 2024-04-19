import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/login.css';
import Logo from "./components/logo.js";
import { ReactComponent as Icongoogle } from "./img/Google__G__logo.svg";
import { ReactComponent as Iconuser } from "./img//icona_utente.svg";
import { ReactComponent as Iconpwd } from "./img/icona_lucchetto.svg";
import { Link, useNavigate } from 'react-router-dom';
import { redirectIfLogged } from './components/sessionService';
import { Ip } from './ip.js';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        redirectIfLogged(navigate, 'login');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            const response = await axios.post(
                `http://${Ip}:8080/ego/users/login`, 
                {
                    email: email,
                    password: password
                },
                { withCredentials: true }
            );
            
            // Verifica se la risposta è definita e se contiene 'data'
            if (response && response.data && response.data.success) {
                const token = response.data.data; 
                localStorage.setItem('token', token);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors[0]);
            } else {
                setError(`Si è verificato un errore durante la richiesta: ${error}`);
            }
        }
        
    };    

    return (
        <div>
            <div className='flexshapelogo'>
                <div className='shapelogo'>
                    <Logo></Logo>
                </div>
            </div>

            <form className='flexform' onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
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

        </div>
    );
}

export default Login;
