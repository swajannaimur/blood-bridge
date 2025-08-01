import React from 'react';
import useRole from '../Hooks/UseRole';
import Loader from '../Components/Loader/Loader';
import { Navigate } from 'react-router';
import AdminDashboard from './AdminDashboard';
import DonorDashboard from '../Components/DonorDashboard/DonorDashboard';
import VolunteerDashboard from './VolunteerDashboard/VolunteerDashboard';

const Dashboard = () => {
    const { role, loading } = useRole()

    if (loading) {
        return <Loader />
    }
    if (role === 'admin') {
        return <AdminDashboard />
    }
    if (role === 'donor') {
        return <DonorDashboard />
    }
    if (role === 'volunteer') {
        return <VolunteerDashboard/>
    }

    return <Navigate to='/' />
};

export default Dashboard;