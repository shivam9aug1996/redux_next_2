// components/TermsOfService.js
import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p>
        FastBuy (referred to as "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website.

        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect:</h2>
        <ul className="list-disc pl-8 mb-4">
          <li>
          When you create an account, we collect your name, email address, and password to provide our services.
          </li>
          <li>
          When you make a payment, our payment gateway provider, Razorpay, collects your payment information securely.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information:</h2>
        <p>
        We use your information to provide our services, process payments, and communicate with you.
        </p>
        <p className="mt-8">
        We may use your email address to send you important updates, promotions, or newsletters. You can opt-out of these communications.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          3. Data Security:
        </h2>
        <p>
        We implement security measures to protect your data from unauthorized access, alteration, or disclosure.
        </p>
        {/* Add more sections as needed */}
        <p className="mt-8">
        We use industry-standard encryption to secure data transmitted to and from our website.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          4. Cookies and Tracking Technologies:
        </h2>
        <p>We use cookies and similar technologies to enhance your website experience and analyze user behavior.</p>
        {/* Add more sections as needed */}
        <p className="mt-8">
        You can modify your browser settings to manage or block cookies.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          5. Third-Party Services:
        </h2>
        <p>We may use third-party services to provide specific functions on our website, such as payment processing. These providers have their own privacy policies.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          6. Changes to Privacy Policy:
        </h2>
        <p>We may update this Privacy Policy from time to time, and the latest version will be posted on our website.</p>
        <p className="mt-8">
        By using our website, you consent to the terms of this Privacy Policy and agree to the collection and use of your information as described herein. If you do not agree with this Privacy Policy, please refrain from using our website.

        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
