import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import middleware from "../../../middleware";

export async function PATCH(req, res) {
  // Apply middleware
  await middleware(req);

  try {
    // // Extract user ID from the request
    // const userIdParam = (new URL(req.url)).searchParams.get('userId');
    // if (!userIdParam) {
    //   return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    // }

    // Get user ID from token
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await verifyToken(token);

    // Ensure the requesting user matches the user being updated
    // if (userId !== userIdParam) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Extract updated profile data from the request body
    const { name, modifiedAddresses, newAddress, addressToDeleteId } =
      await req.json();
    console.log("7654edfghjuytrdvb", addressToDeleteId);
    // Update the user's profile in the database
    const database = await connectDB();
    let result
    if (name) {
       result = await database
        .collection("private_users")
        .updateOne({ _id: new ObjectId(userId) }, { $set: { name: name } });
      
    }

    if (modifiedAddresses) {

        result=await database.collection("private_users").updateOne(
          { _id: new ObjectId(userId), "addresses.addressId": new ObjectId(modifiedAddresses.addressId) },
          { $set: { "addresses.$": modifiedAddresses } }
        );
      
    }

    if (newAddress) {
      newAddress.addressId = new ObjectId(); 
     result= await database.collection("private_users").updateOne(
        { _id: new ObjectId(userId) },
        { $push: { addresses: newAddress } }
      );
    }

    if (addressToDeleteId) {
     result= await database.collection("private_users").updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { addresses: { addressId: new ObjectId(addressToDeleteId) } } }
      );
    }
    console.log("Update Result:", result);
    if(result){
      return NextResponse.json(
        { message: "Profile updated successfully",addressId:newAddress?.addressId },
        { status: 200 }
      );
    }else{
      return NextResponse.json(
        { message: "Cannot perform this operation." },
        { status: 404 }
      );
    }
   
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
