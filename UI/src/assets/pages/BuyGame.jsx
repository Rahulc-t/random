import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { GameModuleGameStore } from '../../scdata/deployed_addresses.json';
import { abi } from '../../scdata/GameStore.json';
import Footer from '../components/Footer';

const ViewGame = () => {
  const { id } = useParams(); // Get the game ID from the route
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false); // State to track purchase status

  // Function to fetch the game details using the contract
  const fetchGameFromBlockchain = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractInstance = new ethers.Contract(GameModuleGameStore, abi, signer);
      setContract(contractInstance);

      const gameData = await contractInstance.getGame(id); // Fetch the game from blockchain
      setGame({
        gameName: gameData[0],
        gameStudio: gameData[1],
        gameDescription: gameData[2],
        gamePrice: gameData[3],
        imageUrl: gameData[4] || 'https://via.placeholder.com/150',
      });
    } catch (err) {
      console.error('Error fetching game from blockchain:', err);
      setError('Error fetching game details from blockchain');
    }
  };

  // Function to check if the user has already purchased the game
  const checkPurchaseStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/checkPurchase/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Add authentication token if needed
        },
      });

      const data = await response.json();
      if (response.ok) {
        setHasPurchased(data.hasPurchased);
      } else {
        console.error('Error checking purchase status:', data.message);
      }
    } catch (err) {
      console.error('Error checking purchase status:', err);
    }
  };

  // Call fetchGameFromBlockchain and checkPurchaseStatus when component loads
  useEffect(() => {
    fetchGameFromBlockchain();
    checkPurchaseStatus(); // Check if the game has been purchased
  }, [id]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const contractInstance = new ethers.Contract(GameModuleGameStore, abi, signer);
        setContract(contractInstance);
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
        setError('Failed to connect to MetaMask');
      }
    } else {
      setError('MetaMask not detected. Please install MetaMask extension.');
    }
  };

  const buyGame = async () => {
    if (!contract || !account) {
      setError('Please connect to MetaMask first');
      return;
    }

    try {
      const gamePrice = await contract.getGame(id).then((game) => game[3]);
      const tx = await contract.buyGame(id, {
        value: gamePrice,
      });

      await tx.wait(); // Wait for transaction confirmation
      const transactionId = tx.hash; // Use the transaction hash as the ID
      alert('Game purchased successfully!');

      // Save the transaction to the database
      saveTransactionToDB(transactionId);

      setHasPurchased(true); // Update state to reflect the purchase
    } catch (err) {
      console.error('Error purchasing game:', err);
      setError('Error purchasing game');
    }
  };

  // Function to save transaction to the database
  const saveTransactionToDB = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`, // Use your auth token if required
        },
        body: JSON.stringify({
          gameId:id,
          gameName: game.gameName,
          gamePrice: game.gamePrice.toString(), // Convert BigInt to string here
          transactionId: transactionId,
          imageurl: game.imageUrl,
          gameDescription: game.gameDescription,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Transaction saved successfully:', data);
      } else {
        console.error('Failed to save transaction:', data.message);
      }
    } catch (err) {
      console.error('Error saving transaction:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-10 px-6">
      <h1 className="text-5xl font-extrabold text-white mb-10">Game Details</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {game ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center">
          <img
            src={game.imageUrl}
            alt={game.gameName}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />

          <h2 className="text-3xl font-bold mb-4 text-white">{game.gameName}</h2>
          <p className="text-lg text-gray-400 mb-4">{game.gameDescription}</p>
          <p className="text-xl font-semibold text-white mb-4">Price: {parseFloat(game.gamePrice)} ETH</p>
          <p className="text-lg text-gray-400 mb-6">Studio: {game.gameStudio}</p>

          {account ? (
            <div className="w-full">
              <p className="text-green-400 mb-4">Connected Account: {account}</p>
              {hasPurchased ? (
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300">
                  Play Game
                </button>
              ) : (
                <button
                  onClick={buyGame}
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Buy Game
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={connectMetaMask}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Connect to MetaMask
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-white">Loading game details...</p>
      )}
    </div>
  );
};

export default ViewGame;
