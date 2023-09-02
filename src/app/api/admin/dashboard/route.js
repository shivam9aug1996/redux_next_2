import { connectDB } from "@/app/lib/connectDataBase";
import middleware from "@/app/middleware";
import {  verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { checkAdminStatus } from "../../products/global";

export async function GET(req, res) {
  await middleware(req);

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);

    let database = await connectDB();
    const isAdmin = await checkAdminStatus(userId, database);

    if (!isAdmin) {
      return NextResponse.json({ error: "Access denied: Only admins has access" }, { status: 403 });
    }

    const productCollection = await database.collection("product_list");
    const categoryCollection = await database.collection("categories");
    const userCollection = await database.collection("private_users");
    const ordersCollection = await database.collection("orders");

    const productCount = await productCollection.countDocuments();
    const categoryCount = await categoryCollection.countDocuments();
    const usersCount = await userCollection.countDocuments();
    const ordersCount = await ordersCollection.countDocuments();

    const responseData = {
      productCount,
      categoryCount,
      usersCount,
      ordersCount
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
