import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Loader/Loader';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/axiosSecure';

const DonationRequestDetails = () => {
    const { user, loading } = useContext(AuthContext)
    const data = useLoaderData();
    const axiosSecure = useAxiosSecure()

    if (loading) {
        return <Loader></Loader>
    }
    const {
        _id,
        requesterName,
        requesterEmail,
        recipientName,
        district,
        upozila,
        hospitalName,
        fullAddresses,
        requestMessage,
        bloodGroup,
        donationDate,
        donationTime,
        donationStatus
    } = data;
    console.log(data);

    const handleUpdateDonationRequest = e => {
        e.preventDefault();
        const newStatus = 'inprogress';
        axiosSecure.patch(`/donation-requests/${_id}`, { newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
                    document.getElementById(`${_id}`).close();
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
                    Blood Donation Request
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-primary text-xl font-bold">Recipient Name</p>
                        <p className="text-md font-semibold text-black">{recipientName}</p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Blood Group</p>
                        <p className="text-md font-semibold text-black">{bloodGroup}</p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Location</p>
                        <p className="text-md font-semibold text-black">
                            {district}, {upozila}
                        </p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Hospital</p>
                        <p className="text-md font-semibold text-black">{hospitalName}</p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Full Address</p>
                        <p className="text-md font-semibold text-black">{fullAddresses}</p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Date & Time</p>
                        <p className="text-md font-semibold text-black">
                            {donationDate} at {donationTime}
                        </p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Request Status</p>
                        <p className='text-md font-semibold text-black'>{donationStatus}
                        </p>
                    </div>
                    <div>
                        <p className="text-primary text-xl font-bold">Requested By</p>
                        <p className="text-md font-semibold text-black">
                            {requesterName}<br />
                            <span className="text-md font-semibold text-black">{requesterEmail}</span>
                        </p>
                    </div>
                </div>

                {requestMessage && (
                    <div className="mt-6">
                        <p className="text-primary text-xl font-bold">Request Message</p>
                        <p className="text-md font-semibold text-black">{requestMessage}</p>
                    </div>
                )}

                <div className="mt-10 text-center">
                    <button className="btn btn-primary" onClick={() => document.getElementById(`${_id}`).showModal()}>Donate Now</button>
                    <dialog id={`${_id}`} className="modal">
                        <div className="modal-box">
                            <form onSubmit={handleUpdateDonationRequest} className='flex flex-col gap-4 items-center justify-center'>
                                <div className='flex justify-center items-center gap-4'>
                                    <fieldset>
                                        <legend className="text-sm font-bold text-secondary mb-1">Donor Name</legend>
                                        <input
                                            type="text"
                                            readOnly
                                            defaultValue={user.displayName || ''}
                                            name="donorName"
                                            className="input w-full border-primary border-2"
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <legend className="text-sm font-bold text-secondary mb-1">Donor Email</legend>
                                        <input
                                            type="email"
                                            readOnly
                                            defaultValue={user.email || ''}
                                            name="donorEmail"
                                            className="input w-full border-primary border-2"
                                        />
                                    </fieldset>
                                </div>
                                <div>
                                    <button className='btn btn-primary'>Confirm</button>
                                </div>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-secondary">Close</button>
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
