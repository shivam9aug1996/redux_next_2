"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }) {
  const currentUrl = usePathname()
  return (
    <div className="flex flex-col md:flex-row">
    <div className="bg-gray-100 p-5 flex md:flex-col">
        <Link  className={ currentUrl=="/account"?`mr-5 text-red-400 hover:text-red cursor-pointer`:`mr-5 text-black-300 hover:text-gray-600 cursor-pointer`} href={"/account"}>Profile Information</Link>
        <Link className={ currentUrl=="/account/address"?`mr-5 text-red-400 hover:text-red cursor-pointer`:`mr-5 text-black-300 hover:text-gray-600 cursor-pointer`} href={"/account/address"}>Manage Addresses</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
