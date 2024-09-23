import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import contractABI from '../../scdata/GameStore.json'; 
import addresses from "../../scdata/deployed_addresses.json"; // Import as addresses

const ViewGames = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGamesFromBlockchain = async () => {
            try {
                // Connect to Ethereum (ethers.js v6)
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []); // Request user account connection
                
                const signer = await provider.getSigner(); // Get the signer

                // Access the contract address from the imported JSON
                const contractAddress = addresses.GameModuleGameStore;
                const abi = contractABI.abi; // Extract contract ABI
                const gameStoreContract = new ethers.Contract(contractAddress, abi, signer);

                // Call the getAllGames function from the contract
                const gamesFromContract = await gameStoreContract.getAllGames();
                console.log('Games from contract:', gamesFromContract); // Print the whole result
                
                // Format games for rendering
                const formattedGames = gamesFromContract.map((game, index) => ({
                    game_Id: game.gameId,
                    game_name: game.gameName,
                    game_description: game.gameDescription,
                    game_price:game.gamePrice, // Assuming price is in wei, convert to ETH
                    isDeleted: game.isDeleted,
                }));
                console.log(formattedGames)

                // Set the games that are not deleted
                setGames(formattedGames.filter(game => !game.isDeleted));
            } catch (err) {
                console.error('Error fetching games from blockchain:', err);
                alert('Error fetching games from the blockchain');
            }
        };

        fetchGamesFromBlockchain();
    }, []);

    const handleRemoveGame = async (gameId) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contractAddress = addresses.GameModuleGameStore; // Use the correct contract address
            const gameStoreContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

            // Call the smart contract function to remove the game
            const transaction = await gameStoreContract.deleteGame(gameId);
            await transaction.wait(); // Wait for the transaction to be confirmed

            setGames(games.filter(game => game.game_Id !== gameId));
            alert('Game removed successfully');
        } catch (err) {
            console.error('Error removing game:', err);
            alert('Error removing game');
        }
    };
    // parseInt(games.game_Id)
    // console.log(games.game_Id)
    const handleEditGame = (gameId) => {
        console.log(gameId)
        navigate(`/editgames/${gameId}`);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-900">
            <div>
                    <a href="/admin"><button className='bg-red-400 mt-6 mb-6 p-2 rounded-lg'>Home</button></a>
                </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 max-w-4xl text-white">
                
                <h2 className="text-2xl font-bold mb-6 text-center">View Games</h2>

                {games.length === 0 ? (
                    <p className="text-center">No games found</p>
                ) : (
                    <ul className="space-y-4">
                        {games.map(game => (
                            <li key={game.game_Id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{game.game_name}</h3>
                                    <p>{game.game_description}</p>
                                    <p>Price: {parseFloat(game.game_price)} WEI</p>
                                    {console.log(game.game_id)}
                                </div>
                                <div className="space-x-4">
                                    <button
                                        className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                                        onClick={() => handleRemoveGame(game.game_Id)}
                                    >
                                        Remove Game
                                    </button>
                                    <button
                                        className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-300"
                                        onClick={() => handleEditGame(game.game_Id)}
                                    >
                                        Edit Game
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewGames;
