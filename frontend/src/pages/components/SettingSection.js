import './components_css/SettingSection.css';
import Arrow from '../img/arrow-settings.svg';

function SettingSection ({ icon: ImgComponent, text }) {
    return(
        <div className='position-settingSection'>
            <div className="positionFirst-settingSection">
                <img src={ImgComponent} alt='icon' id='icon' />
                <p id='text'> { text } </p>
            </div>
            <img src={ Arrow } alt="arrow" />
        </div>
    );
};

export default SettingSection;