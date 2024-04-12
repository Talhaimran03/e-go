import './css/home.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <>
        <div id='home'>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </div>
        </>
    );
}