import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { GameModuleGameStore } from "../../scdata/deployed_addresses.json";
import { abi } from '../../scdata/GameStore.json';

const EditGame = () => {
  const { id } = useParams(); // Game ID from URL parameters
  const navigate = useNavigate();

  // Initialize the game state with the fields from the contract
  const [game, setGame] = useState({
    gameName: '',
    gameStudio: '',
    gamePrice: '',
    gameDescription: '',
    imageUrl: '',
    category: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const contractAddress = GameModuleGameStore; // Your smart contract address
  // const provider = new ethers.providers.BrowserProvider(window.ethereum); // MetaMask provider
  // const signer = provider.getSigner();
  // const provider = new ethers.BrowserProvider(window.ethereum);
  //           const signer = await provider.getSigner();
  // const gameStoreContract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    // Function to fetch game details from the contract
    const fetchGameDetails = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const gameStoreContract= new ethers.Contract(contractAddress,abi,signer)
        const gameDetails = await gameStoreContract.getGame(id);
        console.log(gameDetails)
        // Map the returned values to the game state
        setGame({
          gameName: gameDetails.gameName,
          gameStudio: gameDetails.gameStudio,
          gamePrice: parseFloat(gameDetails.gamePrice),
          gameDescription: gameDetails.gameDescription,
          imageUrl: gameDetails.imageUrl,
          category: gameDetails.category,
        });
        console.log(game)
      } catch (err) {
        setError('Error fetching game details from the blockchain');
      }
    };

    fetchGameDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const gameStoreContract= new ethers.Contract(contractAddress,abi,signer)
      // Convert price to wei
      // const priceInWei = ethers.utils.parseEther(game.gamePrice.toString());
      console.log(typeof(game.gamePrice))
      
      // Call the editGame function on the smart contract
      const transaction = await gameStoreContract.editGame(
        id,
        game.gameName,
        game.gameStudio,
        game.gameDescription,
        game.gamePrice,
        game.imageUrl,
        game.category
      );
      console.log("1")
      await transaction.wait(); // Wait for the transaction to be mined
      setSuccess('Game updated successfully');
      setError(null);
      navigate('/viewgames'); // Redirect after successful update
    } catch (err) {
      // setError('Error updating game on the blockchain');
      console.log(err)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Game</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label htmlFor="gameName" className="block text-sm mb-2">
            Game Name
          </label>
          <input
            type="text"
            id="gameName"
            name="gameName"
            value={game.gameName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gameStudio" className="block text-sm mb-2">
            Game Studio
          </label>
          <input
            type="text"
            id="gameStudio"
            name="gameStudio"
            value={game.gameStudio}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gamePrice" className="block text-sm mb-2">
            Game Price (ETH)
          </label>
          <input
            type="text"
            id="gamePrice"
            name="gamePrice"
            value={game.gamePrice}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gameDescription" className="block text-sm mb-2">
            Game Description
          </label>
          <textarea
            id="gameDescription"
            name="gameDescription"
            value={game.gameDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm mb-2">
            Game Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={game.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm mb-2">
            Game Category
          </label>
          <select
            id="category"
            name="category"
            value={game.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="racing">Racing</option>
            <option value="war">War</option>
            <option value="strategy">Strategy</option>
            <option value="role-playing">Role-playing</option>
            <option value="others">Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Update Game
        </button>
      </form>
    </div>
  );
};

export default EditGame;
