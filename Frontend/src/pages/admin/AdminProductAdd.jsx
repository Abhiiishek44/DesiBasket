import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Fetch all products on component mount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/admin/create-product",
        formData
      );
      console.log(formData);
      if (res.status === 200) {
        setSuccess("Product added successfuly");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          image: "",
          stock: "",
        
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setShowAddForm(false);
        setIsLoading(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add product"
      )
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#ffffff]">
            Products Management
          </h1>
          <p className="text-[#f8fafc]/70 mt-1">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => {
            clearMessages();
          }}
          className="bg-[#3b82f6] text-[#ffffff] px-4 py-2 rounded-lg hover:bg-[#3b82f6]/80 transition-colors flex items-center space-x-2"
        >
          <span>Add Product</span>
        </button>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {success}
        </div>
      )}

      {/* Add Product Form */}
      {(
        <div className="bg-[#1e293b] rounded-lg border border-[#3b82f6]/20 p-6">
          <h2 className="text-xl font-semibold text-[#ffffff] mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-[#3b82f6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] placeholder-[#f8fafc]/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] placeholder-[#f8fafc]/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Beauty">Beauty</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] placeholder-[#f8fafc]/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] placeholder-[#f8fafc]/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#f8fafc] text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 bg-[#020817] border border-[#3b82f6]/20 rounded-lg text-[#f8fafc] placeholder-[#f8fafc]/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
                placeholder="Enter product description"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#3b82f6] text-[#ffffff] px-6 py-2 rounded-lg hover:bg-[#3b82f6]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
