import React from 'react';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'product1.jpg',
    price: 10.99
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'product2.jpg',
    price: 19.99
  },
  // Add more products here
];

const ProductList = () => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {products.map(product => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="border border-gray-300 rounded p-4">
            <img src={product.image} alt={product.name} className="w-full mb-2" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
