import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: null,
    wallets: [],  // Add a property to store all wallets
    transactions: [],
    loading: false,
    error: null,
    walletStatus: null,
  },  
  reducers: {
    createWalletSuccess: (state, action) => {
      state.loading = false;
      state.wallet = action.payload;
      state.walletStatus = "active"; // Set the status to "active" when a wallet is created
    },
    createWalletFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.walletStatus = null; // Reset the status if wallet creation fails
    },
    loadMoneySuccess: (state, action) => {
      state.loading = false;
      state.wallet = action.payload;
    },
    loadMoneyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deductMoneySuccess: (state, action) => {
      state.loading = false;
      state.wallet = action.payload;
    },
    deductMoneyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getWalletSuccess: (state, action) => {
      state.loading = false;
      state.wallet = action.payload;
    },
    getAllWalletsSuccess: (state, action) => {
        state.loading = false;
        state.wallets = action.payload;  // Assuming action.payload contains an array of wallets
      },      
    getWalletFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    getTransactionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // New actions for activating and deactivating wallet
    activateWalletSuccess: (state) => {
      state.walletStatus = "active"; // Set the wallet status to "active"
    },
    activateWalletFailure: (state, action) => {
      state.error = action.payload;
      state.walletStatus = null; // Reset wallet status in case of failure
    },
    deactivateWalletSuccess: (state) => {
      state.walletStatus = "deactivated"; // Set the wallet status to "deactivated"
    },
    deactivateWalletFailure: (state, action) => {
      state.error = action.payload;
      state.walletStatus = null; // Reset wallet status in case of failure
    },
  },
});

export const {
  createWalletSuccess,
  createWalletFailure,
  loadMoneySuccess,
  loadMoneyFailure,     
  deductMoneySuccess,
  deductMoneyFailure,
  getWalletSuccess,
  getWalletFailure,
  getTransactionsSuccess,
  getTransactionsFailure,
  activateWalletSuccess,
  activateWalletFailure,
  deactivateWalletSuccess,
  deactivateWalletFailure,
} = walletSlice.actions;

export default walletSlice.reducer;
