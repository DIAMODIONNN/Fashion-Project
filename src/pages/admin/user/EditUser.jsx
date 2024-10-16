import React, { useEffect, useState } from "react";
import { Button, Input, Typography, Card , Select , Option} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const EditUser = ({ deleted, setDeleted ,users}) => {
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '', 
    gender: '', 
    img: '',
    },
  );

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();

  const getUser = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_USERS}/${userId}`,
    })
      .then(({ data }) => {
        if (data.id) {
          setEditUser(data);
        } else {
          throw Error("User not found");
        }
      })
      .catch(() => navigate("/admin/NotFound"));
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const validateInputs = () => {
    
    if (!editUser.name || editUser.name.length < 3 || users.find((oneuser) => (oneuser.name === editUser.name && oneuser.id !== userId))) {
      return { username: "Invalid Username. Please ensure the username is at least 3 characters long and not already in use." };
    } else if (!editUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.email)) {
      return { email: "Invalid Email. Please provide a valid email address." };
    } else if (!editUser.password || editUser.password.length < 5) {
      return { password: "Invalid Password. Please ensure the password is at least 5 characters long."};
    } else if (!editUser.img || !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(editUser.img)) {
      return { img: "Invalid Image Url. Please provide a valid image URL." };
    } else if (!editUser.gender) {
      return { gender: "Gender selection is required."};
    } else if (!editUser.role) {
      return { role: "Role selection is required." };
    }
    return {};
  };


  const userEditor = (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length === 0) {
      axios({
        method: "put",
        url: `${import.meta.env.VITE_USERS}/${userId}`,
        data: editUser,
      }).then(() => {
        setDeleted(!deleted);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The Product Edited Successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/admin/Users"));
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="p-8 bg-gray-50 shadow-lg max-w-4xl w-full mx-auto">
        <Typography variant="h4" color="indigo" className="text-center font-bold mb-4">
          Edit User
        </Typography>
        <Typography variant="small" className="text-gray-600 font-normal text-center">
          Update your user information below.
        </Typography>

        <form onSubmit={userEditor} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Name
              </Typography>
              <Input
                label="Username"
                className="bg-white"
                value={editUser.name}
                error={!!errors.username}
                success={!!(editUser.name.length > 2 && !users.find((oneuser) => (oneuser.name === editUser.name && oneuser.id !== userId)))}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Email
              </Typography>
              <Input
                label="Email"
                className="bg-white"
                value={editUser.email}
                error={!!errors.email}
                success={!!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.email))}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              {errors.email && !errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Password
              </Typography>
              <Input
                label="Password"
                type="password"
                className="bg-white"
                value={editUser.password}
                error={!!errors.password}
                success={!!(editUser.password.length > 4)}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
              {errors.password && !errors.email && !errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Image URL
              </Typography>
              <Input
                label="Image"
                className="bg-white"
                value={editUser.img}
                error={!!errors.img}
                success={!!(/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(editUser.img))}
                onChange={(e) => setEditUser({ ...editUser, img: e.target.value })}
              />
              {errors.img && !errors.password && !errors.email && !errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.img}</p>
              )}
            </div>

              <div>
              <Typography variant="small" className="mb-2 font-medium">
                Gender
              </Typography>
                <Select
                  label="Gender"
                  value={editUser.gender}
                  error={!!errors.gender}
                  success={!!editUser.gender}
                  onChange={(value) => setEditUser({ ...editUser, gender: value })}
                  className="bg-white"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
                {errors.gender && !errors.img && !errors.password && !errors.email && !errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
              <Typography variant="small" className="mb-2 font-medium">
                Role
              </Typography>
                <Select
                  label="Role"
                  value={editUser.role}
                  error={!!errors.role}
                  success={!!editUser.role}
                  onChange={(value) => setEditUser({ ...editUser, role: value })}
                  className="bg-white"
                >
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                </Select>
                {errors.role && !errors.gender && !errors.img && !errors.password && !errors.email && !errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button color="indigo" size="lg" type="submit" className="shadow-md hover:shadow-lg transition">
              Submit Changes
            </Button>
            <Button color="cyan" size="lg" onClick={() => navigate(-1)} className="shadow-md hover:shadow-lg transition">
              BACK
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default EditUser;