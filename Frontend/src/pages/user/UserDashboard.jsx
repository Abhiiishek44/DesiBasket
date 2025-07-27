import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext.jsx";
import { WishListContext } from "../../context/WishListContext.jsx";
import SearchProducts from "../SearchProducts.jsx"; // Add this import
import UseAuth from "../../context/UserContext.jsx";
export default function UserDashboard() {
  const { cartItem, addToCart } = useContext(CartContext);
  const { addToWishList, wishListItems } = useContext(WishListContext);
  const { isAuthenticated} = UseAuth();

  // State management
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  // User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

    useEffect(() => {
    fetchAllProducts();
    fetchUserData();
  }, []);
  const fetchAllProducts = async () => {
    const response = await axios.get("http://localhost:3000/user/all-products");
    // Handle the response to set all products
    if (response.status === 200) {
      setAllProducts(response.data.products);
    }
  };

  // Enhanced search function with debouncing and better performance
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(true);

    // Clear previous timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    if (value.trim() === "") {
      setFilteredProducts([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search to avoid too many operations
    window.searchTimeout = setTimeout(() => {
      try {
        const searchValue = value.toLowerCase().trim();
        const filtered = allProducts.filter((product) => {
          const name = product.name?.toLowerCase() || "";
          const category = product.category?.toLowerCase() || "";
          const description = product.description?.toLowerCase() || "";

          return (
            name.includes(searchValue) ||
            category.includes(searchValue) ||
            description.includes(searchValue)
          );
        });

        setFilteredProducts(filtered);
        setIsSearching(false);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredProducts([]);
        setIsSearching(false);
      }
    }, 300);
  };

  // Enhanced clear search function
  const clearSearch = () => {
    // Clear any pending search timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    setSearchTerm("");
    setFilteredProducts([]);
    setSearchResults([]);
    setShowSearchDropdown(false);
    setShowSearchResults(false);
    setIsSearching(false);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout);
      }
    };
  }, []);
  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the search container
      const searchContainer = event.target.closest(".relative");
      if (!searchContainer) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
   
  // Fetch user data on mount
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/user-profile", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserName(response.data.user.name);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoggedIn(false);
    }
  };
  
  const logoutUser = async () => {
       try{
        const response =await axios.post("http://localhost:3000/user/user-logout", {}, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUserName("");
            window.location.reload();
        }
       }catch (error) {
         console.error("Failed to logout:", error);
       }
  }
    
  return (
    <div className="h-screen bg-[#ffffff]">
      {/* Flipkart-style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-[#2874f0] px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/dashboard" className="flex items-center">
                <span className="text-white text-xl font-bold italic">
                  DesiBasket
                </span>
                <span className="text-yellow-400 text-xs ml-1">Explore</span>
                <span className="text-yellow-400 text-xs ml-1">Plus</span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 pl-10 pr-10 bg-white border-0 text-gray-700 placeholder-gray-500 focus:outline-none rounded-lg"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    onFocus={() => setShowSearchDropdown(true)}
                  />

                  {/* Search Icon or Loading Spinner */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2874f0]"></div>
                    ) : (
                      <svg
                        className="w-4 h-4 text-[#2874f0]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Clear Search Button */}
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {searchTerm && showSearchDropdown && (
                  <SearchProducts
                    searchResults={filteredProducts}
                    searchTerm={searchTerm}
                    onClearSearch={clearSearch}
                    isSearching={isSearching}
                  />
                )}
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-6">
                <Link
                  to="/wishlist"
                  className="flex items-center text-white hover:text-yellow-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm">Wishlist</span>
                  {wishListItems.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {wishListItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center text-white hover:text-yellow-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 0 0 1.414 1.414L9 14m0 0v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5"
                    />
                  </svg>
                  <span className="text-sm">Cart</span>
                  {cartItem.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItem.length}
                    </span>
                  )}
                </Link>


                <div className="relative group">
                  <Link className="flex items-center text-white cursor-pointer">
                    <div className="w-7 h-7 bg-white text-[#2874f0] rounded-full flex items-center justify-center text-sm font-semibold">
                      {userName ? userName.charAt(0).toUpperCase() : "A"}
                    </div>
                    <span className="ml-2 text-sm">
                      {userName ? userName : "Account"}</span>
                  </Link>
 
                  {/* Dropdown on hover */}
                 {    
                    isLoggedIn ?(
                      <div className="absolute z-50 top-full left-0  hidden group-hover:block bg-white text-black rounded-md shadow-lg w-40">
                        <ul className="flex flex-col p-2">
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <span
                              onClick={logoutUser}
                              className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                            >
                              Logout
                            </span>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="absolute z-50 top-full left-0  hidden group-hover:block bg-white text-black rounded-md shadow-lg w-40">
                    <ul className="flex flex-col p-2">
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link  
                          to="/register"
                          className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* Main Content */}
      {/* Search results are now shown as dropdown in header, remove this section */}

      {/* Category Navigation */}
      <section className="bg-white border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">
              Categories
            </h2>
            <button className="text-xs text-[#3b82f6] hover:text-[#2563eb] font-medium flex items-center">
              View All
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            <Link
              to="/category/clothing"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
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
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Clothing
              </span>
            </Link>
            <Link
              to="/category/electronics"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Electronics
              </span>
            </Link>
            <Link
              to="/category/food"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 13.546V6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v9.046z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Food
              </span>
            </Link>
            <Link
              to="/category/home"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Home
              </span>
            </Link>
            <Link
              to="/category/beauty"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Beauty
              </span>
            </Link>
            <Link
              to="/category/crafts"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v14a2 2 0 01-2 2h-4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Crafts
              </span>
            </Link>
            <Link
              to="category/books"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Books
              </span>
            </Link>
            <Link
              to="category/sports"
              className="flex flex-col items-center cursor-pointer group bg-gray-50 hover:bg-[#3b82f6] rounded-lg p-2 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-white group-hover:bg-white/20 rounded-lg flex items-center justify-center shadow-sm mb-1">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-white transition-colors font-medium text-xs text-center">
                Sports
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing
              <span className="text-[#3b82f6]"> Desi Products</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Shop authentic Indian products, traditional crafts, and modern
              essentials all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                All Products
              </h2>
              <p className="text-gray-600">Discover our complete collection</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Customer Rating</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button className="bg-[#3b82f6] text-white p-2">
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button className="bg-white text-gray-600 p-2 hover:bg-[#3b82f6] hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColorw"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative bg-white p-4 flex items-center justify-center h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x200?text=No+Image";
                    }}
                  />

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishList(product);
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 hover:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {/* Stock Badge */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Only {product.stock} left
                    </div>
                  )}
                  
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 border-t border-gray-100">
                  {/* Brand/Category */}
                  <div className="mb-1">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-gray-900 font-normal mb-1 line-clamp-2 text-sm leading-5 h-10">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                      <span className="font-medium">{(product.ratings || 4.0).toFixed(1)}</span>
                      <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-gray-500 text-xs ml-1">({Math.floor(Math.random() * 1000) + 100})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-900 font-semibold text-base">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        ₹{Math.floor(product.price * 1.3).toLocaleString()}
                      </span>
                      <span className="text-green-600 text-sm font-medium">
                        {Math.floor(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100)}% off
                      </span>
                    </div>
                    <div className="text-green-600 text-xs mt-0.5">
                      Free delivery
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isAuthenticated && addToCart(product);
                    }}
                    disabled={product.stock === 0  || !isAuthenticated}
                    className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#ff9f00] text-white hover:bg-[#e8890b] active:bg-[#cc7a00]'
                     }    `}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest deals and new arrivals directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
              <button className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3b82f6]/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <h3 className="text-xl font-bold text-gray-900">DesiBasket</h3>
              </div>
              <p className="text-gray-600">
                Your one-stop destination for authentic Indian products and
                modern essentials.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Food & Spices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                  >
                    Handicrafts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999s.359-.219.359-1.219c0-1.141.219-1.999.219-1.999" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2025 DesiBasket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
