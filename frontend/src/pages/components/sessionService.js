import axios from 'axios';

export const checkSession = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8080/ego/users/checkSession', 
            { withCredentials: true }
        ); 
        return response.data;
    } catch (error) {
        console.error('Errore durante il controllo della sessione:', error);
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