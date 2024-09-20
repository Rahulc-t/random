import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/';  // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="hover:text-gray-300 text-sm">
      logout
    </button>
  );
};

export default Logout;
