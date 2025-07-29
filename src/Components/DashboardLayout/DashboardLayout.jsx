import React, { useContext } from 'react';
import { Outlet } from 'react-router'; // ✅ Correct import
import { AuthContext } from '../Contexts/AuthContext';
import DashboardSidebar from '../DashboardSIdebar/DashboardSIdebar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-gray-100">
            {/* Drawer Toggle for Mobile */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Page Content Area */}
            <div className="drawer-content flex flex-col p-4">
                {/* Mobile Drawer Button */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4 self-start">
                    ☰ Open Menu
                </label>

                {/* Render dynamic page here */}
                <main className="flex-1 bg-white rounded-lg p-6 shadow-md">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar Drawer */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <aside className="w-72 bg-gray-800 text-white min-h-full p-6 space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    <DashboardSidebar />
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
