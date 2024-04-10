import './components_css/SettingSection.css';
// import Arrow from '../img/arrow.svg';

function SettingSection ({ icon: ImgComponent, text }) {
    return(
        <div id='position'>
            <div className="positionFirst">
                <img src={ImgComponent} alt='icon' id='icon' />
                <p id='text'> { text } </p>
            </div>
            <p id='arrow'>></p>
        </div>
    );
};

export default SettingSection;