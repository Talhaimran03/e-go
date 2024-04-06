import './components/components_css/signUp.css';





function SignUp() {
    return (
        <div>
            <div className='body flexcount'>
                <div className='count1'>1</div>
                <div className='count2'>2</div>
            </div>
            <div>
                <h1 className='sign'>REGISTRATI</h1>
            </div>
            <form className='alignboxsign'>
                <input type="text" className='boxemail' placeholder='email'/>
                <input type="text" className='boxemail' placeholder='nome'/>
                <input type="text" className='boxemail' placeholder='cognome'/>
                <input type="text" className='boxemail' placeholder='data di nascita'/>
                <input type="text" className='boxemail' placeholder='password'/>
                <input type="text" className='boxemail' placeholder='ripeti password'/>
            </form>
            <div className='shapesign'></div>
            <div className='buttonalign'>
                <div className='buttonsign'></div>
            </div>
        </div>
    )
}
export default SignUp;