import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./login";
import Home from "./Home";

function App() {
  return (
    <div className="App w-full">
      <Router>
        <AuthProvider>
          <header>
            <Header />
          </header>

          {/* Routes */}
          <main className="mx-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
