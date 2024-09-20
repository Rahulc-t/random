import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditGame = () => {
  const { id } = useParams(); // Get the game ID from URL parameters
  const navigate = useNavigate();
  
  const [game, setGame] = useState({
    game_name: '',
    game_Id: '',
    game_studio: '',
    game_price: '',
    game_description: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch game details
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/editsgame/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}` // Use your token mechanism
          }
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

    fetchGameDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/admin/editgame/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}` // Use your token mechanism
        },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        setSuccess('Game updated successfully');
        setError(null);
        navigate('/viewgames'); // Redirect after successful update
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError('Error updating game');
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
          <label htmlFor="game_name" className="block text-sm mb-2">
            Game Name
          </label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={game.game_name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="game_Id" className="block text-sm mb-2">
            Game ID
          </label>
          <input
            type="text"
            id="game_Id"
            name="game_Id"
            value={game.game_Id}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="game_studio" className="block text-sm mb-2">
            Game Studio
          </label>
          <input
            type="text"
            id="game_studio"
            name="game_studio"
            value={game.game_studio}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="game_price" className="block text-sm mb-2">
            Game Price
          </label>
          <input
            type="text"
            id="game_price"
            name="game_price"
            value={game.game_price}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="game_description" className="block text-sm mb-2">
            Game Description
          </label>
          <textarea
            id="game_description"
            name="game_description"
            value={game.game_description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
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
