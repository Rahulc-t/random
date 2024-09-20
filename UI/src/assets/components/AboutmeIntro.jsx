import React from 'react';
import img1 from "../images/capsule1.jpg";
import img2 from "../images/capsule2.jpg";
import img3 from "../images/capsule_231x87(2).jpg";
import img4 from "../images/capsule_231x87(3).jpg";
import img5 from "../images/capsule_231x87(4).jpg";
import img6 from "../images/capsule_231x87(5).jpg";
import img7 from "../images/capsule_231x87(6).jpg";
import img8 from "../images/capsule_231x87(7).jpg";
import img9 from "../images/capsule_231x87(8).jpg";
import img10 from "../images/capsule_231x87(9).jpg";
import img11 from "../images/capsule_231x87(10).jpg";
import img12 from "../images/capsule_231x87(11).jpg";
import img13 from "../images/capsule_231x87(12).jpg";
import img14 from "../images/capsule_231x87(13).jpg";
import img15 from "../images/capsule_231x87(14).jpg";
import img16 from "../images/capsule_231x87(15).jpg";
import { Link } from 'react-router-dom';

const AboutmeIntro = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          {[
            img1, img2, img3, img4, img5, img6, img7, img8,
            img9, img10, img11, img12, img13, img14, img15, img16
          ].slice(0, 8).map((src, index) => (
            <img key={index} src={src} alt={`Game ${index + 1}`}
                 className="w-full h-36 object-cover rounded-lg shadow-lg" />
          ))}
        </div>
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-3">Access Games Instantly</h2>
          <p className="mb-6">
            With nearly 30,000 games from AAA to indie and everything in-between. Enjoy exclusive deals,
            automatic game updates, and other great perks.
          </p>
         <Link to="/store"> <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded transition duration-300">
            Browse the Store →
          </button></Link>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            img9, img10, img11, img12, img13, img14, img15, img16
          ].slice(8).map((src, index) => (
            <img key={index + 8} src={src} alt={`Game ${index + 9}`}
                 className="w-full h-24 object-cover rounded-lg shadow-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutmeIntro;
