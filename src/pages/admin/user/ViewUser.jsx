import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const ViewUser = ({ userDetails, setUserDetails }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const getUser = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${userId}`,
    })
      .then(({ data }) => {
        if (data.id) {
          setUserDetails(data);
        } else {
          throw Error("User not found");
        }
      })
      .catch(() => navigate("/admin/NotFound"));
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 p-8">
      {userDetails && (
        <Card className="w-96 shadow-lg rounded-lg overflow-hidden bg-white">
          <CardHeader className="h-60 mx-auto w-60 mt-4 rounded-full overflow-hidden shadow-md">
            <img
              src={userDetails?.img}
              alt="profile"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody className="text-center p-6">
            <Typography variant="h4" color="blue-gray" className="font-serif mb-2">
              {userDetails?.name}
            </Typography>
            <Typography color="blue-gray" className="font-extrabold font-serif">
              Role: {userDetails?.role}
            </Typography>
            <Typography color="blue-gray" className="font-extrabold font-serif">
              Gender: {userDetails?.gender}
            </Typography>
            <Typography color="blue-gray" className="font-extrabold font-serif">
            Email: {userDetails?.email}
            </Typography>
          </CardBody>
        </Card>
      )}
      <Button
        onClick={() => navigate(-1)}
        color="cyan"
        className="mt-6 bg-black hover:bg-[#229799] shadow-md"
      >
        BACK
      </Button>
    </div>
  );
};

export default ViewUser;