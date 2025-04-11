import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <div className="feature-hero">
        <h1>AI-Powered Creative Suite</h1>
        <p className="hero-subtitle">Transform your ideas into reality with our cutting-edge technology</p>
        <div className="hero-divider"></div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🖼️</div>
          <h2>AI Image Generation</h2>
          <p>Create stunning images from text prompts with our advanced AI models</p>
          <div className="feature-highlight">
            <span></span>
          </div>
        </div>

        {/* <div className="center-feature">
          <div className="center-content">
            <div className="center-icon">✨</div>
            <h3>All-In-One Platform</h3>
            <p>Seamlessly integrate all our creative tools in one workflow</p>
            <button className="cta-button">Get Started</button>
          </div>
        </div> */}

        <div className="feature-card">
          <div className="feature-icon">🎥</div>
          <h2>Video Generation</h2>
          <p>Transform scripts into professional videos automatically</p>
          <div className="feature-highlight">
            <span></span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎤</div>
          <h2>Lip Sync Technology</h2>
          <p>Perfectly synchronize audio with video for realistic results</p>
          <div className="feature-highlight">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;