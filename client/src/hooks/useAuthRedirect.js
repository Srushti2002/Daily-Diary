import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct

export default function useAuthRedirect () {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decoded.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('token'); // Remove expired token
          navigate('/login'); // Redirect to login
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        navigate('/login'); // Redirect to login
      }
    } 
  }, [navigate]);
};


