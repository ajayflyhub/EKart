import { Button, Input, Table, Modal, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
  addProduct, // Assuming createProduct is already defined in your actions
} from "../../redux/Actions/productActions";
import { useDispatch } from "react-redux";
import AddProductModal from "./addProductModal";

const ManageProducts = ({ allProducts, setAllProducts }) => {
  const dispatch = useDispatch();
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    imageURL: "",
    price: 0,
    quantity: 0,
  }); // State to hold the form data


  // Handle form field change
  const handleProductFieldChange = (e, productId, field) => {
    const updatedValue = e.target.value;
    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, [field]: updatedValue }
          : product
      )
    );
  };

  const handleUpdateProduct = async (productId) => {
    const product = allProducts.find((product) => product.id === productId);
    if (product) {
    const success = await dispatch(updateProduct(productId, product));
    if(success)
      setEditingProductId(null);
      message.success(`Updated product ${product.name} successfully`)
    }
  };

  const handleDeleteProduct = async (productId) => {
    const product = allProducts.find((product) => product.id === productId);
    const success = await dispatch(deleteProduct(productId));
    if(success){
      dispatch(fetchProducts());
      message.success(`deleted ${product.name} successfully`)
    }
  };

  // Modal form submit
  const handleAddProduct = () => {
    const { name, description, imageURL, price, quantity } = productFormData;

    // Prepare the payload
    const newProduct = {
      name,
      description,
      imageURL,
      price,
      quantity,
    };

    // Dispatch the action to create a new product
    dispatch(addProduct(newProduct));
    message.success("Product added successfully!");
    setIsModalVisible(false); // Close the modal
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Input
          value={record.name}
          onChange={(e) => handleProductFieldChange(e, record.id, "name")}
          disabled={editingProductId !== record.id}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <Input
          value={record.price}
          onChange={(e) => handleProductFieldChange(e, record.id, "price")}
          type="number"
          disabled={editingProductId !== record.id}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <div>
          {editingProductId === record.id ? (
            <Button
              type="primary"
              className="mr-2"
              onClick={() => handleUpdateProduct(record.id)}
            >
              Save
            </Button>
          ) : (
            <Button
              icon={<EditOutlined />}
              className="mr-2"
              onClick={() => setEditingProductId(record.id)}
            >
              Edit
            </Button>
          )}
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleDeleteProduct(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        <Button
          type="primary"
          className="mr-2"
          onClick={() => setIsModalVisible(true)}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={allProducts}
        rowKey="id"
        pagination={{
          pageSize: 10,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default ManageProducts;
