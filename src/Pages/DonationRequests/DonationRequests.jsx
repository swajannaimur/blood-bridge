import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/axiosPublic';
import SingleRequest from './SingleRequest';
import Loader from '../../Components/Loader/Loader';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdTime } from 'react-icons/io';
import { Link } from 'react-router';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosPublic('pending-requests').then(res => {
            setPosts(res.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }, [axiosPublic])
    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='min-h-screen max-w-6xl mx-auto'>
            <div className="my-12 text-start">
                <h2 className="text-4xl font-extrabold">Current Blood Donation Needs</h2>
                <p className=" text-gray-700 mt-2 text-sm sm:text-base">
                    Find a request near you and help save a life.
                </p>
            </div>

            <div className='mb-10'>
                {posts.length === 0 ? (
                    <p className='text-center font-semibold text-secondary text-2xl '>There is no pending requests have been found</p>
                ) : (
                    <>
                        <div className='grid grid-cols-3 space-y-8'>
                            {
                                posts.map((post) => (
                                    <div key={post._id} className="card w-[350px] h-[260px] bg-base-100 shadow-sm">
                                        <div className="card-body">
                                            <div className="flex justify-between">
                                                <h2 className="text-2xl font-bold"> {post.recipientName}</h2>
                                                <span className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary text-lg font-bold rounded-full">
                                                    {post.bloodGroup}
                                                </span>
                                            </div>
                                            <ul className="mt-6 flex flex-col gap-2 text-[16px]">
                                                <li>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='text-primary'>
                                                            <IoLocationOutline size={20} />
                                                        </div>
                                                        <div>
                                                            <h2>{post.district}, {post.upozila}</h2>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='text-primary'>
                                                            <IoMdTime size={20} />
                                                        </div>
                                                        <div>
                                                            <h2>{post.donationDate}, {post.donationTime}</h2>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="mt-6">
                                              <Link to={`/donation-requests/${post._id}`}>
                                                <button className="btn btn-primary btn-block">View Details</button>
                                              </Link>
                                              
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default DonationRequests;