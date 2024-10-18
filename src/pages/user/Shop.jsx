import axios from "axios";
import React, { useEffect, useState } from "react";

import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Shop = ({ products, addToCart, cartItems }) => {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) {
      navigate("/login");
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={`container dark:bg-[#424242] mx-auto p-4 ${"bg-white"}`}>
      <div className="flex justify-center items-start mt-12">
        <h1
          className={`font-bold text-2xl border-b-2 dark:border-[#229799] ${"border-[#48CFCB]"} dark:text-[#229799] text-[#48CFCB]`}
        >
          P R O D U C T S
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 dark:bg-[#424242] ${"bg-[#F5F5F5]"}`}
          >
            <div
              className={`h-40 w-100 flex justify-center items-center pb-5 dark:bg-[#424242] ${"bg-[#F5F5F5]"}`}
            >
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className={`p-4 dark:text-white ${"text-black"}`}>
              <h2 className="text-lg font-semibold truncate">
                {product.title}
              </h2>
              <div className="flex justify-between">
                <p
                  className={`text-2xl font-bold dark:text-white ${"text-black"}`}
                >
                  ${product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={
                    "mt-2 p-2 dark:bg-[#424242] dark:text-[#229799] bg-white  text-[#48CFCB]"
                  }
                >
                  <GiShoppingCart className="mr-2" />
                </button>
              </div>
              <div className="flex justify-evenly">
                <div className="flex mt-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 dark:text-[#229799] ${"text-[#48CFCB]"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.204-6.004 5.86 1.417 8.372L12 18.897l-7.413 3.886 1.417-8.372-6.004-5.86 8.332-1.204z" />
                    </svg>
                  )).slice(0, Math.floor(product.rating.rate))}{" "}
                </div>
                <p className={`mt-1 text-md ml-5 ${"text-gray-700"}`}>
                  Based On {product.rating.count} Reviews
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
