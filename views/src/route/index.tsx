import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/home';
import About from '@/pages/about';
import Login from '@/pages/login';

export default createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/',
    element: <App />,
    loader: () => {
      const token = window.localStorage.getItem('ps-token');
      if (token) return token;
      return redirect('/login');
      // return null;
    },
    children: [
      {
        path: '/index',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },

]);
