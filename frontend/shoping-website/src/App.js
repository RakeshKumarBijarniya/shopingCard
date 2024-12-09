import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import { ContaxtApi } from "./ContextApi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminProduct from "./components/AdminProduct";
import AdminNewProduct from "./components/AdminNewProduct";
import AdminProductCat from "./components/AdminProductCat";
import AdminNewProductCategory from "./components/AdminNewProductCategory";
import AdminProUpdate from "./components/AdminProUpdate";
import Cart from "./components/Cart";
import Myorder from "./components/Myorder";
import AdminCatProUpdate from "./components/AdminCatProUpdate";
import ProductCatItem from "./components/ProductCatItem";

const App = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  return (
    <ContaxtApi.Provider value={{ email, setEmail, cart, setCart }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Products />}></Route>
          <Route path="/createAccount" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/adminproducts" element={<AdminProduct />}></Route>
          <Route path="/adminnewproducts" element={<AdminNewProduct />}></Route>
          <Route
            path="/adminProductCategory"
            element={<AdminProductCat />}
          ></Route>
          <Route
            path="/adminNewProductCategory"
            element={<AdminNewProductCategory />}
          ></Route>
          <Route
            path="/adminProductForm/:id"
            element={<AdminProUpdate />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/myOrder" Component={Myorder}></Route>
          <Route
            path="/adminCatProductForm/:id"
            element={<AdminCatProUpdate />}
          ></Route>
          <Route
            path="/categoryItem/:name"
            element={<ProductCatItem />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </ContaxtApi.Provider>
  );
};

export default App;
