import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import { verifyToken } from "@/app/utils/globalFunctions";

import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function GET(req, res) {
  await middleware(req);
  const searchKeyword = new URL(req.url).searchParams.get("search_keyword");
  // if (!searchKeyword) {
  //   return NextResponse.json({ error: "Search keyword is required" }, { status: 400 });
  // }
  try {
    // const authHeader = req.headers.get("authorization");
    // const token = authHeader && authHeader.split(" ")[1];
    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Verify the token and extract the user ID
  //  const userId = await verifyToken(token);

    let database = await connectDB();
    const productCollection = await database.collection("product_list");

    // Remove extra spaces between words and trim spaces from the beginning and end
    const cleanedSearchKeyword = searchKeyword
      ?.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      ?.trim();

    // Split the cleaned searchKeyword into individual keywords
    const keywords = cleanedSearchKeyword?.split(' ');

    // Create an array of regex patterns to match each keyword
    const regexPatterns = keywords?.map((keyword) => new RegExp(keyword, 'i'));

    // Create an aggregation pipeline to retrieve suggestions
    const aggregationPipeline = [
      {
        $match: {
          name: {
            $regex: regexPatterns?.[0], // Use the first regex pattern
          },
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
    ];

    let suggestions = await productCollection.aggregate(aggregationPipeline).toArray();

    // If there are suggestions, add a suggestion for the entire cleaned searchKeyword
    if (suggestions?.length > 0&&cleanedSearchKeyword!==suggestions?.[0]?.name&&cleanedSearchKeyword!=="") {
      suggestions = [{ name: cleanedSearchKeyword }, ...suggestions];
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
