import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const CheckboxMultiSelect = ({ options, selectedValues, onChange, label, disabled, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((item) => item !== value));
    }
  };

  const getDisplayValue = () => {
    if (loading) return `Loading ${label.toLowerCase()}...`;
    if (selectedValues.length === 0) return `Select ${label.toLowerCase()}`;
    if (selectedValues.length === options.length && options.length > 0) return `All ${label.toLowerCase()} selected`;
    return selectedValues
      .map((id) => options.find((opt) => opt.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || loading}
      >
        <span>{getDisplayValue()}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-gray-600">Loading...</div>
          ) : options.length === 0 ? (
            <div className="p-3 text-gray-600">No {label.toLowerCase()} available</div>
          ) : (
            options.map((option) => (
              <label key={option.id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.id}
                  checked={selectedValues.includes(option.id)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-gray-800">{option.name}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CheckboxMultiSelect;