import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const DonorDashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                👋 Welcome, <span className="text-indigo-600">{user?.displayName || 'Donor'}</span>!
            </h1>
            <p className="text-gray-600 mt-2">You're logged in as a donor. Thank you for your support!</p>
        </div>
    );
};

export default DonorDashboard;