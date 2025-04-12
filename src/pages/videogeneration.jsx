import React from "react";
import "./videogeneration.css";

function Videogeneration() {
  return (
    <div className="image-page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn">
            <span className="hamburger-icon">≡</span>
          </button>
          <h1>Video Generation</h1>
        </div>
        <div className="header-right">
          <button className="upgrade-btn">
            <span className="lightning-icon">⚡</span>
            Upgrade
          </button>
          <span className="credits">100 credits</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="content">
        {/* Left Column */}
        <div className="left-column">
          {/* Upload Box */}
          <div className="upload-container">
            <div className="upload-box">
              <div className="image-icon">
                <span>🖼</span>
              </div>
              <p>Drop an image or click to upload</p>
              <div className="upload-buttons">
                <button className="select-btn">Select asset</button>
                <button className="create-btn">Create image</button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="settings">
            <div className="setting-group">
              <label>Aspect ratio</label>
              <div className="select-wrapper">
                <span className="select-icon">⬚</span>
                <select>
                  <option>16:9</option>
                </select>
              </div>
            </div>

            <div className="setting-group">
              <label>Duration</label>
              <div className="select-wrapper">
                <span className="select-icon">⏱</span>
                <select>
                  <option>5s</option>
                </select>
              </div>
            </div>

            <div className="setting-group">
              <label>Model</label>
              <div className="select-wrapper">
                <select>
                  <option>Gen-4 Turbo</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="project-header">
            <h2>Untitled Project</h2>
            <div className="project-actions">
              <button className="share-btn">Share</button>
              <button className="export-btn">Export</button>
            </div>
          </div>

          {/* Video Preview */}
          <div className="video-preview"></div>

          {/* Prompt Input */}
          <div className="prompt-container">
            <textarea placeholder="Describe your shot. View guide."></textarea>
            <button className="generate-btn">Generate</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <button className="share-btn">Share</button>
        <button className="export-btn">Export</button>
      </footer>
    </div>
  );
}

export default Videogeneration;