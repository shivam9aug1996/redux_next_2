import { connectDB } from "@/app/lib/connectDataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const saltRounds = 10;

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { name, email, password,isAdmin } = await req.json();
  console.log(name, email, password);
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing name, email, or password" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const db = await connectDB();
  const existingUser = await db.collection("private_users").findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 403 }
    );
  }
  const results = await db.collection("private_users").insertOne({
    name,
    email,
    password: hashedPassword,
    addresses:[],
  });

  const token = jwt.sign({ id: results.insertedId }, "secretkey");
  cookies().set('token', token)
  cookies().set('userData', JSON.stringify({ token, name, email,id:results.insertedId,addresses:[] }))
  return NextResponse.json({ token, name, email,id:results.insertedId,addresses:[] }, { status: 201 });
}
