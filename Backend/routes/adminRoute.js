const express = require('express');
const router = express.Router();
const { adminLogin,createProduct,updateProduct, deleteProduct,getAllProducts,createCategory,viewAllOrders, getTotalUsers,getTotalProducts} = require('../controller/adminController');
// Import your admin routes here

router.post('/admin-login',adminLogin)
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get-all-products', getAllProducts);
router.post('/create-category', createCategory);
router.get('/view-all-orders', viewAllOrders);
router.get('/get-total-users', getTotalUsers);
router.get('/get-total-products', getTotalProducts);
module.exports = router;