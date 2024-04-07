import './css/points.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import Card from './components/card';

import { ReactComponent as bitmobility } from "./img/bitmobility.svg";
import { ReactComponent as atv } from "./img/atv.svg";


export default function Points() {
    return (
        <>
            <div>
                <Switch></Switch>
            </div>
            <div className="container">
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