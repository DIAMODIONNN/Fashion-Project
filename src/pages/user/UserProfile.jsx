import React, { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { GrUserFemale } from "react-icons/gr";

const UserProfile = ({ setLoggedInUser }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setUserData(loggedInUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-center text-2xl text-red-900">
          Please log in to view your profile!
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      setIsEditing(false);
      setLoggedInUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setUserData(updatedUser);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#424242] bg-white">
      <div className="bg-white dark:bg-[#424242] p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 dark:text-white text-gray-800 text-center">
          User Profile
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center mb-4">
          {userData.gender === "Male" ? (
            <FaUserTie className="text-blue-500 text-6xl bg-blue-100 rounded-full p-4" />
          ) : (
            <GrUserFemale className="text-pink-500 text-6xl bg-pink-100 rounded-full p-4" />
          )}
        </div>
        <div className="mb-4">
          <label className="block dark:text-white text-black">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 w-full p-2 border ${
              isEditing
                ? "border-gray-300 bg-white text-black"
                : "border-transparent bg-gray-700 text-white"
            } rounded-md`}
          />
        </div>
        <div className="mb-4">
          <label className="block dark:text-white text-black">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 w-full p-2 border ${
              isEditing
                ? "border-gray-300 bg-white text-black"
                : "border-transparent bg-gray-700 text-white"
            } rounded-md`}
          />
        </div>
        <div className="mb-4">
          <label className="block dark:text-white text-black">Gender</label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 w-full p-2 border dark:text-white text-black ${
              isEditing
                ? "border-gray-300 bg-white text-black"
                : "border-transparent bg-gray-700 text-white"
            } rounded-md`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block dark:text-white text-black">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditing}
            className={`mt-1 w-full p-2 border ${
              isEditing
                ? "border-gray-300 bg-white text-black"
                : "border-transparent bg-gray-700 text-white"
            } rounded-md`}
          />
        </div>
        <div className="flex justify-center mt-4">
          {isEditing ? (
            <button
              onClick={handleConfirmEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Confirm Edit
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 dark:bg-[#229799] bg-[#48CFCB] text-white rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
