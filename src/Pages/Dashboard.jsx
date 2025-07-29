import React from 'react';
import useRole from '../Hooks/UseRole';
import Loader from '../Components/Loader/Loader';
import { Navigate } from 'react-router';
import AdminDashboard from './AdminDashboard';
import DonorDashboard from '../Components/DonorDashboard/DonorDashboard';

const Dashboard = () => {
    const { role, loading } = useRole()
    console.log(role);

    if (loading) {
        return <Loader />
    }
    if (role === 'admin') {
        return <AdminDashboard />
    }
    if (role === 'donor') {
        return <DonorDashboard />
    }

    return <Navigate to='/' />
};

export default Dashboard;