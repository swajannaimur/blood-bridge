import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import SingleRequest from './SingleRequest';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axiosPublic('pending-requests').then(res => {
            setPosts(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className='min-h-screen'>
            <div className="my-10 text-center">
                <h2 className="text-3xl font-bold text-primary">Pending Donation Requests</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Below is a list of all blood donation requests that are currently pending. Review the details and take necessary actions to ensure timely support for those in need.
                </p>
            </div>

            <div className=''>
                {posts.length === 0 ? (
                    <p className='text-center font-semibold text-secondary text-2xl '>There is no pending requests have been found</p>
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
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.map((post) => (
                                        <SingleRequest
                                            key={post._id}
                                            post={post}
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

export default DonationRequests;