import React from 'react'
import logo from '../images/logo_steam.svg'; 

const AuthNav = () => {
  return (
    <nav className="bg-[#1b2838] text-white px-4 py-2 flex items-center justify-between h-[120px]">
    {/* Left Side - Logo */}
    <div className="flex items-center ml-[10%]">
      <img src={logo} alt="Steam Logo" className="h-12 mr-6" />
    </div>

   

    {/* Right Side - Login/Logout and Language Options */}
    <div className="flex items-start space-x-2 mt-2">
        {/* // Show Login link if user is not logged in */}
        <a href="/login" className="hover:text-gray-300 text-sm">login</a>
      <span className="text-sm">|</span>
      <a href="#" className="hover:text-gray-300 text-sm">language</a>
    </div>
  </nav>
  )
}

export default AuthNav