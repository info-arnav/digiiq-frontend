import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  FiImage,
  FiFilm,
  FiMusic,
  FiStar,
  FiMoreVertical
} from "react-icons/fi";
import "./Saved.css";

const Saved = () => {
  const [activeCategory, setActiveCategory] = useState("images");

  const savedItems = {
    images: [
      { id: 1, name: "Sunset.jpg", modified: "2 days ago" },
      { id: 2, name: "Portrait.png", modified: "1 week ago" }
    ],
    videos: [
      { id: 3, name: "Presentation.mp4", modified: "3 days ago" },
      { id: 4, name: "Interview.mov", modified: "5 days ago" }
    ],
    lipSync: [
      { id: 5, name: "LipSync1.mp4", modified: "1 day ago" },
      { id: 6, name: "LipSync2.mp4", modified: "Today" }
    ]
  };

  const renderItems = (items) => (
    <div className="saved-section active">
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
          <button className="file-actions" onClick={() => console.log(`Actions for ${item.name}`)}>
            <FiMoreVertical size={18} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="saved-container">
        <div className="shared-header">
          <h1>
            <FiStar size={24} className="header-icon" />
            Saved Files
          </h1>
          <div className="saved-toggle-buttons">
            <button
              className={`view-option ${activeCategory === "images" ? "active" : ""}`}
              onClick={() => setActiveCategory("images")}
            >
              Images
            </button>
            <button
              className={`view-option ${activeCategory === "videos" ? "active" : ""}`}
              onClick={() => setActiveCategory("videos")}
            >
              Videos
            </button>
            <button
              className={`view-option ${activeCategory === "lipSync" ? "active" : ""}`}
              onClick={() => setActiveCategory("lipSync")}
            >
              Lip Sync Videos
            </button>
          </div>
        </div>

        <div className="shared-content">
          <div className="files-section">
            <div className="section-header">
              <h2>{
                activeCategory === "images"
                  ? "Saved Images"
                  : activeCategory === "videos"
                  ? "Saved Videos"
                  : "Saved Lip Sync Videos"
              }</h2>
            </div>
            {renderItems(savedItems[activeCategory])}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Saved;