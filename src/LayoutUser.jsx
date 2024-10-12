import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Shop from "./pages/user/Shop";
import Footer from "./components/Footer";

const LayoutUser = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default LayoutUser;
