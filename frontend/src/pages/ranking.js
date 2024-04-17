import './css/ranking.css';
import Navbar from "./components/Navbar";
import Switch from './components/switch';
import RankingSection from './components/rankingSection';
import User from './img/user.svg';
import QrCode from './components/qrCode';
import { Link, useNavigate } from 'react-router-dom';
import { checkSession } from './components/sessionService';
import React, { useEffect} from 'react';


export default function Ranking() {

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }
        };

        fetchSession();
    }, [navigate]);
    
    return (
        <>
            <div className='positionSwitch-ranking'>
                <Switch></Switch>
            </div>

            <div className="container-ranking">
                <RankingSection number='1' icon={ User } text='Talha Imran' points='710p.'/>
                <RankingSection number='2' icon={ User } text='Marco Bosco' points='590p.'/>
                <RankingSection number='3' icon={ User } text='Anna Benettoni' points='510p.'/>
                <RankingSection number='4' icon={ User } text='Achille Bamfi' points='450p.'/>
                <RankingSection number='5' icon={ User } text='Tu' points='410p.' />
                <RankingSection number='6' icon={ User } text='Lorenzo Russo' points='390p.'/>
                <RankingSection number='7' icon={ User } text='Sofia Spiniella' points='320p.'/>
                <RankingSection number='8' icon={ User } text='Claudia Garofolin' points='210p.'/>
                <RankingSection number='9' icon={ User } text='Tommaso Cocco' points='200p.'/>
                <RankingSection number='10' icon={ User } text='Angelica Ballarotto' points='180p.'/>
                <RankingSection number='11' icon={ User } text='Yasmine Giuliani' points='120p.'/>
                <RankingSection number='12' icon={ User } text='Diego Milli' points='50p.'/>
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