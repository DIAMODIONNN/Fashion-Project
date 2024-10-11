import React from "react";
import AdminHeader from "./components/AdminHeader";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/admin/NotFound";
import ViewProduct from "./pages/admin/product/ViewProduct";
import AddProducts from './pages/admin/product/AddProducts'
import EditProduct from "./pages/admin/product/EditProduct";
import Products from "./pages/admin/product/Products";
import Users from "./pages/admin/user/Users";
import ViewUser from "./pages/admin/user/ViewUser"
import EditUser from "./pages/admin/user/EditUser"
import AddUsers from "./pages/admin/user/AddUsers";
import { Button } from "@material-tailwind/react";
import { Link, Route, Routes } from "react-router-dom";

const LayoutAdmin = () => {
  

  return (
    <div className="dashboard-background"> 
      <AdminHeader />
      <ul className="flex justify-evenly items-center p-2 w-full bg-gray-100 text-2xl font-serif">
        <li>
          <Link to={`/admin`}><Button variant="text">Dashboard</Button></Link>
        </li>
        <li>
        <Link to={`/admin/users`}><Button variant="text">Users</Button></Link>
        </li>
        <li>
        <Link to={`/admin/products`}><Button variant="text">Products</Button></Link>
        </li>
      </ul>
      <Routes>
          {/*Route for Main Dashboard page */}
          <Route path= "/" element={<Dashboard />}/>
          
          {/* Routes for Product >> pages*/}
          <Route path= "/products" element={<Products />}/>
          <Route path = "/viewProduct/:productId" element = {<ViewProduct />}/>
          <Route path = "/editProduct/:productId" element = {<EditProduct />}/>
          <Route path = "/addProduct" element = {<AddProducts />}/>
          
          {/* Route for User >> pages*/}
          <Route path = "/users" element = {<Users />}/>
          <Route path = "/viewUser/:userId" element = {<ViewUser />}/>
          <Route path = "/editUser/:userId" element = {<EditUser />}/>
          <Route path = "/addUser" element = {<AddUsers/>}/>

          {/* Route for NotFound page*/}
          <Route path="/NotFound" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default LayoutAdmin;
