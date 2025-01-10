import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

function ResetPassword() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 h-auto w-full py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Title level={3} className="text-center mb-6">
          Reset Password
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
            label={<span className="text-gray-700">Enter Your OTP</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your OTP"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-700">Enter New Password</span>}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Reset Password
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
}

export default ResetPassword;
