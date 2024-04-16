import './components_css/qrCodeHome.css';
import QrCodeImg from '../img/qrcode.svg'; 

function QrCode() {
    return(
        <div className='position-qrCodeHome'>
            <p id='text-qrCodeHome'>SCAN QR</p>
            <img src={ QrCodeImg }s alt="QrCodeImg" id='style-qrCodeHome'/>
        </div>
    );
};

export default QrCode;