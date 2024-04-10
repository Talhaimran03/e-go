import './components_css/signUpSection.css';

function SignUpSection ({ icon: ImgComponent, text }) {
    return(
        <div className='suAlign'> 
        <div className='suStyle'>
            <ImgComponent alt="icon" id="iconStyle"/>
            <input type="text" placeholder={text} id="inputStyle"/>
        </div>
        </div>
                
    );
    
};

export default SignUpSection;