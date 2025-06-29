import React, { useState } from 'react';

const CountryInfo = ({ country }) => {
  const [activeSection, setActiveSection] = useState(null);

  // Add custom CSS animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Mock data for environmental information
  const getCountryInfo = (countryName) => {
    // Normalize country name for better matching
    const normalizedName = countryName?.toLowerCase().trim();
    
    const info = {
      'united states': {
        crisis: "Climate change impacts include increased wildfires in California, severe hurricanes in the Gulf Coast, and rising sea levels affecting coastal communities. Air pollution remains a concern in major urban areas.",
        habitats: "Diverse ecosystems including temperate forests in the Northeast, deserts in the Southwest, grasslands in the Great Plains, and tropical ecosystems in Hawaii and Florida.",
        species: "Home to iconic species like the bald eagle, grizzly bear, and bison. Endangered species include the Florida panther, California condor, and various whale species.",
        crisisLocations: [
          { name: "California Wildfires", lat: 36.7783, lng: -119.4179, image: "🔥", imageUrl: "/images/wildfires.jpg" },
          { name: "Gulf Coast Hurricanes", lat: 29.7604, lng: -95.3698, image: "🌊", imageUrl: "/images/hurricanes.jpg" },
          { name: "Air Pollution - LA", lat: 34.0522, lng: -118.2437, image: "☁️", imageUrl: "/images/pollution.jpg" }
        ],
        habitatLocations: [
          { name: "Northeast Forests", lat: 42.3601, lng: -71.0589, image: "🌲", imageUrl: "/images/forests.jpg" },
          { name: "Southwest Deserts", lat: 36.1699, lng: -115.1398, image: "🏜️", imageUrl: "/images/deserts.jpg" },
          { name: "Great Plains", lat: 39.7392, lng: -104.9903, image: "🌾", imageUrl: "/images/plains.jpg" },
          { name: "Hawaiian Tropics", lat: 21.3099, lng: -157.8581, image: "🌺", imageUrl: "/images/tropics.jpg" }
        ],
        speciesLocations: [
          { name: "Florida Panther", lat: 25.7617, lng: -80.1918, image: "🐆", imageUrl: "/images/florida-panther.jpg" },
          { name: "California Condor", lat: 34.0522, lng: -118.2437, image: "🦅", imageUrl: "/images/california-condor.jpg" },
          { name: "Bald Eagle", lat: 47.6062, lng: -122.3321, image: "🦅", imageUrl: "/images/bald-eagle.jpg" },
          { name: "Grizzly Bear", lat: 44.0582, lng: -121.3153, image: "🐻", imageUrl: "/images/grizzly-bear.jpg" }
        ]
      },
      'canada': {
        crisis: "Melting permafrost in the Arctic, increasing forest fires due to climate change, and threats to marine ecosystems from overfishing and pollution.",
        habitats: "Vast boreal forests, Arctic tundra, temperate rainforests on the Pacific coast, and extensive freshwater ecosystems including the Great Lakes.",
        species: "Notable species include the polar bear, moose, and beaver. Endangered species include the North Atlantic right whale, woodland caribou, and various migratory birds.",
        crisisLocations: [
          { name: "Arctic Permafrost", lat: 69.2167, lng: -105.7325, image: "❄️" },
          { name: "Forest Fires", lat: 55.0000, lng: -115.0000, image: "🔥" },
          { name: "Marine Pollution", lat: 44.3894, lng: -64.2192, image: "🌊" }
        ],
        habitatLocations: [
          { name: "Boreal Forests", lat: 55.0000, lng: -100.0000, image: "🌲" },
          { name: "Arctic Tundra", lat: 69.2167, lng: -105.7325, image: "🏔️" },
          { name: "Pacific Rainforest", lat: 49.2827, lng: -123.1207, image: "🌧️" },
          { name: "Great Lakes", lat: 43.6532, lng: -79.3832, image: "🏞️" }
        ],
        speciesLocations: [
          { name: "Polar Bear", lat: 69.2167, lng: -105.7325, image: "🐻‍❄️" },
          { name: "North Atlantic Right Whale", lat: 44.3894, lng: -64.2192, image: "🐋" },
          { name: "Woodland Caribou", lat: 55.0000, lng: -100.0000, image: "🦌" },
          { name: "Moose", lat: 45.5017, lng: -73.5673, image: "🦌" }
        ]
      },
      'brazil': {
        crisis: "Deforestation of the Amazon rainforest, illegal logging, and threats to indigenous communities. Climate change affecting agricultural regions and coastal areas.",
        habitats: "The Amazon rainforest, Atlantic Forest, Cerrado savanna, Pantanal wetlands, and extensive coastal ecosystems including mangroves.",
        species: "Rich biodiversity including jaguars, capybaras, and macaws. Endangered species include the golden lion tamarin, Amazon river dolphin, and various tree frog species.",
        crisisLocations: [
          { name: "Amazon Deforestation", lat: -3.4653, lng: -58.3804, image: "🌳" },
          { name: "Illegal Logging", lat: -15.7801, lng: -47.9292, image: "🪓" },
          { name: "Indigenous Threats", lat: -3.1190, lng: -60.0217, image: "🏹" }
        ],
        habitatLocations: [
          { name: "Amazon Rainforest", lat: -3.4653, lng: -58.3804, image: "🌴" },
          { name: "Atlantic Forest", lat: -23.5505, lng: -46.6333, image: "🌿" },
          { name: "Cerrado Savanna", lat: -15.7801, lng: -47.9292, image: "🌾" },
          { name: "Pantanal Wetlands", lat: -20.4486, lng: -54.6295, image: "🌊" }
        ],
        speciesLocations: [
          { name: "Golden Lion Tamarin", lat: -22.9068, lng: -43.1729, image: "🐒" },
          { name: "Amazon River Dolphin", lat: -3.4653, lng: -58.3804, image: "🐬" },
          { name: "Jaguar", lat: -15.7801, lng: -47.9292, image: "🐆" },
          { name: "Macaw", lat: -3.1190, lng: -60.0217, image: "🦜" }
        ]
      },
      'australia': {
        crisis: "Increasing frequency of bushfires, coral bleaching of the Great Barrier Reef, and threats to unique ecosystems from invasive species and climate change.",
        habitats: "Diverse landscapes including the Outback desert, tropical rainforests in Queensland, temperate forests in Tasmania, and extensive coastal ecosystems.",
        species: "Unique wildlife including kangaroos, koalas, and platypus. Endangered species include the Tasmanian devil, various wallaby species, and the southern cassowary.",
        crisisLocations: [
          { name: "Bushfires", lat: -33.8688, lng: 151.2093, image: "🔥" },
          { name: "Great Barrier Reef Bleaching", lat: -16.9203, lng: 145.7710, image: "🐠" },
          { name: "Invasive Species", lat: -25.2744, lng: 133.7751, image: "🐰" }
        ],
        habitatLocations: [
          { name: "Outback Desert", lat: -25.2744, lng: 133.7751, image: "🏜️" },
          { name: "Queensland Rainforest", lat: -16.9203, lng: 145.7710, image: "🌴" },
          { name: "Tasmanian Forests", lat: -42.8821, lng: 147.3272, image: "🌲" },
          { name: "Coastal Ecosystems", lat: -33.8688, lng: 151.2093, image: "🏖️" }
        ],
        speciesLocations: [
          { name: "Tasmanian Devil", lat: -42.8821, lng: 147.3272, image: "😈" },
          { name: "Koala", lat: -33.8688, lng: 151.2093, image: "🐨" },
          { name: "Kangaroo", lat: -25.2744, lng: 133.7751, image: "🦘" },
          { name: "Platypus", lat: -35.2809, lng: 149.1300, image: "🦆" }
        ]
      },
      'india': {
        crisis: "Severe air pollution in major cities, water scarcity in many regions, and threats to wildlife from habitat destruction and human-wildlife conflict.",
        habitats: "Himalayan mountains, Thar Desert, Western Ghats rainforests, Gangetic plains, and extensive coastal ecosystems including mangroves.",
        species: "Iconic species include Bengal tigers, Asian elephants, and Indian rhinoceros. Endangered species include the snow leopard, red panda, and various vulture species.",
        crisisLocations: [
          { name: "Delhi Air Pollution", lat: 28.7041, lng: 77.1025, image: "☁️" },
          { name: "Water Scarcity", lat: 19.0760, lng: 72.8777, image: "💧" },
          { name: "Habitat Destruction", lat: 12.9716, lng: 77.5946, image: "🏗️" }
        ],
        habitatLocations: [
          { name: "Himalayan Mountains", lat: 34.0522, lng: 74.3289, image: "🏔️" },
          { name: "Thar Desert", lat: 26.9124, lng: 70.9122, image: "🏜️" },
          { name: "Western Ghats", lat: 12.9716, lng: 77.5946, image: "🌿" },
          { name: "Gangetic Plains", lat: 25.2048, lng: 55.2708, image: "🌾" }
        ],
        speciesLocations: [
          { name: "Bengal Tiger", lat: 23.2599, lng: 77.4126, image: "🐯" },
          { name: "Snow Leopard", lat: 34.0522, lng: 74.3289, image: "🐆" },
          { name: "Asian Elephant", lat: 12.9716, lng: 77.5946, image: "🐘" },
          { name: "Red Panda", lat: 27.7172, lng: 85.3240, image: "🐼" }
        ]
      },
      'china': {
        crisis: "Severe air pollution in urban areas, water pollution affecting major rivers, and habitat destruction threatening biodiversity across the country.",
        habitats: "Himalayan mountains, Gobi Desert, temperate forests in the northeast, tropical rainforests in the south, and extensive grasslands.",
        species: "Famous for giant pandas, golden monkeys, and snow leopards. Endangered species include the Yangtze river dolphin, Chinese alligator, and various crane species.",
        crisisLocations: [
          { name: "Beijing Air Pollution", lat: 39.9042, lng: 116.4074, image: "☁️" },
          { name: "Yangtze River Pollution", lat: 31.2304, lng: 121.4737, image: "🌊" },
          { name: "Habitat Destruction", lat: 23.1291, lng: 113.2644, image: "🏗️" }
        ],
        habitatLocations: [
          { name: "Himalayan Mountains", lat: 29.6500, lng: 91.1000, image: "🏔️" },
          { name: "Gobi Desert", lat: 42.0000, lng: 105.0000, image: "🏜️" },
          { name: "Northeast Forests", lat: 45.7417, lng: 126.9620, image: "🌲" },
          { name: "Southern Rainforests", lat: 23.1291, lng: 113.2644, image: "🌴" }
        ],
        speciesLocations: [
          { name: "Giant Panda", lat: 30.2638, lng: 102.8055, image: "🐼" },
          { name: "Yangtze River Dolphin", lat: 31.2304, lng: 121.4737, image: "🐬" },
          { name: "Snow Leopard", lat: 29.6500, lng: 91.1000, image: "🐆" },
          { name: "Golden Monkey", lat: 30.2638, lng: 102.8055, image: "🐒" }
        ]
      },
      'russia': {
        crisis: "Melting permafrost in Siberia, increasing forest fires, and threats to Arctic ecosystems from climate change and industrial development.",
        habitats: "Vast taiga forests, Arctic tundra, steppe grasslands, and extensive freshwater ecosystems including Lake Baikal.",
        species: "Home to Siberian tigers, brown bears, and reindeer. Endangered species include the Amur leopard, Siberian crane, and various sturgeon species.",
        crisisLocations: [
          { name: "Siberian Permafrost", lat: 66.0000, lng: 100.0000, image: "❄️" },
          { name: "Forest Fires", lat: 55.7558, lng: 37.6176, image: "🔥" },
          { name: "Arctic Threats", lat: 69.2167, lng: 33.0000, image: "🌊" }
        ],
        habitatLocations: [
          { name: "Taiga Forests", lat: 55.7558, lng: 37.6176, image: "🌲" },
          { name: "Arctic Tundra", lat: 69.2167, lng: 33.0000, image: "🏔️" },
          { name: "Steppe Grasslands", lat: 55.7558, lng: 37.6176, image: "🌾" },
          { name: "Lake Baikal", lat: 53.5587, lng: 108.1650, image: "🏞️" }
        ],
        speciesLocations: [
          { name: "Siberian Tiger", lat: 43.5854, lng: 131.9289, image: "🐯" },
          { name: "Amur Leopard", lat: 43.5854, lng: 131.9289, image: "🐆" },
          { name: "Brown Bear", lat: 55.7558, lng: 37.6176, image: "🐻" },
          { name: "Siberian Crane", lat: 66.0000, lng: 100.0000, image: "🦢" }
        ]
      },
      'south africa': {
        crisis: "Drought affecting agricultural regions, threats to wildlife from poaching, and coastal pollution affecting marine ecosystems.",
        habitats: "Savanna grasslands, fynbos shrublands, desert regions, and extensive coastal ecosystems including the Cape Floral Kingdom.",
        species: "Famous for the Big Five (lion, elephant, buffalo, leopard, rhinoceros). Endangered species include the black rhinoceros, African penguin, and various antelope species.",
        crisisLocations: [
          { name: "Drought Areas", lat: -26.2041, lng: 28.0473, image: "🌵" },
          { name: "Poaching Threats", lat: -25.7461, lng: 28.1881, image: "🦏" },
          { name: "Coastal Pollution", lat: -33.9249, lng: 18.4241, image: "🌊" }
        ],
        habitatLocations: [
          { name: "Savanna Grasslands", lat: -25.7461, lng: 28.1881, image: "🌾" },
          { name: "Fynbos Shrublands", lat: -33.9249, lng: 18.4241, image: "🌿" },
          { name: "Desert Regions", lat: -26.2041, lng: 28.0473, image: "🏜️" },
          { name: "Cape Floral Kingdom", lat: -33.9249, lng: 18.4241, image: "🌸" }
        ],
        speciesLocations: [
          { name: "Black Rhinoceros", lat: -25.7461, lng: 28.1881, image: "🦏" },
          { name: "African Penguin", lat: -33.9249, lng: 18.4241, image: "🐧" },
          { name: "Lion", lat: -25.7461, lng: 28.1881, image: "🦁" },
          { name: "Elephant", lat: -25.7461, lng: 28.1881, image: "🐘" }
        ]
      }
    };
    
    return info[normalizedName] || {
      crisis: "Environmental challenges vary across regions, including climate change impacts, habitat destruction, and pollution affecting local ecosystems.",
      habitats: "Diverse ecosystems including forests, grasslands, deserts, and coastal regions that support unique biodiversity.",
      species: "Rich wildlife diversity with many endemic and endangered species that require conservation efforts to protect their populations.",
      crisisLocations: [],
      habitatLocations: [],
      speciesLocations: []
    };
  };

  const countryInfo = country ? getCountryInfo(country.name) : null;

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (!country) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow h-64 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">Select a Country</p>
          <p className="text-sm">Click on any country to view environmental information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow h-64 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Environmental Overview: {country.name}
      </h3>
      
      <div className="space-y-4">
        {/* Environmental Crisis Section */}
        <button
          onClick={() => handleSectionClick('crisis')}
          className={`w-full text-left p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-105 ${
            activeSection === 'crisis' 
              ? 'bg-red-200 dark:bg-red-800 border-red-600 shadow-xl ring-2 ring-red-300 dark:ring-red-600' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
          }`}
        >
          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Environmental Challenges
            {activeSection === 'crisis' && (
              <span className="ml-2 text-xs bg-red-100 dark:bg-red-800 px-2 py-1 rounded-full">
                📍 Active - {countryInfo?.crisisLocations?.length || 0} locations
              </span>
            )}
          </h4>
          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
            {countryInfo.crisis}
          </p>
        </button>

        {/* Habitats Section */}
        <button
          onClick={() => handleSectionClick('habitats')}
          className={`w-full text-left p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-105 ${
            activeSection === 'habitats' 
              ? 'bg-green-200 dark:bg-green-800 border-green-600 shadow-xl ring-2 ring-green-300 dark:ring-green-600' 
              : 'bg-green-50 dark:bg-green-900/20 border-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
          }`}
        >
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Natural Habitats
            {activeSection === 'habitats' && (
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 px-2 py-1 rounded-full">
                📍 Active - {countryInfo?.habitatLocations?.length || 0} locations
              </span>
            )}
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            {countryInfo.habitats}
          </p>
        </button>

        {/* Species Section */}
        <button
          onClick={() => handleSectionClick('species')}
          className={`w-full text-left p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-105 ${
            activeSection === 'species' 
              ? 'bg-blue-200 dark:bg-blue-800 border-blue-600 shadow-xl ring-2 ring-blue-300 dark:ring-blue-600' 
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
          }`}
        >
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Wildlife & Species
            {activeSection === 'species' && (
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full">
                📍 Active - {countryInfo?.speciesLocations?.length || 0} locations
              </span>
            )}
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            {countryInfo.species}
          </p>
        </button>
      </div>

      {/* Floating Location Bubbles */}
      {activeSection && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {(() => {
            const locationMap = {
              crisis: 'crisisLocations',
              habitats: 'habitatLocations',
              species: 'speciesLocations'
            };

            const activeLocations = countryInfo[locationMap[activeSection]];

            return activeLocations?.length > 0 && activeLocations.map((location, index) => {
              // Simple percentage-based positioning
              const leftPercent = 10; // 10% from left
              const topPercent = 15 + (index * 15); // 15% from top, then 15% spacing
              
              return (
                <div
                  key={index}
                  className="absolute bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl border-2 border-gray-300 dark:border-gray-600 transition-all duration-500 ease-out"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    animation: 'fadeInScale 0.6s ease-out forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                    {/* Placeholder for actual image */}
                    <div className="text-2xl">{location.image}</div>
                    {/* Uncomment when you have actual images:
                    <img 
                      src={location.imageUrl} 
                      alt={location.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    */}
                  </div>
                  <div className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium max-w-20 leading-tight">
                    {location.name}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
