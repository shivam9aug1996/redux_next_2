import { connectDB } from "@/app/lib/connectDataBase";
import { verifyToken } from "@/app/utils/globalFunctions";
import { NextResponse } from "next/server";
import middleware from "../../middleware";
const Pusher = require("pusher");


export async function POST(req, res) {
  await middleware(req);
  console.log("87654567898rdfvghj")
  const formData = await req?.formData(); // Parse the FormData object
  const socket_id = formData?.get("socket_id");
  const channel_name = formData?.get("channel_name");
 // const { socket_id, channel_name } = await req.json()
  try {
   
    console.log(socket_id,channel_name)
    
    const pusher = new Pusher({
      appId: "1663650",
      key: "037b0dc3c53577544e54",
      secret: "b395eedaa7de68b8bd67",
      cluster: "ap2",
    });
    const auth = pusher.authenticate(socket_id, channel_name);


   
    return NextResponse.json({
      auth:auth.auth
    },{ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
