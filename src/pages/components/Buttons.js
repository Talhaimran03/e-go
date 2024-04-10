import './components_css/Buttons.css';

function Buttons({ img: ImgComponent, testo }) {
    return(
        <div>
            <a href="#">
                <ImgComponent className='icons' />
                <p id='testo'> { testo } </p>
            </a>
        </div>
    );
}

export default Buttons;