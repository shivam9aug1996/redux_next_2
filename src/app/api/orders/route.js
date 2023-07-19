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

   

    let database = await connectDB();
      // Get the latest order ID
      const latestOrder = await database
      .collection("orders")
      .findOne({}, { sort: { _id: -1 } });
 
    // Increment the order ID
    const orderId = latestOrder
      ? (parseInt(latestOrder.orderId.slice(-4)) + 1).toString().padStart(4, "0")
      : "0001";
 
     const order = {
       userId: userId,
       date: new Date(),
       items: orderItems,
       orderId: orderId,
     };
    const result = await database.collection("orders").insertOne(order);
    const cart = await database.collection("cart").find({ userId }).toArray();
    await database.collection('cart').updateOne(
      { userId: userId },
      { $set: { items: [] } }
    );
    return NextResponse.json({
      message: "Order created successfully",
      orderId: orderId,
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
    const orders = await database.collection("orders").find({ userId }).sort({ date: -1 }).toArray();
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
