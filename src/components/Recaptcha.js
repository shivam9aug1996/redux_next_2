"use client";
import { generateReCaptchaToken } from "@/app/utils/globalFunctions";
import { useVerifyRecaptchaMutation } from "@/redux/features/Auth/authSlice";
import React from "react";
import { useEffect } from "react";

const Recaptcha = ({ recaptchaStates, setRecaptchaStates }) => {
  const [verifyRecaptcha, { isSuccess, data, isLoading, isError }] =
    useVerifyRecaptchaMutation();

  useEffect(() => {
    if (recaptchaStates.isButtonClicked) {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isLoading: true,
      }));
      verifyCaptcha(recaptchaStates.action);
    }
  }, [recaptchaStates.isButtonClicked]);

  useEffect(() => {
    if (isSuccess) {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isSuccess: true,
      }));
    } else {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isSuccess: false,
      }));
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isLoading) {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isLoading: true,
      }));
    } else {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isLoading: false,
      }));
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isError: true,
      }));
    } else {
      setRecaptchaStates((recaptchaStates) => ({
        ...recaptchaStates,
        isError: false,
      }));
    }
  }, [isError]);

  const verifyCaptcha = async (action) => {
    let token = await generateReCaptchaToken(recaptchaStates.action);
    verifyRecaptcha(
      JSON.stringify({
        recaptchaResponse: token,
        action,
      })
    );
  };

  return null;
};

export default Recaptcha;
