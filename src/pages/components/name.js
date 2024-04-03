import './components_css/name.css';

function Name() {
    return (
        <div>
            <div className='background'></div>
            <div className='flexlogo'>
                <div className='shapelogo'></div>
            </div>
            <div className='flexemail'>
                <form className='flexform' action="">
                    <input type="text" className='email' value="Email"/>
                    <input type="text" className='password' value="Password"/>
                </form>
            </div>
        </div>
    );
}

export default Name;