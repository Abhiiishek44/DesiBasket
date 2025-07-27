const Admin = require("../models/Admin/adminModel");
const productSchema = require("../models/Admin/productModel");
const Category = require("../models/Admin/catogaryModel");
const Order = require("../models/Admin/orderModel");
const User = require("../models/User/UserModel");

const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "abhishek@gmail.com" && password === "123456") {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, category, image, stock } = req.body;
  // console.log("Creating product with data:", req.body);
  try {
    if (!name || !price || !description || !category || !image || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const newProduct = new productSchema({
      name,
      price,
      description,
      category,
      image,
      stock,
    });
    
    const savedProduct = await newProduct.save();
    
    res
      .status(200)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product creation failed", error: err.message });
  }
};

const updateProduct=async(req,res)=>{
      const { id } = req.params;
        const { name, price, description, category, image, stock } = req.body;
        try{
            if (!name || !price || !description || !category || !image || !stock) {
                return res.status(400).json({ message: "All fields are required" });
            }
            
            const updatedProduct = await productSchema.findByIdAndUpdate(
                id,
                { name, price, description, category, image, stock },
                { new: true }
            );
            
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        }catch (err) {
            console.error(err);
            res.status(500).json({ message: "Product update failed", error: err.message });
        }   
}

const deleteProduct =async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteProduct=await productSchema.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }catch(err){
        res.status(500).json({ message: "Product deletion failed", error: err.message });
    }
}
const getAllProducts= async (req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve products", error: err.message });
    }   
}

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ name });

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Category creation failed",
      error: err.message,
    });
  }
};
const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve orders", error: err.message });
  }
};

const getTotalUsers=async (req,res)=>{
      try{
        const users=  User.find();
       User.countDocuments().then((count) => {
          res.status(200).json({ message: "Total users retrieved successfully", totalUsers: count });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve total users", error: err.message });
      }
}

const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await productSchema.countDocuments();
    res.status(200).json({ message: "Total products retrieved successfully", totalProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve total products", error: err.message });
  }
};
module.exports = {
  adminLogin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  createCategory,
  viewAllOrders,
  getTotalUsers,
  getTotalProducts
};
