import React, { useState } from 'react';

const ExplorePage = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Restaurants');

  const categoryItems = {
    'Restaurants': Array.from({ length: 8 }, (_, index) => ({
      title: `Restaurant ${index + 1}`,
      image: `https://placehold.co/400x300/4F46E5/ffffff?text=Restaurant+${index + 1}`,
    })),
    'Cafes': Array.from({ length: 8 }, (_, index) => ({
      title: `Cafe ${index + 1}`,
      image: `https://placehold.co/400x300/F59E0B/ffffff?text=Cafe+${index + 1}`,
    })),
    'Tourist Sites': Array.from({ length: 8 }, (_, index) => ({
      title: `Tourist Site ${index + 1}`,
      image: `https://placehold.co/400x300/10B981/ffffff?text=Site+${index + 1}`,
    })),
    'Hotel Booking': Array.from({ length: 8 }, (_, index) => ({
      title: `Hotel Booking ${index + 1}`,
      image: `https://placehold.co/400x300/10B971/ffffff?text=Site+${index + 1}`,
    })),
    'Cab Booking': Array.from({ length: 5 }, (_, index) => ({
      title: `Cab Booking ${index + 1}`,
      image: `https://placehold.co/400x300/12B981/ffffff?text=Site+${index + 1}`,
    })),
  };

  const handleItemClick = (title) => {
    console.log(`${title} tapped!`);
  };

  const filteredItems = categoryItems[activeTab]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen text-white font-sans">
      {/* App Bar */}
      <header className=" p-4 shadow-md top-0 z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-sans mb-4 text-center">Explore</h1>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-xl mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Tab Bar */}
          <div className="flex justify-center w-full py-2 overflow-x-auto">
            {Object.keys(categoryItems).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  setSearchQuery(''); // Clear search on tab change
                }}
                className={`flex-shrink-0 px-6 py-2 mx-1 rounded-full font-medium transition-colors
                  ${activeTab === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-9 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-103">
              <button onClick={() => handleItemClick(item.title)} className="w-full text-left focus:outline-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-50 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-center">
                  <p className="font-semibold text-lg">{item.title}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
