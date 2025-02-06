import { Button, Card, Form, Input, Modal, Select, Steps, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deductMoneyAsync,
  getTransactionsAsyncByUserId,
  loadMoneyAsync,
} from "../redux/Actions/walletActions";
import { getAllUsers } from "../redux/Actions/orderActions";
import { role } from "../utils/cookies";

const WalletTable = ({ wallet, transactions }) => {
  const user = useSelector((state) => state.user.user);
  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [form] = Form.useForm();
  const { Step } = Steps;
  const { Option } = Select;
  const dispatch = useDispatch();

  const openModal = (type) => {
    setTransactionType(type);
    setCurrentStep(0);
    setIsModalOpen(true);
    form.resetFields();
  };

  useEffect(() => {
    if(role === 'Admin')
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id) => "#" + id,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        const validDate = new Date(date);
        if (isNaN(validDate.getTime())) {
          return "Invalid Date"; // or return a fallback value
        }
        return new Intl.DateTimeFormat("en-IN", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(validDate);
      },
    },    
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (type) => (type === "CREDIT" ? "Deposit" : "Withdraw"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => `₹${new Intl.NumberFormat("en-IN").format(amt)}`,
    },
    // {
    //   title: "Mode",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (Mode) => (
    //     <span
    //       className={Mode === "Success" ? "text-green-500" : "text-orange-500"}
    //     >
    //       {Mode}
    //     </span>
    //   ),
    // },
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      console.log("Form values on Next:", form.getFieldsValue());
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleTransaction = async () => {
    console.log("helooherdd");
    if (user?.id) {
      if (transactionType === "deposit") {
        await dispatch(loadMoneyAsync(user.id, amount));
      } else if (transactionType === "withdraw") {
        await dispatch(deductMoneyAsync(user.id, amount));
      }
      await dispatch(getTransactionsAsyncByUserId(user.id));
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Card className="shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#364d79]">EKPay Wallet</h2>
          <p className="text-md font-semibold">
            Wallet Balance: ₹
            {new Intl.NumberFormat("en-IN").format(wallet?.balance ?? 0)}
          </p>
          <div className="mt-4 flex gap-4 justify-center">
            <Button type="primary" onClick={() => openModal("deposit")}>
              Deposit
            </Button>
            <Button type="default" onClick={() => openModal("withdraw")}>
              Withdraw
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Transaction History" className="mt-6 shadow-md">
        <Table
          dataSource={transactions}
          columns={columns}
          rowKey="transactionId"
        />
      </Card>

      <Modal
        title={
          transactionType === "deposit" ? "Deposit Money" : "Withdraw Money"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        <Steps current={currentStep}>
          <Step title="Select Payment Method" />
          <Step title="Enter Amount" />
          <Step
            title={
              transactionType === "deposit"
                ? "Confirm Deposit"
                : "Confirm Withdrawal"
            }
          />
        </Steps>

        <Form
          form={form}
          onFinish={""} // No need to use onFinish if not submitting the form here
          layout="vertical"
          className="mt-4"
        >
          {currentStep === 0 && (
            <Form.Item
              name="paymentMethod"
              label={`${
                transactionType === "deposit"
                  ? "Payment Method"
                  : "Withdraw Source Account Type"
              }`}
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Select placeholder="Select a method">
                <Option value="UPI">UPI</Option>
                <Option value="Bank Transfer">Bank Transfer</Option>
                <Option value="Credit Card">Credit Card</Option>
              </Select>
            </Form.Item>
          )}
          {currentStep === 1 && (
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please enter an amount" }]}
            >
              <Input
                type="number"
                prefix="₹"
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Item>
          )}
          {currentStep === 2 && (
            <p>
              Confirm your{" "}
              {transactionType === "deposit" ? "deposit" : "withdrawal"} of ₹
              {form.getFieldValue("amount") ?? 0} via{" "}
              {form.getFieldValue("paymentMethod") ?? "N/A"}.
            </p>
          )}

          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            )}
            {currentStep < 2 ? (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleTransaction} // Directly call handleTransaction on click
              >
                Confirm
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default WalletTable;
