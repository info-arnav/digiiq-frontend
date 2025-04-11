import React, { useState } from 'react';
import './ImagePage.css';

export default function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [strength, setStrength] = useState(95);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [colorPalette, setColorPalette] = useState('default');
  const [cameraAngle, setCameraAngle] = useState('default');
  const [contentType, setContentType] = useState('business');
  const [generatedImages, setGeneratedImages] = useState(Array(4).fill(null));

  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt first');
      return;
    }
    
    setIsGenerating(true);
    console.log('Generating image with settings:', {
      prompt,
      strength,
      aspectRatio,
      colorPalette,
      cameraAngle,
      contentType
    });
    
    // Simulate API call and image generation
    setTimeout(() => {
      setIsGenerating(false);
      // Update with placeholder images (in a real app, these would be actual image URLs)
      setGeneratedImages(Array(4).fill({
        url: `https://via.placeholder.com/512?text=Generated+${Date.now()}`,
        prompt: prompt
      }));
    }, 2000);
  };

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt first');
      return;
    }
    
    setIsEnhancing(true);
    console.log('Enhancing prompt:', prompt);
    
    setTimeout(() => {
      setIsEnhancing(false);
      setPrompt(prev => `${prev} (enhanced with more details)`);
    }, 1500);
  };

  return (
    <div className="image-page">
      {/* Sidebar */}
      <aside className="image-sidebar">
        <h2 className="logo">AI Image Generator</h2>

        <div className="form-group">
          <label>Prompt</label>
          <textarea 
            placeholder="Describe your image. Get creative..." 
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="button-group">
            <button 
              className={`btn primary ${isGenerating ? 'loading' : ''}`}
              onClick={handleGenerateImage}
              disabled={isGenerating || isEnhancing}
            >
              {isGenerating ? '⏳ Generating...' : '🖼️ Generate Image'}
            </button>
            <button 
              className={`btn secondary ${isEnhancing ? 'loading' : ''}`}
              onClick={handleEnhancePrompt}
              disabled={isGenerating || isEnhancing}
            >
              {isEnhancing ? '✨ Enhancing...' : '✨ Enhance Prompt'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Strength <span className="value-label">{strength}%</span></label>
          <div className="slider-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              className="slider" 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Aspect Ratio</label>
          <select 
            className="select"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <option value="1:1">Square (1:1)</option>
            <option value="16:9">Widescreen (16:9)</option>
            <option value="4:3">Standard (4:3)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Color Palette</label>
          <select 
            className="select"
            value={colorPalette}
            onChange={(e) => setColorPalette(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="vibrant">Vibrant</option>
            <option value="pastel">Pastel</option>
            <option value="monochromatic">Monochromatic</option>
          </select>
        </div>

        <div className="form-group">
          <label>Camera Angle</label>
          <select 
            className="select"
            value={cameraAngle}
            onChange={(e) => setCameraAngle(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="top">Top View</option>
            <option value="side">Side View</option>
            <option value="low">Low Angle</option>
          </select>
        </div>

        <div className="form-group">
          <label>Content Type</label>
          <select 
            className="select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="business">Business</option>
            <option value="art">Art</option>
            <option value="fashion">Fashion</option>
            <option value="photography">Photography</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="image-main">
        <header className="image-header">
          <div className="spacer" />
          <div className="header-actions">
            <span className="upgrade-link">⚡ Upgrade Plan</span>
            <button className="credit-btn">100 credits</button>
            <div className="avatar-circle"></div>
          </div>
        </header>

        <section className="image-grid">
          {generatedImages.map((image, index) => (
            <div className="image-card" key={index}>
              {image ? (
                <>
                  <img 
                    src={image.url} 
                    alt={`Generated from: ${image.prompt}`}
                    className="generated-image"
                  />
                  <div className="image-overlay">
                    <span className="image-number">Image {index + 1}</span>
                  </div>
                </>
              ) : (
                <div className="image-placeholder">
                  <div className="placeholder-text">
                    Image {index + 1}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}