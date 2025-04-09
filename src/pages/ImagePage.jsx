import React from 'react';
import './ImagePage.css';

export default function ImagePage() {
  return (
    <div className="image-page">
      {/* Sidebar */}
      <aside className="image-sidebar">
        <h2 className="logo">LOGO</h2>

        <div className="form-group">
          <label>Prompt</label>
          <textarea placeholder="Describe your image. Get creative..." rows={3} />
          <button className="btn">🖼️ Describe image</button>
          <button className="btn secondary">✨ AI Improve</button>
        </div>

        <div className="form-group">
          <label>Select Asset</label>
          <div className="asset-picker">
            <select>
              <option>Image to Image</option>
              <option>Text to Image</option>
            </select>
            <div className="slider">
              <span>-</span>
              <input type="range" min="0" max="100" defaultValue="95" />
              <span>+</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Aspect ratio</label>
          <select>
            <option>1:1 512px × 512px</option>
            <option>16:9</option>
            <option>4:3</option>
          </select>
        </div>

        <div className="form-group">
          <label>Color and tone</label>
          <select>
            <option>None</option>
            <option>Vibrant</option>
            <option>Pastel</option>
          </select>
        </div>

        <div className="form-group">
          <label>Camera Angle</label>
          <select>
            <option>None</option>
            <option>Top View</option>
            <option>Side View</option>
          </select>
        </div>

        <div className="form-group">
          <label>Facebook / Instagram Links</label>
          <input type="text" placeholder="Insert link here..." />
        </div>

        <div className="form-group">
          <label>Content type</label>
          <select>
            <option>Business</option>
            <option>Art</option>
            <option>Fashion</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="image-main">
        <header className="image-header">
          <div className="spacer" />
          <div className="header-actions">
            <span>⚡ Upgrade</span>
            <button className="credit-btn">100 credits</button>
            <div className="avatar-circle"></div>
          </div>
        </header>

        <section className="generated-images">
          {[...Array(4)].map((_, index) => (
            <div className="image-placeholder" key={index}></div>
          ))}
        </section>

        <div className="prompt-preview">
          <p>Prompt</p>
          <textarea placeholder="Describe your image. Get creative..." />
        </div>
      </main>
    </div>
  );
}
