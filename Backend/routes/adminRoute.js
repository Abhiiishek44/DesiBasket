const express = require('express');
const router = express.Router();
const { adminLogin,createProduct,updateProduct, deleteProduct,getAllProducts,createCategory,viewAllOrders} = require('../controller/adminController');
// Import your admin routes here

router.post('/admin-login',adminLogin)
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get-all-products', getAllProducts);
router.post('/create-category', createCategory);
router.get('/view-all-orders', viewAllOrders);

module.exports = router;