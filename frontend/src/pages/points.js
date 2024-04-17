import './css/points.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import Card from './components/card';
import QrCode from './components/qrCode';

import bitmobility from "./img/bitmobility.svg";
import atv from "./img/atv.svg";
import helbiz from "./img/helbiz.svg";
import bird from "./img/bird.svg";
import veronaBike from "./img/veronaBike.svg";
import lime from "./img/lime.svg";
import dott from "./img/dott.svg";
import zalando from "./img/zalando.svg";


export default function Points() {
    return (
        <div className='body-points'>
            <div className='positionSwitch-points'>
                <Switch></Switch>
            </div>
            <div className="bodyContainer-points">
                <div className="container-points">
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo Bitmobility" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo Atv" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ lime } text="Bonus Regalo Lime" points="145 di 2000 punti" />
                        <Card img={ bird } text="Bonus Regalo Bird" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ veronaBike } text="Bonus Regalo Verona Bike" points="145 di 2000 punti" />
                        <Card img={ helbiz } text="Bonus Regalo Helbiz" points="145 di 2000 punti" />
                    </div>
                </div>
                <div className='container-points'>
                    <div className="row-points">
                        <Card img={ dott } text="Bonus Regalo Dott" points="145 di 2000 punti" />
                        <Card img={ zalando } text="Bonus Regalo Zalando" points="145 di 2000 punti" />
                    </div>
                    {/* <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div> */}
                </div>
            </div>
            <Link to="/Qr">
                <div className="qrPosition-points">
                    <QrCode />
                </div>
            </Link>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </div>
    );
};