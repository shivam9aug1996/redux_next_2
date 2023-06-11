import { connectDB } from "@/app/lib/connectDataBase";
import { NextResponse } from "next/server";
import users from "../../../users.json";
import middleware from "../../middleware";

export async function GET(req, res) {
  await middleware(req);
  let database = await connectDB();
  const collection = await database.collection("users");
  const users1 = await collection.find({}).toArray();
  const data = users1;
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req, res) {
  await middleware(req);
  const { name } = await req.json();
  let database = await connectDB();
  const collection = await database.collection("users");
  const result = await collection.insertOne({ name });
  const users1 = await collection.find({}).toArray();
  const data = users1;
  return NextResponse.json({ data }, { status: 201 });
}
