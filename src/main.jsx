import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RootLayout from './Components/RootLayout/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import AuthProvider from './Components/Provider/AuthProvider.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import CreateDonationRequest from './Pages/CreateDonationRequest.jsx';
import MyDonationRequests from './Pages/MyDonationRequests.jsx';
import DonationRequestDetails from './Components/DonationRequestDetails/DonationRequestDetails.jsx';
import Loader from './Components/Loader/Loader.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import useAxiosSecure from './Hooks/axiosSecure.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: '/create-donation-request',
        element: <PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>
      },
      {
        path: '/donation-requests',
        element: <PrivateRoute><MyDonationRequests></MyDonationRequests></PrivateRoute>
      },
      {
        path: '/donation-requests/:id',
        loader: ({ params }) =>
          fetch(`http://localhost:3000/donation-requests/${params.id}`).then(res => res.json()),
        Component: DonationRequestDetails
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
