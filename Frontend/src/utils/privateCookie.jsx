import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const authToken = Cookies.get("jwtToken");
  return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
