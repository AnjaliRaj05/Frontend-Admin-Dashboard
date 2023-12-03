
import React from 'react';
import './style.css';
import SearchBar from './SearchBar';
const Navbar = ({ onSearch }) => {
  return (
    <div className="navbar">

        <div><h1>Admin Dashboard</h1></div>
      
      <div><SearchBar onSearch={onSearch} /></div>
    </div>
  );
};

export default Navbar;