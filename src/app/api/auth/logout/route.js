import { connectDB } from "@/app/lib/connectDataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  // const { email, password } = await req.json();

  // if (!email || !password) {
  //   return NextResponse.json(
  //     { message: "Missing email, or password" },
  //     { status: 400 }
  //   );
  // }

  
 // const { email: userEmail, name } = user;
  cookies().delete("token")
  cookies().delete("userData")
  return NextResponse.json({ message:"logout successful" }, { status: 200 });
}
