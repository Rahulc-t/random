import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { GameModuleGameStore } from "../../scdata/deployed_addresses.json"; // Import contract address
import { abi } from '../../scdata/GameStore.json'; // Import contract ABI

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15); // Set number of transactions per page
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions from the smart contract
    const fetchTransactions = async () => {
      try {
        // Connect to the contract using ethers.js
        if (window.ethereum) {
          // Use a provider for read-only operations (view functions)
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(GameModuleGameStore, abi, provider);

          // Call the smart contract function to get all transactions
          const transactionsFromContract = await contract.getAllTransactions();
          console.log(transactionsFromContract)

          // Process transactions if necessary (depending on how the contract returns the data)
          const formattedTransactions = transactionsFromContract.map((tx) => ({
            transactionId: tx.transactionId.toString(),
            gameName: tx.gameName,
            gamePrice: ethers.formatUnits(tx.gamePrice, 'ether'), // Convert price from wei to ether
            userEmail: tx.userEmail,
            createdAt: new Date(tx.createdAt * 1000), // Assuming createdAt is in UNIX timestamp
          }));

          setTransactions(formattedTransactions);
        } else {
          setError('MetaMask not detected');
        }
      } catch (err) {
        setError('Error fetching transactions from the blockchain');
        console.error(err);
      }
    };

    fetchTransactions();
  }, []);

  // Get current transactions to display on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#1b2838] py-12 flex flex-col items-center">
                    <a href="/admin"><button className='bg-red-400 mt-6 mb-6 p-2 rounded-lg'>Home</button></a>

      <h1 className="text-5xl font-extrabold text-white mb-12">Transactions</h1>
      
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      
      <div className="w-full max-w-6xl">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Game Name</th>
              <th className="p-4">Game Price</th>
              <th className="p-4">User Email</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.transactionId} className="bg-gray-700 border-b border-gray-600">
                <td className="p-4">{transaction.transactionId}</td>
                <td className="p-4">{transaction.gameName}</td>
                <td className="p-4">{transaction.gamePrice} ETH</td>
                <td className="p-4">{transaction.userEmail}</td>
                <td className="p-4">{transaction.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
