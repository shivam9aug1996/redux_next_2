import { connectDB } from "@/app/lib/connectDataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Missing email, or password" },
      { status: 400 }
    );
  }

  const db = await connectDB();

  const user = await db.collection("private_users").findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = jwt.sign({ id: user._id }, "secretkey");
  const { email: userEmail, name,addresses } = user;
  cookies().set('token', token)
  cookies().set('userData', JSON.stringify({ token, email: userEmail, name,id:user._id,addresses }))
  return NextResponse.json({ token, email: userEmail, name,id:user._id,addresses }, { status: 200 });
}
