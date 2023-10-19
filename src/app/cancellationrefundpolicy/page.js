// components/CancellationRefundPolicy.js
import React from "react";

const CancellationRefundPolicy = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 w-full">
      <div className="container mx-auto max-w-5xl">
        {/* <h1 className="text-4xl font-bold mb-6">Cancellation/Refund Policy</h1> */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Cancellation/Refund Policy</h1>
        <p className="mb-4">
          At FastBuy, we want to provide the best experience for our customers.
          If you wish to cancel or request a refund for a product or service,
          please read and follow our cancellation/refund policy below.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Cancellation Policy</h2>
        <p className="mb-4">
          If you wish to cancel a subscription or service, you can do so by
          logging into your account and navigating to the cancellation section.
          Please make sure to cancel before the next billing cycle to avoid
          further charges.
        </p>
        <p className="mb-4">
          In case of canceling a product or service that has already been
          shipped or delivered, please contact our customer support team
          immediately for assistance.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Refund Policy</h2>
        <p className="mb-4">
          Refunds will be provided for eligible products or services according
          to the following terms:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Refunds can only be requested within [number of days] days of
            purchase.
          </li>
          <li>
            Refunds will only be processed for products or services that meet
            the eligibility criteria.
          </li>
          <li>Shipping or delivery fees are non-refundable.</li>
          <li>Refunds will be processed using the original payment method.</li>
        </ul>
        <p>
          If you have any questions or need further assistance regarding our
          cancellation/refund policy, please contact our customer support team.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
