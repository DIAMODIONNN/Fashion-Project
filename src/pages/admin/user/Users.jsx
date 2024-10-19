import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Username", "Role", "Operators"];

const Users = ({ users, deleted, setDeleted }) => {
  const toggle = ({ role, id }) => {
    Swal.fire({
      title: `${role === "admin" ? "Make it a Regular User?!!" : "Make it Admin?!!"}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Role Changed",
          icon: "success",
        });
        axios({
          method: "patch",
          url: `${import.meta.env.VITE_USERS}/${id}`,
          data: {
            role: role === "admin" ? "user" : "admin",
          },
        }).then(() => setDeleted(!deleted));
      }
    });
  };

  const deleteUser = ({ name, id }) => {
    Swal.fire({
      title: "Are you sure ??",
      text: `Deleting ${name} ...`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios({
          method: "delete",
          url: `${import.meta.env.VITE_USERS}/${id}`,
        }).then(() => setDeleted(!deleted));
      }
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-200 to-indigo-500 dark:from-gray-800 dark:to-gray-900 py-10">
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 max-w-7xl mx-auto p-4 md:p-8 shadow-lg rounded-lg">
        <h1 className="mt-3 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500 text-3xl md:text-5xl font-extrabold animate-pulse dark:from-gray-300 dark:to-gray-400">
          Welcome To Users
        </h1>

        <Link to={`/admin/adduser`}>
          <Button

            className="mb-3 bg-blue-600 hover:bg-blue-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md "
          >
            Add New User
          </Button>
        </Link>

        <Card className="h-full w-full bg-[#bae6fd] dark:bg-gray-800">
          <CardBody>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className={`bg-[#7dd3fc] dark:bg-gray-700 p-4 ${
                          head === "Operators" && "text-center"
                        }`}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-extrabold leading-5 opacity-70 dark:text-gray-300"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(({ id, name, role }, index) => (
                    <tr key={index} className="p-4 dark:bg-gray-700">
                      <td className="py-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold px-4 md:px-10 dark:text-gray-300"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="py-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal px-4 dark:text-gray-300"
                        >
                          {role}
                        </Typography>
                      </td>
                      <td className="py-4 flex flex-col md:flex-row justify-center items-center gap-2">
                        <Link to={`/admin/edituser/${id}`}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text" className="dark:text-gray-300">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Link to={`/admin/viewuser/${id}`}>
                          <Button
                            className="bg-indigo-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md rounded-full text-xs md:text-sm dark:bg-gray-600 dark:hover:bg-gray-500"
                          >
                            View
                          </Button>
                        </Link>
                        {id === "1" ? (
                          <Button
                            color="cyan"
                            onClick={() => toggle({ role, id })}
                            disabled
                            className="text-xs md:text-sm"
                          >
                            Make it User
                          </Button>
                        ) : role === "admin" ? (
                          <Button
                            color="cyan"
                            onClick={() => toggle({ role, id })}
                            className="text-xs md:text-sm dark:bg-gray-600 dark:hover:bg-gray-500"
                          >
                            Make it User
                          </Button>
                        ) : (
                          <Button
                            color="deep-purple"
                            className="hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md text-xs md:text-sm dark:bg-gray-600 dark:hover:bg-gray-500"
                            onClick={() => toggle({ role, id })}
                          >
                            Make it Admin
                          </Button>
                        )}
                        {id === "1" ? (
                          <Button
                            color="red"
                            onClick={() => deleteUser({ name, id })}
                            disabled
                            className="text-xs md:text-sm"
                          >
                            DELETE
                          </Button>
                        ) : (
                          <Button
                            color="red"
                            className="hover:bg-black text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md text-xs md:text-sm dark:bg-red-700 dark:hover:bg-red-600"
                            onClick={() => deleteUser({ name, id })}
                          >
                            DELETE
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Users;
