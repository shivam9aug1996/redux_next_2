import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header";
import HeaderWrapper from "@/components/HeaderWrapper";
import { cookies } from "next/headers";
import Script from "next/script";
import NextTopLoader from 'nextjs-toploader';



const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "FastBuy",
//   description: "FastBuy",
// };

export default function RootLayout({ children }) {
  // const token = cookies()?.get('token')?.value
  // let userData = cookies()?.get('userData')?.value
  // if(userData){
  //   userData=JSON.parse(userData)
  // }

  return (
    <html lang="en">
      <head>
      {/* <script src="https://js.pusher.com/8.0.1/pusher.min.js"></script> */}
      <script type="text/javascript" src="/ev.js"></script>
  

      </head>
      <body className={inter.className}>
      <NextTopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
