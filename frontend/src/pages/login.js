import React, { useState } from 'react';
import axios from 'axios';
import './components/components_css/login.css';
import Logo from "./components/logo.js";
import { ReactComponent as Icongoogle } from "./img/Google__G__logo.svg";
import { ReactComponent as Iconuser } from "./img//icona_utente.svg";
import { ReactComponent as Iconpwd } from "./img/icona_lucchetto.svg";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            const response = await axios.post('http://localhost:8080/ego/users/login', {
                email: email,
                password: password
            });
        
            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            if (error.response.data.errors) {
                setError(error.response.data.errors[0]);
            }
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

            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Login;
