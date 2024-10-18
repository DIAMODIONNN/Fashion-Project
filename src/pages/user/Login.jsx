import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Login = ({ users, handleLogin }) => {
  const [User, setUser] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    password: false,
    userNotFound: false,
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    setErrors({
      name: false,
      password: false,
      userNotFound: false,
    });

    let hasError = false;

    if (User.name === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: true }));
      hasError = true;
    }
    if (User.password === "") {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      hasError = true;
    }

    if (hasError) return;

    const foundUser = users.find(
      (u) => u.name === User.name && u.password === User.password
    );

    if (foundUser) {
      localStorage.setItem("userId", foundUser.id);
      handleLogin(foundUser);
      navigate("/");
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, userNotFound: true }));
    }
  };

  return (
    <div
      className={`w-full flex justify-center items-center pt-8 text-center dark:bg-[#424242] ${"bg-white"}`}
    >
      <Card color="transparent" shadow={false}>
        <Typography className="dark:text-white" variant="h4" color={"black"}>
          Login
        </Typography>
        <form
          onSubmit={handleForm}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="User Name"
              value={User.name}
              error={errors.name}
              onChange={(e) => setUser({ ...User, name: e.target.value })}
              className={`${
                errors.name ? "border-red-500" : ""
              } ${"bg-white text-black dark:bg-[#424242] dark:text-white"}`}
            />
            <Input
              label="Password"
              type="password"
              value={User.password}
              error={errors.password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              className={`${
                errors.password ? "border-red-500" : ""
              } ${"bg-white text-black dark:bg-[#424242] dark:text-white"}`}
            />
          </div>
          {errors.userNotFound && (
            <Typography className="mt-2 text-red-500 text-start">
              Check your information
            </Typography>
          )}
          <Button
            type="submit"
            className={`mt-6 dark:bg-[#229799] ${"bg-[#48CFCB] hover:bg-[#5AE3E0]"}`}
            fullWidth
          >
            Login
          </Button>

          <Typography color={"gray"} className="mt-4 text-center font-normal">
            <p className={`inline mr-2 dark:text-white ${"text-black"}`}>
              Don't have an account?
            </p>
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className={`font-medium dark:text-[#229799] ${"text-[#48CFCB] "}`}
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
