import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LoginUser } from "./redux/Actions/userActions";
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Cookies from 'js-cookie';

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);


  const onSubmit = async (values) => {
      let response = await dispatch(LoginUser(values.username, values.password)); 
      console.log("Form values:", values);
      if (response.success) {
        console.log("Login successful:", response);
        navigate("/dashboard");
      } else {
        console.log("Login unsuccess:");
      }
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
          onFinish={onSubmit}
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
