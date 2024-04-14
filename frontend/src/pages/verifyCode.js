import React, { useState, useEffect, useRef } from 'react'; // Aggiungi useRef per ottenere riferimenti agli input
import axios from 'axios';
import './components/components_css/verifyCode.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function VerifyCode() {
    const location = useLocation();
    const email = location.state ? location.state.email : null;
    const navigate = useNavigate(); 
    const [otpError, setOtpError] = useState(false); 

    useEffect(() => {
        if (!email) {
            navigate('/signUp');
        }
    }, [email, navigate]);

    const inputRefs = useRef([]); // Utilizza useRef per mantenere i riferimenti agli input

    // Funzione per spostare il focus all'input successivo
    const focusNextInput = index => {
        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otp = inputRefs.current.reduce((acc, input) => acc + input.value, '');

        const otpRegex = /^[0-9]{4}$/;
        if (!otpRegex.test(otp)) {
            console.error('L\'OTP deve essere composto da 4 cifre numeriche.');
            setOtpError(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/ego/users/validateUser', {
                email: email, 
                otp: otp
            });
            console.log(response.data);
            if (response.data.success) {
                navigate('/');
            } else {
                console.error('OTP non valido');
                setOtpError(true);
            }
        } catch (error) {
            console.error('Errore:', error.response.data);
        }
    };

    return (
        <div>
            <div className='margin'></div>
            <div className='flexcount'>
                <div className='countcode1'>1</div>
                <div className='countcode2'>2</div>
            </div>
            <div className='align'>
                <div>
                    <h1 className='verifyCode center'>Codice Verifica</h1>
                    <p className='paragraph center'>Inserisci il codice di verifica che ti abbiamo <br /> inviato tramite email</p>
                </div>
            </div>
            <form className='flexboxnumber' onSubmit={handleSubmit}>
                <input ref={el => inputRefs.current[0] = el} type="number" className='box' placeholder='' name="otp1" pattern="[0-9]{1}" maxLength="1" required onChange={() => focusNextInput(0)}
                />
                <input ref={el => inputRefs.current[1] = el} type="number" className='box' placeholder='' name="otp2" pattern="[0-9]{1}" maxLength="1" required onChange={() => focusNextInput(1)}
                />
                <input ref={el => inputRefs.current[2] = el} type="number" className='box' placeholder='' name="otp3" pattern="[0-9]{1}" maxLength="1" required onChange={() => focusNextInput(2)}
                />
                <input ref={el => inputRefs.current[3] = el} type="number" className='box' placeholder='' name="otp4" pattern="[0-9]{1}" maxLength="1" required onChange={() => focusNextInput(3)} />
                <button type="submit" className='submit'>SUBMIT</button>
            </form>
            {otpError && <p className="error-message">OTP non valido</p>}
            {!email && <p>Non hai ancora un account? <Link to="/signUp">Registrati qui</Link></p>}
        </div>
    );
}

export default VerifyCode;