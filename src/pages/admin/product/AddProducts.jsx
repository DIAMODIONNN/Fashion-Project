import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProducts = ({ setDeleted, deleted, products }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!product.title || product.title.length < 3 || products.find((oneproduct) => (oneproduct.title === product.title))) {
      return { title: "Title must be at least 3 characters long" };
    } else if (!product.price || isNaN(product.price) || product.price <= 0) {
      return { price: "Please enter a valid price." };
    } else if (!product.description || product.description.length < 5) {
      return { description: "Description should be at least 5 characters long." };
    } else if (!product.category) {
      return { category: "Category cannot be empty." };
    } else if (!product.image || !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(product.image)) {
      return { image: "Please provide a valid image URL." };
    } else if (
      !product.rating.rate ||
      isNaN(product.rating.rate) ||
      product.rating.rate < 0 ||
      product.rating.rate > 5
    ) {
      return { rate: "Rate must be a number between 0 and 5." };
    } else if (!product.rating.count || isNaN(product.rating.count) || product.rating.count <= 0) {
      return { count: "Count must be a positive number." };
    }

    return {};
  };

  const addNew = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_PRODUCTS}`,
        data: product,
      }).then(() => {
        setDeleted(!deleted);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The New Product Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate('/admin/products'));
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-500 dark:from-gray-800 dark:to-gray-900 p-6">
      <Card color="transparent" shadow={false} className="p-6 bg-white dark:bg-gray-800 max-w-lg w-full rounded-lg shadow-lg mt-6">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4 dark:text-white">
          Add New Product
        </Typography>
        <Typography color="gray" className="text-center mb-8 dark:text-white">
          Fill in the details of the new product.
        </Typography>
        <form className="space-y-6" onSubmit={addNew}>
          <div className="space-y-4">
            <div>
              <Input
                label="Title"
                className="bg-white dark:bg-gray-700 dark:text-white"
                value={product.title}
                error={!!errors.title}
                success={!!(product.title.length > 2 && !products.find((onemore) => onemore.title === product.title))}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <Input
                label="Price"
                className="bg-white dark:bg-gray-700 dark:text-white"
                value={product.price}
                error={!!errors.price}
                success={!!(!isNaN(product.price) && product.price >= 0 && product.price)}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
              {errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.price}</p>)}
            </div>

            <div>
              <Input
                label="Description"
                className="bg-white dark:bg-gray-700 dark:text-white"
                value={product.description}
                error={!!errors.description}
                success={!!(product.description.length > 4)}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
              {errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.description}</p>)}
            </div>

            <div>
              <Input
                label="Category"
                className="bg-white dark:bg-gray-700 dark:text-white"
                value={product.category}
                error={!!errors.category}
                success={!!(product.category)}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
              />
              {errors.category && !errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.category}</p>)}
            </div>

            <div>
              <Input
                label="Image"
                className="bg-white dark:bg-gray-700 dark:text-white"
                value={product.image}
                error={!!errors.image}
                success={!!(/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(product.image))}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
              />
              {errors.image && !errors.category && !errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.image}</p>)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Rate"
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  value={product.rating.rate}
                  error={!!errors.rate}
                  success={!!(!isNaN(product.rating.rate) && product.rating.rate >= 0 && product.rating.rate <= 5 && product.rating.rate)}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      rating: { ...product.rating, rate: e.target.value },
                    })
                  }
                />
                {errors.rate && !errors.image && !errors.category && !errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.rate}</p>)}
              </div>

              <div>
                <Input
                  label="Count"
                  className="bg-white dark:bg-gray-700 dark:text-white"
                  value={product.rating.count}
                  error={!!errors.count}
                  success={!!(!isNaN(product.rating.count) && product.rating.count >= 0 && product.rating.count)}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      rating: { ...product.rating, count: e.target.value },
                    })
                  }
                />
                {errors.count && !errors.rate && !errors.image && !errors.category && !errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.count}</p>)}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md" type="submit">
              Confirm
            </Button>
            <Button  className="bg-blue-600 hover:bg-blue-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProducts;




