import React, { useEffect, useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15); // Set number of transactions per page
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions from the server
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/transaction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`, // Use your token mechanism
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          const error = await response.json();
          setError(error.message);
        }
      } catch (err) {
        setError('Error fetching transactions');
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
                <td className="p-4">${transaction.gamePrice}</td>
                <td className="p-4">{transaction.userEmail}</td>
                <td className="p-4">{new Date(transaction.createdAt).toLocaleDateString()}</td>
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
