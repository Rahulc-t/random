import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from 'axios'; // Used to upload to Pinata
import { GameModuleGameStore } from "../../scdata/deployed_addresses.json";
import { abi } from '../../scdata/GameStore.json';

const AddGame = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        game_name: '',
        game_studio: '',
        game_price: '',
        game_description: '',
        category: '', // Added field for game category
        image_url: '' // For the image URL from Pinata
    });

    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null); // To handle image file upload

    useEffect(() => {
        // Initialize ethers and contract
        const initializeEthers = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();

                    const instance = new ethers.Contract(GameModuleGameStore, abi, signer);

                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccount(accounts[0]);
                    setContract(instance);
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

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadToPinata = async () => {
        const data = new FormData();
        data.append('file', imageFile);

        try {
            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: "bdb88602028f9d51588e",
                    pinata_secret_api_key: "5447ba2757388cb504d8b8588628fd1b56b36484f5a1274f58130f0c39b2b802"
                }
            });
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
            return imageUrl;
        } catch (error) {
            console.log('Error uploading image: ', error);
            throw new Error('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Upload the image to Pinata
            const imageUrl = await uploadToPinata();

            // Add the game to the blockchain
            const tx = await contract.addGame(
                formData.game_name,
                formData.game_studio,
                formData.game_description,
                formData.game_price, // Send price in Wei
                imageUrl, // Use the image URL from Pinata
                formData.category, // Include the game category in the transaction
            );

            await tx.wait(); // Wait for transaction confirmation
            alert('Game added to blockchain successfully');

            // Clear the form data
            setFormData({
                game_name: '',
                game_studio: '',
                game_price: '',
                game_description: '',
                category: '', // Reset the category field
                image_url: ''
            });

            navigate("/admin");
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

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm mb-2">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="racing">Racing</option>
                        <option value="war">War</option>
                        <option value="strategy">Strategy</option>
                        <option value="role-playing">Role-Playing</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="image_url" className="block text-sm mb-2">Upload Image</label>
                    <input
                        type="file"
                        id="image_url"
                        name="image_url"
                        onChange={handleImageChange}
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
