import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Products", "Price", "Category", "Count", "Actions"];

const Products = ({ products, deleted, setDeleted }) => {
  const deleteProduct = ({ title, id }) => {
    Swal.fire({
      title: "Are you sure ??",
      text: `Deleting ${title} ...`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success"
        });
        axios({
          method: "delete",
          url: `${import.meta.env.VITE_PRODUCTS}/${id}`,
        }).then(() => setDeleted(!deleted));
      }
    });
  };
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-200 to-indigo-500 py-10">
      <div className="flex flex-col items-center bg-white max-w-7xl mx-auto p-6 md:p-8 shadow-lg rounded-lg">
        <h1 className="mt-3 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500 text-3xl md:text-5xl font-extrabold animate-pulse">
          Welcome To Products
        </h1>

        <Link to={`/admin/addProduct`}>
          <Button variant="gradient" color="blue" className="mb-3 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Add New Product
          </Button>
        </Link>

        <Card className="h-full w-full bg-[#bae6fd]">
          <CardBody>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className={`bg-[#7dd3fc] p-4 ${head === "Actions" && "text-center"}`}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-extrabold leading-5 opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(
                    (
                      { id, image, title, price, category, rating: { count } },
                      index
                    ) => (
                      <tr key={index} className="p-4">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={image}
                              alt={index}
                              size="md"
                              className="border border-blue-gray-50 bg-blue-gray-400 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {title}
                            </Typography>
                          </div>
                        </td>
                        <td className="py-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            ${price}
                          </Typography>
                        </td>
                        <td className="py-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category}
                          </Typography>
                        </td>
                        <td className="py-4">
                          <div className="w-max">
                            <Chip size="sm" variant="ghost" value={count} />
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="w-max flex gap-2 md:gap-4">
                            <Link to={`/admin/editProduct/${id}`}>
                              <Tooltip content="Edit Product">
                                <IconButton variant="text">
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </Link>

                            <Link to={`/admin/viewProduct/${id}`}>
                              <Button className="rounded-full bg-indigo-500 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-xs md:text-sm">
                                VIEW
                              </Button>
                            </Link>
                            <Button
                              color="red"
                              className="hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-xs md:text-sm"
                              onClick={() => deleteProduct({ title, id })}
                            >
                              DELETE
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Products;
