import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/landingPage';
import Settings from './pages/settings';
import Points from './pages/points';
import Info from './pages/info';
import LandingPage from './pages/landingPage';
import Footer from './pages/footer';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/points', element: <Points /> },
  { path: '/info', element: <Info /> },
  { path: '/landingPage', element: <LandingPage /> },
  { path: '/', element: <Footer />},
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;