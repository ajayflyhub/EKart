import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#364d79] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, John Doe</span>
          <img
            src="/user-avatar.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-100 w-64 p-4">
          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-100"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="/messages"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-100"
                >
                  Messages
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-100"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-100"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#364d79] text-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div className="bg-[#364d79] text-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Pending Tasks</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Analytics</h3>
            <p>Chart data or other relevant information goes here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
