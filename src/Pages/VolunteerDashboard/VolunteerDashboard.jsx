import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Components/Contexts/AuthContext';
import useAxiosSecure from '../../Hooks/axiosSecure';

const VolunteerDashboard = () => {
    const { user } = useContext(AuthContext)
    const [requests, setRequests] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/all-donation-requests')
            .then((res) => {
                setRequests(res.data)
            })
    }, [axiosSecure])

    return (
        <div>
            <div className='text-center'>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    👋 Welcome, <span className="text-primary">{user?.displayName || 'Donor'}</span>!
                </h1>
                <p className="text-gray-600 mt-2">You're logged in as a Volunteer. Thank you for your support!</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-4 mt-8'>

                {/* Total Funds */}
                <div className="card bg-primary text-primary-content shadow-xl min-h-[260px]">
                    <div className="card-body">
                        <h2 className="card-title text-white">Total Funds: 0</h2>
                        <p>This shows the total amount of financial contributions collected through the platform.</p>
                        <div className="card-actions justify-end mt-auto">
                            <button className="btn bg-white text-primary">View Funds</button>
                        </div>
                    </div>
                </div>

                {/* Total Donation Requests */}
                <div className="card bg-primary text-primary-content shadow-xl min-h-[260px]">
                    <div className="card-body">
                        <h2 className="card-title text-white">Total Donation Requests:{requests.length}</h2>
                        <p>This indicates the number of blood donation requests submitted by donors or recipients.</p>
                        <div className="card-actions justify-end mt-auto">
                            <button className="btn bg-white text-primary">View Requests</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;