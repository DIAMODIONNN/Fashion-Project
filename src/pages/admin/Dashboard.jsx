import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Dashboard = ({ user, users, products, product }) => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-indigo-500 min-h-screen flex justify-center items-center dark:from-gray-900 dark:to-gray-700 p-6">
      <div className="flex flex-wrap justify-evenly items-center gap-32">
        <Card className="mt-6 w-full sm:w-96 hover:shadow-2xl transition-shadow duration-300 dark:bg-[#2D3748] dark:text-white">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
              className="object-cover w-full h-full rounded-t-lg"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
              USERS
            </Typography>
            <Typography className="text-sm text-gray-600 dark:text-gray-300">
              Number of Users: {users.length ? users.length : ""}
            </Typography>
            <Typography className="text-sm text-gray-600 dark:text-gray-300">
              Last user registered: {user.name}
            </Typography>
          </CardBody>
          <CardFooter className="pt-4">
            <Link to={`/admin/users`}>
              <Button className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md">
                CHECK USERS
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6 w-full sm:w-96 hover:shadow-2xl transition-shadow duration-300 dark:bg-[#2D3748] dark:text-white">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://www.resideo.com/us/en/-/media/Resideo/Consumer-Images/OG%20Images/Resideo_Pro_OG_ProdAll.jpg?rv=a5d9c708cc9144dca7b06ef904b66c09"
              alt="card-image"
              className="object-cover w-full h-full rounded-t-lg"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
              PRODUCTS
            </Typography>
            <Typography className="text-sm text-gray-600 dark:text-gray-300">
              Number of Products: {products.length ? products.length : ""}
            </Typography>
            <Typography className="text-sm text-gray-600 dark:text-gray-300">
              Last Product Added: {product.title}
            </Typography>
          </CardBody>
          <CardFooter className="pt-4">
            <Link to={`/admin/products`}>
              <Button className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md">
                CHECK PRODUCTS
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
