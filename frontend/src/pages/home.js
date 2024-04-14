import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import { checkSession } from './components/sessionService';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSessionChecked, setIsSessionChecked] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
            if (!isSessionChecked) { 
                const isLoggedIn = await checkSession(navigate);
                setIsLoggedIn(isLoggedIn);
                setIsSessionChecked(true); 
            }
        };

        fetchSession();
    }, [isSessionChecked, navigate]);

    return (
        <>
            <div className='pos-navbar'>
                <Navbar isLoggedIn={isLoggedIn} />
            </div>
        </>
    );
}