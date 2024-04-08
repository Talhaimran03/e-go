import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import App from './components/hero.js'
import './components/components_css/hero.css'

export default function Home() {
    return (
        <div className='home'>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <App></App>
        </div>
    );
}
