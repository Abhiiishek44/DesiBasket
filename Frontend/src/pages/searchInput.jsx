import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
export default function SearchInput({ onResults }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchResults = async (value) => {
    if (!value.trim()) {
      onResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/search?query=${value}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      onResults(response.data.products || []); 
    } catch (error) {
      console.error("Error fetching search results:", error);
      onResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchResults, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products, brands and more"
          className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-200 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2874f0]"></div>
          ) : (
            <svg 
              className="w-5 h-5 text-gray-400" 
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
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
