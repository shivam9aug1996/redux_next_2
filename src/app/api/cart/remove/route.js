import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { json } from "express";
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

    const item = await req.json();

    // const cartItem = {
    //   name: item?.name || "",
    //   price: parseFloat(items?.price || 0),
    //   // quantity: parseInt(quantity || 1),
    //   productId: item?.productId,
    // };
   
    console.log("jhgr678o", item);
    let productId = item?.productId;
    let database = await connectDB();
    const cart = database.collection("cart");

    const existingCart = await cart.findOne({ userId });

    if (existingCart) {
      // Check if the item exists in the user's cart
      const existingItem = existingCart.items.find(item => item.productId === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If the item exists and the quantity is more than 1, decrease its quantity
          existingItem.quantity -= 1;
        } else {
          // If the item exists and the quantity is 1, remove it from the user's cart
          existingCart.items = existingCart.items.filter(item => item.productId !== productId);
        }

        // Update the user's cart
        await cart.updateOne({ _id: existingCart._id }, { $set: { items: existingCart.items } });
      }
    }


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

export async function GET(req, res) {
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

    // const items = await req.json();

    // const orderItems = items?.map(({ name, price, quantity, productId }) => ({
    //   name,
    //   price: parseFloat(price || 0),
    //   quantity: parseInt(quantity || 1),
    //   productId,
    // }));
    // const order = {
    //   userId: parseInt(userId),
    //   date: new Date(),
    //   items: orderItems,
    // };

    let database = await connectDB();
    const orders = await database.collection("cart").find({ userId }).toArray();
    console.log(orders);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
