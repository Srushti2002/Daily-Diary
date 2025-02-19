import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:5000", // Replace with your backend URL
    headers: { "Content-Type": "application/json" },
});

// Function to handle token expiry
const handleTokenExpiry = (error, navigate) => {
    if (error.response && error.response.data.error === "Invalid or Expired token") {
        localStorage.removeItem("token"); // Remove expired token
        navigate("/login"); // Redirect to login page
    }
};

// Add response interceptor to handle expired tokens globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const navigate = useNavigate(); // Hook must be inside a component
        handleTokenExpiry(error, navigate);
        return Promise.reject(error);
    }
);

export default api;
