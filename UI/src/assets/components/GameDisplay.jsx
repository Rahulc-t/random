import React from 'react';
import manigame from '../images/main game.png';
import side1 from '../images/sidegame1.jpg';
import side2 from '../images/sidegame2.jpg';
import side3 from '../images/sidegame3.jpg';
import side4 from '../images/side game4.jpg';

const GameDisplay = () => {
  return (
    <div className="relative w-full h-[500px] bg-[#1b2838] flex items-center p-6">
      {/* Left Arrow */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center">
        <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
          &lt;
        </button>
      </div>

      {/* Main Content */}
      <div className="flex space-x-6 m-[400px]">
        {/* Game Image */}
        <div className="w-[600px]">
          <img
            src={manigame}  // Use your main game image here
            alt="Game Display"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Game Info */}
        <div className="text-white space-y-4">
          <h2 className="text-2xl font-bold">PUBG: BATTLEGROUNDS</h2>
          <div className="grid grid-cols-2 gap-2">
            <img
              src={side1}  // Use your side images here
              alt="Game Screenshot 1"
              className="w-full h-24 object-cover"
            />
            <img
              src={side2}
              alt="Game Screenshot 2"
              className="w-full h-24 object-cover"
            />
            <img
              src={side3}
              alt="Game Screenshot 3"
              className="w-full h-24 object-cover"
            />
            <img
              src={side4}
              alt="Game Screenshot 4"
              className="w-full h-24 object-cover"
            />
          </div>
          <p className="text-sm text-gray-400">Now Available</p>
          <p className="bg-gray-700 text-white text-xs px-2 py-1 inline-block rounded-md">
            Top Seller
          </p>
          <p className="text-xs text-gray-400">Free To Play</p>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default GameDisplay;
