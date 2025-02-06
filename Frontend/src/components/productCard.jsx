import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  fetchCart,
  removeFromCartAsync,
  updateCartAsync,
} from "../redux/Actions/cartActions";
import OrderDetailsModal from "./orderDetailsModal";

const ProductCard = ({ item, pageType }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cartItems || []);
  const userId = useSelector((state) => state?.user?.user?.id || null);
  const role = useSelector((state) => state?.user?.user?.role); // Get user role
  const currentCartItem = Array.isArray(cart)
    ? cart.find((cartItem) => cartItem?.productId === item?.id)
    : null;
  const [quantity, setQuantity] = useState(currentCartItem?.quantity || 1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentCartItem) {
      setQuantity(currentCartItem.quantity);
    }
  }, [currentCartItem]);

  const handleAddToCart = async () => {
    const success = await dispatch(addToCartAsync(item?.id, userId, quantity));
    if (success) {
      dispatch(fetchCart(userId));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCartAsync(item?.id, userId));
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
    if (currentCartItem) {
      dispatch(
        updateCartAsync(userId, { ...currentCartItem, quantity: value })
      );
    }
  };

  const isInCart = !!currentCartItem;

  // if (role === 'operations') {
  //   // If the role is operations, return a message indicating no cart access.
  //   return (
  //     <div className="w-full mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
  //       <p className="text-gray-600 text-start">You do not have access to cart operations.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      {pageType !== "order" && (
        <img
          src={item?.imageURL}
          alt={item?.description}
          className="w-full h-48 rounded-md object-cover"
        />
      )}

      <div className="mt-4">
        <a
          href={`./products/${item?.id}`}
          className="text-xl font-semibold text-gray-800 text-start flex"
        >
          {item?.description}
        </a>
        <p className="text-gray-600 font-bold text-start">{item?.price}₹</p>
        <p className="mt-2 text-gray-600 text-sm text-start">
          {item?.description}
        </p>
        
        {pageType === "order" ? (
          <div className="mt-4">
            <p className="text-gray-600 text-start">
              <strong>Order ID:</strong> {"#" + item?.orderNumber}
            </p>
            <p className="text-gray-600 text-start">
              <strong>Quantity:</strong> {item?.quantity}
            </p>
            <p className="text-gray-600 text-start">
              <strong>Total Price:</strong> {item?.totalPrice}₹
            </p>
            <p className="text-gray-600 text-start">
              <strong>Status:</strong> {item?.status}
            </p>

            <button
              className={`mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300`}
              onClick={() => setIsModalOpen(true)}
            >
              View Details
            </button>
          </div>
        ) : isInCart ? (
          <div className="mt-4 flex items-center space-x-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
            />
            <button
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
              onClick={handleRemoveFromCart}
            >
              <FaTrash className="mr-2" /> Remove from Cart
            </button>
          </div>
        ) : (
          <button
            className={`${ role === 'operations' ? 'hidden' : 'block'} mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center`}
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        )}
      </div>
      <OrderDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={item}
      />
    </div>
  );
};

export default ProductCard;
