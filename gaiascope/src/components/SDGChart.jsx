import React from 'react';

const CountryInfo = ({ country }) => {
  // Mock data for environmental information
  const getCountryInfo = (countryName) => {
    const info = {
      'United States': {
        crisis: "Climate change impacts include increased wildfires in California, severe hurricanes in the Gulf Coast, and rising sea levels affecting coastal communities. Air pollution remains a concern in major urban areas.",
        habitats: "Diverse ecosystems including temperate forests in the Northeast, deserts in the Southwest, grasslands in the Great Plains, and tropical ecosystems in Hawaii and Florida.",
        species: "Home to iconic species like the bald eagle, grizzly bear, and bison. Endangered species include the Florida panther, California condor, and various whale species."
      },
      'Canada': {
        crisis: "Melting permafrost in the Arctic, increasing forest fires due to climate change, and threats to marine ecosystems from overfishing and pollution.",
        habitats: "Vast boreal forests, Arctic tundra, temperate rainforests on the Pacific coast, and extensive freshwater ecosystems including the Great Lakes.",
        species: "Notable species include the polar bear, moose, and beaver. Endangered species include the North Atlantic right whale, woodland caribou, and various migratory birds."
      },
      'Brazil': {
        crisis: "Deforestation of the Amazon rainforest, illegal logging, and threats to indigenous communities. Climate change affecting agricultural regions and coastal areas.",
        habitats: "The Amazon rainforest, Atlantic Forest, Cerrado savanna, Pantanal wetlands, and extensive coastal ecosystems including mangroves.",
        species: "Rich biodiversity including jaguars, capybaras, and macaws. Endangered species include the golden lion tamarin, Amazon river dolphin, and various tree frog species."
      },
      'Australia': {
        crisis: "Increasing frequency of bushfires, coral bleaching of the Great Barrier Reef, and threats to unique ecosystems from invasive species and climate change.",
        habitats: "Diverse landscapes including the Outback desert, tropical rainforests in Queensland, temperate forests in Tasmania, and extensive coastal ecosystems.",
        species: "Unique wildlife including kangaroos, koalas, and platypus. Endangered species include the Tasmanian devil, various wallaby species, and the southern cassowary."
      },
      'India': {
        crisis: "Severe air pollution in major cities, water scarcity in many regions, and threats to wildlife from habitat destruction and human-wildlife conflict.",
        habitats: "Himalayan mountains, Thar Desert, Western Ghats rainforests, Gangetic plains, and extensive coastal ecosystems including mangroves.",
        species: "Iconic species include Bengal tigers, Asian elephants, and Indian rhinoceros. Endangered species include the snow leopard, red panda, and various vulture species."
      },
      'China': {
        crisis: "Severe air pollution in urban areas, water pollution affecting major rivers, and habitat destruction threatening biodiversity across the country.",
        habitats: "Himalayan mountains, Gobi Desert, temperate forests in the northeast, tropical rainforests in the south, and extensive grasslands.",
        species: "Famous for giant pandas, golden monkeys, and snow leopards. Endangered species include the Yangtze river dolphin, Chinese alligator, and various crane species."
      },
      'Russia': {
        crisis: "Melting permafrost in Siberia, increasing forest fires, and threats to Arctic ecosystems from climate change and industrial development.",
        habitats: "Vast taiga forests, Arctic tundra, steppe grasslands, and extensive freshwater ecosystems including Lake Baikal.",
        species: "Home to Siberian tigers, brown bears, and reindeer. Endangered species include the Amur leopard, Siberian crane, and various sturgeon species."
      },
      'South Africa': {
        crisis: "Drought affecting agricultural regions, threats to wildlife from poaching, and coastal pollution affecting marine ecosystems.",
        habitats: "Savanna grasslands, fynbos shrublands, desert regions, and extensive coastal ecosystems including the Cape Floral Kingdom.",
        species: "Famous for the Big Five (lion, elephant, buffalo, leopard, rhinoceros). Endangered species include the black rhinoceros, African penguin, and various antelope species."
      }
    };
    
    return info[countryName] || {
      crisis: "Environmental challenges vary across regions, including climate change impacts, habitat destruction, and pollution affecting local ecosystems.",
      habitats: "Diverse ecosystems including forests, grasslands, deserts, and coastal regions that support unique biodiversity.",
      species: "Rich wildlife diversity with many endemic and endangered species that require conservation efforts to protect their populations."
    };
  };

  const countryInfo = country ? getCountryInfo(country.name) : null;

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
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Environmental Challenges
          </h4>
          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
            {countryInfo.crisis}
          </p>
        </div>

        {/* Habitats Section */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Natural Habitats
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            {countryInfo.habitats}
          </p>
        </div>

        {/* Species Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Wildlife & Species
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            {countryInfo.species}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
