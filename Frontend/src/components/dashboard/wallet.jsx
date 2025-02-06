import { Button, Card, Form, Select, Steps, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deductMoneyAsync,
  getAllWalletsAsync,
  getWalletAsync,
  loadMoneyAsync,
  activateWalletAsync,
  deactivateWalletAsync,
  getAllTransactionsAsync,
} from "../../redux/Actions/walletActions";
import AdminWalletModal from "../adminWalletModal";

const AdminWalletTable = ({ transactions }) => {
  const wallet = useSelector((state) => state?.wallet?.wallet);
  const allWallets = useSelector((state) => state?.wallet?.wallets);
  const user = useSelector((state) => state?.user?.user);

  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMode, setSelectedMode] = useState("Wallet");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [filteredWallets, setFilteredWallets] = useState(allWallets);

  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getWalletAsync(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    dispatch(getAllWalletsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    setFilteredWallets(allWallets);
  }, [allWallets]);

  // Trigger transaction fetch when filter is set to "Transactions"
  useEffect(() => {
    if (selectedMode === "Transactions") {
      dispatch(getAllTransactionsAsync());
    }
  }, [dispatch, selectedMode, selectedUserId]);

  const openTransactionModal = (type) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  // Handle activate and deactivate wallet actions
  const handleWalletAction = (action, walletId) => {
    console.log("Wallet Action:", action, walletId);

    const successCallback = () => {
      // Dispatch getAllWalletsAsync on successful action
      dispatch(getAllWalletsAsync());
    };

    if (action === "activate") {
      dispatch(activateWalletAsync(walletId))
        .then(successCallback) // Call getAllWalletsAsync after success
        .catch((error) => {
          console.error("Error activating wallet:", error);
        });
    } else if (action === "deactivate") {
      dispatch(deactivateWalletAsync(walletId))
        .then(successCallback) // Call getAllWalletsAsync after success
        .catch((error) => {
          console.error("Error deactivating wallet:", error);
        });
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleTransaction = async (userId) => {
    try {
      if (transactionType === "deposit") {
        await dispatch(loadMoneyAsync(userId, amount));
        if (selectedMode === "Transactions") {
          dispatch(getAllTransactionsAsync());
        }
      } else if (transactionType === "withdraw") {
        await dispatch(deductMoneyAsync(userId, amount));
        if (selectedMode === "Transactions") {
          dispatch(getAllTransactionsAsync());
        }
      }

      // await dispatch(getTransactionsAsyncByUserId(selectedUserId));
      await dispatch(getAllWalletsAsync()); // Fetch all wallets after a successful transaction

      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.error("Transaction Error:", error);
      return false;
    }
  };

  const openFundsModal = (type, id) => {
    setTransactionType(type);
    setCurrentStep(0);
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const columnsTransactions = [
    {
      title: "ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id) => `#${id}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        if (!date) return "N/A"; // Handle missing values
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime())
          ? "Invalid Date"
          : new Intl.DateTimeFormat("en-IN", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(parsedDate);
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
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <span
          className={
            record.transactionType === "CREDIT"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {record.transactionType === "CREDIT" ? "Deposit" : "Deduct"}
        </span>
      ),
    },
  ];

  const columnsWallets = [
    {
      title: "ID",
      dataIndex: "walletId",
      key: "walletId",
      render: (id) => `#${id}`,
    },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `₹${new Intl.NumberFormat("en-IN").format(balance)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "active" ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      dataIndex: "userId",
      key: "userId",
      render: (userId, record) => {
        const isActive = record.isActive;
        return (
          <div className="flex gap-4">
            <Button
              type="primary"
              onClick={() => handleWalletAction("activate", record.walletId)} // Pass walletId here
              disabled={isActive}
            >
              Activate
            </Button>
            <Button
              onClick={() => handleWalletAction("deactivate", record.walletId)} // Pass walletId here
              disabled={!isActive}
            >
              Deactivate
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => openFundsModal("withdraw", record.userId)} // Pass walletId here
            >
              Deduct Funds
            </Button>
            <Button
              type="primary"
              onClick={() => openFundsModal("deposit", record.userId)} // Pass walletId here
            >
              Add Funds
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-6 flex-col">
      <div className="flex justify-between items-center">
        <Card className="shadow-lg h-fit">
          <h2 className="text-xl font-bold text-[#364d79] text-center">
            EKPay Wallet
          </h2>
          <p className="text-md font-semibold text-center">
            Wallet Balance: ₹
            {new Intl.NumberFormat("en-IN").format(wallet?.balance ?? 0)}
          </p>
          <div className="mt-4 flex gap-4 justify-center">
            <Button
              type="primary"
              onClick={() => openTransactionModal("deposit")}
            >
              Deposit
            </Button>
            <Button onClick={() => openTransactionModal("withdraw")}>
              Withdraw
            </Button>
          </div>
        </Card>

        {/* DepositWithdrawModal for handling transactions
        <UserDepositWithdrawModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={user?.id}
          transactionType={transactionType}
        /> */}

        <Card title="Filters" className="shadow-md h-fit">
          <Select
            defaultValue="Wallet"
            className="w-[200px]"
            onChange={setSelectedMode}
          >
            <Option value="Wallet">Show Wallets</Option>
            <Option value="Transactions">Show Transactions</Option>
          </Select>
        </Card>
      </div>
      <Card
        title={selectedMode === "Wallet" ? "Wallets" : "Transaction History"}
        className="mt-6 shadow-md"
      >
        <Table
          dataSource={
            selectedMode === "Wallet" ? filteredWallets : filteredTransactions
          }
          columns={
            selectedMode === "Wallet" ? columnsWallets : columnsTransactions
          }
          rowKey="walletId"
        />
      </Card>

      <AdminWalletModal
        {...{
          transactionType,
          isModalOpen,
          setIsModalOpen,
          currentStep,
          setAmount,
          setCurrentStep,
          handleTransaction,
          handleNext,
          selectedUserId,
          amount,
          user,
        }}
      />
    </div>
  );
};

export default AdminWalletTable;
