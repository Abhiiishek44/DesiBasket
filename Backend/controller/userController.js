const User = require("../models/User/UserModel");
const Product = require("../models/Admin/productModel");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "User registration failed", error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    res.status(500).json({ message: "User login failed", error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve products", error: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
    getAllProducts,
};
