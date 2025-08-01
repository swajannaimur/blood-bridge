import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/axiosSecure';
import UsersTable from '../Components/UsersTable/UsersTable';

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const axiosSecure = useAxiosSecure()
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        axiosSecure.get('/all-users')
            .then((res) => setUsers(res.data))
    }, [axiosSecure])

    const filteredStatus = filterStatus
        ? users.filter(user => user.status === filterStatus)
        : users;

    return (
        <div>
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary">All Registered Users</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mt-2 text-sm sm:text-base">
                    Below is the list of all users who have joined the platform (excluding admins). Use this section to view user details and manage their roles or access if needed. This helps ensure the platform remains secure and well-maintained.
                </p>
            </div>

            <div className="flex justify-end mb-4 px-4">
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div>
                {users.length === 0 ? (
                    <p className='text-center font-semibold text-secondary text-2xl '>No Users Found</p>
                ) : (
                    <div className="overflow-x-auto p-4">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                            <thead className="bg-secondary text-white">
                                <tr className="text-left">

                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Avatar</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Role</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Change Role</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Status</th>
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredStatus.map((user) => (
                                        <UsersTable
                                            key={user._id}
                                            user={user}
                                            filteredStatus={filteredStatus}
                                            setUsers={setUsers}
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

export default AllUsers;