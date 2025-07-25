import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminProducts from "./pages/admin/AdminProductAdd.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProductCategory from "./pages/admin/AdminproductCategory.jsx";
import AdminOrder from "./pages/admin/AdminOrder.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import UserCart from "./pages/user/UserCart.jsx";
import UserWishList from "./pages/user/UserWishList.jsx";
import { WishListProvider } from "./context/WishListContext.jsx";
import CategoryPage from "./pages/category/CategoryPage .jsx";
// import SearchResults from "./pages/SearchResults.jsx";
function App() {
  return (
 <CartProvider>
    <WishListProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<UserDashboard />}/>
          {/* <Route path="/search" element={<SearchResults />}/> */}
           <Route path="/category/:categoryName" element={<CategoryPage/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/wishlist" element={<UserWishList/>} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="Product-Categories"element={<AdminProductCategory />}/>
            <Route path="orders" element={<AdminOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishListProvider>
    </CartProvider>
   
  );
}

export default App;
