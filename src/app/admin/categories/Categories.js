"use client";
import LoaderFull from "@/components/LoaderFull";
import withAuth from "@/components/withAuth";
import { useUpdateProfileMutation } from "@/redux/features/Auth/authSlice";
import {
  useDeleteCategoryMutation,
  useDeleteCategoryQuery,
  useGetCategoriesQuery,
} from "@/redux/features/Category/categorySlice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import CategorySkeleton from "./CategorySkeleton";

const Categories = ({ successCallback, setAddressModal }) => {
  const reduxCategories = useSelector((state) => state?.category?.categories);
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState({
    status: false,
    value: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isLoading, isError, error, isSuccess, data } =
    useGetCategoriesQuery();

  const [
    deleteCategory,
    {
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      isSuccess: isSuccess1,
    },
  ] = useDeleteCategoryMutation();

  console.log(data);

  useEffect(() => {
    setCategories(reduxCategories);
  }, [reduxCategories]);

  //console.log(userData);
  return (
    <div>
      {isLoading || (isLoading1 && <LoaderFull />)}

      {!isLoading && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-5 mb-0"
          onClick={() => setAddCategory(true)}
        >
          Add Category
        </button>
      )}

      {addCategory || editCategory?.status ? (
        <CategoryForm
          setAddCategory={setAddCategory}
          setEditCategory={setEditCategory}
          editCategory={editCategory}
        />
      ) : null}
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        reduxCategories.map((item, index) => {
          // const isSelected = item?.addressId === selectedAddress?.addressId;

          return (
            <div
              className={`flex max-w-md items-center sm:flex-row flex-col border p-5 m-5 gap-5`}
              key={item?._id}
            >
              <p className="">{item?.name}</p>

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setEditCategory({ status: true, value: item });
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 max-h-8"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    // setSelectedAddress(null);
                    deleteCategory({
                      categoryId: item?._id,
                    });
                  }}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 max-h-8"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Categories;
