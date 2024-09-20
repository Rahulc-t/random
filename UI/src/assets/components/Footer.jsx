import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#1b2838] text-gray-400 py-8">
      {/* Top Section
      <div className="text-center">
        <p className="text-xl text-white">Looking for recommendations?</p>
        <p className="text-sm mt-2">Sign in to view personalized recommendations</p>
        <a href=""> <button className="bg-[#5c7e10] text-white py-2 px-6 mt-4 rounded-md">Sign In</button></a>
        <p className="text-sm mt-4">Or <span className="text-blue-500">sign up</span> and join Steam for free</p>
      </div> */}

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Section */}
      <div className="text-center text-sm">
        <div className="flex justify-center items-center mb-4">
          <img src="your-logo-url-here" alt="Valve" className="h-8 mr-4" /> {/* Replace with your logo */}
          <p className="text-gray-400">© 2024 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries. VAT included in all prices where applicable. <span className="text-blue-500">Privacy Policy</span> | <span className="text-blue-500">Legal</span> | <span className="text-blue-500">Steam Subscriber Agreement</span> | <span className="text-blue-500">Refunds</span> | <span className="text-blue-500">Cookies</span></p>
        </div>

        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">About Valve</a>
          <span>|</span>
          <a href="#" className="hover:underline">Jobs</a>
          <span>|</span>
          <a href="#" className="hover:underline">Steamworks</a>
          <span>|</span>
          <a href="#" className="hover:underline">Steam Distribution</a>
          <span>|</span>
          <a href="#" className="hover:underline">Support</a>
          <span>|</span>
          <a href="#" className="hover:underline">Gift Cards</a>
          <span>|</span>
          <a href="#" className="hover:underline">Steam</a>
          <span>|</span>
          <a href="#" className="hover:underline">@steam</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
