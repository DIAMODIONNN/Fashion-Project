import React, { useState } from "react";
import { Button, Card, Input, Select, Option, Typography } from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddUsers = ({ setDeleted, deleted, users }) => {
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
    if (!user.name || user.name.length < 3 || users.find((oneuser) => (oneuser.name === user.name))) {
      return { username: "Invalid Username. Please ensure the username is at least 3 characters long and not already in use." };
    } else if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      return { email: "Invalid Email. Please provide a valid email address." };
    } else if (!user.password || user.password.length < 5) {
      return { password: "Invalid Password. Please ensure the password is at least 5 characters long." };
    } else if (!user.img || !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(user.img)) {
      return { img: "Invalid Image Url. Please provide a valid image URL." };
    } else if (!user.gender) {
      return { gender: "Gender selection is required." };
    } else if (!user.role) {
      return { role: "Role selection is required." };
    }
    return {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_USERS}`,
        data: user,
      }).then(() => {
        setDeleted(!deleted);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The New User Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/admin/users"));
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-indigo-500 dark:from-gray-800 dark:to-gray-900 min-h-screen flex justify-center items-center">
      <Card color="transparent" shadow={false} className="p-6 bg-white dark:bg-gray-800 max-w-lg w-full rounded-lg shadow-lg mt-6">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4 dark:text-gray-300">
          Add New User
        </Typography>
        <Typography color="gray" className="text-center mb-8 dark:text-gray-400">
          Fill in the details of the new user.
        </Typography>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                label="Username"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.name}
                error={!!errors.username}
                success={!!(user.name.length > 2 && !users.find((oneuser) => (oneuser.name === user.name)))}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <Input
                label="Email"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.email}
                error={!!errors.email}
                success={!!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))}
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
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.password}
                error={!!errors.password}
                success={!!(user.password.length > 4)}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              {errors.password && !errors.email && !errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                label="Image"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.img}
                error={!!errors.img}
                success={!!(/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(user.img))}
                onChange={(e) => setUser({ ...user, img: e.target.value })}
              />
              {errors.img && !errors.password && !errors.email && !errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.img}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Gender"
                  value={user.gender}
                  error={!!errors.gender}
                  success={!!user.gender}
                  onChange={(value) => setUser({ ...user, gender: value })}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
                {errors.gender && !errors.img && !errors.password && !errors.email && !errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <Select
                  label="Role"
                  value={user.role}
                  error={!!errors.role}
                  success={!!user.role}
                  onChange={(value) => setUser({ ...user, role: value })}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                </Select>
                {errors.role && !errors.gender && !errors.img && !errors.password && !errors.email && !errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md" type="submit">
              Confirm
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddUsers;
