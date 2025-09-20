import React, { useState } from 'react';

const MedicalPage = () => {
 
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'City Hospital',
      type: 'Hospital',
      distance: '1.2 km',
      image: 'https://placehold.co/400x300/EF4444/ffffff?text=Hospital'
    },
    {
      name: 'MediCare Clinic',
      type: 'Clinic',
      distance: '2.5 km',
      image: 'https://placehold.co/400x300/F59E0B/ffffff?text=Clinic'
    },
    {
      name: '24x7 Pharmacy',
      type: 'Pharmacy',
      distance: '800 m',
      image: 'https://placehold.co/400x300/34D399/ffffff?text=Pharmacy'
    },
    {
      name: 'First Aid Center',
      type: 'First Aid',
      distance: '3.1 km',
      image: 'https://placehold.co/400x300/6366F1/ffffff?text=First+Aid'
    },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white font-sans">
      {/* App Bar */}
      <header className="p-4 shadow-md sticky top-0 z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-center">Medical Services</h1>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-xl mb-4">
            <input
              type="text"
              placeholder="Search hospitals, pharmacies, clinics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pt-0">
        {/* Emergency Card */}
        <div className="bg-red-600 rounded-xl shadow-lg p-4 mt-4 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg text-white">Emergency Hotline</p>
              <p className="text-red-100">Call 108 (India) or local number</p>
            </div>
          </div>
          <button
            onClick={() => console.log('Calling Emergency...')}
            className="bg-white text-red-600 font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Call
          </button>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.map((service, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl shadow-lg p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.type} • {service.distance}</p>
              </div>
              <div>
                <button
                  onClick={() => console.log(`Opening map for ${service.name}`)}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label={`View ${service.name} on map`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 8m11.953 2.5a1 1 0 01-.893.5H14m-1.5-1.5l1.5-1.5M4 11l5-3m11 8l-5 3m0-11a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MedicalPage;
