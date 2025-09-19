import React, { useState, useEffect } from 'react';

// The main App component that contains the entire application
const profileSection = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to hide the modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  // useEffect hook to handle side effects like closing the modal with the Escape key or clicks outside
  useEffect(() => {
    // Function to handle clicks outside the modal
    const handleOutsideClick = (event) => {
      // Check if the click is outside the modal content but inside the modal backdrop
      if (event.target.id === 'profile-modal') {
        hideModal();
      }
    };

    // Function to handle the Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        hideModal();
      }
    };

    // Add event listeners when the modal is open
    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Clean up event listeners when the component unmounts or modal closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <div className="bg-[#1a232f] min-h-screen flex items-center justify-center p-4">

      {/* Profile Button (Circular) */}
      <button 
        id="profile-button" 
        className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
        onClick={showModal}
      >
        {/* SVG for user icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Profile Modal (Conditionally rendered based on state) */}
      <div 
        id="profile-modal" 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        {/* Modal Content Container */}
        <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-4xl h-full md:h-4/5 p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
          
          {/* Modal Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white">My Profile</h2>
            <button 
              id="close-modal-button" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              onClick={hideModal}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Form Content */}
          <form className="py-6 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="Jane Doe" placeholder="Full Name" />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="jane.doe@example.com" placeholder="Email Address" />
            </div>
            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="+1-555-123-4567" placeholder="Contact No."/>
            </div>
            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-white">Country</label>
              <input type="text" id="country" name="country" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="USA" placeholder="Country" />
            </div>
            {/* Language Field */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-white">Language</label>
              <input type="text" id="language" name="language" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="English" placeholder="Language" />
            </div>
            {/* Place to Visit Field */}
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-white">Place to Visit</label>
              <input type="text" id="place" name="place" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="Tokyo, Japan" placeholder="Place to Visit" />
            </div>
            {/* Emergency Contact Field */}
            <div>
              <label htmlFor="emergency" className="block text-sm font-medium text-white">Emergency Contact</label>
              <input type="text" id="emergency" name="emergency" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" defaultValue="John Doe (+1-555-987-6543)" placeholder="Emergency Contact" />
            </div>
            {/* Change Password Button */}
            <div className="pt-4">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default profileSection;

 