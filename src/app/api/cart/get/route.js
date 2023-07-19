import { connectDB } from "@/app/lib/connectDataBase";
import { cacheHeader, setCustomHeader } from "@/app/lib/serverFunctions";
import { verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";
import middleware from "../../../middleware";



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
    const cart = await database.collection("cart").find({ userId }).toArray();
    console.log("jhtre348io",cart)
    if (cart?.length>0) {
      console.log("cart876556789", cart[0]?.items);
      // Fetch the product details for items in the cart
      const productCollection = database.collection("product_list");
      console.log("productCollection", productCollection);
      const itemIds = cart[0].items.map((item) => new ObjectId(item.productId));
      console.log("itemIds", itemIds);
      const products = await productCollection
        .find({
          _id: {
            $in: itemIds
          },
        })
        .toArray();

      console.log("products", products);
      // Merge the product details with the cart items
      const cartItems = cart[0].items.map((item) => {
        const product = products.find((p) =>{
          console.log(p._id?.toString(),item.productId)
         return p._id?.toString() === item.productId
        });
        return { ...item, product };
      });
      return NextResponse.json({ cart: cartItems }, { status: 200 });
    // return setCustomHeader(NextResponse.json({ cart: cartItems }, { status: 200 }),cacheHeader())
    } else {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    // console.log(cart);
    // return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
