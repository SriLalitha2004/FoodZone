import React from 'react';
import vendor_bg from '../assets/vendor_bg.jpg';
import VendorHeader from './VendorHeader';
import './VendorPage.css';

const VendorPage = () => {
  return (
    <div className="vendor-page">
      <img src={vendor_bg} alt="Vendor background" className="vendor-bg" />
      <div className="vendor-overlay" />
      
      <div className="vendor-header-container">
        <VendorHeader />
      </div>

      <div className="vendor-center-content">
        <h1>Add Restaurants to FoodZone</h1>
      </div>
    </div>
  );
};

export default VendorPage;
