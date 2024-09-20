import React from 'react';

const SignupFooter = () => {
  return (
    <div className="bg-black text-white py-6 px-8 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">New to Steam?</h2>
        <p className="mt-2 text-sm">
          It's free and easy. Discover thousands of games to play with millions of new friends.
        </p>
        <a href="/signup" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create an account
        </a>
      </div>
      <div>
        <a href="#" className="text-sm text-blue-300 hover:text-blue-400">Learn more about Steam</a>
      </div>
    </div>
  )
}

export default SignupFooter;
