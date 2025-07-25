const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const wishListRoute = require('./routes/wishList');
const categoryRoute = require('./routes/categoryRouter');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors(
   {
      origins: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   }
));
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

