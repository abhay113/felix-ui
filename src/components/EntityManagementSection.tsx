import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import AddEntityDialog from './AddEntityDialog.tsx';
import IssueDialog from './IssueDialog.tsx';

const EntityManagementSection = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/entities`, {
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
      setUsers(data || []);

    } catch (error) {
      console.error('Error fetching users:', error);
      setError(`Failed to load users. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueClick = (user) => {
    setSelectedUser(user);
    setIsIssueDialogOpen(true);
  };

  const handleSubmitIssue = async ({ amount, comment }) => {
    const payload = {
      receiverPublicKey: selectedUser.wallet_public_key,
      amount: String(amount),
      memo: comment,
      walletId: selectedUser.wallet_id
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bluedollar/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'No error message provided' }));
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("Issue Funds API Response:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error issuing funds:", error);
      alert(`Failed to issue funds: ${error.message}`);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Entity Management</h2>
        <button
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Entity</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet Balance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Manager</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Wallet id</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading entities...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-red-500">
                    {error}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No entities found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.entity_name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user?.wallet_balance}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user?.owner_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user?.wallet_public_key
                        ? `${user.wallet_public_key.substring(0, 6)}....${user.wallet_public_key.substring(user.wallet_public_key.length - 6)}`
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <button
                        onClick={() => handleIssueClick(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
                      >
                        Issue
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddUserDialogOpen && (
        <AddEntityDialog
          onClose={() => setIsAddUserDialogOpen(false)}
          onUserAdded={handleUserAdded}
        />
      )}

      {isIssueDialogOpen && selectedUser && (
        <IssueDialog
          onClose={() => setIsIssueDialogOpen(false)}
          onSubmitIssue={handleSubmitIssue}
          selectedEntity={selectedUser}
          entityName={selectedUser.entity_name}
          entityType={selectedUser.type}
          onAmmoutAdded={handleUserAdded}
        />
      )}
    </div>
  );
};

export default EntityManagementSection;