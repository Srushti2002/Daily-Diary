// src/utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const now = Date.now() / 1000;
        return decoded.exp > now; // Check if token is still valid
    } catch (error) {
        return false; // Invalid token format
    }
};
