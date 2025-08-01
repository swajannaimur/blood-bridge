import React from 'react';
import { Link } from 'react-router';

const SingleRequest = ({ post }) => {
    const { _id, recipientName, district, upozila, donationDate, donationTime, bloodGroup } = post
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
            <Link to={`/donation-requests/${_id}`}><button className='btn btn-primary'> View</button></Link>
        </td>
    </tr>

};

export default SingleRequest;