import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
// import { GameModuleGameStore } from "../../scdata/deployed_addresses.json"; // Import deployed addresses
// import { abi } from '../../scdata/GameStore.json'; // Import the ABI file for GameStore

const AddGame = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        game_name: '',
        game_Id: '',
        game_studio: '',
        game_price: '',
        game_description: ''
    });

    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Initialize ethers and contract when the component mounts
        const initializeEthers = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner(); // Ensure signer is fetched correctly

                    // Create a contract instance with the signer
                    const instance = new ethers.Contract(GameModuleGameStore, abi, signer);

                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccount(accounts[0]);
                    setContract(instance); // Contract with signer
                } catch (err) {
                    console.log(err);
                    setError('Failed to load ethers or contract');
                }
            } else {
                setError('MetaMask not detected. Please install MetaMask.');
            }
        };

        initializeEthers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // First, add the game to the backend
            const response = await fetch('http://localhost:5000/admin/addgame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Game added to the backend successfully');

                // Convert game price to wei
                // const gamePriceWei = ethers.utils.parseEther(formData.game_price); // Convert Ether to Wei

                // If adding to the backend is successful, add the game to the blockchain
                const tx = await contract.addGame(
                    formData.game_name,
                    formData.game_studio,
                    formData.game_description,
                    // gamePriceWei // Send price in Wei
                    formData.game_price
                );

                await tx.wait(); // Wait for transaction confirmation
                alert('Game added to blockchain successfully');

                // Clear the form data after successful submission
                setFormData({
                    game_name: '',
                    game_Id: '',
                    game_studio: '',
                    game_price: '',
                    game_description: ''
                });

                navigate("/admin");
            } else {
                const error = await response.json();
                alert(`Error adding game to backend: ${error.message}`);
            }
        } catch (err) {
            console.log(err);
            alert('Error adding game to blockchain');
        }
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (err) {
                setError('Failed to connect to MetaMask');
            }
        } else {
            setError('MetaMask not detected');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
            >
                <h2 className="text-2xl font-bold mb-6">Add Game</h2>

                {error && <p className="text-red-500">{error}</p>}
                {account ? <p className="text-green-500">Connected Account: {account}</p> : (
                    <button
                        type="button"
                        onClick={connectMetaMask}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700"
                    >
                        Connect to MetaMask
                    </button>
                )}

                {/* Form Fields */}
                <div className="mb-4">
                    <label htmlFor="game_name" className="block text-sm mb-2">Game Name</label>
                    <input
                        type="text"
                        id="game_name"
                        name="game_name"
                        value={formData.game_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_Id" className="block text-sm mb-2">Game ID</label>
                    <input
                        type="text"
                        id="game_Id"
                        name="game_Id"
                        value={formData.game_Id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_studio" className="block text-sm mb-2">Game Studio</label>
                    <input
                        type="text"
                        id="game_studio"
                        name="game_studio"
                        value={formData.game_studio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_price" className="block text-sm mb-2">Game Price (in Ether)</label>
                    <input
                        type="text"
                        id="game_price"
                        name="game_price"
                        value={formData.game_price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="game_description" className="block text-sm mb-2">Game Description</label>
                    <textarea
                        id="game_description"
                        name="game_description"
                        value={formData.game_description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Add Game
                </button>
            </form>
        </div>
    );
};

export default AddGame;
