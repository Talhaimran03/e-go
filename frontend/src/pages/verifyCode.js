import React, { useState } from 'react';
import axios from 'axios';
import './components/components_css/verifyCode.css';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyCode() {
    const location = useLocation();
    const email = location.state.email;
    const navigate = useNavigate(); 
    const [otpError, setOtpError] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Raccogli i valori dei campi OTP
        const otp1 = e.target.elements.otp1.value;
        const otp2 = e.target.elements.otp2.value;
        const otp3 = e.target.elements.otp3.value;
        const otp4 = e.target.elements.otp4.value;

        const otp = otp1 + otp2 + otp3 + otp4;

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
                <input type="text" className='box' placeholder='' name="otp1" pattern="[0-9]{1}" maxLength="1" required />
                <input type="text" className='box' placeholder='' name="otp2" pattern="[0-9]{1}" maxLength="1" required />
                <input type="text" className='box' placeholder='' name="otp3" pattern="[0-9]{1}" maxLength="1" required />
                <input type="text" className='box' placeholder='' name="otp4" pattern="[0-9]{1}" maxLength="1" required />
                <button type="submit" className='submit'>SUBMIT</button>
            </form>
            {otpError && <p className="error-message">OTP non valido</p>}
        </div>
    );
}

export default VerifyCode;