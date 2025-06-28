import React, { useState, useEffect } from 'react';
import GlobeView from './components/GlobeView';
import CountryInfoPanel from './components/CountryInfoPanel';
import SDGChart from './components/SDGChart';
import GeminiChatBox from './components/GeminiChatBox';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sdgData, setSdgData] = useState(null);
  const [mode, setMode] = useState('base');
  const [messages, setMessages] = useState([]);
  const [mockData, setMockData] = useState(null);
  const [showMainApp, setShowMainApp] = useState(false);

  // Load mock data on component mount
  useEffect(() => {
    fetch('/data/mock.json')
      .then(response => response.json())
      .then(data => setMockData(data))
      .catch(error => console.error('Error loading mock data:', error));
  }, []);

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

  const handleSend = (text) => {
    setMessages([...messages, { role: 'user', text }]);
    
    // Simulate Gemini response
    setTimeout(() => {
      const responses = [
        "I can help you with information about SDGs and sustainability data.",
        "That's an interesting question about sustainable development goals.",
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

  if (!showMainApp) {
    return <LandingPage onStart={handleStartApp} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <div className="md:w-2/3 w-full h-1/2 md:h-full">
        <GlobeView onCountrySelect={handleCountrySelect} mode={mode} />
      </div>
      <div className="md:w-1/3 w-full flex flex-col gap-4 p-4 h-1/2 md:h-full overflow-y-auto">
        <CountryInfoPanel country={selectedCountry} sdgData={sdgData} onModeChange={handleModeChange} mode={mode} />
        <SDGChart sdgScores={sdgData?.scores} />
        <GeminiChatBox onSend={handleSend} messages={messages} />
      </div>
    </div>
  );
}

export default App;
