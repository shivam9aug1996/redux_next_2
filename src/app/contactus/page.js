// components/ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p>
          If you have any questions, feedback, or need assistance, feel free to reach out to us using the contact information below. We'll be happy to assist you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>Email: <a href="mailto:info@example.com" className="text-blue-500">shivam9aug1996.com</a></p>
            <p>Phone: +91 9634396572</p>
            <p>Address: 942, Krishan Ganj, Pilkhuwa, Hapur</p>
          </div>
          {/* Additional contact details */}
         
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
