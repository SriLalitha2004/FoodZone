import React from 'react';
import food_bg from '../assets/food_bg.jpg';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <img src={food_bg} alt="Food background" className="background-image" />
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Food Zone</h1>
        <p className="subtitle">Discover best foods & restaurants</p>
      </div>
    </div>
  );
};

export default Dashboard;
