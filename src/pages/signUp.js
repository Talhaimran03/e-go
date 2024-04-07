import './components/components_css/signUp.css';
import { ReactComponent as BkgSignUp } from "./img/BkgSignUp.svg";

function Sign() {
    return (
        <div>
            <div className='BkgSignUp'>
                <BkgSignUp></BkgSignUp>
            </div>
            <div className='flexcount'>
                <div className='count1'>1</div>
                <div className='count2'>2</div>
            </div>
            <div>
                <h1 className='sign'>REGISTRATI</h1>
            </div>
            <form className='alignboxsign'>
                <input type="text" className='boxemail' placeholder='email' />
                <input type="text" className='boxemail' placeholder='nome' />
                <input type="text" className='boxemail' placeholder='cognome' />
                <input type="text" className='boxemail' placeholder='data di nascita' />
                <input type="text" className='boxemail' placeholder='password' />
                <input type="text" className='boxemail' placeholder='ripeti password' />
            </form>
            {/* <div className='shapesign'></div> */}
            <div className='buttonalign'>
                <input type="submit" class="buttonsign" value=""></input>
            </div>
        </div>
    )
}
export default Sign;