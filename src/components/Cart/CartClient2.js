"use client"
import { useState } from "react";
import Image from "next/image";

const CartClient2 = () => {
  const [cartItems, setCartItems] = useState([ {
    product: {
      _id: "1",
      name: "Product 1",
      image: "/path/to/product1.jpg",
      price: 10.99,
    },
    quantity: 2,
  }, {
    product: {
      _id: "1",
      name: "Product 1",
      image: "/path/to/product1.jpg",
      price: 10.99,
    },
    quantity: 2,
  }]);

  // Function to update the quantity of an item in the cart
  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  // Function to remove an item from the cart
  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  // Function to calculate the total price of the cart
  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.product.price;
    });
    return total.toFixed(2);
  };

  return (
    <div className="flex flex-col">
      {cartItems.map((item, index) => (
        <div
          key={item.product._id}
          className="flex flex-col md:flex-row items-center mb-4"
        >
          <div className="border border-gray-300 rounded p-4 mb-4 md:mb-0 md:mr-4">
            <div className="image-container w-24 h-32 md:w-32 md:h-44">
              <Image
                src={item.product.image}
                alt={item.product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-1 items-center justify-between">
            <div className="md:mr-4">
              <p className="text-lg">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                ${item.product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center">
              <button
                className="text-sm border border-gray-300 rounded-md py-1 px-2 mr-2"
                onClick={() => updateQuantity(index, item.quantity - 1)}
              >
                -
              </button>
              <p className="text-lg">{item.quantity}</p>
              <button
                className="text-sm border border-gray-300 rounded-md py-1 px-2 ml-2"
                onClick={() => updateQuantity(index, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-lg ml-2">
            ${item.quantity * item.product.price.toFixed(2)}
          </div>
          <button
            className="text-sm border border-gray-300 rounded-md py-1 px-2 ml-2"
            onClick={() => removeItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-end mt-4">
          <p className="text-lg">
            Total: ${getTotalPrice()}
          </p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Checkout
          </button>
        </div>
      )}
      {cartItems.length === 0 && (
        <p className="text-lg mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartClient2;
