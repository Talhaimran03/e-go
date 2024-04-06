import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Points from './pages/points';
import Login from './pages/login';
import Sign from './pages/sign';
import VerifyCode from './pages/verifiyCode';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/points', element: <Points /> },
  { path: '/login', element: <Login /> },
  { path: '/sign', element: <Sign /> },
  { path: '/verifyCode', element: <VerifyCode /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;