import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { recaptchaResponse, action } = await req.json();
  if (!recaptchaResponse) {
    return NextResponse.json(
      { message: "Missing recaptchaResponse" },
      { status: 400 }
    );
  }
  if (!action) {
    return NextResponse.json(
      { message: "Missing Action" },
      { status: 400 }
    );
  }

  //console.log("recaptchaResponse", recaptchaResponse);
  const apiKey = process.env.reCAPTCHA_site_key
  if(process.env.NODE_ENV=="development"){
    return NextResponse.json({ success: true, score:1 }, { status: 200 });
  }

  try {
    const verificationResponse = await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/assessments?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        event: {
          token: recaptchaResponse,
          siteKey: process.env.reCAPTCHA_site_key,
          expectedAction: action,
        },
      }
    );
console.log(verificationResponse)
    const scoreThreshold = 0.5;
    let data = verificationResponse?.data;
    let tokenProperties = data?.tokenProperties;
    let riskAnalysis = data?.riskAnalysis;
    if (
      tokenProperties?.valid &&
      riskAnalysis?.score >= scoreThreshold &&
      action == tokenProperties?.action
    ) {
      // reCAPTCHA response is valid
      return NextResponse.json({ success: true, score:riskAnalysis?.score }, { status: 200 });
    } else {
      // reCAPTCHA response is invalid or below the threshold
      return NextResponse.json(
        { error: "Oops! We couldn't verify your reCAPTCHA response. Please try again." },
        { status: 400 }
      );
      //NextResponse.json({ error: "Oops! We couldn't verify your reCAPTCHA response. Please try again." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling Google sign-in:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
