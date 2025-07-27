const User = require("../models/User/UserModel");
const Product = require("../models/Admin/productModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const hashedPassword = await bcrypt.hash(password, 4);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    )
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "User login failed", error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve user profile", error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

const chechAuth = (req, res) => {
  const token = req.cookies.token;
   console.log("token",token)
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ isAuthenticated: true, userId: decoded.id });
  } catch (err) {
    return res.status(200).json({ isAuthenticated: false });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  getAllProducts,
  chechAuth
};

