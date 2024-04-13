import './css/pages_qrcode.css';
import { ReactComponent as Qrreturn } from "./img/Indietro.svg";


export default function Qrcode() {
    return (
        <>
            <form className='qrflexreturn'>
                <input className="qrreturn"></input>
            </form>

            <p className='qrtext'> Se vuoi raccogliere punti ricordati di scannerizzare il QR Code che trovi sul bus </p>
            <div className='qralertflex'>
                <h1 className='qralert'>Per poter cominciare ad accumulare punti <br />utilizza la web app da telefono</h1>
            </div>
            <div className='qrboxblackflex'>
                <div className='qrboxblack'></div>
                <div className='qrscan'><div className='qrborder'></div></div>
            </div>
        </>
    )
}