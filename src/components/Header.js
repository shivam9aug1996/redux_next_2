"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const token = useSelector((state) => state?.auth?.token);
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            className="font-bold text-white tracking-wide cursor-pointer"
            href="/"
          >
            My Website
          </Link>
        </div>
        {!token ? (
          <div>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="text-gray-300 hover:text-white cursor-pointer"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/"
            >
              Welcome
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
