import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ addUser, users }) => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const [accountExists, setAccountExists] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  };

  const handleForm = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { name: "", email: "", password: "", gender: "" };

    if (User.name.trim() === "" || User.name.length < 3) {
      newErrors.name = "Name is required.";
      hasError = true;
    }
    if (User.email === "" || !validateEmail(User.email)) {
      newErrors.email = "Email is required.";
      hasError = true;
    }
    if (User.password === "" || User.password.length < 6) {
      newErrors.password = "Password is required.";
      hasError = true;
    }
    if (User.gender === "") {
      newErrors.gender = "Please select your gender.";
      hasError = true;
    }

    setErrors(newErrors);

    const isDuplicate = users.some(
      (user) => user.email === User.email || user.name === User.name
    );

    if (isDuplicate) {
      setAccountExists(true);
      newErrors.email = "Email or username already exists.";
      hasError = true;
    } else {
      setAccountExists(false);
    }

    if (!hasError) {
      addUser(User);
      navigate("/login");
    }
  };

  return (
    <div
      className={`w-full flex justify-center items-center pt-8 text-center ${"bg-white"}`}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color={"black"}>
          Sign Up
        </Typography>
        {accountExists && (
          <Typography className="text-red-500 mb-0 text-center" color="red">
            Account already exists.
          </Typography>
        )}
        <form
          onSubmit={handleForm}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Username"
              value={User.name}
              error={!!errors.name || accountExists}
              onChange={(e) => setUser({ ...User, name: e.target.value })}
              className={`${
                errors.name || accountExists ? "border-red-500" : ""
              } ${"bg-white text-black"}`}
            />
            <Select
              label="Gender"
              error={!!errors.gender || accountExists}
              onChange={(e) => setUser({ ...User, gender: e })}
              className={"bg-white text-black"}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
            <Input
              label="User Mail"
              value={User.email}
              error={!!errors.email || accountExists}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              className={`${
                errors.email || accountExists ? "border-red-500" : ""
              } ${"bg-white text-black"}`}
            />
            <Input
              label="Password"
              type="password"
              value={User.password}
              error={!!errors.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              className={`${
                errors.password || accountExists ? "border-red-500" : ""
              } ${"bg-white text-black"}`}
            />
          </div>

          <Button
            type="submit"
            className={`mt-6 ${"bg-[#48CFCB] hover:bg-[#5AE3E0]"}`}
            fullWidth
          >
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            <p className={`inline ${"text-black"}`}>Already have an account?</p>
            <a
              href="#"
              onClick={() => navigate("/login")}
              className={`font-medium ml-1 ${"text-[#5AE3E0]"}`}
            >
              Login
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
