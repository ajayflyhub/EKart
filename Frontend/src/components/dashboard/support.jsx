import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { sendEmailAsync } from "../../redux/Actions/emailActions";
import { useDispatch, useSelector } from "react-redux";

const Support = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSendEmail = async (senderEmail, subject, content) => {
    setLoading(true);
    try {
      await dispatch(sendEmailAsync(senderEmail, subject, content));
      form.resetFields();
    } catch (error) {
      message.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Support</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          const subject = values.subject;
          const content = values.query;
          const senderEmail = user?.email;
          handleSendEmail(senderEmail, subject, content);
        }}
      >
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <Input placeholder="Enter subject here..." />
        </Form.Item>

        <Form.Item
          label="Your Query"
          name="query"
          rules={[{ required: true, message: "Please enter your query" }]}
        >
          <Input.TextArea rows={4} placeholder="Write your query here..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Send Query
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Support;
