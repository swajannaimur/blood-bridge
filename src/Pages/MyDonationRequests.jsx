import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Components/Contexts/AuthContext';
import Loader from '../Components/Loader/Loader';
import MyDonationRequetsTable from '../Components/MyDonationRequetsTable/MyDonationRequetsTable';
import useAxiosSecure from '../Hooks/axiosSecure';

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/donation-requests?email=${user.email}`)
                .then(res => {
                    setMyRequests(res.data);
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Failed to fetch donation requests", error);
                });
        }
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col justify-center '>
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary"> Your Donation Requests</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Here you can view all your submitted blood donation requests. Make sure to keep your requests up to date so that donors can respond promptly and help save lives.
                </p>
            </div>

            {myRequests.length === 0 ? (
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
                                myRequests.map((myRequest) => (
                                    <MyDonationRequetsTable
                                        key={myRequest._id}
                                        myRequest={myRequest}
                                        myRequests={myRequests}
                                        setMyRequests={setMyRequests}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;
