import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/axiosSecure';
import MyDonationRequetsTable from '../Components/MyDonationRequetsTable/MyDonationRequetsTable';
import AllDonationRequestsTable from '../Components/AllDonationRequestsTable/AllDonationRequestsTable';

const AllDonationReques = () => {
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
            <div className="text-center my-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary"> All Donation Requests</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Below is a list of all the blood donation requests submitted by users across the platform.
                    You can view, manage, and track the status of each request to ensure timely assistance to those in need.
                </p>
            </div>
            <div>
                 {requests.length === 0 ? (
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
                                requests.map((request) => (
                                    <AllDonationRequestsTable
                                        key={request._id}
                                        request={request}
                                        requests={requests}
                                        setRequests= {setRequests}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
            </div>
        </div>
    );
};

export default AllDonationReques;