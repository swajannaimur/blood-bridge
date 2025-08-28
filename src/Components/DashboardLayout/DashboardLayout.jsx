import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import DashboardSidebar from '../DashboardSIdebar/DashboardSIdebar';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* User info */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden mb-2">
              {/* Placeholder avatar */}
              <img src={user?.avatar || '/default-avatar.png'} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-sm text-gray-200">{user?.email}</p>
          </div>

          {/* Sidebar navigation */}
          <DashboardSidebar />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:shadow-none">
          <button
            className="lg:hidden btn btn-primary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-gray-700">Hello, {user?.name || 'User'}</span>
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
            />
          </div>
        </header>

        {/* Main area */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 min-h-[70vh] transition-all">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
