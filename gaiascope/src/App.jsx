import React, { useState, useEffect } from 'react';
import GlobeView from './components/GlobeView';
import CountryInfoPanel from './components/CountryInfoPanel';
import CountryInfo from './components/SDGChart';
import GeminiChatBox from './components/GeminiChatBox';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mode, setMode] = useState('base');
  const [messages, setMessages] = useState([]);
  const [mockData, setMockData] = useState(null);
  const [showMainApp, setShowMainApp] = useState(false);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [countryQuery, setCountryQuery] = useState('');

  // Load mock data on component mount
  useEffect(() => {
    fetch('/data/mock.json')
      .then(response => response.json())
      .then(data => setMockData(data))
      .catch(error => console.error('Error loading mock data:', error));
  }, []);

  // When searchedCountry changes, update selected country
  useEffect(() => {
    if (!searchedCountry) {
      return;
    }
    
    // Set the selected country to the searched country
    setSelectedCountry({ name: searchedCountry, code: '' });
  }, [searchedCountry]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleModeChange = (newMode) => setMode(newMode);

  const handleSend = (text) => {
    setMessages([...messages, { role: 'user', text }]);
    
    // Simulate Gemini response
    setTimeout(() => {
      const responses = [
        "I can help you with information about environmental data and sustainability.",
        "That's an interesting question about environmental challenges.",
        "Let me provide you with some insights about this topic.",
        "Based on the available data, I can share some relevant information."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', text: randomResponse }]);
    }, 1000);
  };

  const handleStartApp = () => {
    setShowMainApp(true);
  };

  const handleCountrySearch = (e) => {
    e.preventDefault();
    setSearchedCountry(countryQuery.trim());
  };

  if (!showMainApp) {
    return <LandingPage onStart={handleStartApp} />;
  }

  return (
    <div className="relative w-full h-full">
      {/* Search bar at top right */}
      <form onSubmit={handleCountrySearch} className="absolute top-4 right-4 z-50">
        <input
          type="text"
          placeholder="Search country..."
          value={countryQuery}
          onChange={e => setCountryQuery(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring w-64"
        />
      </form>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
        <div className="md:w-2/3 w-full h-1/2 md:h-full">
          <GlobeView onCountrySelect={handleCountrySelect} mode={mode} searchedCountry={searchedCountry} />
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-4 p-4 h-1/2 md:h-full overflow-y-auto">
          <CountryInfoPanel country={selectedCountry} onModeChange={handleModeChange} mode={mode} />
          <CountryInfo country={selectedCountry} />
          <GeminiChatBox onSend={handleSend} messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default App;
