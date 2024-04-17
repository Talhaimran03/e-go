import React, { useEffect} from 'react';
import Navbar from "./components/Navbar";
import { checkSession } from './components/sessionService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Ip } from './ip.js';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
                const isLoggedIn = await checkSession(navigate);
                if (!isLoggedIn.success) {
                    navigate('/login');
                }

                const token = localStorage.getItem('token');

                // getAllUsers
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get( `http://${Ip}:8080/ego/users/getAllUsers`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
        });
                    console.log(response.data);
                } catch (error) {
                    console.error('Errore:', error);
                }

                // getUser
                // try {
                //     const response = await axios.get('http://localhost:8080/ego/users/getUser',
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // deleteUser
                // try {
                //     const response = await axios.delete('http://localhost:8080/ego/users/deleteUser',
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // logout
                // try {
                //     const response = await axios.delete('http://localhost:8080/ego/users/logout',
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }
                
                // addRoute
                // try {
                //     const startCoordinates = "45.420741,10.976794"; 
                //     const response = await axios.post('http://localhost:8080/ego/routes/addRoute', {
                //         startCoordinates: startCoordinates
                //     }, {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // getAllRoutes
                // try { 
                //     const response = await axios.get('http://localhost:8080/ego/routes/getAllRoutes', 
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // getRoutesOfUser
                // try { 
                //     const response = await axios.get('http://localhost:8080/ego/routes/getRoutesOfUser', 
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // endRoute
                // try {
                //     const endCoordinates = "45.417879,10.959772"; 
                //     const response = await axios.put('http://localhost:8080/ego/routes/endRoute', {
                //         endCoordinates: endCoordinates
                //     }, {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // addReward
                // const rewardData = {
                //     company: 'NomeDellaCompagnia',
                //     discountPercentage: '10', 
                //     requiredPoints: '1000', 
                //     url: 'https://www.example.com'
                // };
                // try {
                //     const response = await axios.post(
                //       'http://localhost:8080/ego/rewards/addReward',
                //       rewardData,
                //       {
                //         headers: {
                //           'Content-Type': 'application/json',
                //           'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //       }
                //     );
                //     console.log(response.data);
                //   } catch (error) {
                //     console.error('Errore:', error);
                //     throw error;
                //   }

                // getAllRewards
                // try {
                //     const response = await axios.get(
                //       'http://localhost:8080/ego/rewards/getAllRewards',
                //       {
                //           headers: {
                //               'Content-Type': 'application/json',
                //               'Authorization': `Bearer ${token}`
                //           },
                //           withCredentials: true
                //       });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

                // getUser
                // try {
                //     const response = await axios.get('http://localhost:8080/ego/users/getUserAverageCO2Savings',{
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}`
                //         },
                //         withCredentials: true
                //     });
                //     console.log(response.data);
                // } catch (error) {
                //     console.error('Errore:', error);
                // }

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
