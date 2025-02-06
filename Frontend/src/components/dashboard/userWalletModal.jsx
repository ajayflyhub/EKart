import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { loadMoneyAsync, deductMoneyAsync } from "../../redux/Actions/walletActions";
import { useDispatch } from "react-redux";

const UserDepositWithdrawModal = ({ isModalOpen, setIsModalOpen, userId, transactionType }) => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleTransaction = async () => {
    if (!userId || amount <= 0) return;

    try {
      if (transactionType === "deposit") {
        await dispatch(loadMoneyAsync(userId, amount));
      } else if (transactionType === "withdraw") {
        await dispatch(deductMoneyAsync(userId, amount));
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <Modal
      title={`${transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds`}
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleTransaction}>
          {transactionType === "deposit" ? "Deposit" : "Withdraw"}
        </Button>,
      ]}
    >
      <div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
      </div>
    </Modal>
  );
};

export default UserDepositWithdrawModal;
