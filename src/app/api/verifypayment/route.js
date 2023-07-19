import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";
import { encode } from "js-base64";
import fetch from "node-fetch";
import HmacSHA256 from "crypto-js/hmac-sha256";

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

    const items = await req.json();
    let data = items?.data;
    let generated_signature = HmacSHA256(
      data?.check_order_id + "|" + data?.razorpay_payment_id,
      "S3lhNB3lm6WnQIHmCY21IkCp"
    );
    console.log(
      "generated_signature",
      generated_signature,
      data?.razorpay_signature
    );
    if (generated_signature == data?.razorpay_signature) {
      return NextResponse.json(
        { message: "Payment successfull",verified:true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Try again",verified:false }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
