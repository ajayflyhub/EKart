import { createContext, useState, useContext, useEffect } from 'react';

// Mocked decodeToken function for testing purposes
const decodeToken = (token) => {
  // Return a dummy decoded token object
  return {
    id: '123',
    name: 'Test User',
    email: 'testuser@example.com',
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60, // Expires in 1 hour
  };
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      setUser(decoded);
    }
  }, []);

  const login = (token) => {
    // Simulate token storage
    localStorage.setItem('token', token);
    const decoded = decodeToken(token);
    setUser(decoded);
  };

  const logout = () => {
    // Simulate removing token
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
