<<<<<<< Updated upstream
import './css/Buttons.css';

function Buttons({ img,  testo }) {
    return(
        <a href="#">
            <img src= { img }  alt="icona" />
            <p> { testo } </p>
        </a>
=======
import './components_css/Buttons.css';

function Buttons({ img: ImgComponent, testo }) {
    return(
        <div>
            <a href="#">
                <ImgComponent className='icons' />
                <p id='testo'> { testo } </p>
            </a>
        </div>
>>>>>>> Stashed changes
    );
}

export default Buttons;