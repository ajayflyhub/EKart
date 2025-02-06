import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import Cookies from "js-cookie";
import { fetchAddresses } from "../redux/Actions/addressActions";
import { createOrder } from "../redux/Actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/Actions/cartActions";

const { Option } = Select;

const OrderConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  handleClearCart
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const Addresses = useSelector((state) => state.address.addresses);
  const cart = useSelector((state) => state.cart.cartItems);
  const orderNumber = JSON.stringify(Math.floor(Math.random() * 1000000));

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        const products = cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          Name: item.product.name, 
          ImageURL: item.product.imageURL,
          Description: item.product.description,
        }));
  
        const totalPrice = cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
  
        const token = Cookies.get("jwtToken");
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;
  
        const orderData = {
          userId: userId,
          productIds: products.map((item) => item.productId),
          status: "shipped",
          orderDate: new Date().toISOString(),
          orderNumber: orderNumber,
          price: totalPrice,
          shippingAddress: selectedAddress || values.street,
          billingAddress: selectedAddress || values.street,
          contactNumber: values.phone,
          subtotal: totalPrice - 10, 
          taxes: 10,
          totalPrice: totalPrice,
          quantity: cart.reduce((total, item) => total + item.quantity, 0),
          products: products,
        };

        const success = dispatch(createOrder(orderData));
        if (success) {
          // handleClearCart(userId)
          dispatch(fetchCart(userId));
          onConfirm(orderNumber);
          form.resetFields();
        }
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };
  
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;
      dispatch(fetchAddresses(userId));
    }
  }, [dispatch]);

  return (
    <Modal
      title="Confirm Order"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleConfirm}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        {/* Saved Address Selection */}
        {Addresses && Addresses.length > 0 && (
          <Form.Item label="Saved Address">
            <Select
              placeholder="Select from saved addresses"
              onChange={(value) => setSelectedAddress(value)}
              value={selectedAddress}
            >
              {Addresses.map((address) => (
                <Option key={address.id} value={address.id}>
                  {address.street}, {address.city}, {address.state}, {address.postalCode}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Address Details */}
        {!selectedAddress && (
          <>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please enter your street!" }]}
            >
              <Input placeholder="Enter your street" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <Input placeholder="Enter your city" />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <Input placeholder="Enter your state" />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: "Please enter your postal code!" }]}
            >
              <Input placeholder="Enter your postal code" />
            </Form.Item>
          </>
        )}

        {/* Payment Mode */}
        <Form.Item
          label="Payment Mode"
          name="paymentMode"
          rules={[{ required: true, message: "Please select a payment mode!" }]}
        >
          <Select placeholder="Select payment mode">
            <Option value="credit_card">Credit Card</Option>
            <Option value="debit_card">Debit Card</Option>
            <Option value="upi">UPI</Option>
            <Option value="cod">Cash on Delivery</Option>
          </Select>
        </Form.Item>

        {/* Confirm Button */}
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
          block
        >
          Confirm Order
        </Button>
      </Form>
    </Modal>
  );
};

export default OrderConfirmationModal;
