import './css/points.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import Card from './components/card';
import QrCode from './components/qrCode';

import bitmobility from "./img/bitmobility.svg";
import atv from "./img/atv.svg";
import helbiz from "./img/helbiz.svg"


export default function Points() {
    return (
        <div className='body-points'>
            <div className='positionSwitch-points'>
                <Switch></Switch>
            </div>
            <div className="bodyContainer-points">
                <div className="container-points">
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ helbiz } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                </div>
                <div className='container-points'>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
                    <div className="row-points">
                        <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                        <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    </div>
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