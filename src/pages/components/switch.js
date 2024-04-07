import './components_css/switch.css';
import { Link } from 'react-router-dom';

function Switch() {
    return(
        <div className='position'>
            <div className="row">
                <div className="col-6">
                    <div className="section">
                        <Link to='../points'>
                            <p>Riscatta</p>                 
                        </Link>
                    </div>
               </div>
                <div className="col-6">
                    <div className="section">
                        <Link to='../ranking'>
                            <p>Classifica</p>                 
                        </Link>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Switch;