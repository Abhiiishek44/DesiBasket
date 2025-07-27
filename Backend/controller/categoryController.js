const productSchema = require("../models/Admin/productModel");

const getProductByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
        if (!categoryName) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const products = await productSchema.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: `No products found in category: ${categoryName}`,
        products: [],
      });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      products: products,
      count: products.length,
      category: categoryName,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      message: "Internal server error while fetching products",
      error: error.message,
    });
  }
};

module.exports = {
  getProductByCategory,
};
