import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Create a model instance - using the free tier model
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

// Context for SDG-related queries
const SDG_CONTEXT = `You are an AI assistant specialized in Sustainable Development Goals (SDGs), environmental data, climate change, and global sustainability. You help users understand:

- The 17 UN Sustainable Development Goals
- Environmental data and statistics
- Climate change impacts and solutions
- Country-specific sustainability information
- Pollution data and environmental health
- Global development indicators

Keep responses informative, accurate, and helpful. If you don't have specific data, provide general guidance and suggest where users might find more detailed information.`;

export const sendMessageToGemini = async (userMessage, conversationHistory = []) => {
  // Check if API key is configured
  if (!API_KEY || !genAI || !model) {
    console.log('API Key status:', {
      hasKey: !!API_KEY,
      keyLength: API_KEY ? API_KEY.length : 0,
      hasGenAI: !!genAI,
      hasModel: !!model
    });
    return {
      success: false,
      text: "Gemini API is not configured. Please add your VITE_GEMINI_API_KEY to the .env file. Get your API key from https://makersuite.google.com/app/apikey",
    };
  }

  try {
    console.log('Attempting Gemini API call with key length:', API_KEY.length);
    
    // Prepare the conversation history
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Start a chat session
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send the message with context
    const prompt = `${SDG_CONTEXT}\n\nUser question: ${userMessage}`;
    console.log('Sending prompt to Gemini...');
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    console.log('Gemini response received successfully');
    return {
      success: true,
      text: response.text(),
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Provide more specific error messages
    let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    
    if (error.message.includes('API_KEY')) {
      errorMessage = "Invalid API key. Please check your VITE_GEMINI_API_KEY in the .env file.";
    } else if (error.message.includes('quota')) {
      errorMessage = "API quota exceeded. Please check your Google AI Studio usage limits.";
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage = "Network error. Please check your internet connection and try again.";
    } else if (error.message.includes('model')) {
      errorMessage = "Model not available. Please check if you have access to the selected Gemini model.";
    }
    
    return {
      success: false,
      text: errorMessage,
      error: error.message
    };
  }
};

export default sendMessageToGemini; 