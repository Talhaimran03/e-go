import './css/ranking.css';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import RankingSection from './components/rankingSection';
import User from './img/user.svg';
import QrCode from './components/qrCode';
import { Link } from 'react-router-dom';


export default function Ranking() {
    return (
        <>
            <div className='positionSwitch-ranking'>
                <Switch></Switch>
            </div>

            <div className="container-ranking">
                <RankingSection number='1' icon={ User } text='Talha Imran' points='1009p.'/>
                <RankingSection number='2' icon={ User } text='Marco Bosco' points='976p.'/>
                <RankingSection number='3' icon={ User } text='Anna Benettoni' points='943p.'/>
                <RankingSection number='4' icon={ User } text='Achille Bamfi' points='891p.'/>
                <RankingSection number='5' icon={ User } text='Tu' points='888p.' />
                <RankingSection number='6' icon={ User } text='Lorenzo Russo' points='839p.'/>
                <RankingSection number='7' icon={ User } text='Sofia Spiniella' points='821p.'/>
                <RankingSection number='8' icon={ User } text='Claudia Garofolin' points='818p.'/>
                <RankingSection number='9' icon={ User } text='Tommaso Cocco' points='715p.'/>
                <RankingSection number='10' icon={ User } text='Angelica Ballarotto' points='633p.'/>
                <RankingSection number='11' icon={ User } text='Yasmine Giuliani' points='614p.'/>
                <RankingSection number='12' icon={ User } text='Diego Milli' points='528p.'/>
            </div>
            <Link to="/Qr">
                <div className="qrPosition-ranking">
                    <QrCode />
                </div>
            </Link>
            <div className='pos-navbar'>
                <Navbar></Navbar>
            </div>
        </>
    );
}