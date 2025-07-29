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
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import DashboardLayout from './Components/DashboardLayout/DashboardLayout.jsx';
import DonorDashboard from './Components/DonorDashboard/DonorDashboard.jsx';

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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
          path: '/dashboard',
           element: <Dashboard/>
          },
          {
            path: '/dashboard/my-donations',
            element: <h2>helo</h2>
          }
        
        ]
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
