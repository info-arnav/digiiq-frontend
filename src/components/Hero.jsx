import React from 'react';
import './Hero.css';

function Hero({ onGetStarted }) {
  return (
    <section className="hero">
      <h5>Trusted by industry leaders</h5>
      <h1>The fastest AI Experience ever made</h1>
      <p>Join thousands of businesses already using our platform</p>
      <button className="get-started" onClick={onGetStarted}>
        Get Started
      </button>

      <div className="brand-logos">
        {/* Spotify */}
        <img
          src="https://www.citypng.com/public/uploads/preview/hd-spotify-official-logo-transparent-background-701751694774517tqndda0ar2.png"
          alt="Spotify"
          className="brand-logo"
        />
        
        {/* Netflix */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="brand-logo"
        />
        
        {/* Notion (PNG version) */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
          alt="Notion"
          className="brand-logo"
        />
        
        {/* Brex (Text-based fallback) */}
        <img
          src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjAiIHk9IjIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDAiPkJSRVg8L3RleHQ+PC9zdmc+"
          alt="Brex"
          className="brand-logo"
        />
        
        {/* Deel */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Deel_Logo.svg"
          alt="Deel"
          className="brand-logo"
        />
        
        {/* Compass */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Compass_Icon.svg"
          alt="Compass"
          className="brand-logo"
        />
      </div>
    </section>
  );
}

export default Hero;