"use client";
import LoaderFull from "@/components/LoaderFull";
import { useUpdateProfileMutation } from "@/redux/features/Auth/authSlice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";



const Page = () => {
  const userData = useSelector((state) => state?.auth?.userData);
  const [isEditToggle, setIsEditToggle] = useState(false);
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const [updateProfile, { isLoading, isError, error, isSuccess }] =
    useUpdateProfileMutation();
  console.log(name);
  useEffect(() => {
    if (userData?.name) {
      let arr = userData?.name?.split(" ");
      setName({ firstName: arr[0], lastName: arr[1] || "" });
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setIsEditToggle(false);
    }
  }, [isSuccess]);

  const handleUpdate = () => {
    let fullName;
    if (name.lastName) {
      fullName = name.firstName + " " + name.lastName;
    } else {
      fullName = name.firstName;
    }
    updateProfile(JSON.stringify({ name: fullName }));
  };
  console.log(isSuccess, isLoading, isError, error, userData);
  return (
    <div className="ml-5 mt-3">
      <div className="border p-4">
      <label>Name</label>
      <div className="mt-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div>
            <input
              value={name.firstName}
              className="border p-3"
              type="text"
              disabled={!isEditToggle}
              onChange={(e) => setName({ ...name, firstName: e.target.value })}
            />
          </div>
          <div>
            <input
              value={name.lastName}
              className="border p-3"
              type="text"
              disabled={!isEditToggle}
              onChange={(e) => setName({ ...name, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          {isEditToggle ? (
            <>
             <button
              className="px-2 py-1 text-blue-500 rounded hover:text-blue-600 max-h-8 w-full sm:w-auto"
              onClick={() => {
                setIsEditToggle(false);
              }}
            >
              {"Cancel"}
            </button>
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 max-h-8 w-full sm:w-auto"
              onClick={() => {
                handleUpdate();
              }}
            >
              {"Save"}
            </button>
            </>
          ) : (
            <button
              className="px-2 py-1 text-blue-500 rounded hover:text-blue-600 max-h-8 w-full sm:w-auto"
              onClick={() => {
                setIsEditToggle(true);
              }}
            >
              {"Edit"}
            </button>
          )}
        </div>
      </div>
      </div>
      {isLoading && <LoaderFull />}
     

      <div className="mt-5 border p-4">
        <label>Email</label>
        <div className="mt-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <input
                value={userData?.email}
                className="border p-3"
                type="text"
                disabled={true}
                // onChange={(e) => setName({ ...name, firstName: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
