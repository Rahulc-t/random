import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { GameModuleGameStore } from "../../scdata/deployed_addresses.json";
import { abi } from '../../scdata/GameStore.json';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define contract details
  // const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Request user's MetaMask wallet connection
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        
        const signer = await provider.getSigner();
        const gameStoreContract = new ethers.Contract(GameModuleGameStore, abi, signer);

        // Fetch all games from the contract
        const gameData = await gameStoreContract.getAllGames();
        setGames(gameData);
      } catch (err) {
        console.error(err);
        setError('Error fetching games from blockchain');
      }
    };

    fetchGames();
  }, []);

  const handleBuy = async (gameId, price) => {
    try {
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const gameStoreContract = new ethers.Contract(contractAddress, GameStoreABI, signer);

      // Execute the buy game function on the contract
      // await gameStoreContract.buyGame(gameId, { value: price });

      navigate(`/viewgame/${gameId}`); // Navigate to the game view page
    } catch (err) {
      console.error('Error purchasing game:', err);
      setError('Error purchasing game');
    }
  };

  return (
    <div className="min-h-screen bg-[#1b2838] py-12 flex flex-col items-center w-[1700px]">
      <h1 className="text-5xl font-extrabold text-white mb-12">Game Store</h1>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <div className="w-full max-w-6xl flex flex-col gap-8">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-gray-900 hover:bg-gray-800 text-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col sm:flex-row justify-between items-center"
          >
            <img src={game.imageUrl} alt={game.gameName} className="w-32 h-32 rounded-md object-cover mr-4" />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-4">{game.gameName}</h2>
              <p className="text-gray-400 mb-4">{game.gameDescription}</p>
              <p className="text-xl font-semibold">Price: {ethers.formatEther(game.gamePrice)} ETH</p>
            </div>
            <button
              onClick={() => handleBuy(game.gameId, game.gamePrice)}
              className="mt-6 ml-2 sm:mt-0 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
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
