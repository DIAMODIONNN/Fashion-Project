import React, { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import myLogo from "./img/mainAssets/logo.png";
import { CiDark, CiLight } from "react-icons/ci";

function NavList() {
  const [mode, setMode] = useState("light");
  const setDark = () => {
    localStorage.theme = mode;
    setMode("dark");
  };
  const setLight = () => {
    localStorage.theme = mode;
    setMode("light");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={NavLink}
        variant="small"
        color="blue-gray"
        to="/"
        className="p-1 font-medium dark:text-white"
      >
        Home
      </Typography>

      <Typography
        as={NavLink}
        variant="small"
        color="blue-gray"
        to="/Shop"
        className="p-1 font-medium dark:text-white"
      >
        Shop now
      </Typography>

      <Link to="/Cart" className="flex items-center transition-colors">
        <Button className="bg-[#229799] text-2xl dark:text-black">
          <TiShoppingCart />
        </Button>
      </Link>

      <Link
        to="/login"
        className="flex items-center hover:text-blue-500 transition-colors"
      >
        <Button className="bg-[#229799] dark:text-black ">login</Button>
      </Link>
      <Typography as="li" variant="small" className="p-2">
        {mode == "light" ? (
          <CiLight className="text-3xl" onClick={setDark} />
        ) : (
          <CiDark className="text-3xl" onClick={setLight} />
        )}
      </Typography>
    </ul>
  );
}
const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Navbar className="dark:bg-[#424242] mx-auto max-w-screen-3xl px-6 py-3">
      <div className="flex justify-between text-blue-gray-900">
        <Link
          to="/"
          className="flex items-center hover:text-[#229799] transition-colors"
        >
          <img src={myLogo} alt="" />
        </Link>

        <div className="items-center hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className=" ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <IoMdCloseCircleOutline className="h-6 w-6" strokeWidth={2} />
          ) : (
            <IoIosMenu className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Header;
