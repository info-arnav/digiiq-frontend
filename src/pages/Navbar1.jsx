// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar1.css'; // Optional: Extract navbar-specific styles here

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="dashboard-header">
      <input type="text" placeholder="🔍 Search for content" className="search-bar" />
      <div className="header-actions">
        <span>⚡ Upgrade</span>
        <span>🔔</span>
        <span>❓</span>
        <span>⚙️</span>
        <div className="avatar-dropdown" ref={dropdownRef}>
          <button className="avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>👤</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Account</Link>
              <Link to="/manage-plan" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Manage your plan</Link>
              <Link to="/login" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Sign Out</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
