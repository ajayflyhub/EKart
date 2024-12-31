import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./login";
import Home from "./Home";
import Footer from "./components/footer";
import Registration from "./registration";
import Dashboard from "./dashboard";

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
          <main className="mx-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
