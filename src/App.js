import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Points from './pages/points';
import Info from './pages/info';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/points', element: <Points /> },
  { path: '/info', element: <Info /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;