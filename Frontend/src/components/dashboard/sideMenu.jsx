import React, { useState, useEffect } from "react";

function SideMenu({ setActiveTab, activeTab, role, renderContent }) {
  const [slideAnimation, setSlideAnimation] = useState("");

  useEffect(() => {
    setSlideAnimation("bg-blue-200"); // Set the initial active tab style with slide effect
  }, [activeTab]);

  return (
    <div className="min-h-screen flex">
      <aside className="bg-gray-100 w-64 p-4">
        <nav>
          <ul>
            <li>
              <button
                onClick={() => {
                  setActiveTab("Overview");
                  setSlideAnimation("bg-blue-200"); // Active state with animation
                }}
                className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                  activeTab === "Overview" ? slideAnimation : ""
                }`}
              >
                Overview
              </button>
            </li>
            {role !== "operations" && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Orders");
                    setSlideAnimation("bg-blue-200"); // Active state with animation
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Orders" ? slideAnimation : ""
                  }`}
                >
                  {role === "customer" ? "My Orders" : "Orders"}
                </button>
              </li>
            )}

            {role === "Admin" && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Manage Customers");
                    setSlideAnimation("bg-blue-200");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Manage Customers" ? slideAnimation : ""
                  }`}
                >
                  Manage Customers
                </button>
              </li>
            )}

            {(role === "Admin" || role === "operations") && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Manage Products");
                    setSlideAnimation("bg-blue-200");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Manage Products" ? slideAnimation : ""
                  }`}
                >
                  Manage Products
                </button>
              </li>
            )}

            {role === "customer" && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Details");
                    setSlideAnimation("bg-blue-200");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Details" ? slideAnimation : ""
                  }`}
                >
                  My Details
                </button>
              </li>
            )}

            {role === "customer" && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Support");
                    setSlideAnimation("bg-blue-200");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Support" ? slideAnimation : ""
                  }`}
                >
                  Support
                </button>
              </li>
            )}
            {role !== "operations" && (
              <li>
                <button
                  onClick={() => {
                    setActiveTab("Wallet");
                    setSlideAnimation("bg-blue-200");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-all duration-500 ${
                    activeTab === "Wallet" ? slideAnimation : ""
                  }`}
                >
                  Wallet
                </button>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

export default SideMenu;
