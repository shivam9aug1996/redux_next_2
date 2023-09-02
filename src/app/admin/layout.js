"use client";
import withMounted from "@/components/withMounted";
import Link from "next/link";
import { usePathname } from "next/navigation";
import withAdminAuth from "./withAdminAuth";

const AdminLayout = ({ children }) => {
  const currentUrl = usePathname();
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="bg-gray-100 p-5 flex md:flex-col">
        <Link
          className={
            currentUrl == "/admin"
              ? `mr-5 text-red-400 hover:text-red cursor-pointer`
              : `mr-5 text-black-300 hover:text-gray-600 cursor-pointer`
          }
          href={"/admin"}
        >
          Home
        </Link>
        <Link
          className={
            currentUrl == "/admin/categories"
              ? `mr-5 text-red-400 hover:text-red cursor-pointer`
              : `mr-5 text-black-300 hover:text-gray-600 cursor-pointer`
          }
          href={"/admin/categories"}
        >
          Categories
        </Link>
        <Link
          className={
            currentUrl == "/admin/products"
              ? `mr-5 text-red-400 hover:text-red cursor-pointer`
              : `mr-5 text-black-300 hover:text-gray-600 cursor-pointer`
          }
          href={"/admin/products"}
        >
          Products
        </Link>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default withAdminAuth(withMounted(AdminLayout));
