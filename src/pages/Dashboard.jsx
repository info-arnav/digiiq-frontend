import React from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom'; // 👈 import Link
import './Dashboard.css';

export default function Dashboard() {
  const handleSignOut = () => {
    auth.signOut().catch(error => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">LOGO</div>

        <div className="menu-section">
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item">📁 Projects</div>
          <div className="menu-item">📄 Templates</div>
          <div className="menu-item">🎨 Brand Kits</div>
        </div>

        <hr />

        <div className="menu-section">
          <div className="section-title">ASSETS</div>
          <div className="menu-item">✅ Saved</div>
          <div className="menu-item">⭐ Favourites</div>
          <div className="menu-item">📤 Shared</div>
        </div>

        <hr />

        <div className="menu-section tools">
          <div className="tools-header">
            <span>TOOLS</span>
            <button className="new-btn">New +</button>
          </div>
          <div className="menu-item">🎥 Generate video</div>
          <div className="menu-item">🖼️ Generate image</div>
          <div className="menu-item">🎵 Generate audio</div>
        </div>

        <div className="footer-text">Lorem Ipsum text</div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <input type="text" placeholder="🔍 Search for content" className="search-bar" />
          <div className="header-actions">
            <span>⚡ Upgrade</span>
            <span>🔔</span>
            <span>❓</span>
            <span>⚙️</span>
            <button className="avatar" onClick={handleSignOut}>👤</button>
          </div>
        </header>

        {/* Create Section */}
        <section className="content-section">
          <h3>Create</h3>
          <div className="card-row">
            <Link to="/imagepage" className="card-link">
              <div className="card">Image</div>
            </Link>
            <div className="card">Audio</div>
            <div className="card">Video</div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="content-section">
          <h3>Trending / What's new</h3>
          <div className="card-grid">
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="card skeleton"></div>
            ))}
          </div>
        </section>

        {/* Recents Section */}
        <section className="content-section">
          <h3>Recents</h3>
          <div className="card-grid">
            {Array(8).fill(0).map((_, idx) => (
              <div key={idx} className="card skeleton"></div>
            ))}
          </div>
        </section>

        
      </main>
    </div>
  );
}
