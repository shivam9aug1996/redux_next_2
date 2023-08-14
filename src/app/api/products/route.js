



import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";

export async function GET(req, res) {
  // Extract pagination parameters from the query string
  const pageSize=5
  const page = (new URL(req.url)).searchParams.get('page');

  // Ensure pagination parameters are integers
  const pageNumber = parseInt(page);
  const itemsPerPage = parseInt(pageSize);

  // Calculate skip value based on pagination
  const skip = (pageNumber - 1) * itemsPerPage;

  // Call middleware (if necessary)
  await middleware(req);

  // Connect to the database
  let database = await connectDB();

  // Retrieve a subset of items from the collection based on pagination
  const collection = await database.collection("product_list");
  const productList = await collection.find({})
    .skip(skip)
    .limit(itemsPerPage)
    .toArray();

  // Count the total number of items in the collection
  const totalItems = await collection.countDocuments();

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Return the paginated product list along with pagination metadata
  return NextResponse.json(
    {
      productList,
      pagination: {
        currentPage: pageNumber,
        itemsPerPage,
        totalItems,
        totalPages,
      },
    },
    { status: 200 }
  );
}
