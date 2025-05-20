import React, { useState } from "react";
import DashboardLayout from "../../dashboard/DashboardLayout";
import {
  FiImage,
  FiFilm,
  FiMusic,
  FiHeart,
  FiMoreVertical
} from "react-icons/fi";
import "./Favorites.css";

const Favorites = () => {
  const [activeCategory, setActiveCategory] = useState("images");

  const favoriteItems = {
    images: [
      { id: 1, name: "Vacation.jpg", modified: "3 days ago", starred: true },
      { id: 2, name: "Profile.png", modified: "2 weeks ago", starred: true }
    ],
    videos: [
      { id: 3, name: "Tutorial.mp4", modified: "5 days ago", starred: true },
      { id: 4, name: "Wedding.mov", modified: "1 month ago", starred: true }
    ],
    lipSync: [
      { id: 5, name: "Performance1.mp4", modified: "2 days ago", starred: true },
      { id: 6, name: "Performance2.mp4", modified: "Yesterday", starred: true }
    ]
  };

  const renderItems = (items) => (
    <div className="favorites-grid">
      {items.map((item) => (
        <div key={item.id} className="file-card">
          <div className="file-icon">
            {activeCategory === "images" && <FiImage size={24} />}
            {activeCategory === "videos" && <FiFilm size={24} />}
            {activeCategory === "lipSync" && <FiMusic size={24} />}
          </div>
          <div className="file-info">
            <h3>{item.name}</h3>
            <p className="file-meta">
              <span>Modified: {item.modified}</span>
            </p>
          </div>
          <div className="file-actions">
            <button className="star-btn active">
              <FiHeart size={18} />
            </button>
            <button onClick={() => console.log(`Actions for ${item.name}`)}>
              <FiMoreVertical size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>
            <FiHeart size={24} className="header-icon" fill="#ff4081" />
            Favorites
          </h1>
          <div className="category-tabs">
            <button
              className={`tab-btn ${activeCategory === "images" ? "active" : ""}`}
              onClick={() => setActiveCategory("images")}
            >
              Images
            </button>
            <button
              className={`tab-btn ${activeCategory === "videos" ? "active" : ""}`}
              onClick={() => setActiveCategory("videos")}
            >
              Videos
            </button>
            <button
              className={`tab-btn ${activeCategory === "lipSync" ? "active" : ""}`}
              onClick={() => setActiveCategory("lipSync")}
            >
              Lip Sync Videos
            </button>
          </div>
        </div>

        <div className="favorites-content">
          <div className="section-header">
            <h2>
              {activeCategory === "images"
                ? "Favorite Images"
                : activeCategory === "videos"
                ? "Favorite Videos"
                : "Favorite Lip Sync Videos"}
            </h2>
          </div>
          {renderItems(favoriteItems[activeCategory])}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Favorites;