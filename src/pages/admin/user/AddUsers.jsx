import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Input , Select , Option, Typography } from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddNewUser = ({ setDeleted, deleted }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '', 
    gender: '', 
    img: '', 
  });

  

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
  
    if (!user.name || user.name.length < 3) {
      return {username : "Username must be at least 3 characters long."};
    }else if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
     return{ email : "Please enter a valid email address."};
    }else if (!user.password || user.password.length < 5) {
      return {password : "Password should be at least 5 characters long."};
    }else if (!user.img || !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(user.img)) {
      return {img : "Please provide a valid image URL."};
    }else if (!user.gender) {
      return {gender : "Please choose your Gender."};
    }else if (!user.role) {
      return {role : "Please choose a Role."};
    }
  
    return {};
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if(Object.keys(validationErrors).length===0){
    axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: user,
    }).then(_=> {
      setDeleted(!deleted);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The New User Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => navigate("/admin/users"));
    });
  }else {
    setErrors(validationErrors);
  }
}
return (
  <div className="flex justify-center items-center">
    <Card color="transparent" shadow={false} className="p-6 bg-white max-w-lg w-full rounded-lg shadow-lg mt-6">
      <Typography variant="h4" color="blue-gray" className="text-center mb-4">
      Add New User
      </Typography>
      <Typography color="gray" className="text-center mb-8">
        Fill in the details of the new user.
      </Typography>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          
          <div>
            <Input
              label="Username"
              className="bg-white"
              value={user.name}
              error = {!!errors.username}
              success = {!!(user.name.length > 2)}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          
          <div>
            <Input
              label="Email"
              className="bg-white"
              value ={user.email}
              error ={!!errors.email}
              success = {!!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && !errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          
          <div>
            <Input
              label="Password"
              type="password"
              className="bg-white"
              value={user.password}
              error={!!errors.password }
              success = {!!(user.password.length > 4)}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {errors.password && !errors.email && !errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              label="Image"
              className="bg-white"
              value={user.img}
              error={!!errors.img}
              success = {!!(/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(user.img))}
              onChange={(e) => setUser({ ...user, img: e.target.value })}
            />
            {errors.img  && !errors.password && !errors.email && !errors.username &&(
                <p className="text-red-500 text-sm mt-1">{errors.img}</p>
              )}
          </div> 

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <Select
                label = "Gender"
                value={user.gender}
                error = {!!errors.gender}
                success = {!!(user.gender)}
                onChange={(value) => setUser({ ...user, gender: value })}
                className= "bg-white"
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
              {errors.gender && !errors.img && !errors.password && !errors.email && !errors.username &&(
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
          </div>

          <div>
              <Select
                label = "Role"
                value={user.role}
                error = {!!errors.role}
                success = {!!(user.role)}
                onChange={(value) => setUser({ ...user, role: value })}
                className= "bg-white"
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
              {errors.role && !errors.gender && !errors.img && !errors.password && !errors.email && !errors.username &&(
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
              </div>
              </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button className="w-full" type="submit">
            Confirm
          </Button>
          <Button color="cyan" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </form>
      </Card>
      </div>
);
};

export default AddNewUser;
