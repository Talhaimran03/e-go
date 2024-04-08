import './components_css/SettingSection.css';
// import Arrow from '../img/arrow.svg';

function SettingSection ({ icon: ImgComponent, text }) {
    return(
        <div id='position'>
            <img src={ImgComponent} alt='icon' id='icon' />
            <p id='testo'> { text } </p>
            <p>></p>
        </div>
    );
};

export default SettingSection;