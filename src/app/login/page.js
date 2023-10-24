"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import {
  useLoginMutation,
  useUpdateFaceUnlockMutation,
  useVerifyRecaptchaMutation,
} from "@/redux/features/Auth/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { generateReCaptchaToken, handleError } from "../utils/globalFunctions";
import { useRecaptcha } from "../custom-hooks/useRecaptcha";
import LoaderFull from "@/components/LoaderFull";
import Image from "next/image";

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
  const isAdmin = useSelector(
    (state) => state?.auth?.userData?.isAdmin || false
  );

  const router = useRouter();
  const [login, { isSuccess, data: token, isLoading, isError, error }] =
    useLoginMutation();
  const [
    verifyRecaptcha,
    { isSuccess: isSuccess1, data: data1, isLoading: isLoading1 },
  ] = useVerifyRecaptchaMutation();
  const [
    updateFaceUnlock,
    {
      isLoading: isLoading2,
      isError: isError2,
      error: error2,
      isSuccess: isSuccess2,
    },
  ] = useUpdateFaceUnlockMutation();

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

  console.log(
    "8765edfghjdfghjk",
    isAdmin,
    reduxToken,
    isSuccess2,
    isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated && !isAdmin && isSuccess) {
      router.replace("/");
    }
    if (isAuthenticated && isAdmin && isSuccess) {
      router.replace("/admin");
    }
    if (isAuthenticated && !isAdmin && isSuccess2) {
      router.replace("/");
    }
  }, [isAdmin, isAuthenticated, isSuccess, isSuccess2]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     router.replace("/");
  //   }
  // }, [isSuccess]);

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

  useEffect(() => {
    // Check for the refresh flag in localStorage
    const refreshNeeded = localStorage.getItem("refreshNeeded");
    if (refreshNeeded === "true") {
      // Clear the flag to prevent further refreshes
      localStorage.removeItem("refreshNeeded");

      // Execute your logic here
      const faceio = new faceIO("fioa1693");
      faceio
        .authenticate()
        .then((res) => {
          console.log(res);
          faceio.restartSession();
          if (res?.facialId) {
            updateFaceUnlock(
              JSON.stringify({
                facialId: res?.facialId,
                email: res?.payload?.email,
              })
            );
          } else {
            faceio.restartSession();
          }
        })
        .catch((err) => {
          console.log(err);
          <Toast message={handleError(errCode)} />;
          faceio.restartSession();
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (process.env.NODE_ENV == "development") {
      login(
        JSON.stringify({
          email: loginStates.email,
          password: loginStates.password,
        })
      );
    } else {
      setRecaptchaTrigger(true);
    }
  };

  const handleFaceLoginClick = () => {
    // Set the flag in localStorage to trigger a page refresh
    localStorage.setItem("refreshNeeded", "true");
    // Refresh the page
    window.location.reload();
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
          message={
            recaptchaError?.error ||
            recaptchaError?.data?.error ||
            recaptchaError?.data?.message
          }
        />
      )}
      {isLoading2 && <LoaderFull />}

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
            disabled={isLoading || isRecaptchaTrigger || isRecaptchaLoading}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-slate-700 hover:bg-slate-600 mt-2"
            type="submit"
          >
            {isLoading || isRecaptchaTrigger || isRecaptchaLoading ? (
              <Loader />
            ) : (
              "Login"
            )}
          </button>
          <div className="flex justify-center flex-col items-center">
            <p className="mb-6 mt-6">or</p>
            <GoogleSignUpButton />
          </div>
          <div className="flex justify-center flex-col items-center">
            <p className="mb-6 mt-6">or</p>
            <button
              onClick={handleFaceLoginClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <Image
                src="https://t4.ftcdn.net/jpg/05/42/67/19/360_F_542671924_13vxXUeT3G7Nl52ORLOmAbdoDOalJ6kn.jpg"
                alt="Face Login"
                width={30} // Set the width of the image
                height={30} // Set the height of the image
                className="mr-2" // Add margin to separate the image from the text
              />
              Face login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
