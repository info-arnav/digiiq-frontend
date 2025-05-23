import React, { useState } from "react";
import "./ImagePage.css";
import Navbar from "./Navbar1"; // ✅ Import the Navbar

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [strength, setStrength] = useState(95);
  const [assetType, setAssetType] = useState("image-to-image");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [colorTone, setColorTone] = useState("none");
  const [cameraAngle, setCameraAngle] = useState("none");
  const [contentType, setContentType] = useState("business");

  const handleDescribe = () => {
    alert("Describe image clicked!\nPrompt: " + prompt);
  };

  const handleAIImprove = () => {
    alert("AI Improve clicked!\nPrompt: " + prompt);
  };

  const aspectRatios = [
    { value: "1:1", label: "1:1 512px × 512px" },
    { value: "16:9", label: "16:9 1024px × 576px" },
    { value: "4:3", label: "4:3 800px × 600px" },
  ];

  const colorTones = [
    { value: "none", label: "None" },
    { value: "vibrant", label: "Vibrant" },
    { value: "pastel", label: "Pastel" },
    { value: "monochromatic", label: "Monochromatic" },
  ];

  const cameraAngles = [
    { value: "none", label: "None" },
    { value: "eye-level", label: "Eye Level" },
    { value: "low-angle", label: "Low Angle" },
    { value: "high-angle", label: "High Angle" },
  ];

  const contentTypes = [
    { value: "business", label: "Business" },
    { value: "social-media", label: "Social Media" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "art", label: "Art" },
  ];

  return (
    <div>
      <Navbar /> {/* ✅ Add Navbar at the top */}

      <div className="imagepage-root">
        {/* Sidebar */}
        <aside className="imagepage-sidebar">
          <div className="sidebar-logo">LOGO</div>
          <div className="sidebar-title">Image Generation</div>

          <div className="sidebar-section">
            <label className="sidebar-label">Prompt</label>
            <textarea
              className="sidebar-input"
              placeholder="Describe your image. Get creative..."
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="sidebar-btn-row">
              <button className="sidebar-btn" onClick={handleDescribe}>
                Describe image
              </button>
              <button className="sidebar-btn" onClick={handleAIImprove}>
                AI Improve
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">
              Select Asset <span className="sidebar-help">ⓘ</span>
            </label>
            <div className="sidebar-asset-box">
              <select
                className="sidebar-select"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              >
                <option value="image-to-image">Image to Image</option>
                <option value="text-to-image">Text to Image</option>
                <option value="video-to-image">Video to Image</option>
              </select>
              <div className="sidebar-slider-row">
                <button
                  className="sidebar-slider-btn"
                  onClick={() => setStrength(s => Math.max(0, s - 1))}
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={strength}
                  className="sidebar-slider"
                  onChange={(e) => setStrength(Number(e.target.value))}
                />
                <button
                  className="sidebar-slider-btn"
                  onClick={() => setStrength(s => Math.min(100, s + 1))}
                >
                  +
                </button>
                <span className="sidebar-slider-value">{strength}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Aspect ratio</label>
            <select
              className="sidebar-select"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
            >
              {aspectRatios.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Color and tone</label>
            <select
              className="sidebar-select"
              value={colorTone}
              onChange={(e) => setColorTone(e.target.value)}
            >
              {colorTones.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Camera Angle</label>
            <select
              className="sidebar-select"
              value={cameraAngle}
              onChange={(e) => setCameraAngle(e.target.value)}
            >
              {cameraAngles.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Facebook / Instagram Links</label>
            <input
              className="sidebar-input"
              placeholder="Insert link here...."
              disabled
            />
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Content type</label>
            <select
              className="sidebar-select"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              {contentTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Main area */}
        <div className="imagepage-main">
          <div className="imagepage-header">
            <span className="header-upgrade">⚡ Upgrade</span>
            <button className="header-credits">100 credits</button>
          </div>

          <div className="imagepage-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="imagepage-gridcell" key={n}>
                <div className="image-placeholder">Image {n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
