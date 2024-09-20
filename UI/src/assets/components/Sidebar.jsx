import React from 'react';
import card from '../images/steamcards_promo_03.png'; // Ensure this is your image path

const Sidebar = () => {
  return (
    <div className="w-[250px] bg-[#1b2838] text-white p-4 space-y-6">
      {/* Steam Gift Cards Section */}
      <div className="flex flex-col items-center mb-6">
        <img src={card} alt="Steam Gift Cards" className="mb-2" />
        <p className="text-sm text-center">STEAM GIFT CARDS</p>
        <p className="text-xs text-gray-400">Give the Gift of Game</p>
      </div>

      {/* Recently Viewed */}
      {/* <div className="space-y-1">
        <h3 className="text-gray-400 text-sm">RECENTLY VIEWED</h3>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Roboquest</p>
      </div> */}

      {/* Recommended */}
      {/* <div className="space-y-1">
        <h3 className="text-gray-400 text-sm">RECOMMENDED</h3>
        <p className="text-sm hover:text-blue-500 cursor-pointer">By Friends</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">By Curators</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Tags</p>
      </div> */}

      {/* Browse Categories */}
      <div className="space-y-1">
        <h3 className="text-gray-400 text-sm">BROWSE CATEGORIES</h3>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Top Sellers</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">New Releases</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Upcoming</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Specials</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">VR Titles</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Controller-Friendly</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Great on Deck</p>
      </div>

      {/* Browse by Genre */}
      <div className="space-y-1">
        <h3 className="text-gray-400 text-sm">BROWSE BY GENRE</h3>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Free To Play</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Early Access</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Action</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Adventure</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Casual</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Indie</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Massively Multiplayer</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Racing</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">RPG</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Simulation</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Sports</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Strategy</p>
      </div>
    </div>
  );
};

export default Sidebar;
