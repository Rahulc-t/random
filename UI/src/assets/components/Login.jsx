import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Show loading state

    const dataToSend = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        // Login successful, store token if needed
        localStorage.setItem('token', result.token); // Save token in localStorage or cookies

        setLoading(false);

        // Check usertype from response and navigate accordingly
        if (result.userType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }

      } else {
        // Handle error from server
        setError(result.message);
        setLoading(false);
      }
    } catch (err) {
      // Handle any network or other errors
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white py-8 px-10 rounded-lg w-96 mx-auto my-20">
      <h2 className="text-2xl mb-6">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">SIGN IN WITH EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="ml-2 text-sm">Remember me</label>
          </div>
          <a href="/forgot-password" className="text-sm text-blue-300 hover:text-blue-400">Help, I can't sign in</a>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
