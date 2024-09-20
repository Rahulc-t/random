import React from 'react';
import popular1 from '../images/popular1.jpg'; // Ensure this path is correct
import popular2 from '../images/popular2.jpg'; // Ensure this path is correct

const Populargame = () => {
  return (
    <div className="flex justify-center bg-[#1b2838] p-4">
      {/* Game 1 */}
      <div className="relative m-2 bg-[#0b1722] text-white rounded-md overflow-hidden w-[300px] ">
        <img src={popular1} alt="Popular Game 1" className="w-full h-[250px] object-cover" />
        <div className="p-4">
          <p className="text-sm">MIDWEEK DEAL</p>
          <p className="text-xs text-gray-400">Offer ends 18 Sep @ 10:30pm.</p>
          <p className="mt-2 text-green-400">-60% ₹ 352</p>
        </div>
      </div>

      {/* Game 2 */}
      <div className="relative m-2 bg-[#0b1722] text-white rounded-md overflow-hidden w-[300px]">
        <img src={popular2} alt="Popular Game 2" className="w-full h-[250px] object-cover" />
        <div className="p-4">
          <p className="text-sm">MIDWEEK DEAL</p>
          <p className="text-xs text-gray-400">Offer ends 16 Sep @ 10:30pm.</p>
          <p className="mt-2 text-green-400">-30% ₹ 770</p>
        </div>
      </div>

      {/* Game 3 (Duplicate of Game 1) */}
      <div className="relative m-2 bg-[#0b1722] text-white rounded-md overflow-hidden w-[300px]">
        <img src={popular1} alt="Popular Game 3" className="w-full h-[250px] object-cover" />
        <div className="p-4">
          <p className="text-sm">TODAY'S DEAL</p>
          <p className="mt-2 text-green-400">-90% ₹ 249</p>
        </div>
      </div>
    </div>
  );
};

export default Populargame;
