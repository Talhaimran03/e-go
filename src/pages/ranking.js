// import './css/ranking.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Switch from './components/switch';

export default function Ranking() {
    return (
        <>
            <div>
                <Switch></Switch>
            </div>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
}