import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { clearCartAsync, fetchCart } from "./redux/Actions/cartActions";
import { FaShoppingCart } from "react-icons/fa";
import OrderConfirmationModal from "./components/confirmOrderModal";
import { userId } from "./utils/cookies";
const CartPage = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const [filteredProducts, setFilteredProducts] = useState(cart || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleOnOrder = () => {
    setIsModalVisible(true);
  };

  const savedAddresses = [
    "123 Main St, City, PIN 123456",
    "456 Elm St, City, PIN 654321",
  ];

  const handleConfirmOrder = (orderDetails) => {
    console.log("Order Confirmed: your order  number is ", "#" + orderDetails);
    setIsModalVisible(false);
  };

  const handleClearCart = async (userId) => {
    const clearCart = await dispatch(clearCartAsync(userId));
    if (clearCart) fetchCart(userId);
  };

  // const viewDetails = (id) => {
  //   navigate(`/products/${id}`);
  // };

  useEffect(() => {
    userId && dispatch(fetchCart(userId));
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(cart);
  }, [cart]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        In-Cart Products Checkout Page
      </h1>
      {/* <div className="mb-4">
        <h1 className="font-bold text-xl mb-3">Search From Cart</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div> */}

      <div className="flex items-center justify-between gap-20">
        {/* Product Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-2 w-[50%] gap-12 max-h-[500px] ${
            filteredProducts.length > 4
              ? "overflow-y-scroll"
              : "overflow-y-auto"
          } scrollbar-hide`}
        >
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard
                item={item?.product}
                pageType={"cartPage"}
                key={item?.product?.id || Math.random()}
              />
            ))
          ) : (
            <div className="text-gray-500 text-lg col-span-full">
              No products in your cart.
            </div>
          )}
        </div>

        <div className="self-center w-[50%] h-full align-center flex flex-col p-4 bg-white shadow-lg rounded-md sticky top-15">
          <h1 className="font-bold text-2xl mb-4">Total Summary</h1>

          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">Products:</h2>
                <ul
                  className={`list-none pl-6 max-h-[200px] overflow-auto ${
                    filteredProducts.length > 3
                      ? "overflow-y-scroll"
                      : "overflow-y-auto"
                  }`}
                >
                  {filteredProducts.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item?.product?.name || "Unnamed Product"} - ₹
                      {(item?.product?.price || 0).toFixed(2)} x{" "}
                      {item?.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-md font-semibold text-gray-700 mb-2">
                Subtotal: ₹
                {filteredProducts
                  .reduce(
                    (acc, item) =>
                      acc + (item?.product?.price || 0) * (item?.quantity || 1),
                    0
                  )
                  .toFixed(2)}
              </h2>

              <h2 className="text-md font-semibold text-gray-700 mb-2">
                Taxes (18%): ₹
                {(
                  filteredProducts.reduce(
                    (acc, item) =>
                      acc + (item?.product?.price || 0) * (item?.quantity || 1),
                    0
                  ) * 0.18
                ).toFixed(2)}
              </h2>

              <h2 className="text-lg font-bold text-gray-800 mt-4">
                Final Amount: ₹
                {(
                  filteredProducts.reduce(
                    (acc, item) =>
                      acc + (item?.product?.price || 0) * (item?.quantity || 1),
                    0
                  ) * 1.18
                ).toFixed(2)}
              </h2>

              <div className="self-center">
                <button
                  className={`mt-4 px-4 py-2 text-lg rounded-md flex items-center transition-colors duration-300 ${
                    filteredProducts?.length === 0
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  onClick={handleOnOrder}
                  disabled={filteredProducts.length === 0}
                >
                  <FaShoppingCart className="mr-2" /> Place Order
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-4">
              Your cart is empty. Add some products to view the summary.
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={() => dispatch(clearCartAsync(user?.id))}
              disabled={
                !Array.isArray(filteredProducts) ||
                filteredProducts.length === 0
              }
              className={`px-4 py-2 text-lg rounded-md transition-colors duration-300 ${
                !Array.isArray(filteredProducts) ||
                filteredProducts.length === 0
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div>
        <OrderConfirmationModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          savedAddresses={savedAddresses}
          onConfirm={handleConfirmOrder}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default CartPage;
