import React from "react";

function Overview(state) {
  const orders = state.orders;
  const role = state?.user?.role;
  const user = state.user;
  const allUsersStateData = state.allUsersStateData;
  const Allproducts = state.Allproducts.products.products.length;

  console.log("bloom",Allproducts)
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid justify-center grid-cols-2 items-center w-full gap-12">
        <div className="card">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <strong>Email:</strong> {user?.email}
          </div>
        </div>
        <div className="card">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <strong>Total Orders:</strong> {!orders ? 0 : orders?.length}
          </div>
        </div>
        {role === "Admin" && (
          <div className="card">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <strong>Total Customers Registered:</strong>{" "}
              {allUsersStateData?.length}
            </div>
          </div>
        )}
        {role === "Admin" && (
          <div className="card">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <strong>Total Deactivated Customers:</strong>{" "}
              {allUsersStateData?.filter((user) => !user.isActive).length || 0}
            </div>
          </div>
        )}

        {role === "Admin" && (
          <div className="card">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <strong>Total Products In Site:</strong> {Allproducts}
            </div>  
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
