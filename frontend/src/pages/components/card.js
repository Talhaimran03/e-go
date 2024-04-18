import './components_css/card.css';

function Card({ img: partnerImg, text, points }) {
    const width = `${((parseInt(points) / 1000) * 100).toFixed(2)}%`;

    return(
        <div className='size-card'>
            <a href="#">
                <div id="imgPosition-card">
                    <img src={partnerImg} alt='partnerImg' id='partnerImg-card' />
                </div>
                <p id='text-card'> { text } </p>
                <p id="points-card"> { points } </p>
                <div className='outlineCounter-card'>
                    <div className="counter-card"style={{ width: width }}>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Card;