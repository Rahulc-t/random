import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>

                <div className="space-y-4">
                    <button
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => navigate('/addgame')}
                    >
                        Add Game
                    </button>

                    <button
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                        onClick={() => navigate('/viewgames')}
                    >
                        View Games
                    </button>

                    <button
                        className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-300"
                        onClick={() => navigate('/transactions')}
                    >
                        View Transactions
                    </button>
                    <Logout/>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
