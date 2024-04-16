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
                    const startCoordinates = "45.432795,10.996007"; 
                    const response = await axios.post('http://localhost:8080/ego/routes/addRoute', {
                        startCoordinates: startCoordinates
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${Cookies.get('SESSION')}`
                        },
                        withCredentials: true
                    });

                    console.log(response.data);
                } catch (error) {
                    console.error('Errore:', error);
                }
        };

        fetchSession();
    }, [navigate]);

    return (
        <>
            <div className='pos-navbar'>
                <Navbar />
            </div>
        </>
    );
}
