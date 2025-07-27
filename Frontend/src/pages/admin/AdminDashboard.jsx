import axios from "axios";
import React from "react";
import { useEffect } from "react";


export default function AdminDashboard() {
   const [totalProducts, setTotalProducts] = React.useState(0);
    const [totalUsers, setTotalUsers] = React.useState(0);
    useEffect(() => {
      const DataListed = async () => {
        try {
          const [productsResponse, usersResponse] = await axios.all([
            axios.get("http://localhost:3000/admin/get-total-products", {
              withCredentials: true,
            }),
            axios.get("http://localhost:3000/admin/get-total-users", {
              withCredentials: true,
            }),
          ]);
          setTotalProducts(productsResponse.data.totalProducts);
          setTotalUsers(usersResponse.data.totalUsers);
        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
        }
      };
      DataListed();
    }, []);
  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6     ">
        <div className="bg-[#1e293b] rounded-lg border border-[#3b82f6]/20 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#ffffff] mb-2">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-[#f8fafc]/70">
              Manage your e-commerce platform efficiently
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#020817] border border-[#3b82f6]/20 rounded-lg p-6 h-32">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-[#f8fafc]/70 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-[#ffffff]">{totalProducts}</p>
                </div>
                <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3b82f6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21V9"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#020817] border border-[#3b82f6]/20 rounded-lg p-6 h-32">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-[#f8fafc]/70 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-[#ffffff]">856</p>
                </div>
                <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3b82f6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#020817] border border-[#3b82f6]/20 rounded-lg p-6 h-32">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-[#f8fafc]/70 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-[#ffffff]">$24,567</p>
                </div>
                <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3b82f6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#020817] border border-[#3b82f6]/20 rounded-lg p-6 h-32">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-[#f8fafc]/70 text-sm">Total User</p>
                  <p className="text-2xl font-bold text-[#ffffff]">{totalUsers}</p>
                </div>
                <div className="w-16 h-16 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#3b82f6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
