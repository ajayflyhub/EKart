import React, { useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./redux/Actions/userActions";
import { hashPassword } from "./utils/passwordHash";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const resetToken = [...Array(30)]
  .map(() => Math.random().toString(36)[2])
  .join('');
  const navigate = useNavigate();
  const resetTokenExpires = new Date();
  resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);
  const { user } = useSelector((state) => state.user);
    const token = Cookies.get('jwtToken');
  
    useEffect(() => {
      if (token) {
        navigate('/');
      }
    }, [token, navigate]);
  

  const onFinish = async (values) => {
    try {
      const hashedPassword = await hashPassword(values.password);
      const role = 'customer'
      dispatch(
        createUser(
          values.username,
          values.email,
          hashedPassword,
          resetToken,
          resetTokenExpires,
          role
        )
      );

      message.success("Registration successful!");
      form.resetFields();
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("An error occurred during registration.");
    }
  };

  useEffect(()=> {
    console.log("us231er",user)
  },[user])

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
            <a href="/login" className="text-blue-500">
              Login here
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
