// components/TermsOfService.js
import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p>
          Welcome to FastBuy! These Terms of Service govern your use of our
          website and its services. By accessing or using our website, you agree
          to be bound by these terms. If you do not agree with any part of these
          terms, please refrain from using our website.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">1. User Accounts:</h2>
        <ul className="list-disc pl-8 mb-4">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You are responsible for all activities that occur under your
            account.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Privacy:</h2>
        <p>
          We collect and store user information, including name and email, to
          provide our services. Please review our Privacy Policy to understand
          how we handle and protect your data.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          3. Payment and Subscription:
        </h2>
        <p>
          Payments are processed securely through our payment gateway provider,
          Razorpay.
        </p>
        {/* Add more sections as needed */}
        <p className="mt-8">
          By using our website, you acknowledge that you have read and
          understood these Terms of Service and agree to comply with them. If
          you do not agree with any part of these terms, please do not use our
          website.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          4. Content and Intellectual Property:
        </h2>
        <p>You retain ownership of the content you submit to our website.</p>
        {/* Add more sections as needed */}
        <p className="mt-8">
          By submitting content, you grant us a non-exclusive, worldwide,
          royalty-free license to use, reproduce, modify, and distribute your
          content.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          5. Termination
        </h2>
        <p>We may terminate or suspend your account without notice if you violate these terms.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          5. Changes to Terms:
        </h2>
        <p>We may update these Terms of Service from time to time, and the latest version will be posted on our website.</p>
        <p className="mt-8">
          By using our website, you acknowledge that you have read and understood these Terms of Service and agree to comply with them. If you do not agree with any part of these terms, please do not use our website.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
