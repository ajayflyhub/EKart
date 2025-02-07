import { Button, Form, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createAddress,
  updateAddress,
  fetchAddresses,
} from "../../redux/Actions/addressActions";
import { userId } from "../../utils/cookies";

function Details({ details, handleSave, setDetails }) {
  const user = useSelector((state) => state.user?.user);
  const addresses = useSelector((state) => state?.address?.addresses); // Assuming addresses are stored in the Redux state
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm(); // Form for address
  const dispatch = useDispatch();
  const [editingAddress, setEditingAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const addressesPerPage = 4; // Number of addresses to show per page

  useEffect(() => {
    form.setFieldsValue({
      username: details?.username,
      email: details?.email,
      phoneNumber: details?.phoneNumber,
    });

    dispatch(fetchAddresses(user?.id)); // Assuming this action fetches the addresses
  }, [details, form, dispatch, user?.id]);

  const onFinish = (values) => {
    handleSave(user?.id, { ...user, ...values });
  };

  const onAddressSubmit = async (addressValues) => {
    if (editingAddress) {
      const updatedAddress = {
        ...addressValues,
        id: editingAddress.id, // Ensure the address id is included for updating
      };
      const success = await dispatch(
        updateAddress(editingAddress.id, updatedAddress)
      ); // Assuming updateAddress dispatches the action to update
      dispatch(fetchAddresses(user?.id));
      setEditingAddress(null); // Clear the editing state
    } else {
      const addressPayload = {
        street: addressValues.street,
        city: addressValues.city,
        state: addressValues.state,
        postalCode: addressValues.postalCode,
        userId: user?.id,
      };
      dispatch(createAddress(user?.id, addressPayload));
    }

    addressForm.resetFields(); // Clear the address form after submission
  };

  const onEditAddress = (address) => {
    console.log("add23123ress", address);
    addressForm.setFieldsValue(address);
    setEditingAddress(address);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the current page's addresses
  const currentAddresses = addresses.slice(
    (currentPage - 1) * addressesPerPage,
    currentPage * addressesPerPage
  );

  return (
    <div className="flex flex-row items-center justify-center gap-10 min-h-screen bg-blue-200 py-10 px-4 sm:px-8">
      {/* Personal Details Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Edit My Details
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input
              placeholder="Enter your phone number"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Address Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center text-blue-600">
          {editingAddress ? "Edit Address" : "Add Address"}
        </h2>
        <Form
          form={addressForm}
          onFinish={onAddressSubmit}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please input your street!" }]}
          >
            <Input placeholder="Enter your street" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input placeholder="Enter your city" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please input your state!" }]}
          >
            <Input placeholder="Enter your state" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[
              { required: true, message: "Please input your postal code!" },
            ]}
          >
            <Input
              placeholder="Enter your postal code"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
            >
              {editingAddress ? "Update Address" : "Add Address"}
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Address List */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-6 text-center text-blue-600">
            Your Addresses
          </h2>
          {addresses?.length ? (
            <>
              <ul className="list-none mt-4 space-y-4">
                {currentAddresses.map((address) => (
                  <li
                    key={address.id}
                    className="flex justify-between items-center p-4 border-b rounded-lg shadow-sm bg-white"
                  >
                    <div className="flex-1">
                      <p className="text-gray-700">
                        {address.street}, {address.city}, {address.state} -{" "}
                        {address.postalCode}
                      </p>
                    </div>
                    <Button
                      type="link"
                      onClick={() => onEditAddress(address)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Button>
                  </li>
                ))}
              </ul>

              {/* Pagination controls */}
              <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={addresses.length}
                  pageSize={addressesPerPage}
                  onChange={handlePageChange}
                  showSizeChanger={false} // You can allow the user to change page size if desired
                />
              </div>
            </>
          ) : (
            <p className="text-gray-500">No addresses added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
