import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Points from './pages/points';
import Map from './pages/map';
import Qr from './pages/components/qr';
import ActiveHome from './pages/activeHome';
import QrContainer2 from './pages/components/stopQr';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/points', element: <Points /> },
  { path: '/map', element: <Map /> },
  { path: '/qr', element: <Qr />},
  { path: '/activeHome', element: <ActiveHome />},
  { path: '/QrContainer2', element: <QrContainer2 />},
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;