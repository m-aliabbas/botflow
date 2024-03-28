import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // This component does not render anything
}

export default Logout;
