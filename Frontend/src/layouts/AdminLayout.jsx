import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const logoutAdmin = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className="min-h-screen bg-[#020817] text-[#f8fafc]">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-[#3b82f6]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#3b82f6]/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-[#ffffff]">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-[#3b82f6]/10 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#ffffff] text-sm font-bold">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#ffffff] text-sm font-semibold">Admin</span>
              </div>
              <svg className="w-4 h-4 text-[#94a3b8] group-hover:text-[#ffffff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown Menu */}
            <div 
             onClick={logoutAdmin}
            className="absolute right-0 top-full mt-2 w-35 bg-[#1e293b] border border-[#3b82f6]/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="border-t border-[#3b82f6]/20">
                  <button
                    onClick={() => {
                      // Add logout functionality here
                      console.log('Logout clicked');
                    }}
                    className="flex items-center space-x-3 px-3 py-2 text-[#ef4444] hover:bg-red-500/10 rounded-md transition-colors group/item w-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1e293b] border-r border-[#3b82f6]/20 min-h-[calc(100vh-73px)] transition-all duration-300`}>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin/products" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21V9" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Add Products</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin/Product-Categories" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Product Categories</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin/orders" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Orders</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Users</span>}
                </Link>
              </li>
              <li>
                <Link to="/admin/analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#3b82f6]/10 transition-colors group">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                  {sidebarOpen && <span className="text-[#f8fafc] group-hover:text-[#ffffff]">Analytics</span>}
                </Link>
              </li>

            </ul>
          </nav>
        </aside>

        {/* Content Area for Outlet */}
            <div className="bg-[#020817] rounded-lg border border-[#3b82f6]/20 p-6 flex-1">
              <Outlet /> 
            </div>
      </div>
    </div>
  )
}

export default AdminLayout
