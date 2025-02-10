import { useState } from "react";
import { Table, Button, Input } from "antd";
import React from "react";

const ManageCustomers = ({
  allUsers,
  handleDeleteUser,
  handleUpdateUser,
  handleUserToggle,
}) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUsers, setEditedUsers] = useState({});

  const handleInputChange = (e, userId, field) => {
    const { value } = e?.target;
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  console.log("allUsers123",allUsers)

  const handleSave = (user) => {
    if (editedUsers[user.id]) {
      const updatedUser = { ...user, ...editedUsers[user.id] };
      handleUpdateUser(updatedUser);
    }
    setEditingUserId(null);
  };

  const handleToggleUserStatus = (userId) => {
    console.log("sadasdas", userId);
    handleUserToggle(userId);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text, user) => (
        <Input
          value={editedUsers[user.id]?.username ?? text}
          disabled={editingUserId !== user.id}
          onChange={(e) => handleInputChange(e, user.id, "username")}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, user) => (
        <Input
          value={editedUsers[user.id]?.email ?? text}
          disabled={editingUserId !== user.id}
          onChange={(e) => handleInputChange(e, user.id, "email")}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, user) => (
        <>
          {editingUserId === user.id ? (
            <>
              <Button type="primary" onClick={() => handleSave(user)}>
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditingUserId(null);
                  setEditedUsers((prev) => ({
                    ...prev,
                    [user.id]: undefined,
                  }));
                }}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button type="default" onClick={() => setEditingUserId(user.id)}>
              Edit
            </Button>
          )}
          {console.log("sadsa23dsad", user?.isActive)}
          <Button
            style={{
              backgroundColor: user.isActive ? "red" : "#23b823",
              color: "white",
              border: "none",
              marginLeft: 8,
            }}
            onClick={() => handleToggleUserStatus(user?.id)}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage your customers</h2>
      <Table
        columns={columns}
        dataSource={allUsers
          .filter((user) => user.role !== "Admin")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))} 
        rowKey="id"
      />
    </div>
  );
};

export default ManageCustomers;
