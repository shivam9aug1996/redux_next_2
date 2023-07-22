import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto text-center text-gray-300">
        <p className="mb-4">
          Copyright &copy; 2023 All Rights Reserved by Shivam
        </p>
        <div className="flex flex-wrap justify-center">
          <Link
            className="mr-4 hover:text-gray-400 text-sm sm:text-base"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="mr-4 hover:text-gray-400 text-sm sm:text-base"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="mr-4 hover:text-gray-400 text-sm sm:text-base"
            href="/about"
          >
            About Us
          </Link>
          <Link
            className="mr-4 hover:text-gray-400 text-sm sm:text-base"
            href="/contactus"
          >
            Contact Us
          </Link>
          <Link
            className="mr-4 hover:text-gray-400 text-sm sm:text-base"
            href="/cancellationrefundpolicy"
          >
            Return Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
