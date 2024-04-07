import './css/home.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";
import mockup from "./img/mockup.jpeg";

export default function Home() {
    return (
        <div className='home'>
            {/* <div className="pos-logo">
                <Logo></Logo>
            </div> */}
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
            <div className='imgMockup'>
               <img src={mockup}></img>
            </div>
            
            <h1 className='frase1'>Lavoriamo per spronarti a prendere </h1>
            <h1 className='frase2'>consapevolmente </h1>
            <h1 className='frase3'>parte del cambiamento.</h1>
            
            <footer className='footer'>
            <div className='col-3 row partner'> 
                <h2> 10 </h2>
                <h4> partner</h4>
            </div>
            <div className='col-3 row partner2'> 
                <h2> 10 </h2>
                <h4> partner</h4>
            </div>
            <div className='col-3 row partner3'> 
                <h2> 10 </h2>
                <h4> partner</h4>
            </div>
            <div className='col-3 row partner4'> 
                <h2> 10 </h2>
                <h4> partner</h4>
            </div>

            </footer>
        </div>
    );
}