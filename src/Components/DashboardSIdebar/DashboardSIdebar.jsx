import React from 'react';
import { Link, NavLink } from 'react-router';
import useRole from '../../Hooks/UseRole';
import Loader from '../Loader/Loader';

const DashboardSidebar = () => {
    const { role, loading } = useRole();

    if (loading) return <Loader />;

    if (role === 'admin') {
        return (
            <div className="p-4 text-black rounded-xl border-2 border-primary">
                <ul className='space-y-2 '>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/all-users"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                          All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/all-blood-donation-requests"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                          All Donation Requests
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }

    if (role === 'donor') {
        return (
            <div className="p-4 text-black rounded-xl border-2 border-primary">
                <ul className='space-y-2 '>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/donation-requests"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                            My Donation Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/create-donation-request"
                            className="px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
                        >
                            Create Donation Request
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};

export default DashboardSidebar;

