import './components_css/card.css';

function Card({ img: ImgComponent, text, points }) {
    return(
        <div className='cardSize'>
            <a href="#">
                <div id="imgPosition">
                    <img src={ImgComponent} alt='partnerImg' id='partnerImg' />
                </div>
                <p id='testo'> { text } </p>
                <p id="punti"> { points } </p>
                <div className='outlineCounter'>
                    <div className="counter">
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Card;