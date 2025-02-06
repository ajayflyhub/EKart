import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

// Action to create wallet
export const createWalletAsync = (userId) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/create/${userId}`
      );

      if (response.status === 201) {
        message.success("Wallet created successfully!");
        dispatch(createWalletSuccess(response.data));
      } else {
        message.error(response.data || "Failed to create wallet.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while creating the wallet.";
    message.error(errorMessage);
    dispatch(createWalletFailure(errorMessage));
  }
};

// Action to load money into wallet
export const loadMoneyAsync = (userId, amount) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const requestData = { userId, amount };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/load`,
        requestData
      );

      if (response.status === 200) {
        message.success("Money loaded successfully!");
        dispatch(loadMoneySuccess(response.data));
      } else {
        message.error(response.data || "Failed to load money.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while loading money.";
    message.error(errorMessage);
    dispatch(loadMoneyFailure(errorMessage));
  }
};

// Action to deduct money from wallet
export const deductMoneyAsync = (userId, amount) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const requestData = { userId, amount };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/deduct`,
        requestData
      );

      if (response.status === 200) {
        message.success("Money deducted successfully!");
        dispatch(deductMoneySuccess(response.data));
      } else {
        message.error(response.data || "Failed to deduct money.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while deducting money.";
    message.error(errorMessage);
    dispatch(deductMoneyFailure(errorMessage));
  }
};

// Action to get wallet by user ID
export const getWalletAsync = (userId) => async (dispatch) => {
    console.log("IM HERE")
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/${userId}`
      );
      if (response.data) {
        dispatch(getWalletSuccess(response?.data));
      } else {
        message.error(response.data || "Failed to get wallet.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while getting the wallet.";
    message.error(errorMessage);
    dispatch(getWalletFailure(errorMessage));
  }
};

// Action to get transaction history
export const getTransactionsAsyncByUserId = (userId) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/transactions/${userId}`
      );

      if (response.status === 200) {
        dispatch(getTransactionsSuccess(response.data));
      } else {
        message.error(response.data || "Failed to get transactions.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while fetching transactions.";
    dispatch(getTransactionsFailure(errorMessage));
  }
};

// Action to activate wallet
export const activateWalletAsync = (userId) => async (dispatch) => {
    try {
      const token = Cookies.get("jwtToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/wallet/activate/${userId}`
        );
  
        if (response.status === 200) {
          message.success("Wallet activated successfully!");
          dispatch(activateWalletSuccess(response.data));
        } else {
          message.error(response.data || "Failed to activate wallet.");
        }
      } else {
        message.error("Authentication token is missing. Please log in.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred while activating the wallet.";
      message.error(errorMessage);
      dispatch(activateWalletFailure(errorMessage));
    }
  };
  
  // Action to deactivate wallet
  export const deactivateWalletAsync = (userId) => async (dispatch) => {
    try {
      const token = Cookies.get("jwtToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/wallet/deactivate/${userId}`
        );
  
        if (response.status === 200) {
          message.success("Wallet deactivated successfully!");
          dispatch(deactivateWalletSuccess(response.data));
        } else {
          message.error(response.data || "Failed to deactivate wallet.");
        }
      } else {
        message.error("Authentication token is missing. Please log in.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred while deactivating the wallet.";
      message.error(errorMessage);
      dispatch(deactivateWalletFailure(errorMessage));
    }
  };
  
  // Action to get all wallets
  export const getAllWalletsAsync = () => async (dispatch) => {
    try {
      const token = Cookies.get("jwtToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/wallet/all`);

        if (response.status === 200) {
          dispatch(getAllWalletsSuccess(response.data));  // Ensure this action handles the data correctly
        } else {
          message.error(response.data || "Failed to get wallets.");
        }
      } else {
        message.error("Authentication token is missing. Please log in.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred while fetching wallets.";
      message.error(errorMessage);
      dispatch(getAllWalletsFailure(errorMessage));
    }
  };

  // Action to get all transactions
export const getAllTransactionsAsync = () => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/wallet/transactions`
      );

      if (response.status === 200) {
        dispatch(getTransactionsSuccess(response.data));
      } else {
        message.error(response.data || "Failed to get transactions.");
      }
    } else {
      message.error("Authentication token is missing. Please log in.");
    }
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred while fetching transactions.";
    message.error(errorMessage);
    dispatch(getTransactionsFailure(errorMessage));
  }
};
  
  // Action creators for success and failure for wallet activation/deactivation
  const activateWalletSuccess = (wallet) => ({
    type: "wallet/activateWalletSuccess",
    payload: wallet,
  });
  
  const activateWalletFailure = (error) => ({
    type: "wallet/activateWalletFailure",
    payload: error,
  });
  
  const deactivateWalletSuccess = (wallet) => ({
    type: "wallet/deactivateWalletSuccess",
    payload: wallet,
  });
  
  const deactivateWalletFailure = (error) => ({
    type: "wallet/deactivateWalletFailure",
    payload: error,
  });
  
  // Action creators for success and failure for getting all wallets
  const getAllWalletsSuccess = (wallets) => ({
    type: "wallet/getAllWalletsSuccess",
    payload: wallets,
  });
  
  const getAllWalletsFailure = (error) => ({
    type: "wallet/getAllWalletsFailure",
    payload: error,
  });
  

// Action creators for success and failure
const createWalletSuccess = (wallet) => ({
  type: "wallet/createWalletSuccess",
  payload: wallet,
});

const createWalletFailure = (error) => ({
  type: "wallet/createWalletFailure",
  payload: error,
});

const loadMoneySuccess = (wallet) => ({
  type: "wallet/loadMoneySuccess",
  payload: wallet,
});

const loadMoneyFailure = (error) => ({
  type: "wallet/loadMoneyFailure",
  payload: error,
});

const deductMoneySuccess = (wallet) => ({
  type: "wallet/deductMoneySuccess",
  payload: wallet,
});

const deductMoneyFailure = (error) => ({
  type: "wallet/deductMoneyFailure",
  payload: error,
});

const getWalletSuccess = (wallet) => ({
  type: "wallet/getWalletSuccess",
  payload: wallet,
});

const getWalletFailure = (error) => ({
  type: "wallet/getWalletFailure",
  payload: error,
});

const getTransactionsSuccess = (transactions) => ({
  type: "wallet/getTransactionsSuccess",
  payload: transactions,
});

const getTransactionsFailure = (error) => ({
  type: "wallet/getTransactionsFailure",
  payload: error,
});
