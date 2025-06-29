# GaiaScope!

GaiaScope is an interactive globe visualization app for exploring UN Sustainable Development Goals (SDGs), pollution, and climate risk data by country. It features a 3D globe, SDG charts, Gemini-powered Q&A, and dynamic overlays.

## Features
- Interactive 3D globe (Globe.gl + Three.js)
- SDG, pollution, and climate overlays
- Country info panel with SDG metrics
- Bar chart for SDG 1–17
- Gemini AI chat for Q&A about sustainability
- Responsive Tailwind CSS UI

## Tech Stack
- Vite + React
- Tailwind CSS
- Three.js, Globe.gl
- Chart.js, react-chartjs-2
- Axios
- Google Generative AI (Gemini)

## Getting Started

### 1. Install dependencies:
```sh
npm install
```

### 2. Set up Gemini API:
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory:
```sh
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Run the app:
```sh
npm run dev
```

### 4. Open in browser:
Visit [http://localhost:5173](http://localhost:5173)

## Project Structure
- `src/components/` – React UI components
- `src/services/` – API services (Gemini integration)
- `public/data/` – Mock JSON data for SDGs, pollution, metadata

## Gemini Chat Features
The chat component is specifically trained to help with:
- UN Sustainable Development Goals (SDGs) information
- Environmental data and statistics
- Climate change impacts and solutions
- Country-specific sustainability information
- Pollution data and environmental health
- Global development indicators

## Deployment
Deploy easily to Vercel or Netlify. Push to GitHub and connect your repo.
**Note:** Make sure to add your `VITE_GEMINI_API_KEY` as an environment variable in your deployment platform.

---

© 2025 GaiaScope
