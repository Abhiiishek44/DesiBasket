import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminProductCategory() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts()
    fetchCategories() 
  }, [])

  // Filter products when category selection changes
  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
      setFilteredProducts(filtered)
    }
  }, [selectedCategory, products])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/admin/get-all-products')
      setProducts(response.data.products || [])
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      // Extract unique categories from products or fetch from category API
      const response = await axios.get('http://localhost:3000/admin/get-all-products')
      const allProducts = response.data.products || []
      const uniqueCategories = [...new Set(allProducts.map(product => product.category))]
      setCategories(uniqueCategories)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const clearFilter = () => {
    setSelectedCategory('')
  }

   const handleDelete = async (id)=>{
       try{
        const res= await axios.delete(`http://localhost:3000/admin/delete-product/${id}`);
        if (res.status === 200) {
          setProducts(products.filter(product=> product._id !== id));
        }
       }catch(err){
        setError(
          err.response?.data?.message || "Failed to delete product"
        )
       }
  }
  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#ffffff]">Product Categories</h1>
          <p className="text-[#f8fafc]/70 mt-1">Filter and manage products by category</p>
        </div>
        <button
          onClick={fetchProducts}
          className="bg-[#3b82f6] text-[#ffffff] px-4 py-2 rounded-lg hover:bg-[#3b82f6]/80 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Category Filter Container */}
      <div className="bg-[#1e293b] rounded-lg border border-[#3b82f6]/20 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#ffffff] mb-2">Filter by Category</h2>
          <p className="text-[#f8fafc]/70 text-sm">Select a category to filter products</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={clearFilter}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              selectedCategory === '' 
                ? 'bg-[#3b82f6] text-[#ffffff]' 
                : 'bg-[#020817] text-[#f8fafc] border border-[#3b82f6]/20 hover:bg-[#3b82f6]/10'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>All Categories ({products.length})</span>
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                selectedCategory === category 
                  ? 'bg-[#3b82f6] text-[#ffffff]' 
                  : 'bg-[#020817] text-[#f8fafc] border border-[#3b82f6]/20 hover:bg-[#3b82f6]/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{category} ({products.filter(p => p.category === category).length})</span>
            </button>
          ))}
        </div>

        {/* Active Filter Display */}
        {selectedCategory && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-[#f8fafc]/70 text-sm">Active filter:</span>
            <span className="px-3 py-1 bg-[#3b82f6]/20 text-[#3b82f6] rounded-full text-sm font-medium">
              {selectedCategory}
            </span>
            <button
              onClick={clearFilter}
              className="text-[#f8fafc]/50 hover:text-[#f8fafc] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Filtered Products Display */}
      <div className="bg-[#1e293b] rounded-lg border border-[#3b82f6]/20 overflow-hidden">
        <div className="p-4 border-b border-[#3b82f6]/20">
          <h2 className="text-lg font-semibold text-[#ffffff]">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h2>
          <p className="text-[#f8fafc]/70 text-sm mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
            <p className="text-[#f8fafc]/50 mt-2">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-[#f8fafc]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-[#f8fafc]/50">
              {selectedCategory ? `No products found in ${selectedCategory} category` : 'No products found'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#020817]">
                <tr>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Image</th>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Price</th>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Stock</th>
                  <th className="px-4 py-3 text-left text-[#f8fafc] font-medium">Description</th>
                   <th className="px-4 py-3 text-center text-[#f8fafc] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3b82f6]/20">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-[#020817]/50 transition-colors">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#ffffff]">{product.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#3b82f6]/20 text-[#3b82f6] rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#f8fafc]">${product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10 
                          ? 'bg-green-500/20 text-green-400' 
                          : product.stock > 0 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#f8fafc]/70 max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors flex items-center space-x-1 mx-auto group"
                        title="Delete Product"
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
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
