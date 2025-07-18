import React, { useState, useEffect } from 'react';

const OrderHistorySection = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const groupName = localStorage.getItem("groupName");

  const fetchUsers = async () => {
    try {
      let apiUrl;

      if (groupName === 'admin') {
        apiUrl = `${process.env.REACT_APP_API_URL}/transactions`;
      } else {
        apiUrl = `${process.env.REACT_APP_API_URL}/transactions?userId=${userId}`;
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data.transactions || []);

    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Id</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Memo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Asset Code</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.id}
                  </td>

                  <td className={`px-6 py-4 text-sm font-medium ${order.transaction_type === 'sell'
                      ? 'text-red-800  rounded-full px-3 py-1 inline-block'
                      : order.transaction_type === 'buy'
                        ? 'text-green-800  rounded-full px-3 py-1 inline-block'
                        : 'text-gray-900'
                    }`}>
                    {order.transaction_type}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">{order.memo}</td>

                  <td className="px-6 py-4 text-sm text-gray-700">{order.asset_code}</td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${order.amount}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.tx_hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySection;