import './components_css/Buttons.css';

function Button({ img: ImgComponent, testo }) {
    return(
        <div className='button'>
            <ImgComponent className='icons' />
            <p id='testo'> { testo } </p>
        </div>
    );
}

export default Button;