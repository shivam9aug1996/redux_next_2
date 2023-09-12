import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import {  verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { checkAdminStatus } from "../../products/global";

export async function POST(req, res) {
  await middleware(req);

  try {
  
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);
   

    const { categoryName } = await req.json(); // Extract category name from request body
    console.log("hi",categoryName)
    let database = await connectDB();
    const isAdmin = await checkAdminStatus(userId,database);

    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied: Only admins can delete categories" }, { status: 403 });
    }
    const collection = await database.collection("categories");

    const result = await collection.insertOne({ name: categoryName,date:new Date() });
    console.log(result);
    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
        data: { name: categoryName, _id: result.insertedId },
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

export async function GET(req, res) {
  await middleware(req);

  try {
    // const authHeader = req.headers.get("authorization");
    // const token = authHeader && authHeader.split(" ")[1];
    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Verify the token and extract the user ID
    //const userId = await verifyToken(token);
   


    let database = await connectDB();
    // const isAdmin = await checkAdminStatus(userId,database);

    // if (!isAdmin) {
    //   return NextResponse.json({ error: "Access denied: Only admins can delete categories" }, { status: 403 });
    // }
    const collection = await database.collection("categories");

    const categories = await collection.find().sort({ date: -1 }).toArray();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Assuming you have a PUT endpoint for updating a category
export async function PUT(req, res) {
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);
   

    const { categoryId, updatedCategoryName } = await req.json(); // Extract category ID and updated name from request body

    let database = await connectDB();
    const isAdmin = await checkAdminStatus(userId,database);

    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied: Only admins can delete categories" }, { status: 403 });
    }
    const collection = await database.collection("categories");

    const result = await collection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: { name: updatedCategoryName } }
    );

    return NextResponse.json(
      {
        success: true,
        modifiedCount: result.modifiedCount,
        data: { name: updatedCategoryName, _id: new ObjectId(categoryId) },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, res) {
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);
    

   
    const categoryId = new URL(req.url).searchParams.get("categoryId");

    let database = await connectDB();
    const isAdmin = await checkAdminStatus(userId,database);

    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied: Only admins can delete categories" }, { status: 403 });
    }
    const collection = await database.collection("categories");

    const result = await collection.deleteOne({
      _id: new ObjectId(categoryId),
    });

    return NextResponse.json(
      {
        success: true,
        deletedCount: result.deletedCount,
        data: { _id: new ObjectId(categoryId) },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}



