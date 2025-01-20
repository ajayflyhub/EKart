import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./login";
import Home from "./Home";
import Footer from "./components/footer";
import Registration from "./registration";
import Dashboard from "./dashboard";
import ProductPage from "./product";
import ProductDetailsPage from "./productDetails";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./ResetPassword";
import CartPage from "./cart";

function App() {
  return (
    <div className="App w-full">
      <Router>
        <AuthProvider>
          <header>
          <link rel="icon" href="./assets/favicon.png" />
            <Header />
          </header>

          {/* Routes */}
          <main className="mx-auto bg-blue-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <footer>
            <Footer>

            </Footer>
          </footer>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
