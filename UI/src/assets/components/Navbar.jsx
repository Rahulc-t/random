import React, { useEffect, useState } from 'react';
import logo from '../images/logo_steam.svg'; // Ensure this is your Steam logo
import Logout from '../components/Logout'; // Import your Logout component
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-[#1b2838] text-white px-4 py-2 flex items-center justify-between h-[120px]">
      {/* Left Side - Logo */}
      <div className="flex items-center ml-[10%]">
        <img src={logo} alt="Steam Logo" className="h-12 mr-6" />
      </div>

      {/* Center - Navigation Links */}
      <div className="flex space-x-8 justify-center items-center">
        <a href="/store" className="hover:text-blue-500 hover:underline text-lg">STORE</a>
        {/* <a href="#" className="hover:text-blue-500 hover:underline text-lg">COMMUNITY</a> */}
        <a href="/aboutme" className="hover:text-blue-500 hover:underline text-lg">ABOUT</a>
        {/* <a href="#" className="hover:text-blue-500 hover:underline text-lg">SUPPORT</a> */}

        {/* Conditionally render Profile if user is logged in */}
        {isLoggedIn && (
          <a href="/profile" className="hover:text-blue-500 hover:underline text-lg">PROFILE</a>
        )}
      </div>

      {/* Right Side - Login/Logout and Language Options */}
      <div className="flex items-start space-x-2 mt-2">
        {isLoggedIn ? (
          // Show Logout component if user is logged in
          <Logout />
        ) : (
          // Show Login link if user is not logged in
          <a href="/login" className="hover:text-gray-300 text-sm">login</a>
        )}
        <span className="text-sm">|</span>
        <a href="#" className="hover:text-gray-300 text-sm">language</a>
      </div>
    </nav>
  );
};

export default Navbar;
