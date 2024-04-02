import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";

export default function Home() {
    return (
        <>
            {/* <div className="pos-logo">
                <Logo></Logo>
            </div> */}
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
}