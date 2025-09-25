 import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// The LoginPage component is defined within this single file to resolve the import error.
const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  const handleModalClick = (event) => {
    if (event.target.id === 'login-modal') {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
    >
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
          <button 
            id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="py-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="p-8">
    <div className="flex justify-center mb-8">
      <h2 className="text-3xl font-bold text-white">Explore</h2>
    </div>
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#222b37] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 mb-8">
      {['Restaurants', 'Cafes', 'Tourist Sites', 'Hotel Booking', 'Cab Booking'].map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 mb-2 rounded-lg text-white font-semibold transition-colors duration-200"
          style={{ backgroundColor: index === 0 ? '#4299e1' : '#2d3748' }}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-[#2d3748] rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-white mb-2">Restaurant {item}</h3>
          <p className="text-gray-400">Restaurant {item}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canvasRef = useRef(null);

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer;
    let particles, particleSystem;

    // SCENE SETUP
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // GEOMETRY
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x4299E1, 
        wireframe: true, 
        transparent: true,
        opacity: 0.1 
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4299E1 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(100, 100, 100)
    ]);

    const lines = [];
    for(let i = 0; i < 200; i++) {
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.position.set(
            Math.random() * 800 - 400,
            Math.random() * 800 - 400,
            Math.random() * 800 - 400
        );
        line.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        lines.push(line);
        scene.add(line);
    }
    
    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.002;

      lines.forEach(line => {
          line.rotation.x += 0.005;
          line.rotation.y += 0.005;
      });
      
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  if (activePage === 'explore') {
    return (
      <div className="bg-[#1a232f] min-h-screen relative z-10">
        <div className="p-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={() => setActivePage('home')}
          >
            Back
          </button>
        </div>
        <ExplorePage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans antialiased">
      {/* Three.js script for dynamic loading in single-file environment */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      {/* THREE.js Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full"></canvas>

      {/* Main content wrapper with a semi-transparent background to sit on top of the canvas */}
      <div className="relative z-10 min-h-screen bg-[#1a232f] bg-opacity-90">
        <nav className="p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2 text-blue-500 mr-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
              TripPal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
            <button onClick={() => setActivePage('explore')} className="hover:text-blue-400 transition-colors duration-200">Explore</button>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Medical Services</a>
          </div>
          <div>
            <button 
              id="login-button" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              onClick={showLoginModal}
            >
              Login
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8 text-white">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Explore Tourist Places, Safely</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign mr-2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="text-lg font-semibold">Check Fair Prices</h3>
              </div>
              <p className="text-gray-400">View transparent rates for local services.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-2 3-3 3"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-semibold">Need Help?</h3>
              </div>
              <p className="text-gray-400">Get quick access to tourist helpline.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <h3 className="text-lg font-semibold">Community Ratings</h3>
              </div>
              <p className="text-gray-400">See what other travelers say.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Verified Vendors</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">View All &gt;</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  RG
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Rajesh Guide Services</h4>
                  <p className="text-sm text-gray-400">Tour Guide</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Shyam Auto Rentals</h4>
                  <p className="text-sm text-gray-400">Auto Driver</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  RH
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Riya Handloom</h4>
                  <p className="text-sm text-gray-400">Souvenir Shop</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPage 
        isOpen={isLoginModalOpen} 
        onClose={hideLoginModal} 
      />
    </div>
  );
};

export default App;




import React, { useState } from 'react';
import ExplorePage from './explore/explore';
import MedicalPage from './medical/medical';
import LoginPage from './login';
 
 
 


const TravelWebsite = () => {
    const [isPriceListModalOpen, setIsPriceListModalOpen] = useState(false);
    const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isExploreOpen , setIsExploreOpen] = useState(false);
    const [isMedicalOpen , setIsMedicalOpen] = useState(false);
    // const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(false);
    // const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [activePage, setActivePage] = useState("home"); // 'main', 'explore', 'medical'

    const verifiedVendors = [
        {
            id: 1,
            name: 'Rajesh Guide Services',
            type: 'Tour Guide',
            rating: 4.9,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=RG'
        },
        {
            id: 2,
            name: 'Shyam Auto Rentals',
            type: 'Auto Driver',
            rating: 4.7,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=SA'
        },
        {
            id: 3,
            name: 'Riya Handloom',
            type: 'Souvenir Shop',
            rating: 4.8,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=RH'
        },
    ];

    const priceList = [
        { service: 'Auto-Rickshaw Ride', details: 'Approximate price per km', price: '₹15' },
        { service: 'Local Tour Guide', details: 'Half-day (4 hours)', price: '₹800' },
        { service: 'Local Food Meal', details: 'Standard Thali', price: '₹150' },
        { service: 'Souvenir', details: 'Small Handicraft', price: '₹50 - ₹200' },
     ];

    const handleRegistration = (formData) => {
        console.log("User registered with data:", formData);
        alert(`Sign-up successful, ${formData.name}! Welcome to TripPal.`);
        setIsSignUpModalOpen(false);
    };

    const CompassIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19.5L12 4.5M12 19.5L16.5 15M12 19.5L7.5 15M12 4.5L16.5 9M12 4.5L7.5 9"></path>
        </svg>
    );

    const StarIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );

    const HelpCircleIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
        </svg>
    );

    const DollarSignIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    );

    const MenuIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
    );

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    // Main render logic

    if (activePage === 'explore') {
        return (
            <div className="animate-slide-down min-h-screen font-sans" style={{ backgroundColor: '#E4E0E1', color: '#493628' }}>
                <div className='p-4 flex justify-end'>
                    <button
                        className="relative m-2 px-6 py-2 rounded shadow-lg font-bold tracking-wider"
                        style={{ backgroundColor: '#AB886D', color: '#fff' }}
                        onClick={() => setActivePage('home')}
                    >
                        <span className="drop-shadow-lg">Back</span>
                    </button>
                </div>
                <ExplorePage
                    theme={{
                        background: '#E4E0E1',
                        card: '#D6C0B3',
                        accent: '#AB886D',
                        text: '#493628'
                    }}
                />
            </div>
        );
    }

    if (activePage === 'medical') {
        return (
            <div className="animate-slide-down min-h-screen font-sans" style={{ backgroundColor: '#E4E0E1', color: '#493628' }}>
                <div className='p-4 flex justify-end'>
                    <button
                        className="m-4 px-6 py-2 rounded shadow-lg font-bold tracking-wider"
                        style={{ backgroundColor: '#AB886D', color: '#fff' }}
                        onClick={() => setActivePage('home')}
                    >
                        <span className="drop-shadow-lg">Back</span>
                    </button>
                </div>
                <MedicalPage
                    theme={{
                        background: '#E4E0E1',
                        card: '#D6C0B3',
                        accent: '#AB886D',
                        text: '#493628'
                    }}
                />
            </div>
        );
    }

    // HOME PAGE & NAVBAR COLORS (palette only)
    return (
        <div className="min-h-screen font-sans antialiased transition-colors duration-1000" style={{ backgroundColor: '#E4E0E1', color: '#493628' }}>
            <header
                className="shadow-lg border-b sticky top-0 z-50 animate-fade-in-down"
                style={{ backgroundColor: '#AB886D', borderColor: '#AB886D' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <CompassIcon className="h-10 w-10" style={{ color: '#493628' }} />
                            <span className="ml-3 text-3xl font-extrabold tracking-widest drop-shadow-lg font-poppins" style={{ color: '#493628' }}>
                                TripPal
                            </span>
                        </div>
                        {/* Desktop Navbar */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => setActivePage('home')}
                                className={`text-lg font-semibold px-4 py-2 rounded-full transition-all duration-300 tracking-wide ${
                                    activePage === 'home'
                                        ? 'shadow-lg scale-105'
                                        : 'hover:bg-[#D6C0B3] hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'home' ? '#E4E0E1' : '#D6C0B3',
                                    color: '#493628'
                                }}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setActivePage('explore')}
                                className={`text-lg font-semibold px-4 py-2 rounded-full transition-all duration-300 tracking-wide ${
                                    activePage === 'explore'
                                        ? 'shadow-lg scale-105 text-white'
                                        : 'hover:bg-[#AB886D] hover:text-white hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'explore' ? '#AB886D' : '#D6C0B3',
                                    color: activePage === 'explore' ? '#fff' : '#493628'
                                }}
                            >
                                Explore
                            </button>
                            <button
                                onClick={() => setActivePage('medical')}
                                className={`text-lg font-semibold px-4 py-2 rounded-full transition-all duration-300 tracking-wide ${
                                    activePage === 'medical'
                                        ? 'shadow-lg scale-105 text-white'
                                        : 'hover:bg-[#493628] hover:text-white hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'medical' ? '#493628' : '#D6C0B3',
                                    color: activePage === 'medical' ? '#fff' : '#493628'
                                }}
                            >
                                Medical Services
                            </button>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-300 tracking-wider"
                                style={{ backgroundColor: '#E4E0E1', color: '#493628' }}
                            >
                                Login
                            </button>
                        </nav>
                        {/* Mobile Navbar */}
                        <div className="flex items-center md:hidden space-x-4">
                            <button
                                onClick={() => setIsSOSModalOpen(true)}
                                className="font-bold py-2 px-4 rounded-full shadow-lg hover:scale-105 animate-pulse transition-all duration-300"
                                style={{ backgroundColor: '#AB886D', color: '#fff' }}
                            >
                                SOS
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md"
                                style={{ backgroundColor: '#AB886D' }}
                            >
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div
                        className="md:hidden absolute w-full left-0 py-4 shadow-lg animate-fade-in-down"
                        style={{ backgroundColor: '#E4E0E1' }}
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <button
                                onClick={() => { setActivePage('home'); setIsMenuOpen(false); }}
                                className={`block text-lg font-semibold px-4 py-2 rounded-full w-4/5 text-center transition-all duration-300 ${
                                    activePage === 'home'
                                        ? 'shadow-lg scale-105'
                                        : 'hover:bg-[#D6C0B3] hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'home' ? '#E4E0E1' : '#D6C0B3',
                                    color: '#493628'
                                }}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => { setActivePage('explore'); setIsMenuOpen(false); }}
                                className={`block text-lg font-semibold px-4 py-2 rounded-full w-4/5 text-center transition-all duration-300 ${
                                    activePage === 'explore'
                                        ? 'shadow-lg scale-105 text-white'
                                        : 'hover:bg-[#AB886D] hover:text-white hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'explore' ? '#AB886D' : '#D6C0B3',
                                    color: activePage === 'explore' ? '#fff' : '#493628'
                                }}
                            >
                                Explore
                            </button>
                            <button
                                onClick={() => { setActivePage('medical'); setIsMenuOpen(false); }}
                                className={`block text-lg font-semibold px-4 py-2 rounded-full w-4/5 text-center transition-all duration-300 ${
                                    activePage === 'medical'
                                        ? 'shadow-lg scale-105 text-white'
                                        : 'hover:bg-[#493628] hover:text-white hover:scale-105'
                                }`}
                                style={{
                                    backgroundColor: activePage === 'medical' ? '#493628' : '#D6C0B3',
                                    color: activePage === 'medical' ? '#fff' : '#493628'
                                }}
                            >
                                Medical Services
                            </button>
                            <button
                                onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                                className="w-4/5 px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 tracking-wider"
                                style={{ backgroundColor: '#E4E0E1', color: '#493628' }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down font-poppins tracking-wider drop-shadow-lg" style={{ color: '#493628' }}>
                            Explore Tourist Places, Safely
                        </h1>
                        <p className="text-xl md:text-2xl animate-fade-in-up font-semibold tracking-wide drop-shadow" style={{ color: '#AB886D' }}>
                            Your trusted guide to authentic experiences, fair prices, and instant help.
                        </p>
                    </section>
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <button
                            onClick={() => setIsPriceListModalOpen(true)}
                            className="rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[#AB886D]/40 group"
                            style={{ backgroundColor: '#D6C0B3', color: '#493628' }}
                        >
                            <DollarSignIcon className="h-14 w-14 text-green-400 mx-auto mb-4 animate-bounce-slow" />
                            <h3 className="text-2xl font-bold group-hover:text-[#AB886D] transition-colors">Check Fair Prices</h3>
                            <p className="mt-2 font-medium">View transparent rates for local services.</p>
                        </button>
                        <button
                            className="rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[#AB886D]/40 group"
                            style={{ backgroundColor: '#D6C0B3', color: '#493628' }}
                        >
                            <HelpCircleIcon className="h-14 w-14" style={{ color: '#AB886D' }} />
                            <h3 className="text-2xl font-bold group-hover:text-[#AB886D] transition-colors">Need Help?</h3>
                            <p className="mt-2 font-medium">Get quick access to tourist helpline.</p>
                        </button>
                        <button
                            className="rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[#AB886D]/40 group"
                            style={{ backgroundColor: '#D6C0B3', color: '#493628' }}
                        >
                            <StarIcon className="h-14 w-14 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
                            <h3 className="text-2xl font-bold group-hover:text-[#AB886D] transition-colors">Community Ratings</h3>
                            <p className="mt-2 font-medium">See what other travelers say.</p>
                        </button>
                    </section>
                    <section className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold tracking-wide" style={{ color: '#493628' }}>Verified Vendors</h2>
                            <a href="#" className="hover:underline font-semibold tracking-wide" style={{ color: '#AB886D' }}>View All &gt;</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {verifiedVendors.map(vendor => (
                                <div
                                    key={vendor.id}
                                    className="rounded-2xl shadow-2xl p-6 flex items-center space-x-6 transform transition-all duration-300 hover:scale-105 hover:shadow-[#AB886D]/40 group"
                                    style={{ backgroundColor: '#D6C0B3', color: '#493628' }}
                                >
                                    <img src={vendor.image} alt={vendor.name} className="h-20 w-20 rounded-full object-cover border-4" style={{ borderColor: '#AB886D' }} />
                                    <div>
                                        <h4 className="text-xl font-bold">{vendor.name}</h4>
                                        <p className="text-md font-medium">{vendor.type}</p>
                                        <div className="flex items-center text-yellow-400">
                                            <StarIcon className="h-5 w-5 fill-current" />
                                            <span className="ml-2 text-md font-semibold">{vendor.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

             

            <LoginPage
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />

            <ExplorePage
                isOpen={isExploreOpen}
                onClose={() => setIsExploreOpen(false)}
                theme={{
                    background: '#E4E0E1',
                    card: '#D6C0B3',
                    accent: '#AB886D',
                    text: '#493628'
                }}
            />

            <MedicalPage
                isOpen={isMedicalOpen}
                onClose={() => setIsMedicalOpen(false)}
                theme={{
                    background: '#E4E0E1',
                    card: '#D6C0B3',
                    accent: '#AB886D',
                    text: '#493628'
                }}
            />

            {/* Animations and custom fonts */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
                .font-poppins { font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; }
                @keyframes fade-in-down {
                  0% { opacity: 0; transform: translateY(-30px);}
                  100% { opacity: 1; transform: translateY(0);}
                }
                @keyframes fade-in-up {
                  0% { opacity: 0; transform: translateY(30px);}
                  100% { opacity: 1; transform: translateY(0);}
                }
                @keyframes bounce-slow {
                  0%, 100% { transform: translateY(0);}
                  50% { transform: translateY(-10px);}
                }
                @keyframes spin-slow {
                  0% { transform: rotate(0deg);}
                  100% { transform: rotate(360deg);}
                }
                .animate-fade-in-down { animation: fade-in-down 0.7s both; }
                .animate-fade-in-up { animation: fade-in-up 0.7s both; }
                .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
                .animate-spin-slow { animation: spin-slow 6s linear infinite; }
                `}
            </style>
        </div>
    );
};

export default TravelWebsite;





















import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// The LoginPage component is defined within this single file to resolve the import error.
const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  const handleModalClick = (event) => {
    if (event.target.id === 'login-modal') {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
    >
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
          <button 
            id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="py-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="p-8">
    <div className="flex justify-center mb-8">
      <h2 className="text-3xl font-bold text-white">Explore</h2>
    </div>
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#222b37] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 mb-8">
      {['Restaurants', 'Cafes', 'Tourist Sites', 'Hotel Booking', 'Cab Booking'].map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 mb-2 rounded-lg text-white font-semibold transition-colors duration-200"
          style={{ backgroundColor: index === 0 ? '#4299e1' : '#2d3748' }}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-[#2d3748] rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-white mb-2">Restaurant {item}</h3>
          <p className="text-gray-400">Restaurant {item}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer;
    let particles, particleSystem;

    // SCENE SETUP
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // PARTICLES & LINES
    const particleCount = 1000;
    const particlesData = [];
    const positions = new Float32Array(particleCount * 3);
    const geometry = new THREE.BufferGeometry();
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4299E1, transparent: true, opacity: 0.8 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    
    scene.add(lines);

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 800 - 400;
        const z = Math.random() * 800 - 400;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        particlesData.push({
            position: new THREE.Vector3(x, y, z),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
            )
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        size: 5,
        color: 0x4299E1,
        transparent: true,
        opacity: 0.8
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    // ANIMATION LOOP
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Update particle positions
      for(let i = 0; i < particlesData.length; i++) {
          const particle = particlesData[i];
          particle.position.add(particle.velocity);

          // Bounce off boundaries
          if (particle.position.x < -400 || particle.position.x > 400) particle.velocity.x *= -1;
          if (particle.position.y < -400 || particle.position.y > 400) particle.velocity.y *= -1;
          if (particle.position.z < -400 || particle.position.z > 400) particle.velocity.z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Update lines
      let lineIndex = 0;
      for (let i = 0; i < particlesData.length; i++) {
          for (let j = i + 1; j < particlesData.length; j++) {
              if (particlesData[i].position.distanceTo(particlesData[j].position) < 100) {
                  linePositions[lineIndex++] = particlesData[i].position.x;
                  linePositions[lineIndex++] = particlesData[i].position.y;
                  linePositions[lineIndex++] = particlesData[i].position.z;
                  
                  linePositions[lineIndex++] = particlesData[j].position.x;
                  linePositions[lineIndex++] = particlesData[j].position.y;
                  linePositions[lineIndex++] = particlesData[j].position.z;
              }
          }
      }

      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (activePage === 'explore') {
    return (
      <div className="bg-[#1a232f] min-h-screen relative z-10">
        <div className="p-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={() => setActivePage('home')}
          >
            Back
          </button>
        </div>
        <ExplorePage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans antialiased">
      {/* Three.js script for dynamic loading in single-file environment */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      {/* THREE.js Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full"></canvas>

      {/* Main content wrapper with a semi-transparent background to sit on top of the canvas */}
      <div className="relative z-10 min-h-screen bg-[#1a232f] bg-opacity-90">
        <nav className="p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2 text-blue-500 mr-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
              TripPal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
            <button onClick={() => setActivePage('explore')} className="hover:text-blue-400 transition-colors duration-200">Explore</button>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Medical Services</a>
          </div>
          <div>
            <button 
              id="login-button" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              onClick={showLoginModal}
            >
              Login
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8 text-white">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Explore Tourist Places, Safely</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign mr-2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="text-lg font-semibold">Check Fair Prices</h3>
              </div>
              <p className="text-gray-400">View transparent rates for local services.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-2 3-3 3"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-semibold">Need Help?</h3>
              </div>
              <p className="text-gray-400">Get quick access to tourist helpline.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <h3 className="text-lg font-semibold">Community Ratings</h3>
              </div>
              <p className="text-gray-400">See what other travelers say.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Verified Vendors</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">View All &gt;</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  RG
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Rajesh Guide Services</h4>
                  <p className="text-sm text-gray-400">Tour Guide</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Shyam Auto Rentals</h4>
                  <p className="text-sm text-gray-400">Auto Driver</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  RH
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Riya Handloom</h4>
                  <p className="text-sm text-gray-400">Souvenir Shop</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPage 
        isOpen={isLoginModalOpen} 
        onClose={hideLoginModal} 
      />
    </div>
  );
};

export default App;




import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// The LoginPage component is defined within this single file to resolve the import error.
const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  const handleModalClick = (event) => {
    if (event.target.id === 'login-modal') {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
    >
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
          <button 
            id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="py-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="p-8">
    <div className="flex justify-center mb-8">
      <h2 className="text-3xl font-bold text-white">Explore</h2>
    </div>
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#222b37] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 mb-8">
      {['Restaurants', 'Cafes', 'Tourist Sites', 'Hotel Booking', 'Cab Booking'].map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 mb-2 rounded-lg text-white font-semibold transition-colors duration-200"
          style={{ backgroundColor: index === 0 ? '#4299e1' : '#2d3748' }}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-[#2d3748] rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-white mb-2">Restaurant {item}</h3>
          <p className="text-gray-400">Restaurant {item}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer, geometry, material, mesh;

    // SCENE SETUP
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ABSTRACT GEOMETRY
    const uniforms = {
        u_time: { type: 'f', value: 0.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_mouse: { type: 'v2', value: new THREE.Vector2() }
    };

    // Update uniforms on resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = window.innerWidth;
        uniforms.u_resolution.value.y = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Custom shader material
    const vertexShader = `
      uniform float u_time;
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        vec3 transformed = position;
        float morph = sin(transformed.y * 0.5 + u_time * 0.5) * 2.0;
        transformed.x += morph * 0.5;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      varying vec3 vNormal;
      void main() {
        vec3 color = vec3(0.2, 0.4, 1.0) * (sin(vNormal.x * 3.0 + u_time) * 0.5 + 0.5);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    geometry = new THREE.IcosahedronGeometry(15, 8);
    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // ANIMATION LOOP
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      uniforms.u_time.value += 0.01;
      mesh.rotation.x += 0.0005;
      mesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (activePage === 'explore') {
    return (
      <div className="bg-[#1a232f] min-h-screen relative z-10">
        <div className="p-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={() => setActivePage('home')}
          >
            Back
          </button>
        </div>
        <ExplorePage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans antialiased">
      {/* Three.js script for dynamic loading in single-file environment */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      {/* THREE.js Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full"></canvas>

      {/* Main content wrapper with a semi-transparent background to sit on top of the canvas */}
      <div className="relative z-10 min-h-screen bg-[#1a232f] bg-opacity-90">
        <nav className="p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2 text-blue-500 mr-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
              TripPal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
            <button onClick={() => setActivePage('explore')} className="hover:text-blue-400 transition-colors duration-200">Explore</button>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Medical Services</a>
          </div>
          <div>
            <button 
              id="login-button" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              onClick={showLoginModal}
            >
              Login
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8 text-white">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Explore Tourist Places, Safely</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign mr-2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="text-lg font-semibold">Check Fair Prices</h3>
              </div>
              <p className="text-gray-400">View transparent rates for local services.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-2 3-3 3"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-semibold">Need Help?</h3>
              </div>
              <p className="text-gray-400">Get quick access to tourist helpline.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <h3 className="text-lg font-semibold">Community Ratings</h3>
              </div>
              <p className="text-gray-400">See what other travelers say.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Verified Vendors</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">View All &gt;</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  RG
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Rajesh Guide Services</h4>
                  <p className="text-sm text-gray-400">Tour Guide</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Shyam Auto Rentals</h4>
                  <p className="text-sm text-gray-400">Auto Driver</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  RH
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Riya Handloom</h4>
                  <p className="text-sm text-gray-400">Souvenir Shop</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPage 
        isOpen={isLoginModalOpen} 
        onClose={hideLoginModal} 
      />
    </div>
  );
};

export default App;



import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// The LoginPage component is defined within this single file to resolve the import error.
const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  const handleModalClick = (event) => {
    if (event.target.id === 'login-modal') {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
    >
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
          <button 
            id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="py-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="p-8">
    <div className="flex justify-center mb-8">
      <h2 className="text-3xl font-bold text-white">Explore</h2>
    </div>
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#222b37] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 mb-8">
      {['Restaurants', 'Cafes', 'Tourist Sites', 'Hotel Booking', 'Cab Booking'].map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 mb-2 rounded-lg text-white font-semibold transition-colors duration-200"
          style={{ backgroundColor: index === 0 ? '#4299e1' : '#2d3748' }}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-[#2d3748] rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-white mb-2">Restaurant {item}</h3>
          <p className="text-gray-400">Restaurant {item}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer, particles, uniforms;
    const numParticles = 2000;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const sizes = new Float32Array(numParticles);
    
    // SCENE SETUP
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // DYNAMIC PARTICLES
    for (let i = 0; i < numParticles; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.7 + Math.random() * 0.3, 0.5 + Math.random() * 0.5);
        colors[i * 3 + 0] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 2 + 1;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2() },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };
    
    const vertexShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      attribute float size;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec3 pos = position;
        
        // Fluid noise motion
        float time_factor = sin(u_time * 0.1 + pos.x * 0.1);
        pos.y += time_factor * 10.0;
        pos.z += cos(u_time * 0.1 + pos.y * 0.1) * 10.0;

        // Mouse/touch influence
        vec2 mouse_norm = (u_mouse / u_resolution) * 2.0 - 1.0;
        vec3 mouse_pos = vec3(mouse_norm.x * 100.0, mouse_norm.y * 100.0, 0.0);
        vec3 direction = pos - mouse_pos;
        float distance = length(direction);
        float influence = smoothstep(100.0, 0.0, distance);
        pos += normalize(direction) * 20.0 * influence;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // MOUSE & TOUCH INTERACTION
    const onDocumentMouseMove = (event) => {
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;
    };

    const onDocumentTouchMove = (event) => {
        if (event.touches.length === 1) {
            mousePos.current.x = event.touches[0].clientX;
            mousePos.current.y = event.touches[0].clientY;
        }
    };
    
    const onDocumentKeyDown = (event) => {
      // Camera movement based on arrow keys
      switch (event.key) {
        case 'ArrowUp':
          camera.position.z -= 1;
          break;
        case 'ArrowDown':
          camera.position.z += 1;
          break;
        case 'ArrowLeft':
          camera.position.x -= 1;
          break;
        case 'ArrowRight':
          camera.position.x += 1;
          break;
      }
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchmove', onDocumentTouchMove);
    document.addEventListener('keydown', onDocumentKeyDown);

    // ANIMATION LOOP
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      uniforms.u_time.value += 0.01;
      uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y);
      
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      document.removeEventListener('keydown', onDocumentKeyDown);
      if (renderer) {
        renderer.dispose();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (activePage === 'explore') {
    return (
      <div className="bg-[#1a232f] min-h-screen relative z-10">
        <div className="p-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={() => setActivePage('home')}
          >
            Back
          </button>
        </div>
        <ExplorePage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans antialiased">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full"></canvas>

      <div className="relative z-10 min-h-screen bg-[#1a232f] bg-opacity-90">
        <nav className="p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2 text-blue-500 mr-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
              TripPal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
            <button onClick={() => setActivePage('explore')} className="hover:text-blue-400 transition-colors duration-200">Explore</button>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Medical Services</a>
          </div>
          <div>
            <button 
              id="login-button" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              onClick={showLoginModal}
            >
              Login
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8 text-white">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Explore Tourist Places, Safely</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign mr-2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="text-lg font-semibold">Check Fair Prices</h3>
              </div>
              <p className="text-gray-400">View transparent rates for local services.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-2 3-3 3"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-semibold">Need Help?</h3>
              </div>
              <p className="text-gray-400">Get quick access to tourist helpline.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <h3 className="text-lg font-semibold">Community Ratings</h3>
              </div>
              <p className="text-gray-400">See what other travelers say.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Verified Vendors</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">View All &gt;</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  RG
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Rajesh Guide Services</h4>
                  <p className="text-sm text-gray-400">Tour Guide</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Shyam Auto Rentals</h4>
                  <p className="text-sm text-gray-400">Auto Driver</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  RH
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Riya Handloom</h4>
                  <p className="text-sm text-gray-400">Souvenir Shop</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPage 
        isOpen={isLoginModalOpen} 
        onClose={hideLoginModal} 
      />
    </div>
  );
};

export default App;




import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// The LoginPage component is defined within this single file to resolve the import error.
const LoginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  const handleModalClick = (event) => {
    if (event.target.id === 'login-modal') {
      onClose();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
    >
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>
          <button 
            id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="py-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="p-8">
    <div className="flex justify-center mb-8">
      <h2 className="text-3xl font-bold text-white">Explore</h2>
    </div>
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#222b37] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="flex flex-wrap justify-center space-x-2 mb-8">
      {['Restaurants', 'Cafes', 'Tourist Sites', 'Hotel Booking', 'Cab Booking'].map((category, index) => (
        <button
          key={index}
          className="px-4 py-2 mb-2 rounded-lg text-white font-semibold transition-colors duration-200"
          style={{ backgroundColor: index === 0 ? '#4299e1' : '#2d3748' }}
        >
          {category}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-[#2d3748] rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-white mb-2">Restaurant {item}</h3>
          <p className="text-gray-400">Restaurant {item}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // Three.js background effect
  useEffect(() => {
    let scene, camera, renderer, particles, uniforms;
    const numParticles = 2000;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const sizes = new Float32Array(numParticles);
    
    // SCENE SETUP
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // DYNAMIC PARTICLES
    for (let i = 0; i < numParticles; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.7 + Math.random() * 0.3, 0.5 + Math.random() * 0.5);
        colors[i * 3 + 0] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 2 + 1;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2() },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };
    
    const vertexShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      attribute float size;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec3 pos = position;
        
        // Fluid noise motion
        float time_factor = sin(u_time * 0.1 + pos.x * 0.1);
        pos.y += time_factor * 10.0;
        pos.z += cos(u_time * 0.1 + pos.y * 0.1) * 10.0;

        // Mouse/touch influence
        vec2 mouse_norm = (u_mouse / u_resolution) * 2.0 - 1.0;
        vec3 mouse_pos = vec3(mouse_norm.x * 100.0, mouse_norm.y * 100.0, 0.0);
        vec3 direction = pos - mouse_pos;
        float distance = length(direction);
        float influence = smoothstep(100.0, 0.0, distance);
        pos += normalize(direction) * 20.0 * influence;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // MOUSE & TOUCH INTERACTION
    const onDocumentMouseMove = (event) => {
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;
    };

    const onDocumentTouchMove = (event) => {
        if (event.touches.length === 1) {
            mousePos.current.x = event.touches[0].clientX;
            mousePos.current.y = event.touches[0].clientY;
        }
    };
    
    const onDocumentKeyDown = (event) => {
      // Camera movement based on arrow keys
      switch (event.key) {
        case 'ArrowUp':
          camera.position.z -= 1;
          break;
        case 'ArrowDown':
          camera.position.z += 1;
          break;
        case 'ArrowLeft':
          camera.position.x -= 1;
          break;
        case 'ArrowRight':
          camera.position.x += 1;
          break;
      }
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchmove', onDocumentTouchMove);
    document.addEventListener('keydown', onDocumentKeyDown);

    // ANIMATION LOOP
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      uniforms.u_time.value += 0.01;
      uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y);
      
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      document.removeEventListener('keydown', onDocumentKeyDown);
      if (renderer) {
        renderer.dispose();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (activePage === 'explore') {
    return (
      <div className="bg-[#1a232f] min-h-screen relative z-10">
        <div className="p-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={() => setActivePage('home')}
          >
            Back
          </button>
        </div>
        <ExplorePage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans antialiased">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full"></canvas>

      <div className="relative z-10 min-h-screen bg-[#1a232f] bg-opacity-90">
        <nav className="p-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation-2 text-blue-500 mr-2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
              TripPal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
            <button onClick={() => setActivePage('explore')} className="hover:text-blue-400 transition-colors duration-200">Explore</button>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Medical Services</a>
          </div>
          <div>
            <button
              id="profile-button"
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={showLoginModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8 text-white">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Explore Tourist Places, Safely</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign mr-2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="text-lg font-semibold">Check Fair Prices</h3>
              </div>
              <p className="text-gray-400">View transparent rates for local services.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-2 3-3 3"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-semibold">Need Help?</h3>
              </div>
              <p className="text-gray-400">Get quick access to tourist helpline.</p>
            </div>
            <div className="bg-[#222b37] rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-center text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <h3 className="text-lg font-semibold">Community Ratings</h3>
              </div>
              <p className="text-gray-400">See what other travelers say.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Verified Vendors</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">View All &gt;</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  RG
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Rajesh Guide Services</h4>
                  <p className="text-sm text-gray-400">Tour Guide</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.9</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Shyam Auto Rentals</h4>
                  <p className="text-sm text-gray-400">Auto Driver</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#222b37] rounded-lg shadow-xl p-4 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  RH
                </div>
                <div>
                  <h4 className="text-md font-semibold text-white">Riya Handloom</h4>
                  <p className="text-sm text-gray-400">Souvenir Shop</p>
                  <div className="flex items-center text-yellow-400 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 2l2.4 7.2h7.6l-6 4.4 2.4 7.2-6-4.4-6 4.4 2.4-7.2-6-4.4h7.6z"/></svg>
                    <p className="text-gray-400">4.8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginPage 
        isOpen={isLoginModalOpen} 
        onClose={hideLoginModal} 
      />
    </div>
  );
};

export default App;
