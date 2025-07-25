import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { WishListContext } from "../../context/WishListContext.jsx";
export default function UserWishList() {
  const { wishListItems, setWishListItems, removeFromWishlist, clearWishList ,moveToCart} =
    useContext(WishListContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-[#3b82f6] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-gray-600 mt-1">
                  {wishListItems.length}{" "}
                  {wishListItems.length === 1 ? "item" : "items"} saved for
                  later
                </p>
              </div>
            </div>

            {/* DesiBasket Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h2 className="text-xl font-bold text-gray-900">DesiBasket</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishListItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-gray-400"
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
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist and never lose track of them
              again!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3b82f6]/90 transition-colors"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          /* Wishlist Items List */
          <>
            {/* Wishlist Actions Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Saved Items
                </h2>
                <div className="bg-[#3b82f6] text-white text-sm px-3 py-1 rounded-full font-medium">
                  {wishListItems.length}
                </div>
              </div>

              <button
                onClick={() => clearWishList()}
                className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center space-x-1 transition-colors"
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Clear All</span>
              </button>
            </div>

            {/* Wishlist Items - Row Format */}
            <div className="space-y-4">
              {wishListItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/10"
                >
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150x150?text=No+Image";
                          }}
                        />
                      </div>

                      {/* Discount Badge */}
                      {item.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          -{item.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Category */}
                          <div className="mb-2">
                            <span className="text-[#3b82f6] text-xs font-medium bg-blue-50 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          </div>

                          {/* Product Name */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#3b82f6] transition-colors cursor-pointer">
                            {item.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm ml-2">
                              ({item.rating})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center space-x-3">
                            <span className="text-[#3b82f6] font-bold text-xl">
                              {/* ₹{item.price.toLocaleString()} */}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-gray-400 line-through text-sm">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-green-600 text-sm font-medium">
                              Save ₹
                              {(
                                item.originalPrice - item.price
                              ).toLocaleString()}
                            </span>
                          </div>

                          {/* Stock Status */}
                          <div className="mt-2">
                            {item.stock > 0 ? (
                              <span className="text-green-600 text-sm font-medium">
                                ✓ In Stock ({item.stock} available)
                              </span>
                            ) : (
                              <span className="text-red-600 text-sm font-medium">
                                ✗ Out of Stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 ml-6">
                          <button
                            onClick={() => moveToCart(item._id)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors text-sm flex items-center space-x-2 ${
                              item.stock > 0
                                ? "bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={item.stock === 0}
                          >
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
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 0 0 1.414 1.414L9 14m0 0v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5"
                              />
                            </svg>
                            <span>
                              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </span>
                          </button>

                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="px-6 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors text-sm flex items-center space-x-2"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
