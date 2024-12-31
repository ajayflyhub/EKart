import React, { useState } from 'react';

// Mock user data
const mockUser = {
  name: "John Doe",
  role: "admin", // Change to "admin" for admin
  permissions: {
    viewData: true,
    editBasicInfo: true,
  },
};

const Dashboard = () => {
  const [user] = useState(mockUser);
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p>Welcome to your dashboard! Use the side menu to navigate.</p>
          </div>
        );
      case 'Manage Products':
        return user.role === 'admin' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <table className="table-auto w-full bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Sample Product</td>
                  <td className="border px-4 py-2">$100</td>
                  <td className="border px-4 py-2">
                    <button className="text-blue-500">Edit</button> | 
                    <button className="text-red-500">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null;
      case 'Manage Users':
        return user.role === 'admin' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <table className="table-auto w-full bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="border px-4 py-2">User Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Jane Doe</td>
                  <td className="border px-4 py-2">jane.doe@example.com</td>
                  <td className="border px-4 py-2">
                    <button className="text-blue-500">Edit</button> | 
                    <button className="text-red-500">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null;
      case 'Orders':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{user.role === 'admin' ? "All Orders" : "My Orders"}</h2>
            <table className="table-auto w-full bg-white shadow-md rounded">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">ORD123</td>
                  <td className="border px-4 py-2">$200</td>
                  <td className="border px-4 py-2">Shipped</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Profile':
        return user.role === 'user' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                className="border px-4 py-2 mb-4 w-full"
                placeholder="Enter your name"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </form>
          </div>
        ) : null;
      case 'Cart':
        return user.role === 'user' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Cart</h2>
            <p>You have 2 items in your cart.</p>
          </div>
        ) : null;
      default:
        return <p>Select a section from the side menu.</p>;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="bg-gray-100 w-64 p-4">
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('Overview')}
                className={`block w-full text-left px-4 py-2 ${activeTab === 'Overview' ? 'bg-blue-200' : ''}`}
              >
                Overview
              </button>
            </li>
            {user.role === 'admin' && (
              <>
                <li>
                  <button onClick={() => setActiveTab('Manage Products')} className={`block w-full text-left px-4 py-2 ${activeTab === 'Manage Products' ? 'bg-blue-200' : ''}`}>
                    Manage Products
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('Manage Users')} className={`block w-full text-left px-4 py-2 ${activeTab === 'Manage Users' ? 'bg-blue-200' : ''}`}>
                    Manage Users
                  </button>
                </li>
              </>
            )}
            <li>
              <button onClick={() => setActiveTab('Orders')} className={`block w-full text-left px-4 py-2 ${activeTab === 'Orders' ? 'bg-blue-200' : ''}`}>
                {user.role === 'admin' ? "All Orders" : "My Orders"}
              </button>
            </li>
            {user.role === 'user' && (
              <>
                <li>
                  <button onClick={() => setActiveTab('Profile')} className={`block w-full text-left px-4 py-2 ${activeTab === 'Profile' ? 'bg-blue-200' : ''}`}>
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('Cart')} className={`block w-full text-left px-4 py-2 ${activeTab === 'Cart' ? 'bg-blue-200' : ''}`}>
                    My Cart
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
