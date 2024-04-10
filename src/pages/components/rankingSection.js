import './components_css/rankingSection.css';


function RankingSection ({ number, icon: ImgComponent, text, points }) {
    return(
        <div id='positionRankingSection'>
            <div className="positionFirst">
                <p>{ number }</p>
                <img src={ImgComponent} alt='icon' id='iconRanking' />
                <p id='textRanking'> { text } </p>
            </div>
            <p>{ points }</p>
        </div>
    );
};

export default RankingSection;