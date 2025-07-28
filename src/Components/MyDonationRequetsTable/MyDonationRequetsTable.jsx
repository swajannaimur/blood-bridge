import React from 'react';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/axiosSecure';

const MyDonationRequetsTable = ({ myRequest }) => {
    const { _id, recipientName, district, upozila, donationDate, donationTime, bloodGroup, donationStatus, requesterName, requesterEmail } = myRequest
    const axiosSecure = useAxiosSecure()

    const handleStatusUpdate = (id, status) => {
        axiosSecure.patch(`/donation-requests/${id}`, { newStatus: status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", `Status changed to ${status}`, "success");
                }
            })
            .catch(error => {
                toast.error(error.message)
            });
    };

    const handleDeletePost = () => {
        console.log('clicked');

    }
    return <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{recipientName}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{district}, {upozila}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{donationDate}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{donationTime}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{bloodGroup}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            {
                donationStatus === 'inprogress' ? (
                    <>
                        <div className="font-medium text-gray-800">{donationStatus}</div>
                        <div className='flex justify-center items-center gap-2'>
                            <button
                                className='btn btn-primary text-white'
                                onClick={() => handleStatusUpdate(_id, 'done')}>
                                Done
                            </button>

                            <button
                                className='btn btn-secondary text-white'
                                onClick={() => handleStatusUpdate(_id, 'canceled')}>
                                Cancel
                            </button>
                        </div>
                    </>
                ) : <>
                    <div className="font-medium text-gray-800">{donationStatus}</div>
                </>
            }
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{requesterName},{requesterEmail}</div>
        </td>
        <td className="px-2 ">
            <div className='flex justify-center items-center gap-2'>
                <button className='btn btn-primary'>
                    <FaRegEdit size={20} />
                </button>

                <button onClick={() => handleDeletePost(_id)} className='btn btn-primary'>
                    <MdCancel size={20} />
                </button>

                <Link to={`/donation-requests/${_id}`}><button className='btn btn-primary'>
                    <FaRegEye size={20} />
                </button></Link>
            </div>

        </td>
    </tr>
};

export default MyDonationRequetsTable;