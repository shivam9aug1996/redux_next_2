import React from 'react'

const DemoCreditCard = () => {
  return (
    <>
       <p className="text-sm text-gray-500 mb-6">
          <em>
            If you select "Live Mode," a nominal amount of Rs 2 will be deducted
            to validate the payment process. This ensures a smooth and secure
            transaction. You can also leave it unchecked to use the credit card
            details provided below for demo purposes without any actual
            deduction.
          </em>
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 w-72">
          <div className="flex justify-between mb-4"></div>
          <div className="text-2xl mb-4">4111 1111 1111 1111</div>
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">Cardholder Name</div>
            <div className="text-sm text-gray-500">Valid Thru</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>John Doe</div>
            <div className="text-sm">08/25</div>
          </div>
          <div className="mb-6"></div>
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">CVV</div>
            <div className="text-sm text-gray-500">OTP</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>123</div>
            <div className="text-sm">12345</div>
          </div>
        </div>
      
    </>
  )
}

export default DemoCreditCard