import { useState } from "react";
import { Table, Button, Input } from "antd";
import React from "react";

const ManageCustomers = ({ allUsers, handleDeleteUser, handleUpdateUser }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUsers, setEditedUsers] = useState({});

  const handleInputChange = (e, userId, field) => {
    const { value } = e?.target;
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleSave = (user) => {
    if (editedUsers[user.id]) {
      const updatedUser = { ...user, ...editedUsers[user.id] };
      handleUpdateUser(updatedUser);
    }
    setEditingUserId(null);
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
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              marginLeft: 8,
            }}
            onClick={() => handleDeleteUser(user.id)}
          >
            Deactivate User
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
        dataSource={allUsers.filter((user) => user?.isActive && user?.role !== "Admin")}
        rowKey="id"
      />
    </div>
  );
};

export default ManageCustomers;