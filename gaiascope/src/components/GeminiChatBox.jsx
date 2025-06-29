import React, { useState } from 'react';

const GeminiChatBox = ({ onSend, messages, isLoading = false }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full flex flex-col h-64">
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Gemini Chat</h3>
      
      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <p className="text-sm">Ask questions about SDGs, pollution, or climate data</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? "Please wait..." : "Ask Gemini..."}
          disabled={isLoading}
        />
        <button 
          className={`px-4 py-2 rounded text-sm transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default GeminiChatBox;
