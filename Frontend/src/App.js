import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null; // This component doesn’t need to render anything
}

function App() {
  const user = useSelector((state) => state?.user?.user);  // Assuming you have the user information here

  return (
    <div className="App w-full">
      <Router>
        <AuthProvider>
          <Header />
          <ScrollToTop /> {/* This component handles scrollToTop */}
          <main className="mx-auto bg-blue-100 mt-12 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Public Routes */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wallet" element={<WalletPage />} />

              {/* Protected Routes with role-based access */}
              {(user?.role === "Admin" || user?.role === "operations") && (
                <>
                  <Route
                    path="/wallet"
                    element={
                      <PrivateRoute>
                        <WalletPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <CartPage />
                      </PrivateRoute>
                    }
                  />
                </>
              )}
              
              {/* Other Protected Routes */}
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
    </div>
  );
}

export default App;
