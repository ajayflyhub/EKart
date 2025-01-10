import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import bcrypt from "bcryptjs";

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();

  // Function to hash a password
  const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  };

  // Function to verify a password
  const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);

      // Step 1: Hash the password
      const hashed = await hashPassword(values.password);
      console.log("Hashed Password:", hashed);

      // Step 2: Verify the password (for demonstration)
      const isMatch = await verifyPassword(values.password, hashed);
      console.log("Password match:", isMatch);

      if (isMatch) {
        message.success("Registration successful! Passwords match.");
        // You can now save the hashed password to your database
      } else {
        message.error("Password verification failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("An error occurred during registration.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Please correct the errors and try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 h-auto w-full py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Title level={3} className="text-center mb-6">
          Ekart Registration
        </Title>
        <Form
          form={form}
          name="registration"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-gray-700">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Enter your username"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700">Confirm Password</span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm your password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in here
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
