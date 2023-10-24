"use client";
import { handleError } from "@/app/utils/globalFunctions";
import LoaderFull from "@/components/LoaderFull";
import {
  useUpdateFaceUnlockMutation,
  useUpdateProfileMutation,
} from "@/redux/features/Auth/authSlice";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FaceUnlock = () => {
  const reduxUserData = useSelector((state) => state?.auth?.userData);
  const [updateProfile, { isLoading, isError, error, isSuccess }] =
    useUpdateProfileMutation();
  const [
    updateFaceUnlock,
    {
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      isSuccess: isSuccess1,
    },
  ] = useUpdateFaceUnlockMutation();

  useEffect(() => {
    // Check for the refresh flag in localStorage
    const refreshNeeded = localStorage.getItem("refreshNeeded");
    if (refreshNeeded === "true") {
      // Clear the flag to prevent further refreshes
      localStorage.removeItem("refreshNeeded");

      // Execute your logic here
      const faceio = new faceIO("fioa1693");
      faceio
        .enroll({
          locale: "auto", // Default user locale
          payload: {
            /* The payload we want to associate with this particular user which is forwarded back to us upon future authentication of this user.*/
            whoami: reduxUserData?.id, // Dummy ID linked to this particular user
            email: reduxUserData?.email,
          },
        })
        .then((userInfo) => {
          updateProfile(JSON.stringify({ face_data: userInfo }));
          console.log(userInfo);
          // handle success, save the facial ID (userInfo.facialId), redirect to the dashboard...
        })
        .catch((errCode) => {
          // Something went wrong during enrollment, log the failure

          <Toast message={handleError(errCode)} />;
        });
    }
  }, [reduxUserData]);

  const handleEnrollButtonClick = () => {
    localStorage.setItem("refreshNeeded", "true");
    window.location.reload();
  };
  console.log(reduxUserData);
  const handleDeleteButtonClick = async () => {
    updateFaceUnlock(
      JSON.stringify({
        facialId: reduxUserData?.face_data?.facialId,
        action: "delete",
      })
    );

    // const facialId = reduxUserData?.face_data?.facialId; // Target Facial ID to purge
    // const apiKey = "701b3408e7c1150dd39542a77fa3520a"; // Your FACEIO Application API Key
    // const url = `https://api.faceio.net/deletefacialid?fid=${facialId}&key=${apiKey}`;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((reply) => {
    //     if (reply.status !== 200) {
    //       console.log(reply.error);
    //       return;
    //     }
    //     // Success
    //     console.log(
    //       "Given Facial ID, payload data, and Biometrics hash purged from this application"
    //     );
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred:", error);
    //   });
  };
  return (
    <div className="ml-5 mt-3">
      {isLoading || isLoading1 ? <LoaderFull /> : null}
      {reduxUserData?.face_data ? (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Face Unlock</h2>
          <p className="text-gray-700 mb-4">
            You are already enrolled in Face Unlock.
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out"
            onClick={() => handleDeleteButtonClick()}
          >
            Delete Facial ID
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Enroll in Face Unlock</h2>
          <p className="text-gray-700 mb-4">
            To enhance your security, please follow these steps to enroll in
            Face Unlock:
          </p>
          <ol className="list-decimal pl-6">
            <li>Go to your profile settings.</li>
            <li>Click on the "Face Unlock" option.</li>
            <li>
              Follow the on-screen instructions to capture your face data.
            </li>
          </ol>
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4 transition duration-300 ease-in-out"
            onClick={() => handleEnrollButtonClick()}
          >
            Start Face Unlock Enrollment
          </button>
        </div>
      )}
    </div>
  );
};

export default FaceUnlock;
