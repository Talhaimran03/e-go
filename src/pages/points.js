import './css/points.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import Card from './components/card';

import bitmobility from "./img/bitmobility.svg";
import atv from "./img/atv.svg";
import helbiz from "./img/helbiz.svg"


export default function Points() {
    return (
        <>
            <div>
                <Switch></Switch>
            </div>
            <div className="containerPoints">
                <div className="row">
                    <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                </div>
                <div className="row">
                    <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    <Card img={ helbiz } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                </div>
                <div className="row">
                    <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                </div>
                <div className="row">
                    <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                </div>
                <div className="row">
                    <Card img={ bitmobility } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                    <Card img={ atv } text="Bonus Regalo azienda x" points="145 di 2000 punti" />
                </div>
            </div>


            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
};