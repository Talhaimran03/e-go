import './components_css/qrCodeHome.css';
import QrCodeImg from '../img/qrcode.svg'; 

function QrCode() {
    return(
        <div className='position-qrCodeHome'>
            <img src={ QrCodeImg } alt="QrCodeImg" id='style-qrCodeHome'/>
            <p id='text-qrCodeHome'>SCAN QR</p>
        </div>
    );
};

export default QrCode;