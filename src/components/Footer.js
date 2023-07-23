import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const currentUrl = usePathname();
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto text-center text-gray-300">
        <p className="mb-4">
          Copyright &copy; 2023 All Rights Reserved by Shivam
        </p>
        <div className="flex flex-wrap justify-center">
          <Link
            className={
              currentUrl == "/terms"
                ? `mr-4 text-red-300  text-sm sm:text-base`
                : `mr-4 hover:text-gray-400 text-sm sm:text-base`
            }
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className={
              currentUrl == "/privacy"
                ? `mr-4 text-red-300  text-sm sm:text-base`
                : `mr-4 hover:text-gray-400 text-sm sm:text-base`
            }
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className={
              currentUrl == "/about"
                ? `mr-4 text-red-300  text-sm sm:text-base`
                : `mr-4 hover:text-gray-400 text-sm sm:text-base`
            }
            href="/about"
          >
            About Us
          </Link>
          <Link
            className={
              currentUrl == "/contactus"
                ? `mr-4 text-red-300  text-sm sm:text-base`
                : `mr-4 hover:text-gray-400 text-sm sm:text-base`
            }
            href="/contactus"
          >
            Contact Us
          </Link>
          <Link
            className={
              currentUrl == "/cancellationrefundpolicy"
                ? `mr-4 text-red-300  text-sm sm:text-base`
                : `mr-4 hover:text-gray-400 text-sm sm:text-base`
            }
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
