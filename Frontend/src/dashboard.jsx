import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Button, Form } from "antd";
import {
  fetchOrders,
  getAllOrders,
  updateOrder,
} from "./redux/Actions/orderActions";
import { fetchAddresses } from "./redux/Actions/addressActions";
import {
  activateUser,
  deactivateUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./redux/Actions/userActions";
import { fetchProducts } from "./redux/Actions/productActions";
import Overview from "./components/dashboard/overview";
import Details from "./components/dashboard/details";
import Support from "./components/dashboard/support";
import ManageProducts from "./components/dashboard/manageProducts";
import ManageCustomers from "./components/dashboard/manageCustomers";
import SideMenu from "./components/dashboard/sideMenu";
import WalletTable from "./components/walletTable";
import { getTransactionsAsyncByUserId } from "./redux/Actions/walletActions";
import AdminWalletTable from "./components/dashboard/wallet";
import OrdersTable from "./components/dashboard/orders";

const Dashboard = () => {
  const user = useSelector((state) => state.user?.user);
  const state = useSelector((state) => state);
  const allUsersStateData = state?.user?.users;
  const orderStateToCustomer = useSelector((state) => state.orders?.orders);
  const AllordersStateToAdmin = useSelector((state) => state.orders?.orders);
  const Allproducts = useSelector((state) => state.products?.products);
  const wallet = useSelector((state) => state.wallet.wallet);
  const transactions = useSelector((state) => state.wallet.transactions) || [];
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const token = Cookies?.get("jwtToken");
  const decodedToken = JSON.parse(atob(token?.split(".")[1]));
  const role = decodedToken?.role;
  const userId = decodedToken.userId;
  const [form] = Form.useForm();
  const [details, setDetails] = useState({
    username: user?.username || "",
    email: user?.email || "",
    address: user?.address || "",
    role: user?.role || "",
  });

  useEffect(() => {
    if (user && user?.role === "customer") {
      dispatch(fetchOrders(userId));
      dispatch(fetchAddresses(userId));
      dispatch(getTransactionsAsyncByUserId(userId));
    }
    if (user && user?.role === "Admin") {
      dispatch(getAllUsers());
      dispatch(getAllOrders());
      dispatch(fetchProducts());
    }
    if (user?.role === "operations") {
      dispatch(fetchProducts());
    }
  }, [user, dispatch, userId]);

  useEffect(() => {
    setDetails(user);
  }, [user]);

  useEffect(() => {
    if (role === "customer") {
      setOrders(orderStateToCustomer);
    } else if (role === "Admin") {
      setAllUsers(allUsersStateData);
      setOrders(AllordersStateToAdmin);
      setAllProducts(Allproducts);
    } else if (role === "operations") {
      setAllProducts(Allproducts);
    }
  }, [
    role,
    user,
    orderStateToCustomer,
    AllordersStateToAdmin,
    allUsersStateData,
    Allproducts,
  ]);

  const handleSave = async (userId, updatedUserDetails) => {
    const success = await dispatch(updateUser(userId, updatedUserDetails));
    console.log("Saving user details:", updatedUserDetails);
  };

  useEffect(() => {
    console.log("allProducts", allProducts);
  }, [allProducts]);
  const handleFieldChange = (e, productId, field) => {
    console.log("wered", e?.target?.value, field, productId);
    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, [field]: e.target.value }
          : product
      )
    );
  };

  const handleUpdateUser = async (user) => {
    console.log("Updating user:", user);
    const updatedUser = allUsers.find((u) => u.id === user.id);

    if (updatedUser) {
      const success = await dispatch(updateUser(updatedUser.id, user)); // Use `user`, not `updatedUser`
      if (success) dispatch(getAllUsers());
    } else {
      console.error("User not found");
    }
  };

  const handleUserToggle = async (userId) => {
    const updatedUser = allUsers.find((u) => u.id === userId);
    if (updatedUser && !updatedUser.isActive) {
      const success = await dispatch(activateUser(updatedUser.id)); // Use `user`, not `updatedUser`
      if (success) dispatch(getAllUsers());
    } else if (updatedUser && updatedUser.isActive) {
      const success = await dispatch(deactivateUser(updatedUser?.id));
      if (success) dispatch(getAllUsers());
    } else {
      console.error("User not found");
    }
  };

  const handleDeleteUser = async (userId) => {
    const deactivateUser = await dispatch(deleteUser(userId));
    deactivateUser && dispatch(getAllUsers());
  };

  const handleOrderSaveChanges = (orderId, order) => {
    console.log("asdqweqdx", orderId, order);
    dispatch(updateOrder(orderId, order));
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <Overview
            user={user}
            orders={orders}
            role={role}
            allUsersStateData={allUsersStateData}
            Allproducts={state}
          />
        );

      case "Orders":
        return (
          <OrdersTable
            role={role}
            orders={orders}
            handleOrderSaveChanges={handleOrderSaveChanges}
            setOrders={setOrders}
          />
        );

      case "Details":
        return (
          <Details
            details={details}
            handleSave={handleSave}
            setDetails={setDetails}
          />
        );
      case "Support":
        return role === "customer" ? <Support /> : null;

      case "Wallet":
        return role === "customer" ? (
          <WalletTable transactions={transactions} wallet={wallet} />
        ) : (
          <AdminWalletTable transactions={transactions} wallet={wallet} />
        );

      case "Manage Products":
        return role === "Admin" || role === "operations" ? (
          <ManageProducts
            allProducts={allProducts}
            setAllProducts={setAllProducts}
          />
        ) : null;

      case "Manage Customers":
        return role === "Admin" ? (
          <ManageCustomers
            allUsers={allUsers}
            handleFieldChange={handleFieldChange}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUser={handleUpdateUser}
            handleUserToggle={handleUserToggle}
          />
        ) : null;

      case "Admin Info":
        return role === "Admin" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Admin Info</h2>
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : null;

      default:
        return <p>Select a section from the side menu.</p>;
    }
  };

  return (
    <SideMenu
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      role={role}
      renderContent={renderContent}
    />
  );
};

export default Dashboard;
