const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const wishListRoute = require('./routes/wishList');
const categoryRoute = require('./routes/categoryRouter');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173', // ✅ fixed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database
   mongoose.connect('mongodb://localhost:27017/e-commerce')

// Import routes
   app.use('/admin', adminRoute);
   app.use('/user', userRoute);
   app.use('/cart', cartRoute);
   app.use('/wishlist', wishListRoute);
   app.use('/category', categoryRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

