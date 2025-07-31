import React from 'react';
import useAxiosSecure from '../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const UsersTable = ({ user, users, setUsers }) => {
    const { avatar, email, name, role, status } = user
    const axiosSecure = useAxiosSecure()

    const handleChangeRole = (e, email) => {
        const updatedRole = e.target.value;
        console.log(updatedRole);
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to change the user's role.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-role?email=${email}`, { updatedRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Success!", "User role has been updated.", "success");

                            setUsers(prevUsers =>
                                prevUsers.map(user =>
                                    user.email === email ? { ...user, role: updatedRole } : user
                                )
                            );
                        } else {
                            Swal.fire("No change", "User role was not modified.", "info");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error", "Something went wrong.", "error");
                    });
            }
        });
    };

    const handleBlock = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to block this user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Block!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-user-status?email=${email}`, { updatedStatus: 'block' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Success!", "User has been Blocked.", "success");
                            setUsers(prevUsers =>
                                prevUsers.map(user =>
                                    user.email === email ? { ...user, status: "block" } : user
                                )
                            );
                        } else {
                            Swal.fire("No change", "User status was not modified.", "info");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error", "Something went wrong.", "error");
                    });
            }
        });
    };


    const handleUnBlock = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to unblock this user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, unblock!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-user-status?email=${email}`, { updatedStatus: 'active' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire("Success!", "User has been unblocked.", "success");
                            setUsers(prevUsers =>
                                prevUsers.map(user =>
                                    user.email === email ? { ...user, status: "active" } : user
                                )
                            );
                        } else {
                            Swal.fire("No change", "User status was not modified.", "info");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error", "Something went wrong.", "error");
                    });
            }
        });
    };


    return <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <img src={avatar} alt="" className='w-12 h-12 rounded-full' />
        </td>

        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{name}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{email}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{role}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <select
                className="select select-bordered w-full max-w-xs"
                defaultValue=""
                onChange={(e) => handleChangeRole(e, user.email)}
            >
                <option value="" disabled>
                    Change Role
                </option>
                <option value="volunteer">Make Volunteer</option>
                <option value="admin">Make Admin</option>
                <option value="donor">Make Donor</option>
            </select>
        </td>

        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">{status}</div>
        </td>
        <td className="border border-gray-300 px-2 sm:px-4 py-2">
            <div className="font-medium text-gray-800">
                {status === 'active' && (
                    <button onClick={() => handleBlock(user.email)} className="btn btn-secondary">Block</button>
                )}

                {status === 'block' && (
                    <button onClick={() => handleUnBlock(user.email)} className="btn btn-secondary">Unblock</button>
                )}
            </div>
        </td>

        {/* <td className="border border-gray-300 px-2 sm:px-4 py-2">
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

        </td> */}
    </tr>
};

export default UsersTable;