import React, { useState } from "react";
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
    img: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    img: "",
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
    const newErrors = {
      name: "",
      email: "",
      password: "",
      gender: "",
      img: "",
    };

    if (User.name.trim() === "" || User.name.length < 3) {
      newErrors.name = "Name is required and should be at least 3 characters.";
      hasError = true;
    }
    if (User.email === "" || !validateEmail(User.email)) {
      newErrors.email = "Valid email is required.";
      hasError = true;
    }
    if (User.password === "" || User.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }
    if (User.gender === "") {
      newErrors.gender = "Please select your gender.";
      hasError = true;
    }
    if (
      User.img === "" ||
      !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(User.img)
    ) {
      newErrors.img = "Enter URL Image.";
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
      className={`w-full flex justify-center items-center pt-8 text-center dark:bg-[#424242] ${"bg-white"}`}
    >
      <Card color="transparent" shadow={false}>
        <Typography className="dark:text-white" variant="h4" color={"black"}>
          Sign Up
        </Typography>
        {accountExists && (
          <Typography className="text-red-500 mb-0 text-center" color="red">
            Email or Username already exists.
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
              } ${"bg-white text-black dark:bg-[#424242] dark:text-white"}`}
            />
            {errors.name && (
              <Typography className="text-red-500 text-start">
                {errors.name}
              </Typography>
            )}

            <Select
              label="Gender"
              error={!!errors.gender || accountExists}
              onChange={(value) => setUser({ ...User, gender: value })}
              className={
                "bg-white text-black dark:bg-[#424242] dark:text-white"
              }
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
            {errors.gender && (
              <Typography className="text-red-500 text-start">
                {errors.gender}
              </Typography>
            )}

            <Input
              label="User Mail"
              value={User.email}
              error={!!errors.email || accountExists}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              className={`${
                errors.email || accountExists ? "border-red-500" : ""
              } ${"bg-white text-black dark:bg-[#424242] dark:text-white"}`}
            />
            {errors.email && (
              <Typography className="text-red-500 text-start">
                {errors.email}
              </Typography>
            )}

            <Input
              label="Password"
              type="password"
              value={User.password}
              error={!!errors.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              className={`${
                errors.password || accountExists ? "border-red-500" : ""
              } ${"bg-white text-black dark:bg-[#424242] dark:text-white"}`}
            />
            {errors.password && (
              <Typography className="text-red-500 text-start">
                {errors.password}
              </Typography>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal ">
              <Input
                label="Image"
                className="bg-white text-black dark:bg-[#424242] dark:text-white "
                value={User.img}
                error={!!errors.img}
                onChange={(e) => setUser({ ...User, img: e.target.value })}
              />
              {errors.img && (
                <Typography className="text-red-500 text-start">
                  {errors.img}
                </Typography>
              )}
            </Typography>
          </div>

          <Button
            type="submit"
            className={`mt-6 dark:bg-[#229799]  ${"bg-[#48CFCB] hover:bg-[#5AE3E0]"}`}
            fullWidth
          >
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            <p className={`inline dark:text-white ${"text-black"}}`}>
              Already have an account?
            </p>
            <a
              href="#"
              onClick={() => navigate("/login")}
              className={`font-medium ml-1 dark:text-[#229799] ${"text-[#48CFCB] "}`}
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
