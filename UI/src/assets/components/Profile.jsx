import React, { useEffect, useState } from 'react';
import avatar from '../images/avatar.jpg'; // Ensure this image exists in your directory

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    badges: 0,
  });
  const [games, setGames] = useState([]); // Store purchased games
  const [loading, setLoading] = useState(true);

  // Fetch user profile and games from the API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        const data = await response.json();

        // Remove duplicate games based on gameId
        const uniqueGames = Array.from(
          new Map(data.games.map((game) => [game.gameId, game])).values()
        );

        // Set the user details and unique games
        setUserDetails(data.user); // Data returned by the backend for user details
        setGames(uniqueGames); // Filtered unique games

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data', err);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* User Details Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-700"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{userDetails.username || 'Username'}</h1>
            <p className="text-gray-400">{userDetails.name || 'User Name'}</p>
            <p className="text-gray-500 mt-2">{userDetails.email || 'email@example.com'}</p>
          </div>
        </div>
      </div>

      {/* My Games Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">My Games</h2>
        <div className="flex flex-col space-y-4"> {/* Stacked games vertically */}
          {games.length > 0 ? (
            games.map((game, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <div className="flex items-center">
                  <img
                    src={game.imageurl || "https://via.placeholder.com/80"} // Display actual game image
                    alt={game.gameName}
                    className="w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold">{game.gameName}</h3>
                    <p className="text-sm text-gray-400">Price: {game.gamePrice} ETH</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="text-gray-400">{game.transactionId}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No games found.</p>
          )}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <div className="flex space-x-4">
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">{userDetails.badges || 0}</p>
            <p className="text-sm text-gray-400">Badges</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md text-center">
            <p className="text-2xl font-bold">{games.length}</p>
            <p className="text-sm text-gray-400">Games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
