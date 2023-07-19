import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header";
import HeaderWrapper from "@/components/HeaderWrapper";
import { cookies } from "next/headers";

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
