import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [aiNews, setAiNews] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    auth.signOut().catch(error => {
      console.error("Error signing out:", error);
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_87577345c08a7a7e6c7e9e5b3f643d539bfbf&q=artificial intelligence&language=en`
        );

        // Filter articles to include only AI, ML, DL related content
        const filtered = (response.data.results || []).filter(article => {
          const title = article.title?.toLowerCase() || "";
          const description = article.description?.toLowerCase() || "";
          return (
            title.includes("artificial intelligence") ||
            title.includes("machine learning") ||
            title.includes("deep learning") ||
            title.includes("ai") ||
            title.includes("ml") ||
            title.includes("dl") ||
            description.includes("artificial intelligence") ||
            description.includes("machine learning") ||
            description.includes("deep learning") ||
            description.includes("ai") ||
            description.includes("ml") ||
            description.includes("dl")
          );
        });

        setAiNews(filtered);
      } catch (error) {
        console.error("Error fetching AI news:", error);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  return (
    <div className="dashboard-container">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>×</button>
        <div className="logo">LOGO</div>
        <nav className="menu-section">
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item">📁 Projects</div>
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

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <main className="main-content">
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

        <section className="content-section">
          <h3>Create</h3>
          <div className="card-row">
            <Link to="/imagepage" className="card-link"><div className="card">🖼️ Image</div></Link>
            <Link to="/videogeneration" className="card-link"><div className="card">🎥 Video</div></Link>
            <Link to="/lipsync" className="card-link"><div className="card">🎥 LipSync</div></Link>
          </div>
        </section>

        <section className="content-section">
          <h3>Trending / What's new</h3>
          <div className="card-grid">
            {aiNews.length === 0 ? (
              Array.from({ length: 4 }, (_, idx) => (
                <div key={idx} className="card skeleton"></div>
              ))
            ) : (
              aiNews.map((article, idx) => (
                <a
                  key={idx}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  <div className="card with-image">
                    <img
                      src={article.image_url || 'https://via.placeholder.com/150'}
                      alt="news"
                      className="card-thumbnail"
                    />
                    <div className="card-title">{article.title?.slice(0, 60)}...</div>
                    <div className="card-source">{article.source_id}</div>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>

        <section className="content-section">
          <h3>Recents</h3>
          <div className="card-grid">
            {Array.from({ length: 8 }, (_, idx) => (
              <div key={idx} className="card skeleton"></div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
