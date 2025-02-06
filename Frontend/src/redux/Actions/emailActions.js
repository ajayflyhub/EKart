import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

export const sendEmailAsync =
  (senderEmail, subject, content) => async (dispatch) => {
    try {
      const token = Cookies.get("jwtToken");
      if (token) { 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const emailData = {
          senderEmail,
          recipientEmail: "ajay@flyhub.com",
          subject,
          content,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/Email/send-email`,
          emailData
        );
 
        if (response.status === 200) {
          message.success(response.data || "Email sent successfully!");
        } else {
          message.error(response.data || "Failed to send email.");
        }
      } else {
        message.error("Authentication token is missing. Please log in.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || "An error occurred while sending the email.";
      message.error(errorMessage);
    }
  };
