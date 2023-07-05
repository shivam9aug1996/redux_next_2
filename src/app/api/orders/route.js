import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";

export async function POST(req, res) {
  await middleware(req);
  const userIdParam = (new URL(req.url)).searchParams.get('userId');
  if (!userIdParam) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
       return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the token and extract the user ID
    const userId =  await verifyToken(token);

    const items = await req.json();

    const orderItems = items?.map(({ name, price, quantity, productId }) => ({
      name,
      price: parseFloat(price || 0),
      quantity: parseInt(quantity || 1),
      productId,
    }));
    const order = {
      userId: userId,
      date: new Date(),
      items: orderItems,
    };

    let database = await connectDB();
    const result = await database.collection("orders").insertOne(order);
    const cart = await database.collection("cart").find({ userId }).toArray();
    await database.collection('cart').updateOne(
      { userId: userId },
      { $set: { items: [] } }
    );
    return NextResponse.json({
      message: "Order created successfully",
      orderId: result.insertedId,
    },{ status: 201 });
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
  const userIdParam = (new URL(req.url)).searchParams.get('userId');
  if (!userIdParam) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
       return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the token and extract the user ID
    const userId =  await verifyToken(token);

    // const items = await req.json();

  
    
    let database = await connectDB();
    const orders = await database.collection("orders").find({ userId }).toArray();
    console.log(orders)
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
