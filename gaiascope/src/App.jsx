import React, { useState, useEffect } from 'react';
import GlobeView from './components/GlobeView';
import CountryInfoPanel from './components/CountryInfoPanel';
import SDGChart from './components/SDGChart';
import GeminiChatBox from './components/GeminiChatBox';
import LandingPage from './components/LandingPage';
import { sendMessageToGemini } from './services/geminiService';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sdgData, setSdgData] = useState(null);
  const [mode, setMode] = useState('base');
  const [messages, setMessages] = useState([]);
  const [mockData, setMockData] = useState(null);
  const [showMainApp, setShowMainApp] = useState(false);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load mock data on component mount
  useEffect(() => {
    fetch('/data/mock.json')
      .then(response => response.json())
      .then(data => setMockData(data))
      .catch(error => console.error('Error loading mock data:', error));
  }, []);

  // When searchedCountry changes, update info panel and SDG data
  useEffect(() => {
    if (!searchedCountry) {
      setCountryInfo(null);
      setSdgData(null);
      return;
    }
    // Find country code from geojson (or use mockData if available)
    // For now, just set name and code
    let code = '';
    // Try to find code from mockData.metadata if available
    if (mockData && mockData.metadata) {
      const meta = mockData.metadata.find(m => m.name.toLowerCase() === searchedCountry.toLowerCase());
      if (meta) code = meta.code || meta.ISO_A2 || '';
    }
    setCountryInfo({ name: searchedCountry, code });
    // Find SDG data for the searched country
    if (mockData) {
      const countrySdgData = mockData.sdg.find(item => 
        item.country.toLowerCase() === searchedCountry.toLowerCase()
      );
      if (countrySdgData) {
        setSdgData({
          scores: countrySdgData.scores,
          country: searchedCountry
        });
      } else {
        // Generate random SDG scores for demo
        const randomScores = Array.from({ length: 17 }, () => 
          Math.floor(Math.random() * 40) + 40
        );
        setSdgData({
          scores: randomScores,
          country: searchedCountry
        });
      }
    }
  }, [searchedCountry, mockData]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    
    // Find SDG data for the selected country
    if (mockData) {
      const countrySdgData = mockData.sdg.find(item => 
        item.country.toLowerCase() === country.name.toLowerCase()
      );
      
      if (countrySdgData) {
        setSdgData({
          scores: countrySdgData.scores,
          country: country.name
        });
      } else {
        // Generate random SDG scores for demo
        const randomScores = Array.from({ length: 17 }, () => 
          Math.floor(Math.random() * 40) + 40
        );
        setSdgData({
          scores: randomScores,
          country: country.name
        });
      }
    }
  };

  const handleModeChange = (newMode) => setMode(newMode);

  const handleSend = async (text) => {
    // Add user message immediately
    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get response from Gemini API
      const response = await sendMessageToGemini(text, messages);
      
      // Add assistant response
      const assistantMessage = { 
        role: 'assistant', 
        text: response.text 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        text: "I'm sorry, I encountered an error while processing your request. Please try again." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          <GlobeView searchedCountry={searchedCountry} mode={mode} />
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-4 p-4 h-1/2 md:h-full overflow-y-auto">
          <CountryInfoPanel country={countryInfo} sdgData={sdgData} onModeChange={handleModeChange} mode={mode} />
          <SDGChart sdgScores={sdgData?.scores} />
          <GeminiChatBox onSend={handleSend} messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
