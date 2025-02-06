import React, { useEffect, useState } from "react";
import { Table, Select, Button, Typography } from "antd";

const { Title } = Typography;

const OrdersTable = ({ role, orders, handleOrderSaveChanges, setOrders }) => {
  const [editedOrders, setEditedOrders] = useState({}); // Track status changes before saving

  useEffect(() => {
    console.log(
      "Updated Orders:",
      orders.filter((order) => order.id === 1)
    );
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    // Store changed status separately before saving
    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleSave = (orderId, order) => {
    console.log("Saving Order:", orderId, order);
    const updatedStatus = editedOrders[orderId]; // Get new status from edits

    if (!updatedStatus) return; // No update, so return early

    // Update `orders` with new status
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId ? { ...o, status: updatedStatus } : o
      )
    );

    // Call API or function to save changes
    handleOrderSaveChanges(orderId, { ...order, status: updatedStatus });

    // Remove the saved order from `editedOrders`
    setEditedOrders((prev) => {
      const newEdits = { ...prev };
      delete newEdits[orderId];
      return newEdits;
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (orderNumber) => `#${orderNumber}`
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toFixed(2)}₹`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) =>
        role === "Admin" ? (
          <Select
            value={editedOrders[record.id] ?? record.status} // Show edited status if available
            onChange={(value) => handleStatusChange(record.id, value)}
            style={{ width: 150 }}
          >
            <Select.Option value="ordered">Ordered</Select.Option>
            <Select.Option value="shipping in status">Shipping</Select.Option>
            <Select.Option value="shipped">Shipped</Select.Option>
            <Select.Option value="delivered">Delivered</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        ) : (
          status
        ),
    },
    ...(role === "Admin"
      ? [
          {
            title: "Customer",
            dataIndex: ["user", "username"],
            key: "customer",
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Button
                type="primary"
                disabled={
                  !editedOrders[record.id] ||
                  editedOrders[record.id] === record.status
                }
                onClick={() => handleSave(record.id, record)}
              >
                Save
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      <Title level={3} className="mb-4 font-bold">
        {role === "customer" ? "My Orders" : "Manage All Orders"}
      </Title>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrdersTable;
