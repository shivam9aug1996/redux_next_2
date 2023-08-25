"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import {
  useLoginMutation,
  useVerifyRecaptchaMutation,
} from "@/redux/features/Auth/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { generateReCaptchaToken } from "../utils/globalFunctions";
import { useRecaptcha } from "../custom-hooks/useRecaptcha";

const Recaptcha = dynamic(() => import("@/components/Recaptcha"), {
  ssr: false,
});
const GoogleSignUpButton = dynamic(
  () => import("@/components/GoogleSignUpButton"),
  { ssr: false }
);
//import Toast from "@/components/Toast";
const Toast = dynamic(() => import("@/components/Toast"));

const Login = () => {
  const reduxToken = useSelector((state) => state?.auth?.token);
  const router = useRouter();
  const [login, { isSuccess, data: token, isLoading, isError, error }] =
    useLoginMutation();
  const [
    verifyRecaptcha,
    { isSuccess: isSuccess1, data: data1, isLoading: isLoading1 },
  ] = useVerifyRecaptchaMutation();

  const [loginStates, setLoginStates] = useState({
    email: "",
    password: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  const [
    isRecaptchaSuccess,
    isRecaptchaLoading,
    isRecaptchaError,
    recaptchaError,
    isRecaptchaTrigger,
    setRecaptchaTrigger,
  ] = useRecaptcha("login");

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


  useEffect(() => {
    if (isRecaptchaSuccess) {
      login(
        JSON.stringify({
          email: loginStates.email,
          password: loginStates.password,
        })
      );
    }
  }, [isRecaptchaSuccess]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if(process.env.NODE_ENV=="development"){
      login(
        JSON.stringify({
          email: loginStates.email,
          password: loginStates.password,
        })
      );
    }else{
      setRecaptchaTrigger(true)
    }
    
  };

  return (
    <>
      {isError && (
        <Toast
          message={error?.error || error?.data?.error || error?.data?.message}
        />
      )}
         {isRecaptchaError && (
        <Toast
          message={recaptchaError?.error || recaptchaError?.data?.error || recaptchaError?.data?.message}
        />
      )}

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
          {/* <Recaptcha recaptchaStates={recaptchaStates} setRecaptchaStates={setRecaptchaStates}/> */}
          <button
            disabled={isLoading||isRecaptchaTrigger||isRecaptchaLoading}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-slate-700 hover:bg-slate-600 mt-2"
            type="submit"
          >
            {isLoading||isRecaptchaTrigger||isRecaptchaLoading ? <Loader /> : "Login"}
          </button>
          <div className="flex justify-center flex-col items-center">
            <p className="mb-6 mt-6">or</p>
            <GoogleSignUpButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
