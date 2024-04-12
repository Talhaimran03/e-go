import './components_css/qrCode.css';
import QrCodeImg from '../img/qrcode.svg'; 

function QrCode() {
    return(
        <div className='position-qrCode'>
            <img src={ QrCodeImg }s alt="QrCodeImg" id='style-qrCode'/>
        </div>
    );
};

export default QrCode;