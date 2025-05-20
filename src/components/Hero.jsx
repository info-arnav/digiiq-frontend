import React from 'react';
import './Hero.css';

function Hero({ onGetStarted }) {
  const brands = [
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
    { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' }
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-tagline">AI-Powered Creation Suite</div>
        <h1>The Fastest AI Experience Ever Made</h1>
        <p>
          Instantly generate stunning images, create engaging videos, and sync audio to visuals—all powered by cutting-edge AI.
        </p>
        <button className="get-started" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
      <div className="hero-demo-rectangle"></div>
      <div className="brands-row">
        {brands.map((brand, i) => (
          <div className="brand-logo" key={i}>
            <img src={brand.logo} alt={brand.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
