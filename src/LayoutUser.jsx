import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Shop from "./pages/user/Shop";
import Cart from "./pages/user/Cart";

import Footer from "./components/Footer";

import UserProfile from "./pages/user/UserProfile";

const LayoutUser = ({
  products,
  setProducts,
  addUser,
  users,
  addToCart,
  cartItems,
  setCartItems,
  loggedInUser,
  handleLogin,
  setLoggedInUser,
  mode,
  setDark,
  setLight,
}) => {
  return (
    <div>
      <Header
        mode={mode}
        setDark={setDark}
        setLight={setLight}
        cartItems={cartItems}
      />

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
        <Route
          path="/login"
          element={<Login users={users} handleLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={
            <UserProfile
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default LayoutUser;
