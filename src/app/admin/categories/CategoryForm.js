import LoaderFull from "@/components/LoaderFull";
import { adminHomeApi } from "@/redux/features/AdminHome/adminHomeSlice";
import { useUpdateProfileMutation } from "@/redux/features/Auth/authSlice";
import {
  categoryApi,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/Category/categorySlice";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CategoryForm({ setAddCategory, setEditCategory, editCategory }) {
  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      isSuccess: isSuccess1,
    },
  ] = useUpdateCategoryMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    localImage: "",
    sendImage: "",
  });

  useEffect(() => {
    if (editCategory?.status) {
      let { name = "" } = editCategory?.value;
      setFormData({
        name,
        image: editCategory?.value?.image,
      });
    }
  }, [editCategory?.status]);

  useEffect(() => {
    if (isSuccess || isSuccess1) {
      setAddCategory(false);
      setEditCategory({ status: false, value: null });
    }
    if (isSuccess) {
      dispatch(adminHomeApi.util.invalidateTags(["admin"]));
    }
  }, [isSuccess, isSuccess1]);

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
    if (editCategory?.status == true) {
      const formRes = new FormData();
      formRes.append("updatedCategoryName", formData?.name);
      formRes.append("categoryId", editCategory?.value?._id);

      if (formData.sendImage) {
        formRes.append(
          "image",
          formData.sendImage ? formData.sendImage : formData.image
        );
      }

      updateCategory({
        body: formRes,
      });
    } else {
      const formRes = new FormData();
      formRes.append("categoryName", formData?.name);
      formRes.append(
        "image",
        formData.sendImage ? formData.sendImage : formData.image
      );
      createCategory({
        body: formRes,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      {isLoading || isLoading1 ? <LoaderFull /> : null}
      <form
        className="bg-white p-8 rounded shadow-md"
        onSubmit={handleAddAddress}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editCategory?.status ? "Edit Category" : "Add Category"}
        </h2>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Category Name
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="text-sm font-semibold text-gray-600"
          >
            Image
          </label>
          <div className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none">
            {formData?.image ? (
              <Image
                width={50}
                height={50}
                src={formData?.image}
                alt={"product"}
              />
            ) : null}
            <input
              required={editCategory?.status ? false : true}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e?.target?.files?.[0];
                console.log("765redfghj", file);
                setFormData((prevData) => ({
                  ...prevData,
                  image: URL.createObjectURL(
                    new Blob([file], { type: file.type })
                  ),
                  sendImage: file,
                }));
              }}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-center gap-5">
          <button
            onClick={() => {
              setAddCategory(false);
              setEditCategory({ status: false, value: null });
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
}

export default CategoryForm;
