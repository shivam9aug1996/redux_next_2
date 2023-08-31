import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import { verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import middleware from "../../middleware";
import multer from "multer";
// import { cloudinary_js_config } from "@/app/utils/cloudinary";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";
import { uploadImage } from "./global";

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs/promises";

// cloudinary.config({
//   cloud_name: "dc2z2c3u8",
//   api_key: "828193955168214",
//   api_secret: "Ia_BQ8lpzOXbzzT71rLeJPB8z1U",
// });

cloudinary.config({
  cloud_name: "dc2z2c3u8",
  api_key: "828193955168214",
  api_secret: "Ia_BQ8lpzOXbzzT71rLeJPB8z1U",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req, res) {
  // Extract pagination parameters from the query string
  const pageSize = 5;
  const page = new URL(req.url).searchParams.get("page");

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
  const productList = await collection
    .find({})
    .skip(skip)
    .limit(itemsPerPage)
    .sort({ date: -1 })
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
      image:imageUrl
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

export const checkAdminStatus = async (userId, database) => {
  try {
    const collection = await database.collection("private_users");

    // Assuming your user document has an 'isAdmin' field
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    console.log("jhgre56789", user);
    if (user && user.isAdmin) {
      return true; // User is an admin
    } else {
      return false; // User is not an admin
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false; // Error occurred, treat user as non-admin
  }
};
