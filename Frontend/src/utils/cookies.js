import Cookies from "js-cookie";

const token = Cookies?.get("jwtToken");
let role = null;
let userId = null;

if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  role = decodedToken?.role;
  userId = decodedToken?.userId;
}

export { role, userId };
