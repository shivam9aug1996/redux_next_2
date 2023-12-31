"use client";

import Loader from "@/components/Loader";
// import Toast from "@/components/Toast";
import dynamic from "next/dynamic";
//const Loader = dynamic(() => import("@/components/Loader"))
const Toast = dynamic(() => import("@/components/Toast"));
import { useSignupMutation } from "@/redux/features/Auth/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FaceBookSignUpButton from "@/components/FaceBookSignUpButton";
// import GoogleSignUpButton from "@/components/GoogleSignUpButton";
const GoogleSignUpButton = dynamic(
  () => import("@/components/GoogleSignUpButton"),
  { ssr: false }
);

const Signup = () => {
  const reduxToken = useSelector((state) => state?.auth?.token);
  const router = useRouter();
  const [signup, { isSuccess, data: token, isLoading, isError, error }] =
    useSignupMutation();

  const [signupStates, setSignupStates] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isAuthenticated =
    reduxToken !== undefined && reduxToken !== "" ? true : false;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      JSON.stringify({
        name: signupStates.name,
        email: signupStates.email,
        password: signupStates.password,
      })
    );
  };
  console.log(isError,error)
  return (
    <>
      {isError && (
        <Toast
          message={error.error || error.data.error || error.data.message}
        />
      )}
      <div className="flex flex-col mx-8 flex-1 justify-center items-center">
        <h1 className="text-gray-800 font-bold text-xl mb-3">Signup</h1>
        <form
          className="flex flex-col flex-1 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              minLength={3}
              required={true}
              type={"text"}
              placeholder="Name"
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.name}
              onChange={(e) =>
                setSignupStates({ ...signupStates, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Email</label>
            <input
              required={true}
              placeholder="Email"
              type={"email"}
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.email}
              onChange={(e) =>
                setSignupStates({ ...signupStates, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Password</label>
            <input
              minLength={8}
              required={true}
              placeholder="Password"
              type={"password"}
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.password}
              onChange={(e) =>
                setSignupStates({ ...signupStates, password: e.target.value })
              }
            />
          </div>
          <button
            disabled={isLoading}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-slate-700 hover:bg-slate-600 mt-2"
            type="submit"
          >
            {isLoading ? <Loader /> : "Signup"}
          </button>
          <div className="flex justify-center flex-col items-center">
            <p className="mb-6 mt-6">or</p>
            <GoogleSignUpButton />
            {/* <FaceBookSignUpButton/> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
