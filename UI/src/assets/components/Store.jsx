import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all games from the server
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/getgames', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`, // Use your token mechanism
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          const error = await response.json();
          setError(error.message);
        }
      } catch (err) {
        setError('Error fetching games');
      }
    };

    fetchGames();
  }, []);

  const handleBuy = (gameId) => {
    navigate(`/viewgame/${gameId}`);
    // Add your logic here to handle the game purchase
  };

  return (
    <div className="min-h-screen bg-[#1b2838] py-12 flex flex-col items-center w-[1700px]">
      <h1 className="text-5xl font-extrabold text-white mb-12">Game Store</h1>
      
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {games.map((game) => (
          <div
            key={game.game_Id}
            className="bg-gray-900 hover:bg-gray-800 text-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col sm:flex-row justify-between items-center"
          >
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-4">{game.game_name}</h2>
              <p className="text-gray-400 mb-4">{game.game_description}</p>
              <p className="text-xl font-semibold">Price: ${game.game_price}</p>
            </div>
            <button
              onClick={() => handleBuy(game.game_Id)}
              className="mt-6 sm:mt-0 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
