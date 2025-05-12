import React, { useState, useEffect } from "react";
import "./videogeneration.css";

function Videogeneration() {
  const [credits, setCredits] = useState(100);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5s");
  const [model, setModel] = useState("Gen-4 Turbo");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }
    if (credits < 10) {
      alert("Not enough credits to generate video");
      return;
    }
    setIsGenerating(true);
    setCredits(prev => prev - 10);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Video generated successfully!");
    }, 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      alert(`Selected file: ${file.name}`);
    }
  };

  const handleExport = () => {
    alert("Export functionality would be implemented here");
  };

  const handleShare = () => {
    alert("Share functionality would be implemented here");
  };

  const handleUpgrade = () => {
    alert("Upgrade plan would be shown here");
  };

  // Close sidebar on mobile when clicking outside (optional, for UX)
  useEffect(() => {
    if (!showMobileMenu) return;
    function handleClick(e) {
      if (
        !e.target.closest(".left-column") &&
        !e.target.closest(".menu-btn")
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMobileMenu]);

  return (
    <div className="image-page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="hamburger-icon">≡</span>
          </button>
          <h1>Video Generation</h1>
        </div>
        <div className="header-right">
          <button className="upgrade-btn" onClick={handleUpgrade} aria-label="Upgrade">
            <span className="lightning-icon">⚡</span>
            Upgrade
          </button>
          <span className="credits">{credits} credits</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="content">
        {/* Left Column - Controls */}
        <div className={`left-column${showMobileMenu ? " mobile-visible" : ""}`}>
          {/* Upload Box */}
          <div className="upload-container">
            <div className="upload-box">
              <div className="image-icon">
                <span>🖼</span>
              </div>
              <p>
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : "Drop an image or click to upload"}
              </p>
              <div className="upload-buttons">
                <label className="select-btn">
                  Select asset
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <button className="create-btn" type="button">
                  Create image
                </button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="settings">
            <div className="setting-group">
              <label>Aspect ratio</label>
              <div className="select-wrapper">
                <span className="select-icon">⬚</span>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                >
                  <option value="16:9">16:9</option>
                  <option value="9:16">9:16</option>
                  <option value="1:1">1:1</option>
                  <option value="4:5">4:5</option>
                </select>
              </div>
            </div>
            <div className="setting-group">
              <label>Duration</label>
              <div className="select-wrapper">
                <span className="select-icon">⏱</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="3s">3s</option>
                  <option value="5s">5s</option>
                  <option value="10s">10s</option>
                  <option value="15s">15s</option>
                </select>
              </div>
            </div>
            <div className="setting-group">
              <label>Model</label>
              <div className="select-wrapper">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="Gen-4 Turbo">Gen-4 Turbo</option>
                  <option value="Gen-3">Gen-3</option>
                  <option value="Gen-2">Gen-2</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="right-column">
          <div className="project-header">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="project-name-input"
              aria-label="Project name"
            />
            <div className="project-actions">
              <button className="share-btn" onClick={handleShare} aria-label="Share">
                Share
              </button>
              <button className="export-btn" onClick={handleExport} aria-label="Export">
                Export
              </button>
            </div>
          </div>
          {/* Video Preview */}
          <div className="video-preview">
            {isGenerating ? (
              <div className="generating-overlay">
                <div className="spinner"></div>
                <p>Generating video...</p>
              </div>
            ) : selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="preview-image"
              />
            ) : (
              <div className="empty-preview">
                <p>Your generated video will appear here</p>
              </div>
            )}
          </div>
          {/* Prompt Input */}
          <div className="prompt-container">
            <textarea
              placeholder="Describe your shot. View guide."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              aria-label="Generate"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Footer */}
      <footer className="footer">
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          Share
        </button>
        <button className="export-btn" onClick={handleExport} aria-label="Export">
          Export
        </button>
      </footer>
    </div>
  );
}

export default Videogeneration;
