import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import { verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import middleware from "../../middleware";

import { checkAdminStatus, uploadImage } from "./global";

// export async function GET(req, res) {
//   // Extract pagination parameters from the query string
//   const pageSize = 5;
//   const page = new URL(req.url).searchParams.get("page");

//   // Ensure pagination parameters are integers
//   const pageNumber = parseInt(page);
//   const itemsPerPage = parseInt(pageSize);

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();

//   // Retrieve a subset of items from the collection based on pagination
//   const collection = await database.collection("product_list");
//   const productList = await collection
//     .find({})
//     .skip(skip)
//     .limit(itemsPerPage)
//     .sort({ date: -1 })
//     .toArray();

//   // Count the total number of items in the collection
//   const totalItems = await collection.countDocuments();

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }


export async function GET(req, res) {
  // Extract pagination, search, and category ID parameters from the query string
  const pageSize = 5;
  const page = parseInt(new URL(req.url).searchParams.get("page")) || 1;
  const searchKeyword = new URL(req.url).searchParams.get("search_keyword");
  const categoryId = new URL(req.url).searchParams.get("category_id");

  // Ensure pagination parameters are integers
  const pageNumber = Math.max(1, page); // Ensure page is not less than 1
  const itemsPerPage = parseInt(pageSize);

  // Calculate skip value based on pagination
  const skip = (pageNumber - 1) * itemsPerPage;

  // Call middleware (if necessary)
  await middleware(req);

  // Connect to the database
  let database = await connectDB();

  // Build a MongoDB query for the search
  const collection = await database.collection("product_list");

  let searchQuery = {};
  let cleanedSearchKeyword
  if(searchKeyword){
     cleanedSearchKeyword = searchKeyword
    ?.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    ?.trim();
  }
 

  // If searchKeyword is provided, perform a wildcard search for partial word matching
  if (cleanedSearchKeyword) {
    const searchWords = cleanedSearchKeyword.split(' ').map(word => `(?=.*${word})`).join('');
    const regex = new RegExp(searchWords, 'i');
  
    searchQuery.name = {
      $regex: regex,
    };
  }

  if (categoryId) {
    searchQuery.categoryId = new ObjectId(categoryId); // Replace 'categoryId' with the actual field name in your collection
  }

  // Sort the search results to prioritize exact matches, then starts with, and contains
  // const sortOrder = [
  //   { score: { $meta: "textScore" } }, // Sort by text score (for full-text search)
  // ];

  const sortOrder = cleanedSearchKeyword
    ? [{ score: { $meta: "textScore" } }] // Sort by text score (for full-text search)
    : [{ date: -1 }];

  // Retrieve a subset of items from the collection based on pagination and search
  const productList = await collection
    .find(searchQuery)
    .sort(sortOrder)
    .skip(skip)
    .limit(itemsPerPage)
    .toArray();

  // Count the total number of items in the search results
  const totalItems = await collection.countDocuments(searchQuery);

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







// export async function GET(req, res) {
//   // Extract pagination and search parameters from the query string
//   const pageSize = 5;
//   const page = parseInt(new URL(req.url).searchParams.get("page")) || 1;
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");
//   const categoryId = new URL(req.url).searchParams.get("category_id");


//   // Ensure pagination parameters are integers
//   const pageNumber = Math.max(1, page); // Ensure page is not less than 1
//   const itemsPerPage = parseInt(pageSize);

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();

//   // Build a MongoDB query for the search
//   const collection = await database.collection("product_list");

//   let searchQuery = {};

//   let cleanedSearchKeyword = searchKeyword
//   ?.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
//   ?.trim();

// // If searchKeyword is provided, perform a wildcard search for partial word matching
// if (cleanedSearchKeyword) {
//   console.log("kkkk")
//   const searchWords = cleanedSearchKeyword.split(' ').map(word => `(?=.*${word})`).join('');
//   const regex = new RegExp(searchWords, 'i');
  
//   searchQuery = {
//     name: {
//       $regex: regex,
//     },
//   };
// }

// if (categoryId) {
//   searchQuery.categoryId = new ObjectId(categoryId); // Replace 'categoryId' with the actual field name in your collection
// }
// console.log(searchQuery)

//   // Sort the search results to prioritize exact matches, then starts with, and contains
//   const sortOrder = [
//     { score: { $meta: "textScore" } }, // Sort by text score (for full-text search)
//   ];

//   // Retrieve a subset of items from the collection based on pagination and search
//   const productList = await collection
//     .find(searchQuery)
//     .sort(sortOrder)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .toArray();

//   // Count the total number of items in the search results
//   const totalItems = await collection.countDocuments(searchQuery);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }







// export async function GET(req, res) {
//   // Extract pagination and search parameters from the query string
//   const pageSize = 5;
//   const page = parseInt(new URL(req.url).searchParams.get("page")) || 1;
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

//   // Ensure pagination parameters are integers
//   const pageNumber = Math.max(1, page); // Ensure page is not less than 1
//   const itemsPerPage = parseInt(pageSize);

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();

//   // Build a MongoDB query for the search
//   const collection = await database.collection("product_list");

//   // Check if a custom text index exists on the 'name' field
 

//   // Perform the full-text search query with partial word matching
//   const searchQuery = {
//     $text: {
//       $search: searchKeyword,
//     },
//   };

//   // Sort the search results to prioritize exact matches, then starts with, and contains
//   const sortOrder = [
//     { score: { $meta: "textScore" } }, // Sort by text score (for full-text search)
//   ];

//   // Retrieve a subset of items from the collection based on pagination and search
//   const productList = await collection
//     .find(searchQuery)
//     .sort(sortOrder)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .toArray();

//   // Count the total number of items in the search results
//   const totalItems = await collection.countDocuments(searchQuery);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }







// export async function GET(req, res) {
//   // Extract pagination parameters from the query string
//   const pageSize = 5;
//   const page = new URL(req.url).searchParams.get("page");

//   // Ensure pagination parameters are integers
//   const pageNumber = parseInt(page);
//   const itemsPerPage = parseInt(pageSize);

//   // Extract the search keyword from the query string
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();
//   const collection = await database.collection("product_list");

//   // Define the query to retrieve a subset of items based on pagination
//   const query = {};

//   // Add search functionality if searchKeyword is provided
//   if (searchKeyword) {
//     const cleanedSearchKeyword = searchKeyword
//       .replace(/\s+/g, " ") // Replace multiple spaces with a single space
//       .trim();

//     // Split the cleaned searchKeyword into individual keywords
//     const keywords = cleanedSearchKeyword.split(" ");

//     // Create an array of regex patterns to match each keyword
//     const regexPatterns = keywords.map((keyword) => new RegExp(keyword, "i"));

//     // Create an array of $or conditions to match each keyword
//     const orConditions = regexPatterns.map((regex) => ({
//       name: { $regex: regex },
//     }));

//     // Use $or to search for products that match any of the keyword conditions
//     query.$or = orConditions;

//     console.log("o9876rdfghj", cleanedSearchKeyword);

//     const sortCriteria = [
//       { name: { $regex: `^${cleanedSearchKeyword}`, $options: "i" } }, // Starts with
//       { name: { $regex: cleanedSearchKeyword, $options: "i" } }, // Exact matches
//       { name: { $regex: cleanedSearchKeyword, $options: "i" } }, // Contains
//     ];
    
//     // Add the sorting criteria to the query
//     query.$or.unshift({ $or: sortCriteria });
//   }

//   // Retrieve a subset of items based on pagination and query
//   const productList = await collection
//     .find(query)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .sort({ date: -1 })
//     .toArray();

//   // Count the total number of items in the collection
//   const totalItems = await collection.countDocuments(query);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }

// export async function GET(req, res) {
//   // Extract pagination parameters from the query string
//   const pageSize = 5;
//   const page = new URL(req.url).searchParams.get("page");

//   // Ensure pagination parameters are integers
//   const pageNumber = parseInt(page);
//   const itemsPerPage = parseInt(pageSize);

//   // Extract the search keyword from the query string
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();
//   const collection = await database.collection("product_list");

//   // Define the query to retrieve a subset of items based on pagination
//   const query = {};

//   // Add search functionality if searchKeyword is provided
//   if (searchKeyword) {
//     const cleanedSearchKeyword = searchKeyword
//       .replace(/\s+/g, " ") // Replace multiple spaces with a single space
//       .trim();

//     // Split the cleaned searchKeyword into individual keywords
//     const keywords = cleanedSearchKeyword.split(" ");

//     // Create an array of regex patterns to match each keyword
//     const regexPatterns = keywords.map((keyword) => new RegExp(keyword, "i"));

//     // Create an array of $or conditions to match each keyword
//     const orConditions = regexPatterns.map((regex) => ({
//       name: { $regex: regex },
//     }));

//     // Use $or to search for products that match any of the keyword conditions
//     query.$or = orConditions;
//   }

//   // Retrieve a subset of items based on pagination and query
//   const productList = await collection
//     .find(query)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .sort({ date: -1 })
//     .toArray();

//   // Count the total number of items in the collection
//   const totalItems = await collection.countDocuments(query);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }

// export async function GET(req, res) {
//   // Extract pagination parameters from the query string
//   const pageSize = 5;
//   const page = new URL(req.url).searchParams.get("page");

//   // Ensure pagination parameters are integers
//   const pageNumber = parseInt(page);
//   const itemsPerPage = parseInt(pageSize);

//   // Extract the search keyword from the query string
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();
//   const collection = await database.collection("product_list");

//   // Define the query to retrieve a subset of items based on pagination
//   const query = {};

//   // Add search functionality if searchKeyword is provided
//   if (searchKeyword) {
//     const cleanedSearchKeyword = searchKeyword
//       .replace(/\s+/g, " ") // Replace multiple spaces with a single space
//       .trim();

//     // Split the cleaned searchKeyword into individual keywords
//     const keywords = cleanedSearchKeyword.split(" ");

//     // Create an array of regex patterns to match each keyword
//     const regexPatterns = keywords.map((keyword) => new RegExp(keyword, "i"));

//     // Create an array of $or conditions to match each keyword
//     const orConditions = regexPatterns.map((regex) => ({
//       name: { $regex: regex },
//     }));

//     // Use $or to search for products that match any of the keyword conditions
//     query.$or = orConditions;

//     // Add sorting criteria to boost results matching the search keyword
//     const sortCriteria = [
//       { name: { $regex: cleanedSearchKeyword, $options: "i" } }, // Exact matches
//       { name: { $regex: `^${cleanedSearchKeyword}`, $options: "i" } }, // Starts with
//       { name: { $regex: cleanedSearchKeyword, $options: "i" } }, // Contains
//     ];

//     // Add the sorting criteria to the query
//     query.$or.unshift({ $or: sortCriteria });
//   }

//   // Retrieve a subset of items based on pagination and query
//   const productList = await collection
//     .find(query)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .sort({ date: -1 })
//     .toArray();

//   // Count the total number of items in the collection
//   const totalItems = await collection.countDocuments(query);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }

// export async function GET(req, res) {
//   // Extract pagination parameters from the query string
//   const pageSize = 5;
//   const page = new URL(req.url).searchParams.get("page");

//   // Ensure pagination parameters are integers
//   const pageNumber = parseInt(page);
//   const itemsPerPage = parseInt(pageSize);

//   // Extract the search keyword from the query string
//   const searchKeyword = new URL(req.url).searchParams.get("search_keyword");

//   // Calculate skip value based on pagination
//   const skip = (pageNumber - 1) * itemsPerPage;

//   // Call middleware (if necessary)
//   await middleware(req);

//   // Connect to the database
//   let database = await connectDB();
//   const collection = await database.collection("product_list");

//   // Define the query to retrieve a subset of items based on pagination
//   const query = {};

//   // Add search functionality if searchKeyword is provided
//   if (searchKeyword) {
//     const cleanedSearchKeyword = searchKeyword
//       .replace(/\s+/g, " ") // Replace multiple spaces with a single space
//       .trim();

//     // Split the cleaned searchKeyword into individual keywords
//     const keywords = cleanedSearchKeyword.split(" ");

//     // Create an array of regex patterns to match each keyword
//     const regexPatterns = keywords.map((keyword) => new RegExp(keyword, "i"));

//     // Create an array of $or conditions to match each keyword
//     const orConditions = regexPatterns.map((regex) => ({
//       name: { $regex: regex },
//     }));

//     // Use $or to search for products that match any of the keyword conditions
//     query.$or = orConditions;

//     // Calculate relevance scores based on keyword matching
//     const relevanceScores = await Promise.all(
//       productList.map(async (product) => {
//         let relevanceScore = 0;

//         for (const keyword of keywords) {
//           const keywordRegex = new RegExp(keyword, "i");
//           if (keywordRegex.test(product.name)) {
//             // Increase the relevance score for each matching keyword
//             relevanceScore += 1;
//           }
//         }

//         return { product, relevanceScore };
//       })
//     );

//     // Sort the productList by relevance score in descending order
//     productList.sort((a, b) => b.relevanceScore - a.relevanceScore);
//   }

//   // Retrieve a subset of items based on pagination and query
//   const productList = await collection
//     .find(query)
//     .skip(skip)
//     .limit(itemsPerPage)
//     .sort({ date: -1 })
//     .toArray();

//   // Count the total number of items in the collection
//   const totalItems = await collection.countDocuments(query);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Return the paginated product list along with pagination metadata
//   return NextResponse.json(
//     {
//       productList,
//       pagination: {
//         currentPage: pageNumber,
//         itemsPerPage,
//         totalItems,
//         totalPages,
//       },
//     },
//     { status: 200 }
//   );
// }

export async function DELETE(req, res) {
  // Call middleware (if necessary)
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);

    const productId = new URL(req.url).searchParams.get("productId");

    // Connect to the database
    let database = await connectDB();

    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied: Only admins can delete categories" },
        { status: 403 }
      );
    }
    // Delete the product with the given ID from the collection
    const collection = await database.collection("product_list");
    const deletionResult = await collection.deleteOne({
      _id: new ObjectId(productId),
    });

    if (deletionResult.deletedCount === 1) {
      // Product was successfully deleted
      return NextResponse.json(
        {
          success: true,
          deletedCount: deletionResult.deletedCount,
          data: { _id: new ObjectId(productId) },
        },
        { status: 200 }
      );
    } else {
      // Product with the provided ID was not found
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    // Handle any errors that occurred during the deletion process
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  // Call middleware (if necessary)
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("hiiii");
    // Verify the token and extract the user ID
    const userId = await verifyToken(token);

    //  const { name, categoryId, price } = await req.json();
    const formData = await req?.formData(); // Parse the FormData object
    const productId = formData?.get("productId");
    const name = formData?.get("name");
    const categoryId = formData?.get("categoryId");
    const price = formData?.get("price");
    const imageFile = formData?.get("image"); // Get the uploaded image file

    let database = await connectDB();

    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied: Only admins can delete categories" },
        { status: 403 }
      );
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    // Create a new product document
    const productCollection = await database.collection("product_list");
    const product = {
      name,
      price,
      categoryId: new ObjectId(categoryId),
      date: new Date(),
      image: imageUrl,
      // Assuming categoryId is the ID of the selected category
      // other product properties
    };

    const insertionResult = await productCollection.insertOne(product);
    console.log("i76rdfghj", insertionResult);

    return NextResponse.json(
      {
        success: true,
        insertedCount: insertionResult.insertedCount,
        data: { ...product, _id: insertionResult.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req, res) {
  // Call middleware (if necessary)
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);
    //console.log("before",req)
    // try {
    //   const fghj = await req?.json();
    //   console.log("jhgfghj",fghj)
    // } catch (error) {
    //   console.log("jhgfghj error",error)
    // }
    //  console.log("nhgffghjkl",fghj)
    const formData = await req?.formData(); // Parse the FormData object

    const productId = formData?.get("productId");
    const name = formData?.get("name");
    const categoryId = formData?.get("categoryId");
    const price = formData?.get("price");
    const imageFile = formData?.get("image"); // Get the uploaded image file

    console.log("after", imageFile);
    let database = await connectDB();

    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied: Only admins can update products" },
        { status: 403 }
      );
    }
    //  console.log("jhtrew3456789ytfghjk",imageFile.buffer)

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const productCollection = await database.collection("product_list");
    const updatedProduct = {
      name,
      price,
      categoryId: new ObjectId(categoryId),
    };

    if (imageUrl) {
      updatedProduct.image = imageUrl;
    }

    const updateResult = await productCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedProduct }
    );

    // if (updateResult.modifiedCount === 1) {
    // Product was successfully updated
    return NextResponse.json(
      {
        success: true,
        modifiedCount: updateResult.modifiedCount,
        data: { ...updatedProduct, _id: new ObjectId(productId) },
      },
      { status: 200 }
    );
    // } else {
    //   // Product with the provided ID was not found
    //   return NextResponse.json({ error: "Product not found" }, { status: 404 });
    // }
  } catch (error) {
    // Handle any errors that occurred during the update process
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
