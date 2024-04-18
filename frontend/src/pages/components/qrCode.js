import React from 'react';
import './components_css/qrCode.css';
import QrCodeImg from '../img/qrcode.svg'; 

function QrCode() {
    return (
        <div className='position-qrCode'>
            <img src={QrCodeImg} alt="QrCodeImg" id='style-qrCode' />
        </div>
    );
};

export default QrCode;
