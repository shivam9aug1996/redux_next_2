import { useState } from "react";

const {
  useVerifyRecaptchaMutation,
} = require("@/redux/features/Auth/authSlice");
const { useEffect } = require("react");
const { generateReCaptchaToken } = require("../utils/globalFunctions");

export function useRecaptcha(action, isButtonClicked) {
  const [isRecaptchaTrigger, setTrigger] = useState(false);
  const [
    verifyRecaptcha,
    {
      isSuccess: isRecaptchaSuccess,
      data: recaptchaResponse,
      isLoading: isRecaptchaLoading,
      isError: isRecaptchaError,
      error: recaptchaError,
    },
  ] = useVerifyRecaptchaMutation();

  useEffect(() => {
    if (isRecaptchaTrigger) {
      verifyCaptcha(action);
    }
  }, [isRecaptchaTrigger]);

  useEffect(()=>{
    if(isRecaptchaSuccess||isRecaptchaError){
      setTrigger(false)
    }
  },[isRecaptchaSuccess,isRecaptchaError])

  const setRecaptchaTrigger=(val)=>{
    setTrigger(val)
  }

  const verifyCaptcha = async (action) => {
    let token = await generateReCaptchaToken(action);
    console.log(token,action)
    verifyRecaptcha(
      JSON.stringify({
        recaptchaResponse: token,
        action,
      })
    );
  };

  return [
    isRecaptchaSuccess,
    isRecaptchaLoading,
    isRecaptchaError,
    recaptchaError,
    isRecaptchaTrigger,
    setRecaptchaTrigger,
  ];
}
