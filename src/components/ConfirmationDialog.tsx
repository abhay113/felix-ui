import React from 'react';
import { Loader2 } from 'lucide-react';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, service, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Buy Services</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to buy "<span className="font-semibold">{service?.service_name}</span>" for ${service?.amount}?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`px-4 py-2 rounded transition-colors ${
              isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded transition-colors flex items-center space-x-2 ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm Purchase</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;