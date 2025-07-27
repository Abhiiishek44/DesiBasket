import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";

export default function SearchProducts({
  searchResults,
  searchTerm,
  onClearSearch,
  isSearching,
}) {
  const { addToCart } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);

  // If no search term, return null (don't show anything)
  if (!searchTerm) {
    return null;
  }

  // Show search results as dropdown popup
  return (
    <div className="absolute top-full left-90 right-110 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 mt-1">
      {/* Loading State */}
      {isSearching && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Searching...</span>
        </div>
      )}

      {/* No Results */}
      {!isSearching && searchResults.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No Results Found
          </h3>
          <p className="text-xs text-gray-600">
            No products found for "{searchTerm}"
          </p>
        </div>
      )}

      {/* Search Results Header */}
      {!isSearching && searchResults.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Found {searchResults.length} products for "{searchTerm}"
            </h3>
            <button
              onClick={onClearSearch}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      {!isSearching && searchResults.length > 0 && (
        <div className="max-h-80 overflow-y-auto">
          {searchResults.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
            >
              {/* Product Image */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/48x48?text=No+Image";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 ml-3 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex-shrink-0 ml-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center ml-3 space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={product.stock === 0}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? "Out" : "Add"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishList(product);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <svg
                    className="w-3 h-3"
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
            </div>
          ))}

          {/* Show More Results Link */}
          {searchResults.length > 8 && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all {searchResults.length} results →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
