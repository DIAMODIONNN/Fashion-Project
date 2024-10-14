import React from "react";
import myImg from "./img/hero/hero-1.jpg";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import Hero2 from "./Hero2";
const Home = () => {
  return (
    <div className="flex flex-col items-start text-left justify-center h-full gap-4">
      <div>
        <img src={myImg} alt="" className="w-full h-screen object-cover" />

        <div className="absolute left-6 top-1/3 p-8 bg-opacity-75 flex flex-col lg:w-1/3 items-start gap-6 ">
          <h1 className="font-bold text-[#48CFCB] font-sans ">
            SUMMER COLLECTION
          </h1>
          <h1 className="text-5xl text-black ">
            Fall - Winter Collections 2023
          </h1>

          <p className="text-sm text-black font-sans">
            A specialist label creating luxury essentials. Ethically crafted
            with an unwavering commitment to exceptional quality.
          </p>

          <Typography
            as={NavLink}
            variant="small"
            color="blue-gray"
            to="/Shop"
            className="p-1 font-medium"
          >
            <button className="bg-[#48CFCB] text-white py-2 px-4 rounded">
              SHOP NOW
            </button>
          </Typography>
        </div>
      </div>
      <Hero2 />
    </div>
  );
};

export default Home;
