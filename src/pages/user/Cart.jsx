import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import shoppingImage from "./images/man-shopping-supermarket_74855-7612.jpg";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

const Cart = ({ addToCart, cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const handleGoToProducts = () => {
    navigate("/shop");
  };
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);
  const taxes = subtotal * 0.1;
  const shipping = 5.0;
  const total = subtotal + taxes + shipping;
  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`flex flex-col lg:flex-row justify-between p-4 dark:bg-[#424242] ${"bg-white"}`}
    >
      {/* Cart Header */}
      <div className="w-full lg:w-2/3">
        <div className="flex justify-center items-center mt-10 text-center">
          <GiShoppingCart
            className={`mr-2 text-4xl dark:text-[#229799] ${"text-[#48CFCB]"} font-bold`}
          />
          <h1 className={`font-bold text-3xl dark:text-white ${"text-black"}`}>
            Shopping Cart
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="mt-10">
            {cartItems.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = item.quantity || 1;
              return (
                <div
                  key={item.id}
                  className={`ml-5 flex items-center border dark:border-[#424242] border-white shadow-lg rounded-lg p-4 mb-4 dark:bg-[#424242] ${"bg-white"}`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 inline-block mr-4"
                  />
                  <div className="flex flex-col flex-grow">
                    <span
                      className={`font-semibold dark:text-white ${"text-black"}`}
                    >
                      {item.name}
                    </span>
                    <span className={`text-gray-600 ${"text-gray-600"}`}>
                      ${price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center mx-4">
                    <button
                      className="border border-gray-400 rounded-lg p-2 flex items-center justify-center"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <IoMdRemove
                        className={`text-lg dark:text-white ${"text-black"}`}
                      />
                    </button>
                    <span className={`mx-2 dark:text-white ${"text-black"}`}>
                      {quantity}
                    </span>

                    <button
                      className="border border-gray-400 rounded-lg p-2 flex items-center justify-center"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <IoMdAdd
                        className={`text-lg dark:text-white ${"text-black"}`}
                      />
                    </button>
                  </div>
                  <span
                    className={`font-semibold dark:text-white ${"text-black"}`}
                  >
                    ${(price * quantity).toFixed(2)}
                  </span>

                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    <FaTrashCan
                      className={`ml-10 dark:text-white ${"text-black"}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center mt-20">
            <div className="flex justify-center mt-4">
              <img src={shoppingImage} alt="Shopping" className="w-64 h-auto" />
            </div>
            <div className="flex justify-center text-center">
              <h1
                className={`text-black font-bold text-3xl mt-10 dark:text-white ${"text-black"}`}
              >
                Cart's Feeling Light
              </h1>
            </div>
            <div
              className={`text-gray-600 text-md mt-2 flex justify-center text-center dark:text-gray-300 ${"text-gray-600"}`}
            >
              Your cart is longing for some company. Begin your shopping
              adventure now!
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleGoToProducts}
                className={`px-4 py-2 dark:bg-[#229799] ${"bg-[#48CFCB] text-white"} font-bold rounded hover:bg-[#5AE3E0] transition duration-300`}
              >
                EXPLORE OUR PRODUCTS
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`w-full lg:w-1/4 p-5 rounded-lg shadow-lg mt-5 lg:mt-0 dark:bg-[#424242] ${"bg-white"}`}
      >
        <h2
          className={`text-xl font-bold mb-4 dark:text-white ${"text-black"}`}
        >
          Summary
        </h2>

        <div
          className={`flex justify-between mb-2 dark:text-white ${"text-black"}`}
        >
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div
          className={`flex justify-between mb-2 dark:text-white ${"text-black"}`}
        >
          <span>Taxes:</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div
          className={`flex justify-between mb-2 dark:text-white ${"text-black"}`}
        >
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div
          className={`flex justify-between mb-4 font-bold dark:text-white ${"text-black"}`}
        >
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          className={`w-full dark:bg-[#229799] ${"bg-[#48CFCB] text-white"} font-bold py-2 rounded hover:bg-[#5AE3E0] transition duration-300`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
