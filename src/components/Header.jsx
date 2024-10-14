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

function NavList({ mode, setDark, setLight, cartItems }) {
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
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle dark:text-white"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {cartItems.length}
            </span>
          </div>
        </div>
      </Link>

      <Link
        to="/login"
        className="flex items-center hover:text-blue-500 transition-colors"
      >
        <Button className="bg-[#48CFCB] dark:text-black ">login</Button>
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
const Header = ({ mode, setDark, setLight, cartItems }) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Navbar className="dark:bg-[#424242] border-white dark:border-[#424242] mx-auto max-w-screen-3xl px-6 py-3">
      <div className="flex justify-between text-blue-gray-900">
        <Link
          to="/"
          className="flex items-center hover:text-[#229799] transition-colors"
        >
          <img src={myLogo} alt="" />
        </Link>

        <div className="items-center hidden lg:block">
          <NavList
            mode={mode}
            setDark={setDark}
            setLight={setLight}
            cartItems={cartItems}
          />
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
        <NavList
          mode={mode}
          setDark={setDark}
          setLight={setLight}
          cartItems={cartItems}
        />
      </Collapse>
    </Navbar>
  );
};

export default Header;
