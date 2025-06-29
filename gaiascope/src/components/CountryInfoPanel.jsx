import React from 'react';

const CountryInfoPanel = ({ country, sdgData, onModeChange, mode }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {country?.name || 'Select a country'}
      </h2>
      
      {country && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Click on the globe to select a different country
          </p>
        </div>
      )}
      
      <div className="flex gap-2 my-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Map Mode:</label>
        <select 
          value={mode} 
          onChange={e => onModeChange(e.target.value)} 
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value="base">Base</option>
          <option value="pollution">Pollution</option>
          <option value="climate">Climate Risk</option>
          <option value="sdg">SDG Score</option>
        </select>
      </div>
      
      {!country && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Type a country name on the search bar to view its information</p>
        </div>
      )}
      
      {country && sdgData && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">SDG Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            SDG data will be displayed here when available
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryInfoPanel;
