import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import { verifyToken } from "@/app/utils/globalFunctions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  // Call middleware (if necessary)
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const { facialId = null, action = null, email = null } = await req.json();
    if (!token && action == "delete") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("gfdsdfghjhgf", action);

    // Verify the token and extract the user ID

    if (action == "delete") {
      const userId = await verifyToken(token);
      const apiKey = "701b3408e7c1150dd39542a77fa3520a"; // Your FACEIO Application API Key

      const url = `https://api.faceio.net/deletefacialid?fid=${facialId}&key=${apiKey}`;
      console.log(url);

      fetch(url)
        .then((response) => response.json())
        .then((reply) => {
          console.log("hgfdfghjfdfghj", reply);
          if (reply.status !== 200) {
            console.log(reply.error);
          }
          // Success
          console.log(
            "Given Facial ID, payload data, and Biometrics hash purged from this application"
          );
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });

      // Connect to the database
      let database = await connectDB();
      let result;
      if (facialId && userId) {
        console.log("7654edfg", userId);
        result = await database
          .collection("private_users")
          .updateOne(
            { _id: new ObjectId(userId) },
            { $set: { face_data: null } }
          );
      }
      console.log("fghjk", result);

      if (result) {
        return NextResponse.json(
          {
            message: "Deleted successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Cannot perform this operation." },
          { status: 404 }
        );
      }
    } else {
      console.log(action, facialId, email);
      // Connect to the database
      let database = await connectDB();
      let result;
      if (facialId && email) {
        console.log("7654edfg", email);
        // const user = await database
        //   .collection("private_users")
        //   .findOne({ email });
        // const user = await database
        //   .collection("private_users")
        //   .findOne({ "face_data.facialId": facialId });
        const user = await database
          .collection("private_users")
          .findOne({ email });
        console.log("mjhgfdfghjk", user);
        if (user) {
          const token = jwt.sign({ id: user._id }, "secretkey");
          console.log("ghjkfghjk", token);
          const {
            email,
            name,
            addresses = [],
            isAdmin = false,
            face_data = null,
          } = user;
          cookies().set("token", token);
          cookies().set(
            "userData",
            JSON.stringify({
              token,
              email,
              name,
              id: user._id,
              addresses,
              isAdmin,
              face_data,
            })
          );

          return NextResponse.json(
            {
              token,
              email,
              name,
              id: user._id,
              addresses,
              isAdmin,
              face_data,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Incorrect details" },
            { status: 401 }
          );
        }
      }
    }
  } catch (error) {
    // Handle any errors that occurred during the deletion process
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
