import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/reducers/productReducer";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("products",user)    
  },[user])


  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Login successful!");
        dispatch(fetchProducts());
    // Implement login logic here
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Please correct the errors and try again.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 h-auto w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Title level={3} className="text-center mb-6">
          Ekart Login
        </Title>
        <Form
          form={form}
          name="login"
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
            label={<span className="text-gray-700">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Log In
            </Button>
          </Form.Item>

          <div className="text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </div>

          <div className="text-center text-gray-600">
            Forgot Password?{" "}
            <a href="/ResetPassword" className="text-blue-500 hover:underline">
              Reset password here
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
