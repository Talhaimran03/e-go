import './css/Buttons.css';

function Buttons({ img,  testo }) {
    return(
        <a href="#">
            <img src= { img }  alt="icona" />
            <p> { testo } </p>
        </a>
    );
}

export default Buttons;