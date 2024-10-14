import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutUser from "./LayoutUser";
import LayoutAdmin from "./LayoutAdmin";
import axios from "axios";
const App = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mode, setMode] = useState("light");
  const setDark = () => {
    localStorage.theme = mode;
    setMode("dark");
  };
  const setLight = () => {
    localStorage.theme = mode;
    setMode("light");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const getProduct = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/products",
    }).then(({ data }) => setProduct(data[data.length - 1]));
  };

  useEffect(() => {
    getProduct();
  }, [deleted]);

  const getProducts = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/products",
    })
      .then(({ data }) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    getProducts();
  }, [deleted]);

  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
    }).then(({ data }) => setUser(data[data.length - 1]));
  };
  useEffect(() => {
    getUser();
  }, [deleted]);

  const getUsers = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
    })
      .then(({ data }) => setUsers(data))
      .catch((error) => console.error("Error fetching products:", error));
  };
  useEffect(() => {
    getUsers();
  }, [deleted]);

  const addUser = async (newUser) => {
    const isDuplicate = users.some(
      (user) => user.email === newUser.email || user.name === newUser.name
    );

    if (isDuplicate) {
      console.error("Account Already Exists.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.title,
            price: product.price,
            img: product.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="text-center  dark:bg-[#424242] bg-white ">
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutUser
              products={products}
              setProducts={setProducts}
              addUser={addUser}
              users={users}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleLogin={handleLogin}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              mode={mode}
              setDark={setDark}
              setLight={setLight}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            <LayoutAdmin
              user={user}
              setUsers={setUsers}
              users={users}
              products={products}
              product={product}
              setProducts={setProducts}
              deleted={deleted}
              setDeleted={setDeleted}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              mode={mode}
              setDark={setDark}
              setLight={setLight}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
