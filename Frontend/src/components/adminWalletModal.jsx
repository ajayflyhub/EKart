import { Button, Form, Input, Modal, Steps } from "antd";
import React from "react";

const AdminWalletModal = ({
  transactionType,
  isModalOpen,
  setIsModalOpen,
  currentStep,
  setAmount,
  setCurrentStep,
  handleTransaction,
  handleNext,
  amount,
  selectedUserId,
  user,
}) => {
  const { Step } = Steps;
  const [form] = Form.useForm();
  console.log("user?.id",user?.id)
  const handleConfirm = async () => {
    console.log("lbdsa")
    const transactionSuccess = await handleTransaction(selectedUserId || user?.id);
    if (transactionSuccess) {
      form.resetFields(); // Clear the form
      setIsModalOpen(false); // Close the modal
      setCurrentStep(0); // Reset step to the first one
      setAmount(null); // Reset amount
    }
  };

  return (
    <Modal
      title={transactionType === "deposit" ? "Add Funds" : "Deduct Funds"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={700}
    >
      <Steps current={currentStep}>
        <Step title="Enter Amount" />
        <Step title="Confirm Transaction" />
      </Steps>

      <Form form={form} layout="vertical" className="mt-4">
        {currentStep === 0 && (
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <Input
              type="number"
              prefix="₹"
              placeholder="Enter amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Form.Item>
        )}

        {currentStep === 1 && (
          <p>
            Confirm your{" "}
            {transactionType === "deposit" ? "deposit" : "withdrawal"} of ₹
            {amount}.
          </p>
        )}

        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <Button onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep < 1 ? (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AdminWalletModal;
