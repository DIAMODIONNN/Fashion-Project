import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Shop from "./pages/user/Shop";
import Cart from "./pages/user/Cart";

const LayoutUser = ({
  products,
  setProducts,
  addUser,
  users,
  addToCart,
  cartItems,
  setCartItems,
}) => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              setProducts={setProducts}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/signup"
          element={<Signup addUser={addUser} users={users} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default LayoutUser;
