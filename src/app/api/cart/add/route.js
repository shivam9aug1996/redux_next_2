import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";

import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
import middleware from "../../../middleware";

export async function POST(req, res) {
  await middleware(req);
  const userIdParam = new URL(req.url).searchParams.get("userId");
  if (!userIdParam) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const userId = await verifyToken(token);

    const item = await req.json()

   
    console.log("jhgr678o", item);
    let productId = item?.productId;
    let database = await connectDB();
    const cart = database.collection("cart");

    const existingCart = await cart.findOne({ userId });
    let result;
    if (existingCart) {
      // Check if the item already exists in the user's cart
      const existingItem = existingCart.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the user's cart
        existingCart.items.push({ productId, quantity: 1 });
      }

      // Update the user's cart
      result = await cart.updateOne(
        { _id: existingCart._id },
        { $set: { items: existingCart.items } }
      );
    } else {
      // If the user's cart does not exist, create a new cart
      
      result = await cart.insertOne({
        userId,
        items: [{ productId, quantity: 1 }],
      });
     
    }
    const productCollection = database.collection("product_list");
   
    const product = await productCollection
    .findOne({ _id:new ObjectId(productId) })
console.log("result67890-",product,productId)
    // const existingItem = await cart.findOne({ productId });
    // if (existingItem) {
    //   // If the item already exists, increase its quantity
    //   await cart.updateOne({ _id: existingItem._id }, { $inc: { quantity: 1 } });
    // } else {
    //   // If the item does not exist, add it to the cart
    //   await cart.insertOne({userId,{item} });
    // }

    // const result = await database.collection("cart").insertOne(itemAdded);
   
      
      
    return NextResponse.json(
      {
        message: "Product add to cart successfully",
        id: existingCart ? existingCart._id : result.insertedId?.toString(),
        action: existingCart ? "updated" : "added",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

