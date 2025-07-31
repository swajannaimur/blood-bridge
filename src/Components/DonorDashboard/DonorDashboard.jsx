import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Loader from '../Loader/Loader';
import RecentRequestsTable from './RecentRequestsTable';
import { Link } from 'react-router';

const DonorDashboard = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [datas, setDatas] = useState([])
    
    useEffect(() => {
        axiosSecure.get(`/get-recent-requests?email=${user.email}`)
            .then(res =>
                setDatas(res.data)
            )
            .catch(error => {
                console.log(error)
            })
    }, [user.email, axiosSecure])

    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <div className='text-center'>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    👋 Welcome, <span className="text-primary">{user?.displayName || 'Donor'}</span>!
                </h1>
                <p className="text-gray-600 mt-2">You're logged in as a donor. Thank you for your support!</p>
            </div>
            <div>
                {datas.length === 0 ? (
                    <p className='text-center font-semibold text-secondary text-2xl '>You have No donation requests found.</p>
                ) : (
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                            <thead className="bg-secondary text-white">
                                <tr className="text-left">

                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Recipient Name</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Recipient Location</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Donation Date</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Donation Time</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Blood Group</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Donation Status</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Donor Information</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Manage Posts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datas.map((data) => (
                                        <RecentRequestsTable
                                            key={data._id}
                                            data={data}
                                            datas={datas}
                                            setDatas={setDatas}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className='flex justify-center items-center'>
                <Link to='/dashboard/donation-requests'>
                <button className=' btn btn-primary'>
                    My Donation Requests
                </button>
                </Link>
            </div>
        </div>
    );
};

export default DonorDashboard;