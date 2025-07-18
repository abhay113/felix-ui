import React, { useState, useEffect } from 'react';
import { DollarSign, Monitor, Eye, EyeOff } from 'lucide-react';

const AccountSection = () => {
  const key = localStorage.getItem("public_key");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBalance, setShowBalance] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/account/balance/${key}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data || []);

    } catch (error) {
      console.error('Error fetching users:', error);
      setError(`Failed to load users. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading account details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900">My Account Overview</h2>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 transition-all duration-300 ease-in-out"
        >
          {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span className="font-medium">{showBalance ? 'Hide Details' : 'Show Details'}</span>
        </button>
      </div>

      <hr className="border-t border-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-300 to-purple-300 rounded-3xl p-8 border border-blue-400 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Account Balance(BlueDollar)</h3>
            <DollarSign className="w-8 h-8 text-green-700" />
          </div>
          <div className="text-4xl font-extrabold text-white">
            {showBalance ? `$${users.balances?.blueDollar}` : '••••••'}
          </div>
          <div className="text-sm text-blue-900 mt-2">Current funds available</div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">XLM Credits</h3>
            <Monitor className="w-8 h-8 text-blue-700" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {showBalance ? users.balances?.xlm : '••••'}
          </div>
          <div className="text-base text-gray-600 mt-2">Available for service usage</div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;