import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsAsyncByUserId } from "./redux/Actions/walletActions";
import WalletTable from "./components/walletTable";
import AdminWalletTable from "./components/dashboard/wallet";

const WalletPage = () => {
  const wallet = useSelector((state) => state.wallet.wallet);
  const transactions = useSelector((state) => state.wallet.transactions) || [];
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(getTransactionsAsyncByUserId(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {user?.role === "customer" ? (
        <WalletTable wallet={wallet} transactions={transactions} />
      ) : (
        <AdminWalletTable wallet={wallet} transactions={transactions} />
      )}
    </div>
  );
};

export default WalletPage;
