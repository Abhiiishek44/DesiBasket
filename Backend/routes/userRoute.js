const router = require("express").Router();
const { registerUser, loginUser,getAllProducts,getUserProfile,logoutUser ,chechAuth} = require("../controller/userController");
const verifyToken =require('../middleware/authMiddleware')

// User registration route
router.post("/user-register", registerUser);
router.post("/user-login", loginUser);
router.get("/all-products" ,getAllProducts);
router.get("/user-profile", verifyToken, getUserProfile);
router.post("/user-logout", logoutUser);
router.get("/check-auth", verifyToken, chechAuth);
// Export the router
module.exports = router;