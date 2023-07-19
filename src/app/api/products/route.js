import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";

export async function GET(req, res) {
  console.log("------>jhgf",res)
  // const headers = new Headers();
  // headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate');
 
  await middleware(req);
  let database = await connectDB();
  const collection = await database.collection("product_list");
  const productList = await collection.find({}).toArray();
  return setCustomHeader(NextResponse.json({ productList }, { status: 200 }),cacheHeader())
 // return NextResponse.json({ productList }, { status: 200 })
}

