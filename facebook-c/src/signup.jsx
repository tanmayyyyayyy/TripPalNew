import React, { useState } from 'react';

const SellerSignUpModal = ({ isOpen, onClose, onRegister }) => {

    const [view, setView] = useState('options');
    
    const [userForm, setUserForm] = useState({
        name: '',
        country: '',
        email: '',
        contact: '',
        password: '',
        age: '',
        gender: '',
        emergencyContact: '',
        emergencyContactName: '',
    });
    const [sellerForm, setSellerForm] = useState({
        businessName: '',
        businessType: '',
        name: '',
        country: '',
        email: '',
        contact: '',
        password: '',
        age: '',
        gender: '',
        businessAddress: '',
    });

    const handleUserFormSubmit = (e) => {
        e.preventDefault();
        onRegister({ ...userForm, userType: 'user' });
    };

    const handleSellerFormSubmit = (e) => {
        e.preventDefault();
        onRegister({ ...sellerForm, userType: 'seller' });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl transform transition-transform duration-300 my-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">
                        {view === 'options' ? 'Choose an Option' : view === 'user_signup' ? 'User Sign-Up' : 'Seller Registration'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                
                {view === 'options' && (
                    <div className="space-y-4">
                        <button onClick={() => setView('user_signup')}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105">Sign Up as User</button>
                        <button onClick={() => setView('seller_signup')}
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors transform hover:scale-105">Sign Up as Seller</button>
                    </div>
                )}

                {view === 'user_signup' && (
                    <form onSubmit={handleUserFormSubmit} className="space-y-4">
                        <h4 className="text-xl font-semibold mt-4 mb-2 text-white">Personal Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={userForm.name}
                                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>

                            <input
                                type="text"
                                placeholder="Country"
                                value={userForm.country}
                                onChange={(e) => setUserForm({ ...userForm, country: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={userForm.email}
                                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>

                            <input
                                type="password"
                                placeholder="Password"
                                value={userForm.password}
                                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>

                            <input
                                type="tel"
                                placeholder="Contact No."
                                value={userForm.contact}
                                onChange={(e) => setUserForm({ ...userForm, contact: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>

                            <input
                                type="number"
                                placeholder="Age"
                                value={userForm.age}
                                onChange={(e) => setUserForm({ ...userForm, age: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="18"
                                required/>

                            <select
                                value={userForm.gender}
                                onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <h4 className="text-xl font-semibold mt-6 mb-2 text-white">Emergency Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="tel"
                                placeholder="Emergency Contact No."
                                value={userForm.emergencyContact}
                                onChange={(e) => setUserForm({ ...userForm, emergencyContact: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Emergency Contact Name"
                                value={userForm.emergencyContactName}
                                onChange={(e) => setUserForm({ ...userForm, emergencyContactName: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 mt-6"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('options')}
                            className="w-full text-gray-400 hover:text-white mt-2"
                        >
                            Back
                        </button>
                    </form>
                )}

                {view === 'seller_signup' && (
                    <form onSubmit={handleSellerFormSubmit} className="space-y-4">
                        <h4 className="text-xl font-semibold mt-4 mb-2 text-white">Business Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Business Name"
                                value={sellerForm.businessName}
                                onChange={(e) => setSellerForm({ ...sellerForm, businessName: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <select
                                value={sellerForm.businessType}
                                onChange={(e) => setSellerForm({ ...sellerForm, businessType: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select Business Type</option>
                                <option value="tour_guide">Tour Guide</option>
                                <option value="auto_driver">Auto-rickshaw Driver</option>
                                <option value="souvenir_shop">Souvenir Shop</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Business Address"
                                value={sellerForm.businessAddress}
                                onChange={(e) => setSellerForm({ ...sellerForm, businessAddress: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 sm:col-span-2"
                                required
                            />
                        </div>

                        <h4 className="text-xl font-semibold mt-6 mb-2 text-white">Personal & Contact Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={sellerForm.name}
                                onChange={(e) => setSellerForm({ ...sellerForm, name: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={sellerForm.country}
                                onChange={(e) => setSellerForm({ ...sellerForm, country: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={sellerForm.email}
                                onChange={(e) => setSellerForm({ ...sellerForm, email: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={sellerForm.password}
                                onChange={(e) => setSellerForm({ ...sellerForm, password: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Contact No."
                                value={sellerForm.contact}
                                onChange={(e) => setSellerForm({ ...sellerForm, contact: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                value={sellerForm.age}
                                onChange={(e) => setSellerForm({ ...sellerForm, age: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="18"
                                required
                            />
                            <select
                                value={sellerForm.gender}
                                onChange={(e) => setSellerForm({ ...sellerForm, gender: e.target.value })}
                                className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <button type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors transform hover:scale-105 mt-6">Register as Seller</button>
                        <button type="button"
                            onClick={() => setView('options')}
                            className="w-full text-gray-400 hover:text-white mt-2">Back</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SellerSignUpModal;
