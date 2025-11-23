import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Loader/Loader';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/axiosSecure';
import { FaRegHospital, FaRegUser } from 'react-icons/fa';
import { MdOutlineBloodtype, MdOutlineDateRange } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

const DonationRequestDetails = () => {
    const params = useParams()
    const { user, loading } = useContext(AuthContext)
    const [data, setData] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/donation-requests/${params.id}`)
            .then(res => {
                setData(res.data)
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            })
    }, [params.id])

    if (loading || !data) {
        return <Loader></Loader>
    }

    const {
        _id,
        requesterName,

        recipientName,
        district,
        upozila,
        hospitalName,

        requestMessage,
        bloodGroup,
        donationDate,
        donationTime,

    } = data;
    console.log(data);

    const handleUpdateDonationRequest = e => {
        e.preventDefault();
        const form = e.target;
        const donorName = form.donorName.value;
        const donorEmail = form.donorEmail.value;
        const newStatus = 'inprogress';

        axiosSecure.patch(`/donation-requests/${_id}`, {
            newStatus,
            donorName,
            donorEmail
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
                    document.getElementById(`${_id}`).close();
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        // <div className="max-w-4xl mx-auto px-4 py-10">
        //     <div className="bg-white shadow-lg rounded-2xl p-8">
        //         <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        //             Blood Donation Request
        //         </h2>

        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Recipient Name</p>
        //                 <p className="text-md font-semibold text-black">{recipientName}</p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Blood Group</p>
        //                 <p className="text-md font-semibold text-black">{bloodGroup}</p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Location</p>
        //                 <p className="text-md font-semibold text-black">
        //                     {district}, {upozila}
        //                 </p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Hospital</p>
        //                 <p className="text-md font-semibold text-black">{hospitalName}</p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Full Address</p>
        //                 <p className="text-md font-semibold text-black">{fullAddresses}</p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Date & Time</p>
        //                 <p className="text-md font-semibold text-black">
        //                     {donationDate} at {donationTime}
        //                 </p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Request Status</p>
        //                 <p className='text-md font-semibold text-black'>{donationStatus}
        //                 </p>
        //             </div>
        //             <div>
        //                 <p className="text-primary text-xl font-bold">Requested By</p>
        //                 <p className="text-md font-semibold text-black">
        //                     {requesterName}<br />
        //                     <span className="text-md font-semibold text-black">{requesterEmail}</span>
        //                 </p>
        //             </div>
        //         </div>

        //         {requestMessage && (
        //             <div className="mt-6">
        //                 <p className="text-primary text-xl font-bold">Request Message</p>
        //                 <p className="text-md font-semibold text-black">{requestMessage}</p>
        //             </div>
        //         )}

        //         <div className="mt-10 text-center">
        //             <button className="btn btn-primary" onClick={() => document.getElementById(`${_id}`).showModal()}>Donate Now</button>
        //             <dialog id={`${_id}`} className="modal">
        //                 <div className="modal-box">
        //                     <form onSubmit={handleUpdateDonationRequest} className='flex flex-col gap-4 items-center justify-center'>
        //                         <div className='flex justify-center items-center gap-4'>
        //                             <fieldset>
        //                                 <legend className="text-sm font-bold text-secondary mb-1">Donor Name</legend>
        //                                 <input
        //                                     type="text"
        //                                     readOnly
        //                                     defaultValue={user.displayName || ''}
        //                                     name="donorName"
        //                                     className="input w-full border-primary border-2"
        //                                 />
        //                             </fieldset>

        //                             <fieldset>
        //                                 <legend className="text-sm font-bold text-secondary mb-1">Donor Email</legend>
        //                                 <input
        //                                     type="email"
        //                                     readOnly
        //                                     defaultValue={user.email || ''}
        //                                     name="donorEmail"
        //                                     className="input w-full border-primary border-2"
        //                                 />
        //                             </fieldset>
        //                         </div>
        //                         <div>
        //                             <button className='btn btn-primary'>Confirm</button>
        //                         </div>
        //                     </form>

        //                     <div className="modal-action">
        //                         <form method="dialog">
        //                             <button className="btn btn-secondary">Close</button>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </dialog>
        //         </div>
        //     </div>
        // </div>

        <div className='max-w-4xl mx-auto px-4 py-10 min-h-screen'>
            <div className='bg-white p-10 rounded-lg'>
                <div className='flex justify-between gap-10'>
                    {/* Left side */}
                    <div className='flex-1 min-w-0'>
                        <h2 className='font-bold text-xl'>Request Details</h2>
                        <div className='my-8'>
                            <ul className='space-y-6'>
                                <li className='flex items-center gap-4'>
                                    {/* Icon */}
                                    <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                        <FaRegUser size={20} />
                                    </div>
                                    {/* Details */}
                                    <div className=''>
                                        <h2 className='text-[#6c7381]'>Recipient Name</h2>
                                        <h2 className='font-bold text-lg'>{recipientName}</h2>
                                    </div>
                                </li>

                                <li className='flex items-center gap-4'>
                                    {/* Icon */}
                                    <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                        <MdOutlineBloodtype size={20} />
                                    </div>
                                    {/* Details */}
                                    <div className=''>
                                        <h2 className='text-[#6c7381]'>Blood group needed</h2>
                                        <h2 className='font-bold text-lg'>{bloodGroup}</h2>
                                    </div>
                                </li>

                                <li className='flex items-center gap-4'>
                                    {/* Icon */}
                                    <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                        <MdOutlineDateRange size={20} />
                                    </div>
                                    {/* Details */}
                                    <div className=''>
                                        <h2 className='text-[#6c7381]'>Date</h2>
                                        <h2 className='font-bold text-lg'>{donationDate}</h2>
                                    </div>
                                </li>

                                <li className='flex items-center gap-4'>
                                    {/* Icon */}
                                    <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                        <IoMdTime size={20} />
                                    </div>
                                    {/* Details */}
                                    <div className=''>
                                        <h2 className='text-[#6c7381]'>Time</h2>
                                        <h2 className='font-bold text-lg'>{donationTime}</h2>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className='flex-1 min-w-0'>
                        <div>
                            <h2 className='font-bold text-xl'>Location and User Details</h2>
                            <div className='my-8'>
                                <ul className='space-y-6'>
                                    <li className='flex items-center gap-4'>
                                        {/* Icon */}
                                        <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                            <FaRegHospital size={20} />
                                        </div>
                                        {/* Details */}
                                        <div className=''>
                                            <h2 className='text-[#6c7381]'>Hospital</h2>
                                            <h2 className='font-bold text-lg'>{hospitalName}</h2>
                                        </div>
                                    </li>

                                    <li className='flex items-center gap-4'>
                                        {/* Icon */}
                                        <div className='bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-lg'>
                                            <IoLocationOutline size={20} />
                                        </div>
                                        {/* Details */}
                                        <div className=''>
                                            <h2 className='text-[#6c7381]'>Address</h2>
                                            <h2 className='font-bold text-lg '>{district}, {upozila}</h2>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {requestMessage && (
                            <div className="mt-6">
                                <h2 className='font-bold text-xl'>Message from requester</h2>
                                <h2 className='ml-4 text-[#6c7381] mt-4'>"{requestMessage}"</h2>
                                <h2 className='text-end text-[#6c7381] my-4'>- {requesterName} (volunteer)</h2>
                            </div>
                        )}
                    </div>

                    {/*Donate now Button */}
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary" onClick={() => document.getElementById(`${_id}`).showModal()}><MdOutlineBloodtype size={20} /> Donate Now</button>
                    <dialog id={`${_id}`} className="modal">
                        <div className="modal-box rounded-2xl p-8 bg-base-100 shadow-xl border border-base-300">

                            <h3 className="text-xl font-bold mb-6 text-center">Confirm Donation Request</h3>

                            <form
                                onSubmit={handleUpdateDonationRequest}
                                className="flex flex-col gap-6"
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-primary mb-2">Donor Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            defaultValue={user.displayName || ''}
                                            name="donorName"
                                            className="input input-bordered w-full border-2   focus:outline-none"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-primary mb-2">Donor Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            readOnly
                                            defaultValue={user.email || ''}
                                            name="donorEmail"
                                            className="input input-bordered w-full border-2   focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button className="btn btn-primary text-white font-bold transition-transform duration-300 hover:scale-[1.02]">
                                    Confirm
                                </button>

                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn rounded-xl btn-ghost font-semibold hover:bg-base-200 px-6">
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                </div>
            </div>
        </div>

    );
};

export default DonationRequestDetails;
