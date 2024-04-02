<<<<<<< Updated upstream
// import '';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
=======
import './css/points.css'
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Logo from "./components/logo";

>>>>>>> Stashed changes

export default function Points() {
    return (
        <>
<<<<<<< Updated upstream
            <Navbar></Navbar>
            
=======
            {/* <div className="pos-logo">
                <Logo></Logo>
            </div> */}
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
>>>>>>> Stashed changes
        </>
    );
}