import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import middleware from "@/app/middleware";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await middleware(req);
  const productIdParam = new URL(req.url).searchParams.get("productId");
  console.log("8765rdfghj",productIdParam)
  if (!productIdParam) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }
  try {
    let database = await connectDB();
  const collection = await database.collection("product_list");
  
 

  const product = await collection.findOne({ _id: new ObjectId(productIdParam) });
console.log("kjytrtyuil",product)
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return setCustomHeader(
    NextResponse.json({ product }, { status: 200 }),
    cacheHeader()
  );

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
  
}