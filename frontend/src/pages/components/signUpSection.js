import React from 'react';
import './components_css/signUpSection.css';

function SignUpSection({ icon: ImgComponent, text, type, name }) {
    return (
        <div className='suAlign'>
            <div className='suStyle'>
                <ImgComponent alt="icon" className="iconStyle" />
                <input type={type} placeholder={text} className="inputStyle" name={name} required/>
            </div>
        </div>
    );
}

export default SignUpSection;