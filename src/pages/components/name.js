import './components_css/name.css';
import Logo from ".//logo";

function Name() {
    return (
        <body>
            <div>
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
                        <h3 className='pwddimenticata'>password dimenticata?</h3>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Name;