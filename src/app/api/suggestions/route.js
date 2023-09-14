import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import { verifyToken } from "@/app/utils/globalFunctions";

import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";



export async function GET(req, res) {
  await middleware(req);
  const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

  try {
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
    const aggregationPipeline = [];

    // Stage 1: Text search using the $text operator
    if (cleanedSearchKeyword) {
      aggregationPipeline.push({
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: cleanedSearchKeyword,
            path: "name"
          }
        }
      });

     
    }

    // Stage 2: Limit the number of suggestions
    aggregationPipeline.push({
      $limit: 10, // You can adjust the limit as needed
    });

    // Stage 3: Project the desired fields
    aggregationPipeline.push({
      $project: {
        _id: 0,
        name: 1, // Include other fields as needed
      },
    });

    let suggestions = await productCollection.aggregate(aggregationPipeline).toArray();

    // If there are suggestions, add a suggestion for the entire cleaned searchKeyword
    if (suggestions?.length > 0 && cleanedSearchKeyword !== suggestions?.[0]?.name && cleanedSearchKeyword !== "") {
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

