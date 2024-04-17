import axios from 'axios';
import { Ip } from '../ip.js';

export const checkSession = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get( `http://${Ip}:8080/ego/users/checkSession`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Errore durante il controllo del token:', error);
        return false;
    }
};

export const redirectIfLogged = async (navigate, currentPage) => {
    const isLoggedIn = await checkSession();
    if (isLoggedIn.success) {
        navigate('/');
    } else {
        if (currentPage === 'login') {
            navigate('/login');
        } else if (currentPage === 'signUp') {
            navigate('/signUp');
        } else if (currentPage === 'verifyCode') {
            navigate('/verifyCode');
        } else {
            navigate('/login');
        }
    }
};