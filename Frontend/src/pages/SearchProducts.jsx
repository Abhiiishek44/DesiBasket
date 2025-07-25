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
    <div className="absolute top-full left-1/2   transform -translate-x-1/2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 mt-1">
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
