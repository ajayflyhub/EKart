import React, { useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Actions/productActions"; // Assuming you have the action defined

const AddProductModal = ({ isModalVisible, setIsModalVisible }) => {
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    imageURL: "",
    price: 0,
    quantity: 0,
  });

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (!productFormData.name || !productFormData.price || !productFormData.quantity) {
      message.error("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(addProduct(productFormData));
      message.success("Product added successfully!");
      setIsModalVisible(false); // Close modal after successful addition
    } catch (error) {
      message.error("Failed to add product. Please try again.");
    }
  };

  return (
    <Modal
      title="Add New Product"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>,
      ]}
      width={600}
    >
      <Form layout="vertical">
        <Form.Item label="Product Name" required>
          <Input
            name="name"
            value={productFormData.name}
            onChange={handleFormChange}
            placeholder="Enter product name"
          />
        </Form.Item>

        <Form.Item label="Description" required>
          <Input
            name="description"
            value={productFormData.description}
            onChange={handleFormChange}
            placeholder="Enter product description"
          />
        </Form.Item>

        <Form.Item label="Image URL">
          <Input
            name="imageURL"
            value={productFormData.imageURL}
            onChange={handleFormChange}
            placeholder="Enter image URL"
          />
        </Form.Item>

        <Form.Item label="Price" required>
          <Input
            name="price"
            type="number"
            value={productFormData.price}
            onChange={handleFormChange}
            placeholder="Enter product price"
          />
        </Form.Item>

        <Form.Item label="Quantity" required>
          <Input
            name="quantity"
            type="number"
            value={productFormData.quantity}
            onChange={handleFormChange}
            placeholder="Enter product quantity"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
