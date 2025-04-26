import React from 'react';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-2 px-4 w-full fixed top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <p className="text-sm font-bold text-gray-800">FoodZone</p>
        </div>
        <div className="flex space-x-4">
          <LoginPopup />
          <SignupPopup />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
