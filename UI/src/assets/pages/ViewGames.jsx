import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewGames = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/getgames', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}` // Use token for authentication
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGames(data);
                } else {
                    const error = await response.json();
                    alert(`Error fetching games: ${error.message}`);
                }
            } catch (err) {
                alert('Error fetching games');
            }
        };

        fetchGames();
    }, []);

    const handleRemoveGame = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5000/admin/removegame/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}` // Use token for authentication
                },
            });

            if (response.ok) {
                setGames(games.filter(game => game.game_Id !== gameId));
                alert('Game removed successfully');
            } else {
                const error = await response.json();
                alert(`Error removing game: ${error.message}`);
            }
        } catch (err) {
            alert('Error removing game');
        }
    };

    const handleEditGame = (gameId) => {
        navigate(`/editgame/${gameId}`);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-900">
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
                                        onClick={() => navigate(`/editgames/${game.game_Id}`)}
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
