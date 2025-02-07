import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Spin } from "antd";
import dayjs from "dayjs";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createUser } from "./redux/Actions/userActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const [isRegistering, setIsRegistering] = useState(false);
  const [countdown, setCountdown] = useState(5); // Start countdown from 3 seconds

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    let timer;
    if (isRegistering && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      navigate("/");
    }
    return () => clearTimeout(timer);
  }, [isRegistering, countdown, navigate]);

  const onFinish = async (values) => {
    try {
      const role = "customer";
      const resetTokenExpires = dayjs().add(1, "hour").toISOString();

      setIsRegistering(true); // Start the loading state

      // Dispatch the createUser action and wait for the response
      const response = await dispatch(
        createUser(
          values.username,
          values.email,
          values.password,
          role,
          values.phoneNumber,
          resetTokenExpires
        )
      );

      if (response) {
        form.resetFields();

        // Ensure the loader stays for at least 5 seconds before redirecting
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/");
      } else {
        // Handle cases where there is no response or something went wrong
        console.error("Registration failed: No response from server");
        setIsRegistering(false); // Reset loader if registration fails
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setIsRegistering(false); // Reset loader if an error occurs
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isRegistering ? (
          <div className="text-center">
            <Spin size="large" className="mb-4" />
            <p className="text-lg text-gray-700 font-semibold">
              Registration successful! Redirecting to home page in...{" "}
              {countdown}
            </p>
          </div>
        ) : (
          <>
            <Title level={3} className="text-center mb-6">
              Ekart Registration
            </Title>
            <Form
              form={form}
              name="registration"
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your username"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Enter your phone number"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value)
                        return Promise.resolve();
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Confirm your password"
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
                <a href="/login" className="text-blue-500">
                  Login here
                </a>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
