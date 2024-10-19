import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const ViewProduct = ({ productDetails, setProductDetails }) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const getProduct = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_PRODUCTS}/${productId}`,
    })
      .then(({ data }) => {
        if (data.id) {
          setProductDetails(data);
        } else {
          throw Error("Product not found");
        }
      })
      .catch(() => navigate("/admin/NotFound"));
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        {productDetails && (
          <Card shadow={false} className="shadow-lg dark:bg-gray-800">
            <div className="flex flex-col md:flex-row">
              <CardHeader
                floated={false}
                shadow={false}
                className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${productDetails?.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              </CardHeader>

              <CardBody className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-white dark:bg-gray-800">
                <Typography
                  variant="h4"
                  className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl md:text-2xl"
                >
                  {productDetails?.title}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="mb-4 text-gray-600 dark:text-gray-300 text-base md:text-lg"
                >
                  {productDetails?.description}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="mb-4 text-gray-700 dark:text-gray-300 text-base md:text-lg"
                >
                  Price:{" "}
                  <span className="font-semibold">${productDetails?.price}</span>
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-gray-700 dark:text-gray-300 text-base md:text-lg"
                >
                  Rating: {productDetails?.rating?.rate} / 5 (
                  {productDetails?.rating?.count} reviews)
                </Typography>
              </CardBody>
            </div>
          </Card>
        )}

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => navigate(-1)}
            color="cyan"
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md w-full md:w-auto"
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
