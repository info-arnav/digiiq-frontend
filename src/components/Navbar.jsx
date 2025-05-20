import React from 'react';
import './Navbar.css';

function Navbar({ onGetStarted }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">DIGI IQ</div>
        <ul className="nav-links">
          <li>Models</li>
          <li>Resources</li>
          <li>Pricing</li>
          <li>Products</li>
        </ul>
        <button className="get-started" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
