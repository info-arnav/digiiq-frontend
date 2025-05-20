// Sidebar.js
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
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item">📁 Projects</div>
          <Link to="/templates" className="card-link">
            <div className="menu-item">📄 Templates</div>
          </Link>
          <div className="menu-item">🎨 Brand Kits</div>
        </nav>
        <hr />
        <nav className="menu-section">
          <div className="section-title">ASSETS</div>
          <div className="menu-item">✅ Saved</div>
          <div className="menu-item">⭐ Favourites</div>
          <div className="menu-item">📤 Shared</div>
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
            <div className="menu-item">🎥 Generate LipSync</div>
          </Link>
        </div>
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
