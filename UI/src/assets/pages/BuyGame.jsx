import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
// import { GameModuleGameStore } from '../../scdata/deployed_addresses.json';
// import { abi } from '../../scdata/GameStore.json';
import Footer from '../components/Footer';

const ViewGame = () => {
  const { id } = useParams(); // Get the game ID from the route
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false); // State to track purchase status

  useEffect(() => {
    // Fetch the game data by ID
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/editsgame/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`, // Adjust as necessary
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGame(data);
        } else {
          const error = await response.json();
          setError(error.message);
        }
      } catch (err) {
        setError('Error fetching game details');
      }
    };

    fetchGame();
  }, [id]);

  // Check if the user has already purchased the game
  // const checkPurchaseStatus = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/user/checkPurchase/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `${localStorage.getItem('token')}`,
  //       },
  //     });

  //     const data = await response.json();
  //     if (data.hasPurchased) {
  //       setHasPurchased(true);
  //     }
  //   } catch (err) {
  //     console.error('Error checking purchase status', err);
  //     setError('Error checking purchase status');
  //   }
  // };

  // Call the function to check purchase status once MetaMask is connected
  // useEffect(() => {
  //   if (account) {
  //     checkPurchaseStatus();
  //   }
  // }, [account]);

  // // MetaMask connection and initialize ethers
  // const connectMetaMask = async () => {
  //   if (window.ethereum) {
  //     try {
  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       const signer = await provider.getSigner();
  //       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       setAccount(accounts[0]);

  //       const instance = new ethers.Contract(GameModuleGameStore, abi, signer);
  //       setContract(instance);
  //     } catch (err) {
  //       console.error('Error connecting to MetaMask:', err);
  //       setError('Failed to connect to MetaMask');
  //     }
  //   } else {
  //     setError('MetaMask not detected. Please install MetaMask extension.');
  //   }
  // };

  // Function to buy game and save transaction
  // // const buyGame = async () => {
  // //   if (!contract || !account) {
  // //     setError('Please connect to MetaMask first');
  // //     return;
  // //   }

  // //   try {
  // //     // Perform the blockchain transaction
  // //     const tx = await contract.buyGame(id, { value: game.game_price });
  // //     await tx.wait(); // Wait for transaction confirmation

  // //     const transactionId = tx.hash; // Get the transaction ID from the blockchain

  // //     // Call backend API to save transaction details
  // //     await fetch('http://localhost:5000/user/add', {
  // //       method: 'POST',
  // //       headers: {
  // //         'Content-Type': 'application/json',
  // //         'Authorization': localStorage.getItem('token'), // Pass the token for authentication
  // //       },
  // //       body: JSON.stringify({
  // //         gameName: game.game_name,
  // //         gamePrice: game.game_price,
  // //         transactionId: transactionId, // Store transaction hash from blockchain
  // //       }),
  // //     });

  //     alert('Game purchased successfully!');
  //     setHasPurchased(true); // Update state to reflect the purchase
  //   } catch (err) {
  //     console.error('Error purchasing game:', err);
  //     setError('Error purchasing game');
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-10 px-6">
      <h1 className="text-5xl font-extrabold text-white mb-10">Game Details</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {game ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center">
          {/* Game Image */}
          <img
            src={game.image} // Assuming game.image holds the URL to the game image
            alt={game.game_name}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          
          {/* Game Information */}
          <h2 className="text-3xl font-bold mb-4 text-white">{game.game_name}</h2>
          <p className="text-lg text-gray-400 mb-4">{game.game_description}</p>
          <p className="text-xl font-semibold text-white mb-4">Price: {game.game_price} ETH</p>
          <p className="text-lg text-gray-400 mb-6">Studio: {game.game_studio}</p>

          {account ? (
            <div className="w-full">
              <p className="text-green-400 mb-4">Connected Account: {account}</p>
              {hasPurchased ? (
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
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
