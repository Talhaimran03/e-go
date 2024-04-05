import './components_css/name.css';

function Name() {
    return (
        <div>
            <div className='background'></div>
            <div className='flexlogo'>
                <div className='shapelogo'></div>
            </div>
            <div className='flexplace'>
                <form className='flexform' action="">
                    <input type="text" className='email' value="Email" />
                    <input type="text" className='password' value="Password" />
                    <button type='button' className='accedi'>ACCEDI</button>
                    <h3 className='pwddimenticata'>password dimenticata?</h3>
                </form>
            </div>
        </div>
    );
}

export default Name;