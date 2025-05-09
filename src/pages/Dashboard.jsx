import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [aiNews, setAiNews] = useState([]);

  const handleSignOut = () => {
    auth.signOut().catch(error => {
      console.error("Error signing out:", error);
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=artificial%20intelligence&sortBy=publishedAt&pageSize=4&apiKey=4ec99912abdf4d0383eacfba6a2aa76b'
        );
        setAiNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching AI news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">LOGO</div>

        <nav className="menu-section">
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item">📁 Projects</div>
          <div className="menu-item">📄 Templates</div>
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

      <main className="main-content">
        <header className="dashboard-header">
          <input
            type="text"
            placeholder="🔍 Search for content"
            className="search-bar"
          />
          <div className="header-actions">
            <span>⚡ Upgrade</span>
            <span>🔔</span>
            <span>❓</span>
            <span>⚙️</span>
            <Link to="/profile" className="avatar-link">
  <button className="avatar">👤</button>
</Link>
          </div>
        </header>

        <section className="content-section">
          <h3>Create</h3>
          <div className="card-row">
            <Link to="/imagepage" className="card-link">
              <div className="card">🖼️ Image</div>
            </Link>
            <Link to="/videogeneration" className="card-link">
            <div className="card">🎥 Video</div>
            </Link>
            <Link to="/lipsync" className="card-link">
            <div className="card">🎥 LipSync</div>
            </Link>
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
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  <div className="card">
                    <div className="card-title">{article.title.slice(0, 60)}...</div>
                    <div className="card-source">{article.source.name}</div>
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
