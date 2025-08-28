import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import DashboardSidebar from '../DashboardSIdebar/DashboardSIdebar';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer Toggle for Mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col p-4 bg-gray-100">
        {/* Mobile Drawer Button */}
        <header className="flex items-center justify-between mb-4 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-primary drawer-button"
          >
            ☰ Menu
          </label>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 bg-white rounded-lg p-6 shadow-md min-h-[70vh]">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="bg-secondary  md:bg-white  text-white min-h-full p-6 space-y-6 flex flex-col">
          
          <DashboardSidebar />
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
