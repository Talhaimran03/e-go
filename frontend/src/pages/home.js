import React, { useEffect} from 'react';
import Navbar from "./components/Navbar";
import { checkSession } from './components/sessionService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }
                
                try {
                    const response = await axios.get('http://localhost:8080/ego/users/getUserById', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${Cookies.get('SESSION')}`
                        },
                        withCredentials: true
                    });

                    console.log(response.data);
                } catch (error) {
                    console.error('Errore durante il recupero degli utenti:', error);
                }
        };

        fetchSession();
    }, []);

    return (
        <>
            <div className='pos-navbar'>
                <Navbar />
            </div>
        </>
    );
}
