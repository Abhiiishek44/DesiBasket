import React from 'react';

export default function UserProfile() {
  // Dummy data for demonstration
  const user = {
    name: 'Abhishek Kumar',
    email: 'abhishek.kumar@example.com',
    avatar: 'https://via.placeholder.com/150',
    memberSince: 'July 2025',
  };

  const orders = [
    { id: '#12345', date: 'July 26, 2025', status: 'Delivered', total: '₹1,250.00' },
    { id: '#12344', date: 'July 25, 2025', status: 'Shipped', total: '₹850.50' },
    { id: '#12342', date: 'July 23, 2025', status: 'Processing', total: '₹2,500.00' },
    { id: '#12341', date: 'July 22, 2025', status: 'Delivered', total: '₹500.00' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, and settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
              />
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-2">Member since {user.memberSince}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Logout Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign Out</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to sign out?</p>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>

          {/* Right Column: Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">My Orders</h3>
                <p className="text-gray-600">View your recent order history.</p>
              </div>
              
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            View Details
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of <span className="font-medium">20</span> results
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
