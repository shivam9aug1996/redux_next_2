import { connectDB } from "@/app/lib/connectDataBase";
import { NextResponse } from "next/server";
import middleware from "../../middleware";

export async function GET(req, res) {
  await middleware(req);
  let database = await connectDB();
  const collection = await database.collection("product_list");
  const productList = await collection.find({}).toArray();
  return NextResponse.json({ productList }, { status: 200 });
}
