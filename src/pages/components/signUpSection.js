import './components_css/signUpSection.css';

function SignUpSection ({ icon: ImgComponent, text, type }) {
    return(
        <div className='suAlign'> 
        <div className='suStyle'>
            <ImgComponent alt="icon" id="iconStyle"/>
            <input type={type} placeholder={text} id="inputStyle"/>
        </div>
        </div>
                
    );
    
};

export default SignUpSection;