import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import myLogo from "./img/mainAssets/logo.png";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { IoPersonCircleSharp } from "react-icons/io5";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

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
        <Button className="bg-[#229799] text-2xl  dark:text-black">
          <TiShoppingCart />
        </Button>
      </Link>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center rounded-full p-0"
          >
            <IoPersonCircleSharp
              alt="tania andrew"
              color="blue-gray"
              className="h-10 w-10 p-0.5"
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1 dark:bg-[#424242]">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
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
    <Navbar className="mx-auto max-w-screen-3xl px-6 py-3 dark:bg-[#424242] ">
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
