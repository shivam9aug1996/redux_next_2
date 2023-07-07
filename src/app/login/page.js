"use client";

import Loader from "@/components/Loader";
import { useLoginMutation } from "@/redux/features/Auth/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import LoaderFull from "@/components/LoaderFull";

const Login = () => {
  const router = useRouter();
  const [login, { isSuccess, data: token, isLoading, isError,error }] =
    useLoginMutation();

  const [loginStates, setLoginStates] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      JSON.stringify({
        email: loginStates.email,
        password: loginStates.password,
      })
    );
  };

  return (
    <>
     {isError && <Toast message={error.error || error.data.error||error.data.message} />}
     
      
      <div className="flex flex-col mx-8 flex-1 justify-center items-center">
        <h1 className="text-gray-800 font-bold text-xl mb-3">Login</h1>
        <form
          className="flex flex-col flex-1 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Email</label>
            <input
              required={true}
              placeholder="Email"
              type={"email"}
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={loginStates.email}
              onChange={(e) =>
                setLoginStates({ ...loginStates, email: e.target.value })
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
              value={loginStates.password}
              onChange={(e) =>
                setLoginStates({ ...loginStates, password: e.target.value })
              }
            />
          </div>

          <button
            disabled={isLoading}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-slate-700 hover:bg-slate-600 mt-2"
            type="submit"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
