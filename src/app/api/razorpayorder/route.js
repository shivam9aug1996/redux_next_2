import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";
import { encode } from "js-base64";
import fetch from "node-fetch";

export async function POST(req, res) {
  try {
    const authHeader = req.headers.get("authorization")
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
       return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const credentials = encode(
      "rzp_test_dM1SSeT8CDsvcj:S3lhNB3lm6WnQIHmCY21IkCp"
    );
    const items = await req.json();
    console.log(items)
    let res1 = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` ,'Content-Type': 'application/json',},
      body: JSON.stringify({
        amount: items?.amount,
        currency: "INR",
      }),
    });
    console.log(res1)
    res1 = await res1.json();
    console.log("hyt5",res1)
    if(res1?.id){
      return NextResponse.json({ res1 }, { status: 200 });
    }  else{
      return NextResponse.json({ res1 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
  
  
}
