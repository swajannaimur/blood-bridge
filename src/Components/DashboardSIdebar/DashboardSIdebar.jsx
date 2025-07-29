import React from 'react';
import { Link } from 'react-router';
import useRole from '../../Hooks/UseRole';
import Loader from '../Loader/Loader';

const DashboardSidebar = () => {
    const { role, loading } = useRole();

    if (loading) return <Loader />;

    if (role === 'admin') {
        return (
            <>
                <Link to="/dashboard">Admin Home</Link>
                <Link to="/dashboard/manage-users">Manage Users</Link>
                <Link to="/dashboard/manage-requests">Manage Requests</Link>
            </>
        );
    }

    if (role === 'donor') {
        return (
            <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded-xl shadow-md">
                <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-indigo-600 transition-colors duration-200"
                >
                    Donor Home
                </Link>
                <Link
                    to="/dashboard/my-donations"
                    className="px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-indigo-600 transition-colors duration-200"
                >
                    My Donations
                </Link>
            </div>
        );
    }

    return null;
};

export default DashboardSidebar;
