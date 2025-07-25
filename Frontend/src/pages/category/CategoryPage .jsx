import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext.jsx";
import { WishListContext } from "../../context/WishListContext.jsx";

export default function CategoryPage() {
  const { categoryName } = useParams(); // e.g., "electronics"
  const { cartItem, addToCart } = useContext(CartContext);
  const { addToWishList, wishListItems } = useContext(WishListContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Sort products function
  const sortProducts = (products, sortType) => {
    const sortedProducts = [...products];
    switch (sortType) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return sortedProducts.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
      case "featured":
      default:
        return sortedProducts;
    }
  };

  // Get sorted products
  const sortedProducts = sortProducts(categoryProducts, sortBy);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/category/${categoryName}`
        );
        if (response.status === 200) {
        //   console.log("Category products:", response.data.products.map(product => product.name));
          setCategoryProducts(response.data.products || response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch category products", error);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flipkart-style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-[#2874f0] px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-white text-xl font-bold italic">
                  DesiBasket
                </span>
                <span className="text-yellow-400 text-xs ml-1">Explore</span>
                <span className="text-yellow-400 text-xs ml-1">Plus</span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products"
                    className="w-full px-4 py-2 pl-10 bg-white border-0 text-gray-700 placeholder-gray-500 focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-white hover:text-yellow-300 transition-colors cursor-pointer">
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
                  <Link to="/wishlist" className="text-sm">Wishlist</Link>
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {wishListItems.length}
                  </span>
                </div>
                <div className="flex items-center text-white hover:text-yellow-300 transition-colors cursor-pointer">
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
                  <Link to="/cart" className="text-sm">Cart</Link>
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItem.length}
                  </span>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-7 h-7 bg-white text-[#2874f0] rounded-full flex items-center justify-center text-sm font-semibold">
                    U
                  </div>
                  <span className="ml-2 text-sm">Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-[#2874f0] transition-colors cursor-pointer">
              Home
            </span>
            <svg
              className="w-4 h-4"
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
            <span className="text-gray-900 font-medium">{categoryName}</span>
            <span className="text-gray-400">({sortedProducts.length} items)</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Filters and Sort Bar */}
        <div className="bg-white border border-gray-200 rounded mb-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-xl font-medium text-gray-900">{categoryName}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-[#2874f0]"
                >
                  <option value="featured">Relevance</option>
                  <option value="price-low">Price -- Low to High</option>
                  <option value="price-high">Price -- High to Low</option>
                  <option value="name">Name</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Flipkart-style Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product._id} className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow group">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                    onClick={() => addToWishList(product)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
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
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-gray-900 text-sm font-medium mb-1 line-clamp-2 leading-5">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                      <span className="mr-1">{(product.ratings || 4.2).toFixed(1)}</span>
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-gray-500 text-xs ml-2">(1,234)</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{(product.price * 1.3)?.toLocaleString()}
                    </span>
                    <span className="text-green-600 text-sm font-medium ml-2">
                      23% off
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-xs text-gray-600">
                      DesiBasket Assured
                    </span>
                  </div>
                  <button 
                    className="w-full bg-[#ff9f00] text-white py-2 px-4 rounded text-sm font-medium hover:bg-[#e68a00] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white border border-gray-200 rounded">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any products in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
