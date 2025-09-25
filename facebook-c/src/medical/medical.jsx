import React, { useState } from 'react';

const MedicalPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      name: 'City Hospital',
      type: 'Hospital',
      distance: '1.2 km',
      image: 'https://media.istockphoto.com/photos/hospital-building-exterior-and-hospital-sign-picture-id610220998?k=6&m=610220998&s=170667a&w=0&h=BFKbvWR1TG8dbes8Ccm4Bk7MZ2ogBXkyrbF2oi_-7eI='
    },
    {
      name: 'MediCare Clinic',
      type: 'Clinic',
      distance: '2.5 km',
      image: 'https://s3-media3.fl.yelpcdn.com/bphoto/i4MWpkFmXXdiZX5WO6OFDw/o.jpg'
    },
    {
      name: '24x7 Pharmacy',
      type: 'Pharmacy',
      distance: '800 m',
      image: 'https://as2.ftcdn.net/v2/jpg/03/68/59/19/1000_F_368591978_VCR4axe2vSgoTxIiN2uzL8YUrbxTqpIC.jpg'
    },
    {
      name: 'First Aid Center',
      type: 'First Aid',
      distance: '3.1 km',
      image: 'https://tse3.mm.bing.net/th/id/OIP.49B4xHjMA5DJp5uansVaHQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white font-sans  ">
      {/*

      bg-gradient-to-br from-blue-900 via-gray-900 to-indigo-900 transition-colors duration-1000

      App Bar */}
      <header className="p-4 shadow-md top-0 z-10">
        <div className="flex flex-col items-center">
          <img
            src="https://img.icons8.com/?size=160&id=R8C2mZCro3DR&format=png"
            className="h-45 w-45 mb-4 transform transition-transform duration-500 hover:scale-110 animate-bounce-slow"
            alt=""
          />
          <h1 className="text-6xl font-serif mb-5 text-center animate-fade-in-down">Medical Services</h1>
          {/* Move Search Bar directly below heading */}
          <div className="relative w-full max-w-xl mb-4 flex justify-center animate-fade-in-up">
            <input
              type="text"
              placeholder="Search hospitals, pharmacies, clinics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:scale-105"
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
        <div className="bg-red-600 rounded-xl shadow-lg p-4 mt-4 flex items-center justify-between mb-6 animate-pop-in">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-2 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg text-white">Emergency Helpline</p>
              <p className="text-red-100">Call 108 (India) or local number</p>
            </div>
          </div>
          <button
            onClick={() => console.log('Calling Emergency...')}
            className="bg-white text-red-600 font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors animate-shake"
          >
            Call
          </button>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-900 via-gray-900 to-indigo-900 rounded-2xl shadow-lg p-4 flex items-center space-x-4 group transition-all duration-300 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-800 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-18 h-18 object-fill rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-2xl"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.type} • {service.distance}</p>
              </div>
              <div>
                <button
                  onClick={() => console.log(`Opening map for ${service.name}`)}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors animate-pop-in"
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
      {/* Animations */}
      <style>
        {`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.9);}
          100% { opacity: 1; transform: scale(1);}
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0);}
          20%, 60% { transform: translateX(-5px);}
          40%, 80% { transform: translateX(5px);}
        }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-pop-in { animation: pop-in 0.5s both; }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        .animate-shake:hover { animation: shake 0.5s; }
        `}
      </style>
    </div>
  );
};

export default MedicalPage;
