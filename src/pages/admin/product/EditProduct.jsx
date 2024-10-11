import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';



const EditProduct = ({deleted , setDeleted}) => {
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
  const navigate = useNavigate();
  const { productId } = useParams();
  const getProduct = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/products/${productId}`,
    }).then(({ data }) => {
        if (data.id) {
          setEditProduct(data);
        } else {
          throw Error("Product not found");
        }
      }).catch(() => navigate("/admin/NotFound"));
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const productEditor = (e) => {
    e.preventDefault();
    if(true){
    axios({
      method :"put",
      url : `http://localhost:3000/products/${productId}`,
      data : editProduct
    }).then(_=> {
      setDeleted(!deleted);
      Swal.fire({
        position: "center",
            icon: "success",
            title: "The Product Edited Successfully",
            showConfirmButton: false,
            timer: 2000
      }).then(_=>navigate('/admin/products'))
    })
  }
  }

  return (
    <form
    onSubmit={productEditor}
    >
    <section className="px-8 py-20 container mx-auto">
      <Typography
        variant="small"
        className="text-gray-600 font-normal mt-1"
      >
        Update your Product information below.
      </Typography>
      <div className="flex flex-col mt-8">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Title
            </Typography>
            <Input
              size="lg"
              label='Title'
              value= {editProduct.title}
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , title : e.target.value})
              )}
              className="w-full placeholder:opacity-100 focus:border-t-primary bg-white"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Description 
            </Typography>
            <Input
              size="lg"
              label='Description'
              value= {editProduct.description}
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , description : e.target.value})
              )}
              className="w-full placeholder:opacity-100 focus:border-t-primary bg-white"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Category
            </Typography>
            <Input
              size="lg"
              label='Category'
              value= {editProduct.category}
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , category : e.target.value})
              )}
              className="bg-white aria-[expanded=true]:border-t-primary"
            />
              
            
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Price
            </Typography>
              <Input
              size='lg'
              label='Price'
              value= {editProduct.price}
              type="number"
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , price : e.target.value})
              )}
              className= "bg-white aria-[expanded=true]:border-t-primary"
              
              />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Count
            </Typography>
            <Input
              size="lg"
              label='Count'
              value= {editProduct.rating.count}
              type="number"
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , rating : {...editProduct.rating , count : e.target.value}})
              )}
              className="bg-white aria-[expanded=true]:border-t-primary"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Rate
            </Typography>
            <Input
              size="lg"
              type='number'
              label= 'Rate'
              value= {editProduct.rating.rate}
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , rating : {...editProduct.rating , rate : e.target.value}})
              )}
              className="bg-white aria-[expanded=true]:border-t-primary"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Image
            </Typography>
            <Input
              size="lg"
              label='Image'
              value= {editProduct.image}
              type="url"
              onChange= 
              {(e) => (
                setEditProduct({...editProduct , image : e.target.value})
              )}
              className="bg-white w-full placeholder:opacity-100 focus:border-t-primary "
            />
          </div>
        </div>
      </div>
    </section>
          <div className='flex justify-center items-center gap-5'>
          

          <Button className="mt-6" type="submit" color= 'indigo'>
            Submit Changes
          </Button>
          
          <Button onClick={() => navigate(-1)} color="cyan" className="mt-6">
            BACK
          </Button>
          </div>
    </form>
    
  );
}

export default EditProduct