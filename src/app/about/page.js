// components/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-4">
          Welcome to FastBuy! We are a passionate team of developers
          dedicated to providing high-quality services and products to our
          users. Our mission is to create innovative solutions and make a
          positive impact on people's lives.
        </p>
        <p className="mb-4">
          Here at FastBuy, we strive to deliver exceptional user
          experiences, maintain data privacy and security, and provide reliable
          customer support. Our focus is on building a user-friendly platform
          that fulfills the needs of our valued customers.
        </p>
        <p className="mb-4">
          Our team works tirelessly to improve our services and features based
          on user feedback and emerging trends. We believe in transparency,
          integrity, and collaboration to achieve success in our journey.
        </p>
        <p>
          Thank you for choosing FastBuy. We are excited to have you
          on board and look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
