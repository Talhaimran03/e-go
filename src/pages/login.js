import './components/components_css/login.css';
import Logo from "./components/logo.js";
import { ReactComponent as Background } from "./img/background.svg";

function Login() {
    return (
            <div>
                <div className='background'>
                    <Background></Background>
                </div>
                <div className='margine'>
                    <div className='background'></div>
                </div>
                <div className='flexshapelogo'>
                    <div className='shapelogo'>
                        <Logo></Logo>
                    </div>
                </div>
                <div className='flexplace'>
                    <form className='flexform' action="">
                        <input type="text" className='email' placeholder="Email" />
                        <input type="text" className='password' placeholder="Password" />
                        <button type='button' className='accedi'>ACCEDI</button>
                        <button type='button' className='signUp'>REGISTRATI</button>
                        <h3 className='pwddimenticata'>password dimenticata?</h3>
                    </form>
                </div>
            </div>
    );
}

export default Login;