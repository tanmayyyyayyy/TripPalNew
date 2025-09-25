import React, { useState, useEffect } from 'react';
import SellerSignUpModal from './signup';

const loginPage = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSellerSignUpOpen, setIsSellerSignUpOpen] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'login-modal') {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div id="login-modal" 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
      
      <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-md p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
        
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">

          <div> 
            <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Sign in to your account</p>
          </div>

          <button id="close-modal-button" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={onClose}>

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
              onChange={(e) => setEmail(e.target.value)}/>
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
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className="pt-4">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">Login </button>
          </div>

        </form>

        <div className="text-center mt-4 text-sm text-gray-400">

          Don't have an account? <a href="#" className="text-blue-400 hover:underline">

            <button onClick={() => setIsSellerSignUpOpen (true)}
                className="text-blue-600 px-1 py-2 rounded-md">Sign in</button>
          
          </a>
          
        </div>
      </div>

      <SellerSignUpModal
        isOpen={isSellerSignUpOpen}
        onClose={() => setIsSellerSignUpOpen(false)}
      />

    </div>



  );
};

export default loginPage;
