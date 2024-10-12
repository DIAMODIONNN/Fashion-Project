import React from "react";
import img1 from "./img/hero2/banner-1.jpg";
import img2 from "./img/hero2/banner-2.jpg";
import img3 from "./img/hero2/banner-3.jpg";
import { Link } from "react-router-dom";

const Hero2 = () => {
  return (
    <div className=" flex flex-col md:w-auto md:flex-row justify-evenly">
      <div className="flex flex-col md:w-auto md:flex-row items-center text-left">
        <img src={img2} className=" " alt="" />
      </div>
      <div className="flex flex-col items-start  w-fit">
        <h1 className=" text-5xl font-body">Accessories</h1>
        <Link to="/Shop" className="underline text-sm ">
          SHOP NOW
        </Link>
      </div>
      <div className="flex md:flex-col basis-[50%] left-3 p-0">
        <div className="flex flex-col md:flex-row gap-8 p-8 items-center text-left">
          <img src={img1} className="w-max " alt="" />
        </div>
        <div className="md:absolute flex flex-col items-start">
          <div className="  text-5xl font-body ">
            <h1>Clothing</h1>
            <h1>Collections 2023</h1>
          </div>
          <Link to="/Shop" className="underline text-sm ">
            SHOP NOW
          </Link>
        </div>
        <div className=" flex flex-col gap-8 p-8 top-[140] right-10 md:w-auto items-center text-left">
          <img src={img3} className=" w-max" alt="" />
        </div>
        <div className="flex flex-col text-4xl font-body q22items-start">
          <h1 className="">Shoes Spring</h1>
          <h1 className=""> 2023</h1>
          <Link to="/Shop" className="underline text-sm ">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
