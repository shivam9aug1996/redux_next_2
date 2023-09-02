import { objectToFormData } from "@/app/utils/globalFunctions";
import LoaderFull from "@/components/LoaderFull";
import { adminHomeApi } from "@/redux/features/AdminHome/adminHomeSlice";
import { useGetCategoriesQuery } from "@/redux/features/Category/categorySlice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/Product/productSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductForm = ({ setAddProduct, setEditProduct, editProduct }) => {
  const reduxCategories = useSelector((state) => state?.category?.categories);
  const dispatch = useDispatch()
  const [createProduct, { isLoading, isError, error, isSuccess }] =
    useCreateProductMutation();
  const [
    updateProduct,
    {
      isLoading: isLoading2,
      isError: isError2,
      error: error2,
      isSuccess: isSuccess2,
    },
  ] = useUpdateProductMutation();
  const {
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
    isSuccess: isSuccess1,
    data,
  } = useGetCategoriesQuery();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: "",
    localImage:"",
    sendImage:""
  });

  useEffect(() => {
    if (editProduct?.status) {
      let {
        name = "",
        price = "",
        categoryId = "",
        image = "",
      } = editProduct?.value;
      setFormData({
        name,
        price,
        categoryId,
        image,
      });
    }
  }, [editProduct?.status]);

  console.log(editProduct,data);

  useEffect(() => {
    if (isSuccess || isSuccess2) {
      setAddProduct(false);
      setEditProduct({ status: false, value: null });
    }
    if(isSuccess){
      dispatch(adminHomeApi.util.invalidateTags(["admin"]))
    }
  }, [isSuccess || isSuccess2]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    console.log(formData);
    if (editProduct?.status == true) {
      const formRes = new FormData();
      formRes.append("name", formData?.name);
      formRes.append("price", formData?.price);
      formRes.append("categoryId", formData?.categoryId);
      formRes.append("productId", editProduct?.value?._id);
      if(formData.sendImage){
        formRes.append("image", formData.sendImage?formData.sendImage: formData.image);
      }
      
      updateProduct({
        body: formRes,
      });
    } else {
      const formRes = new FormData();
      formRes.append("name", formData?.name);
      formRes.append("price", formData?.price);
      formRes.append("categoryId", formData?.categoryId);
      formRes.append("image", formData.sendImage?formData.sendImage: formData.image);
      createProduct({
        body: formRes
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      {isLoading || isLoading1 || isLoading2 ? <LoaderFull /> : null}
      <form
        className="bg-white p-8 rounded shadow-md"
        onSubmit={handleAddAddress}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editProduct?.status ? "Edit Product" : "Add Product"}
        </h2>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="text-sm font-semibold text-gray-600"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {reduxCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="text-sm font-semibold text-gray-600"
          >
            Image
          </label>
          <div className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none">
           {formData?.image? <Image width={50} height={50} src={formData?.image} alt={"product"} />:null}
            <input
            required={editProduct?.status?false: true}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData((prevData) => ({
                  ...prevData,
                  image:  URL.createObjectURL(new Blob([file], { type: file.type })),
                  sendImage:file
                }));
              }}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-center gap-5">
          <button
            onClick={() => {
              setAddProduct(false);
              setEditProduct({ status: false, value: null });
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type={"submit"}
            // onClick={handleAddAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
