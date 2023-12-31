import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  getRedirectResult,
} from "firebase/auth";
import { NextApiResponse, NextApiRequest } from "next";

import { connectDB } from "@/app/lib/connectDataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "@/firebase/firebase";
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const saltRounds = 10;

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { googleIdToken, userData } = await req.json();
  if (!googleIdToken) {
    return NextResponse.json(
      { message: "Missing Google ID token" },
      { status: 400 }
    );
  }
  console.log("googleIdToken", googleIdToken);
  try {
    // const response = await axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo", {
    //   id_token: googleIdToken,
    // });

    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${googleIdToken}`
    );
    console.log(response);
    const data = await response.json();

    console.log(data);
    if (response.ok) {
      if (userData?.email == data?.email) {
        // The Google sign-in was successful, now handle the user's account in your database
        const {
          displayName,
          email,
          addresses = [],
          face_data = null,
        } = userData;
        const db = await connectDB();
        const existingUser = await db
          .collection("private_users")
          .findOne({ email });
        console.log("existingUser", existingUser);
        if (existingUser) {
          // User already exists, proceed with JWT token generation
          const token = jwt.sign({ id: existingUser._id }, "secretkey");
          cookies().set("token", token);
          cookies().set(
            "userData",
            JSON.stringify({
              token,
              email,
              name: existingUser?.name,
              id: existingUser._id,
              addresses: existingUser?.addresses,
              face_data: existingUser?.face_data,
            })
          );
          return NextResponse.json(
            {
              token,
              email,
              name: existingUser?.name,
              id: existingUser._id,
              addresses: existingUser?.addresses,
              face_data: existingUser?.face_data,
            },
            { status: 200 }
          );
        } else {
          // User does not exist, create a new account in your database
          const hashedPassword = await bcrypt.hash(googleIdToken, saltRounds);
          const newUser = await db.collection("private_users").insertOne({
            name: displayName,
            email,
            password: hashedPassword,
            addresses: [],
            face_data: null,
          });

          const token = jwt.sign({ id: newUser.insertedId }, "secretkey");
          cookies().set("token", token);
          cookies().set(
            "userData",
            JSON.stringify({
              token,
              name: displayName,
              email,
              id: newUser.insertedId,
              addresses: [],
              face_data: null,
            })
          );
          return NextResponse.json(
            {
              token,
              name: displayName,
              email,
              id: newUser.insertedId,
              addresses: [],
              face_data: null,
            },
            { status: 201 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Google sign-in failed" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Google sign-in failed" },
        { status: 403 }
      );
    }

    // console.log(userData, data?.email);
  } catch (error) {
    console.error("Error handling Google sign-in:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
