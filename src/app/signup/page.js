"use client";

import { useSignupMutation } from "@/redux/features/Auth/authSlice";
import React, { useState } from "react";

const Signup = () => {
  const [signup, { isSuccess: signupLoading, data: token }] =
    useSignupMutation();
  const [signupStates, setSignupStates] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <>
      <label>
        Name:{" "}
        <input
          type={"text"}
          value={signupStates.name}
          onChange={(e) =>
            setSignupStates({ ...signupStates, name: e.target.value })
          }
        />
      </label>

      <label>
        Email:{" "}
        <input
          type={"text"}
          value={signupStates.email}
          onChange={(e) =>
            setSignupStates({ ...signupStates, email: e.target.value })
          }
        />
      </label>

      <label>
        Password:{" "}
        <input
          type={"password"}
          value={signupStates.password}
          onChange={(e) =>
            setSignupStates({ ...signupStates, password: e.target.value })
          }
        />
      </label>

      <button
        onClick={() =>
          signup(
            JSON.stringify({
              name: signupStates.name,
              email: signupStates.email,
              password: signupStates.password,
            })
          )
        }
      >
        Signup
      </button>
    </>
  );
};

export default Signup;
