import React from 'react';
import backgroundVideo from '../images/ad.webm'; // Ensure this is your video path

const Ads = () => {
  return (
    <div className="relative h-[450px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      {/* Overlay (to darken the video a bit) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        {/* Top Links with Blue Background */}
        <div className="flex space-x-8 mb-8 bg-blue-500 bg-opacity-75 p-4 rounded-md">
          <a href="#" className="hover:text-blue-400 hover:underline text-lg">Your Store</a>
          <a href="#" className="hover:text-blue-400 hover:underline text-lg">New & Noteworthy</a>
          <a href="#" className="hover:text-blue-400 hover:underline text-lg">Categories</a>
          <a href="/profile" className="hover:text-blue-400 hover:underline text-lg">Profile</a>
          <a href="#" className="hover:text-blue-400 hover:underline text-lg">News</a>
          {/* <a href="#" className="hover:text-blue-400 hover:underline text-lg">Labs</a> */}
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold mb-4">FOCUS ENTERTAINMENT</h1>
        <p className="text-xl">Publisher Sale | Up to 90% Off</p>
      </div>
    </div>
  );
};

export default Ads;
