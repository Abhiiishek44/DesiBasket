const router = require("express").Router();
const { registerUser, loginUser,getAllProducts } = require("../controller/userController");


// User registration route
router.post("/user-register", registerUser);
router.post("/user-login", loginUser);
router.get("/all-products", getAllProducts);

// Export the router
module.exports = router;