import React, { useState } from 'react';
import ServiceSection from './ ServiceSection.tsx';

const ServiceApp = () => {
  const [currentType, setCurrentType] = useState('sell');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentType('sell')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentType === 'sell'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sell Services
            </button>
            <button
              onClick={() => setCurrentType('buy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentType === 'buy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Buy Services
            </button>
          </div>
        </div>

        <ServiceSection type={currentType} />
      </div>
    </div>
  );
};

export default ServiceApp;