import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Points from './pages/points';
import Ranking from './pages/ranking';
import Map from './pages/map';
import Qr from './pages/components/qr';
import ActiveHome from './pages/activeHome';
import QrContainer2 from './pages/components/stopQr';
import Grafico from './pages/components/graph';
import NotFound from './pages/notFound';
import Info from './pages/info';
import Login from './pages/login';
import SignUp from './pages/signUp';
import VerifyCode from './pages/verifyCode';



const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/points', element: <Points /> },
  { path: '/ranking', element: <Ranking /> },
  { path: '/map', element: <Map /> },
  { path: '/qr', element: <Qr />},
  { path: '/activeHome', element: <ActiveHome />},
  { path: '/QrContainer2', element: <QrContainer2 />},
  { path: '/app', element: <Grafico />},
  { path: '/info', element: <Info />},
  { path: '/login', element: <Login /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/verifyCode', element: <VerifyCode /> },
  { path: '*', element: <NotFound/> }

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;