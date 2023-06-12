import { connectDB } from "@/app/lib/connectDataBase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const saltRounds = 10;

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { name, email, password } = await req.json();
  console.log(name, email, password);
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing name, email, or password" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const db = await connectDB();

  const results = await db.collection("private_users").insertOne({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: results.insertedId }, "secretkey");
  return NextResponse.json({ token }, { status: 201 });
}
