import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddNewUser = ({ setDeleted, deleted }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Set default value
    gender: 'Male', // Set default value
    img: '', // Correct field name
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-200 to-indigo-500 py-10">
      <div className="flex flex-col items-center bg-white max-w-7xl mx-auto p-8 shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-6">
          Add New User
        </h1>

        <Card className="w-full bg-[#bae6fd] shadow-md rounded-lg">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="role">
                  Role:
                </label>
                <select
                  id="role"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="gender">
                  Gender:
                </label>
                <select
                  id="gender"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
                  Image URL:
                </label>
                <input
                  type="url"
                  id="img" // Changed id to "image"
                  value={user.img} // Use correct field name
                  onChange={(e) => setUser({ ...user, img: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                color="blue"
                className="w-full mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              >
                Add User
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddNewUser;