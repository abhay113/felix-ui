import React from 'react';

const NavigationItem = ({ id, icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-600/20 hover:text-blue-800'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default NavigationItem;