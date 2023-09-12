import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import { verifyToken } from "@/app/utils/globalFunctions";

import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";


export async function GET(req, res) {
  await middleware(req);
  const searchKeyword = new URL(req.url).searchParams.get("search_keyword");
  if (!searchKeyword) {
    return NextResponse.json({ error: "Search keyword is required" }, { status: 400 });
  }
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);

   

   

   
    let database = await connectDB();
    const productCollection = await database.collection("product_list");

   // Split the searchKeyword by spaces and trim each word
const trimmedKeywords = searchKeyword
.split(/\s+/)
.map((word) => word.trim())
.join(".*");

// Create a regex pattern for the search
const regexSearchKeyword = `.*${trimmedKeywords}.*`;

let suggestions = await productCollection
.aggregate([
  {
    $match: {
      name: { $regex: regexSearchKeyword, $options: 'i' },
    },
  },
  {
    $limit: 10,
  },
  {
    $project: {
      _id: 0,
      name: 1, // Include other fields as needed
    },
  },
])
.toArray();
    if(suggestions?.length>1){
      suggestions=[{name:trimmedKeywords},...suggestions]
    }


      
    return NextResponse.json(
      {
        data: suggestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

