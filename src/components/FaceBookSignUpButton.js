"use client";
import { auth } from "@/firebase/firebase";
import { useGoogleAuthMutation } from "@/redux/features/Auth/authSlice";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import LoaderFull from "./LoaderFull";

const FaceBookSignUpButton = () => {
  const [googleAuth, { isSuccess, data, isLoading }] = useGoogleAuthMutation();
  const [isRedirectLoading, setIsRedirectLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if(document.referrer){
  //     console.log("i87654esdfghjk",document.referrer)
  //   }
  //   //handleGoogleSignInCallback();
  // }, [document.referrer]);
  // ...

  useEffect(() => {
    handleGoogleSignInCallback();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
  }, [isSuccess]);

  const handleGoogleSignInCallback = async () => {
    try {
      setIsRedirectLoading(true);
      // Get the redirect result after authentication is completed
      const result = await getRedirectResult(auth);
      console.log(result?._tokenResponse?.oauthIdToken);
      if (result?.user) {
        const googleIdToken = result?._tokenResponse?.oauthIdToken;

        console.log(googleIdToken);
        //console.log("access",result.user.accessToken)
        googleAuth(
          JSON.stringify({
            googleIdToken: googleIdToken,
            userData: result?.user?.providerData[0],
          })
        );
        // User successfully signed in with Google
        console.log("Signed-in user:", result.user);
        // You can now proceed with handling the signed-in user, e.g., update state or store user data
        // For example, if you are using Next.js, you can use router.replace('/') to redirect to the home page
        //router.replace("/");
      } else {
        // No user signed in, handle accordingly
        console.log("No user signed in.");
      }
    } catch (error) {
      console.error("Error getting Google sign-in redirect result:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    } finally {
      setIsRedirectLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setRedirected(true);
    return new Promise((resolve, reject) => {
      const provider = new FacebookAuthProvider();
      console.log("favebook provider",provider)
      signInWithPopup(auth, provider)
        .then((result) => {
          
          // User successfully signed in with Google
          resolve(result.user); // You can resolve with the user data or any other relevant information
        })
        .catch((error) => {
console.log("7654edfgh",error)
          if (error.code === "auth/cancelled-popup-request") {
            console.log("User cancelled the sign-in popup.");
            // Handle the case when the user cancels the sign-in popup
          } else {
            console.error("Error signing in with Google:", error);
            reject(error); // Reject the promise with the error
          }
        });
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const user = await handleGoogleSignIn();
      // Do something with the signed-in user data
    } catch (error) {
      // Handle the error if sign-in fails
    }
  };

  return (
    <>
      {isRedirectLoading && <LoaderFull />}
      {isLoading && <LoaderFull />}
      <button
        onClick={(e) => handleSignIn(e)}
        className="flex items-center justify-center bg-white-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border"
      >
        <div style={{ height: 18, minWidth: 18, width: 18, marginRight: 8 }}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="LgbsSe-Bz112c"
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
        </div>

        <span className="google-login">Sign in with Google</span>
      </button>
    </>
  );
};

export default FaceBookSignUpButton;
