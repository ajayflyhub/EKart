import React from "react";

const CartPage = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 100, quantity: 2 },
    { id: 2, name: "Product 2", price: 50, quantity: 1 },
  ];

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-md shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">
                Total: ${item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Grand Total: ${calculateTotal()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
