import React, { useState, useEffect } from 'react';

const sellerInfo = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [businessImages, setBusinessImages] = useState([
    'https://placehold.co/400x300/313e50/a0aec0?text=Image+1',
    'https://placehold.co/400x300/313e50/a0aec0?text=Image+2',
    'https://placehold.co/400x300/313e50/a0aec0?text=Image+3',
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // In a real application, you would handle the file upload to a server here.
      // For this example, we'll just simulate a successful upload by adding a new placeholder.
      const newImage = 'https://placehold.co/400x300/313e50/a0aec0?text=New+Image';
      setBusinessImages([...businessImages, newImage]);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'seller-modal') {
        hideModal();
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        hideModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <div className="bg-[#1a232f] min-h-screen flex items-center justify-center p-4">

      {/* Seller Profile Button (Circular) */}
      <button 
        id="seller-button" 
        className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
        onClick={showModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0L3.18 5.764a1 1 0 00-.518.875L2.628 15.6a1 1 0 00.58 1.054l6.094 2.822a1 1 0 00.788 0l6.094-2.822a1 1 0 00.58-1.054L17.326 6.64a1 1 0 00-.518-.875L10.394 2.08zM12 9a2 2 0 10-4 0 2 2 0 004 0z" />
          <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
        </svg>
      </button>

      {/* Seller Profile Modal (Conditionally rendered) */}
      <div 
        id="seller-modal" 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        {/* Modal Content Container */}
        <div className="bg-[#222b37] rounded-lg shadow-xl w-full max-w-4xl h-full md:h-4/5 p-6 transform transition-transform duration-300 scale-95 overflow-y-auto">
          
          {/* Modal Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Seller Profile</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name Field */}
                <div>
                    <label htmlFor="business-name" className="block text-sm font-medium text-white">Business Name</label>
                    <input type="text" id="business-name" name="business-name" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="e.g., Jane's Crafts" />
                </div>
                {/* Business Type Field */}
                <div>
                    <label htmlFor="business-type" className="block text-sm font-medium text-white">Business Type</label>
                    <input type="text" id="business-type" name="business-type" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="e.g., Handmade Goods" />
                </div>
                {/* Contact Person Field */}
                <div>
                    <label htmlFor="contact-person" className="block text-sm font-medium text-white">Contact Person</label>
                    <input type="text" id="contact-person" name="contact-person" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="Full Name" />
                </div>
                {/* Business Email Field */}
                <div>
                    <label htmlFor="business-email" className="block text-sm font-medium text-white">Business Email</label>
                    <input type="email" id="business-email" name="business-email" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="e.g., contact@business.com" />
                </div>
                {/* Business Phone Number Field */}
                <div>
                    <label htmlFor="business-phone" className="block text-sm font-medium text-white">Business Phone Number</label>
                    <input type="tel" id="business-phone" name="business-phone" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="e.g., +1-555-123-4567" />
                </div>
                {/* Business Address Field */}
                <div>
                    <label htmlFor="business-address" className="block text-sm font-medium text-white">Business Address</label>
                    <input type="text" id="business-address" name="business-address" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="Street, City, State, ZIP" />
                </div>
            </div>
            
            {/* Business Description */}
            <div className="mt-6">
                <label htmlFor="business-description" className="block text-sm font-medium text-white">Business Description</label>
                <textarea id="business-description" name="business-description" rows="4" className="mt-1 block w-full px-4 py-2 rounded-md bg-[#313e50] text-white border border-[#4a5568] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 placeholder-gray-400" placeholder="Tell customers about your business..."></textarea>
            </div>
            
            {/* Business Images Section */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Business Images</h3>
                
                {/* Image Upload Input */}
                <label htmlFor="image-upload" className="block w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md text-center cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                    Upload New Image
                </label>
                <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

                {/* Image Gallery */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {businessImages.map((src, index) => (
                        <div key={index} className="relative rounded-md overflow-hidden shadow-lg">
                            <img src={src} alt={`Business Image ${index + 1}`} className="w-full h-auto object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Update Profile Button */}
            <div className="pt-4">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default sellerInfo;
