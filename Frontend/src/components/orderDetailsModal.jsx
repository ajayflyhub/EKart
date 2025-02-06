import { Modal } from "antd";
import React, { useEffect } from "react";
import { fetchProductById } from "../redux/Actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function OrderDetailsModal({ isModalOpen, setIsModalOpen, item }) {
  const products = useSelector((state) => state?.products?.product || []);
  const orders = useSelector((state) => state?.orders?.orders);
  const productIds = item?.productIds;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) dispatch(fetchProductById(productIds));
  }, [dispatch, productIds, isModalOpen]);

  // Find the order details based on the selected order ID
  const orderDetails = orders?.find((order) => order.id === item?.id);

  return (
    <Modal
      title="Order Details"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <div className="space-y-4">
        {/* Scrollable Product List */}
        <ul className="max-h-[300px] overflow-y-auto space-y-4 border-b pb-2">
          {products?.map((product, index) => (
            <li key={index} className="flex items-center border-b pb-4">
              <img
                src={product?.imageURL}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> {product.price}₹
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary */}
        {orderDetails && (
          <div className="text-right space-y-1">
            <p>
              <strong>Subtotal:</strong> {orderDetails.subtotal}₹
            </p>
            <p>
              <strong>Taxes:</strong> {orderDetails.taxes}₹
            </p>
            <p className="text-lg font-semibold">
              <strong>Total Price:</strong> {orderDetails.totalPrice}₹
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default OrderDetailsModal;
