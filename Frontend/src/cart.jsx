import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/Actions/cartActions";
import { FaShoppingCart } from "react-icons/fa";
import OrderConfirmationModal from "./components/confirmOrderModal";

const CartPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const [filteredProducts, setFilteredProducts] = useState(cart);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleOnOrder = () => {
    setIsModalVisible(true);
  }

  const savedAddresses = [
    "123 Main St, City, PIN 123456",
    "456 Elm St, City, PIN 654321",
  ];

  const handleConfirmOrder = (orderDetails) => {
    console.log("Order Confirmed:", orderDetails);
    setIsModalVisible(false);
  };


  // const viewDetails = (id) => {
  //   navigate(`/products/${id}`);
  // };

  useEffect(() => {
    user?.id && dispatch(fetchCart(user?.id));
  }, [user, dispatch]);

  useEffect(() => {
    setFilteredProducts(cart);
  }, [cart]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
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
      </div>

      <div className="flex items-center justify-between gap-20">
        {/* Product Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-2 w-[50%] gap-12 max-h-[500px] overflow-y-scroll scrollbar-hide`}
        >
          {filteredProducts?.map((item) => (
            <ProductCard item={item?.product} pageType={"cartPage"} />
          ))}
        </div>

        <div className="self-center w-[50%] h-full align-center flex flex-col p-4 bg-white shadow-lg rounded-md sticky top-15">
          <h1 className="font-bold text-2xl mb-4">Total Summary</h1>
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-2">Products:</h2>
            <ul className="list-disc pl-6">
              {filteredProducts?.map((item, index) => (
                <li key={index} className="text-gray-700 list-none">
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
              ?.reduce(
                (acc, item) =>
                  acc + (item?.product?.price || 0) * (item?.quantity || 1),
                0
              )
              .toFixed(2)}
          </h2>

          <h2 className="text-md font-semibold text-gray-700 mb-2">
            Taxes (18%): ₹
            {(
              filteredProducts?.reduce(
                (acc, item) =>
                  acc + (item?.product?.price || 0) * (item?.quantity || 1),
                0
              ) * 0.18
            ).toFixed(2)}
          </h2>

          <h2 className="text-lg font-bold text-gray-800 mt-4">
            Final Amount: ₹
            {(
              filteredProducts?.reduce(
                (acc, item) =>
                  acc + (item?.product?.price || 0) * (item?.quantity || 1),
                0
              ) * 1.18
            ).toFixed(2)}
          </h2>
          <div className="self-center">
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
              onClick={handleOnOrder}
            >
              <FaShoppingCart className="mr-2" /> Place Order
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
      />
    </div>
    </div>
  );
};

export default CartPage;
