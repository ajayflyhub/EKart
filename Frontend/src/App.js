import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./login";
import Home from "./Home";
import Registration from "./registration";
import Dashboard from "./dashboard";
import ProductPage from "./product";
import ProductDetailsPage from "./productDetails";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./ResetPassword";
import CartPage from "./cart";
import OrderPage from "./order";
import WalletPage from "./wallet";
import PrivateRoute from "./utils/privateCookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import eKartLogoVideo from "./assets/mockData";
import { FaArrowDown } from "react-icons/fa";

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function LoadingScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <video autoPlay muted className="w-100 h-60">
        <source src={eKartLogoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <div className="App w-full">
      {isLoading ? (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <Router>
          <AuthProvider>
            <Header />
            <ScrollToTop />
            <main className="mx-auto bg-blue-100 mt-12 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <PrivateRoute>
                      <ProductDetailsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <OrderPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </AuthProvider>
        </Router>
      )}
      {!isLoading && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-10 right-[100px] transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
        >
          <FaArrowDown size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
