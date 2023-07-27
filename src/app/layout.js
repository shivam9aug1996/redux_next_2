import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header";
import HeaderWrapper from "@/components/HeaderWrapper";
import { cookies } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FastBuy",
  description: "FastBuy",
};

export default function RootLayout({ children }) {
  // const token = cookies()?.get('token')?.value
  // let userData = cookies()?.get('userData')?.value
  // if(userData){
  //   userData=JSON.parse(userData)
  // }

  return (
    <html lang="en">
      {/* <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LcvnkknAAAAAJCZx5y3ygQwx3DNzB1y4m93U9ta" /> */}
      <head>
        {/* <script src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.reCAPTCHA_site_key}`}></script> */}
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
