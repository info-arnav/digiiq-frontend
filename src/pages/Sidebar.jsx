// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
        <div className="logo">LOGO</div>

        <nav className="menu-section">
          <Link to="/" className="card-link">
            <div className="menu-item">🏠 Home</div>
          </Link>
          <Link to="/projects" className="card-link">
            <div className="menu-item">📁 Projects</div>
          </Link>
          <Link to="/templates" className="card-link">
            <div className="menu-item">📄 Templates</div>
          </Link>
          <Link to="/brandkits" className="card-link">
            <div className="menu-item">🎨 Brand Kits</div>
          </Link>
        </nav>

        <hr />

        <nav className="menu-section">
          <div className="section-title">ASSETS</div>
          <Link to="/saved" className="card-link">
            <div className="menu-item">✅ Saved</div>
          </Link>
          <Link to="/favourites" className="card-link">
            <div className="menu-item">⭐ Favourites</div>
          </Link>
          <Link to="/shared" className="card-link">
            <div className="menu-item">📤 Shared</div>
          </Link>
        </nav>

        <hr />

        <div className="menu-section tools">
          <div className="tools-header">
            <span>TOOLS</span>
            <button className="new-btn">New +</button>
          </div>
          <Link to="/imagepage" className="card-link">
            <div className="menu-item">🖼️ Generate image</div>
          </Link>
          <Link to="/videogeneration" className="card-link">
            <div className="menu-item">🎥 Generate video</div>
          </Link>
          <Link to="/lipsync" className="card-link">
            <div className="menu-item">🎤 Generate LipSync</div>
          </Link>
        </div>

        <hr />

        <nav className="menu-section">
          <div className="section-title">ACCOUNT</div>
          <Link to="/profile" className="card-link">
            <div className="menu-item">👤 My Account</div>
          </Link>
          <Link to="/manage-plan" className="card-link">
            <div className="menu-item">💼 Manage Plan</div>
          </Link>
          <Link to="/login" className="card-link">
            <div className="menu-item">🚪 Sign Out</div>
          </Link>
        </nav>

        <div className="footer-text">Lorem Ipsum text</div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
