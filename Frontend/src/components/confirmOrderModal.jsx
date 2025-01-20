import React, { useState } from "react";
import { Modal, Input, Select, Button, Form } from "antd";

const { Option } = Select;

const OrderConfirmationModal = ({ visible, onCancel, savedAddresses, onConfirm }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm({
          ...values,
          address: selectedAddress || values.address,
        });
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };

  return (
    <Modal
      title="Confirm Order"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleConfirm}>
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit phone number!" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item label="Address">
          <Select
            placeholder="Select from saved addresses"
            onChange={(value) => setSelectedAddress(value)}
            value={selectedAddress}
          >
            {savedAddresses.map((address, index) => (
              <Option key={index} value={address}>
                {address}
              </Option>
            ))}
          </Select>
          {!selectedAddress && (
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Please enter your address!" }]}
            >
              <Input placeholder="Enter your address with PIN code" />
            </Form.Item>
          )}
        </Form.Item>

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
