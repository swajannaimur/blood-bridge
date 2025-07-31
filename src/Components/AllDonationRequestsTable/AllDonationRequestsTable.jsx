import React from 'react';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/axiosSecure';

const AllDonationRequestsTable = ({ request, requests, setRequests }) => {

    const { _id, recipientName, district, upozila, donationDate, donationTime, bloodGroup, donationStatus, requesterName, requesterEmail } = request
    const axiosSecure = useAxiosSecure()

    const handleDeleteRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-requests/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Post has been deleted.",
                                icon: "success"
                            });
                        }

                        const remainingRequests = requests.filter(myPost => myPost._id !== _id)
                        setRequests(remainingRequests)

                    })
                    .catch((error) => {
                        Swal.fire("Error", error.message, "error");
                    });
            }
        });
    };

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
            <div className="font-medium text-gray-800">{donationStatus}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            {
                donationStatus === 'inprogress' ? <>
                    <div className="font-medium text-gray-800">{requesterName},{requesterEmail}</div>
                </> : ''
            }
        </td>
        <td className="px-2 ">
            <div className='flex justify-center items-center gap-2'>
                <Link to={`/dashboard/update-request/${_id}`}>
                    <button className='btn btn-primary'>
                        <FaRegEdit size={20} />
                    </button>
                </Link>

                <button onClick={() => handleDeleteRequest(_id)} className='btn btn-primary'>
                    <MdCancel size={20} />
                </button>

                <Link to={`/donation-requests/${_id}`}><button className='btn btn-primary'>
                    <FaRegEye size={20} />
                </button></Link>
            </div>

        </td>
    </tr>
};

export default AllDonationRequestsTable;