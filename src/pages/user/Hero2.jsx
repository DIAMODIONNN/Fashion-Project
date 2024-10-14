import React from "react";
import img1 from "./img/hero2/banner-1.jpg";
import img2 from "./img/hero2/banner-2.jpg";
import img3 from "./img/hero2/banner-3.jpg";
import { Link } from "react-router-dom";

const Hero2 = () => {
  return (
    <div className="w-full bg-gradient-to-r  py-10 px-6">
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-6">
        {/* Section for Accessories */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={img2}
            className="w-full md:w-80 rounded-lg shadow-lg"
            alt="Accessories"
          />
          <h1 className="text-5xl font-body mt-4">Accessories</h1>
          <Link to="/Shop" className="underline text-sm mt-2">
            SHOP NOW
          </Link>
        </div>

        {/* Section for Clothing */}
        <div className="relative flex flex-col md:items-start items-center text-center md:text-left">
          <img
            src={img1}
            className="w-full md:w-80 rounded-lg shadow-lg"
            alt="Clothing Collection"
          />
          <div className="absolute bottom-6 left-4 md:static">
            <h1 className="text-5xl font-body">Clothing</h1>
            {/* <h2 className="text-5xl font-body">Collections 2023</h2> */}
            <Link to="/Shop" className="underline text-sm mt-2 block">
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Section for Shoes */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={img3}
            className="w-full md:w-80 rounded-lg shadow-lg"
            alt="Shoes Spring"
          />
          <div className="mt-4">
            <h1 className="text-4xl font-body">Shoes Spring</h1>
            <h2 className="text-4xl font-body">2023</h2>
            <Link to="/Shop" className="underline text-sm mt-2">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
