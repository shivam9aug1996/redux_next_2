import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import { verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { checkAdminStatus, uploadImage } from "../../products/global";

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

    const formData = await req?.formData(); // Parse the FormData object
    const categoryName = formData?.get("categoryName");

    const imageFile = formData?.get("image"); // Get the uploaded image file

    console.log("hi", categoryName);
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

    const collection = await database.collection("categories");

    const result = await collection.insertOne({
      name: categoryName,
      date: new Date(),
      image: imageUrl,
    });
    console.log(result);
    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
        data: { name: categoryName, _id: result.insertedId, image: imageUrl },
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

    const formData = await req?.formData(); // Parse the FormData object
    const updatedCategoryName = formData?.get("updatedCategoryName");
    const categoryId = formData?.get("categoryId");

    const imageFile = formData?.get("image"); // Get the uploaded image file

    let database = await connectDB();
    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied: Only admins can delete categories" },
        { status: 403 }
      );
    }
    const collection = await database.collection("categories");

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    let updateData = { name: updatedCategoryName };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: updateData }
    );

    return NextResponse.json(
      {
        success: true,
        modifiedCount: result.modifiedCount,
        data: { ...updateData, _id: new ObjectId(categoryId) },
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
    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied: Only admins can delete categories" },
        { status: 403 }
      );
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
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
