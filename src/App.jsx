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
  const [productDetails , setProductDetails] = useState(null);
  const [userDetails , setUserDetails] = useState(null);

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
    }).then(({ data }) => setProducts(data));
  };

  useEffect(() => {
    getProducts();
  }, [deleted]);

  const getUser = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users`,
    }).then(({ data }) => setUser(data[data.length - 1]));
  };
  useEffect(() => {
    getUser();
  }, [deleted]);

  const getUsers = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users`,
    }).then(({ data }) => setUsers(data));
  };
  useEffect(() => {
    getUsers();
  }, [deleted]);
  return (
    <div className="text-center">
      <Routes>
        <Route path="/*" element={<LayoutUser />} />
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
              productDetails= {productDetails}
              setProductDetails = {setProductDetails}
              userDetails= {userDetails}
              setUserDetails = {setUserDetails}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
