import './components_css/rankingSection.css';


function RankingSection ({ number, icon: ImgComponent, text, points }) {
    return(
        <div id='position-rankingSection'>
            <div className="positionFirst-rankingSection">
                <p id='number-rankingSection'>{ number }</p>
                <img src={ImgComponent} alt='icon' id='icon-rankingSection' />
                <p id='text-rankingSection'> { text } </p>
            </div>
            <p id='points-rankingSection'>{ points }</p>
        </div>
    );
};

export default RankingSection;