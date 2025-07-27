const express = require('express');
const router = express.Router();
const {getProductByCategory}=require('../controller/categoryController');


// Route to get products by category
router.get('/:categoryName', getProductByCategory);


module.exports = router;