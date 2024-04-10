import './components/components_css/verifyCode.css';

function VerifyCode() {
    return (
        <div>
            <body>
                <div className='margin'></div>
                <div className='flexcount'>
                    <div className='countcode1'>1</div>
                    <div className='countcode2'>2</div>
                </div>
                <div  className='align'>
                    <div>
                        <h1 className='verifyCode center'>Codice Verifica</h1>
                        <p className='paragraph center'>Inserisci il codice di verifica che ti abbiamo <br /> inviato tramite email</p>
                    </div>
                </div>
                <form className='flexboxnumber'>
                    <input type="text" className='box' placeholder='' />
                    <input type="text" className='box' placeholder='' />
                    <input type="text" className='box' placeholder='' />
                    <input type="text" className='box' placeholder='' />
                </form>
                <div className='flexsubmitbtn'>
                    <div className='submit'>SUBMIT</div>
                </div>
            </body>
        </div>

    )
}
export default VerifyCode;