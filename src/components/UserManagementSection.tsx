import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import AddUserDialog from './AddUserDialog.tsx';
import IssueDialog from './IssueDialog.tsx';

const UserManagementSection = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getAllUsers`, {
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

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleIssueClick = (user) => {
    setSelectedUser(user);
    setIsIssueDialogOpen(true);
  };

  const handleSubmitIssue = async ({ amount, comment }) => {
    if (selectedUser && selectedUser.walletData) {
      const public_key = selectedUser.walletData.public_key;
      const payload = {
        receiverPublicKey: public_key,
        amount: String(amount),
        memo: comment,
        walletId: selectedUser.walletData.id
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
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet balance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet id</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-red-500">
                    {error}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user?.walletData?.balance}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user?.walletData?.public_key
                        ? `${user.walletData.public_key.substring(0, 6)}....${user.walletData.public_key.substring(user.walletData.public_key.length - 6)}`
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
        <AddUserDialog
          onClose={() => setIsAddUserDialogOpen(false)}
          onUserAdded={handleUserAdded}
        />
      )}

      {isIssueDialogOpen && selectedUser && (
        <IssueDialog
          onClose={() => setIsIssueDialogOpen(false)}
          onSubmitIssue={handleSubmitIssue}
          userName={selectedUser.username}
          onAmmoutAdded={handleUserAdded}
        />
      )}
    </div>
  );
};

export default UserManagementSection;