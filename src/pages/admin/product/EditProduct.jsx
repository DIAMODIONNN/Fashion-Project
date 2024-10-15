import React, { useEffect, useState } from "react";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProduct = ({ deleted, setDeleted, products}) => {
  const [editProduct, setEditProduct] = useState({
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
  const { productId } = useParams();

  const getProduct = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/products/${productId}`,
    })
      .then(({ data }) => {
        if (data.id) {
          setEditProduct(data);
        } else {
          throw Error("Product not found");
        }
      })
      .catch(() => navigate("/admin/NotFound"));
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const validateInputs = () => {
    if (!editProduct.title || editProduct.title.length < 3 || products.find((oneProduct) => (oneProduct.title === editProduct.title && oneProduct.id !== productId))) {
      return { title: "Title must be at least 3 characters long and contain no spaces." };
    } else if (!editProduct.price || isNaN(editProduct.price) || editProduct.price <= 0) {
      return { price: "Please enter a valid price." };
    }
    else if (!editProduct.description || editProduct.description.length < 5) {
      return { description: "Description should be at least 5 characters long." };
    }
    else if (!editProduct.category) {
      return { category: "Category cannot be empty." };
    }
    else if (!editProduct.image || !/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(editProduct.image)) {
      return { image: "Please provide a valid image URL." };
    }
    else if (!editProduct.rating.rate || isNaN(editProduct.rating.rate) || editProduct.rating.rate < 0 || editProduct.rating.rate > 5) {
      return { rate: "Rate must be a number between 0 and 5." };
    }
    else if (!editProduct.rating.count || isNaN(editProduct.rating.count) || editProduct.rating.count <= 0) {
      return { count: "Count must be a positive number." };
    }

    return {};
  };

  const productEditor = (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length === 0) {
      axios({
        method: "put",
        url: `http://localhost:3000/products/${productId}`,
        data: editProduct,
      }).then(() => {
        setDeleted(!deleted);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The Product Edited Successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/admin/products"));
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="p-8 bg-gray-50 shadow-lg max-w-4xl w-full mx-auto">
        <Typography variant="h4" color="indigo" className="text-center font-bold mb-4">
          Edit Product
        </Typography>
        <Typography variant="small" className="text-gray-600 font-normal text-center">
          Update your product information below.
        </Typography>

        <form onSubmit={productEditor} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Title
              </Typography>
              <Input
                size="lg"
                label="Title"
                value={editProduct.title}
                error = {!!errors.title}
                success = {!!(editProduct.title.length > 2 && !products.find(oneProduct => oneProduct.title === editProduct.title && oneProduct.id !== productId))}
                onChange = {(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                className = "bg-white"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Price
              </Typography>
              <Input
                size="lg"
                label="Price"
                value={editProduct.price}
                error={!!errors.price}
                success={!!(!isNaN(editProduct.price) && editProduct.price >= 0 && editProduct.price)}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                className="bg-white"
              />
              {errors.price && !errors.title &&(<p className="text-red-500 text-sm mt-1">{errors.price}</p>)}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Description
              </Typography>
              <Input
                size="lg"
                label="Description"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                error={!!errors.description}
                success = {!!(editProduct.description.length > 4)}
                className="bg-white"
              />
              {errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.description}</p>)}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Category
              </Typography>
              <Input
                size="lg"
                label="Category"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                error={errors.category}
                success={!!(editProduct.category)}
                className="bg-white"
              />
              {errors.category && !errors.description && !errors.price && !errors.title && (<p className="text-red-500 text-sm mt-1">{errors.category}</p>)}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Image URL
              </Typography>
              <Input
                size="lg"
                label="Image"
                type="url"
                value={editProduct.image}
                error={!!errors.image}
                success={!!(/\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(editProduct.image))}
                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                className="bg-white"
              />
              {errors.image && !errors.category && !errors.description && !errors.price && !errors.title &&(<p className="text-red-500 text-sm mt-1">{errors.image}</p>)}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Rate
              </Typography>
              <Input
                size="lg"
                label="Rate"
                value={editProduct.rating.rate}
                error={!!errors.rate}
                success={!!(!isNaN(editProduct.rating.rate) && editProduct.rating.rate >= 0 && editProduct.rating.rate <=5 && editProduct.rating.rate)}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, rating: { ...editProduct.rating, rate: e.target.value } })
                }
                className="bg-white"
              />
              {errors.rate && !errors.image && !errors.category && !errors.description && !errors.price && !errors.title &&( <p className="text-red-500 text-sm mt-1">{errors.rate}</p>)}
              </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Count
              </Typography>
              <Input
                size="lg"
                label="Count"
                value={editProduct.rating.count}
                error={!!errors.count}
                success={!!(!isNaN(editProduct.rating.count) && editProduct.rating.count >= 0 && editProduct.rating.count)}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, rating: { ...editProduct.rating, count: e.target.value } })
                }
                className="bg-white"
              />
              {errors.count && <p className="text-red-500 text-sm mt-1">{errors.count}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button color="indigo" size="lg" type="submit" className=" bg-blue-500 hover:bg-blue-700  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Submit Changes
            </Button>
            <Button color="cyan" size="lg" onClick={() => navigate(-1)} className=" bg-blue-500 hover:bg-blue-700  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              BACK
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default EditProduct;
