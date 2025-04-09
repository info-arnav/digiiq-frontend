import { useState, useEffect, useRef } from 'react';
import './News.css';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Number of visible cards
  const visibleCards = 3;

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWSAPI_KEY || '4ec99912abdf4d0383eacfba6a2aa76b';
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=artificial+intelligence&language=en&sortBy=publishedAt&apiKey=${apiKey}`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setArticles(data.articles.slice(0, 9)); // Get enough articles for multiple slides
      } catch (err) {
        setError(err.message);
        console.error("NewsAPI fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (articles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => 
        prev >= Math.ceil(articles.length / visibleCards) - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= Math.ceil(articles.length / visibleCards) - 1 ? 0 : prev + 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? Math.ceil(articles.length / visibleCards) - 1 : prev - 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Get current slide articles
  const getCurrentArticles = () => {
    const start = currentSlide * visibleCards;
    return articles.slice(start, start + visibleCards);
  };

  if (loading) {
    return (
      <div className="news-section">
        <h2>Latest AI News</h2>
        <div className="loading-grid">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="news-card loading"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-section">
        <h2>Latest AI News</h2>
        <div className="error">
          Failed to load news. <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-section">
      <h2>Latest AI News</h2>
      <div className="slider-container">
        <button className="arrow-btn prev" onClick={prevSlide}>&lt;</button>
        
        <div className="slider-track" ref={sliderRef}>
          <div 
            className="slider-inner"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array(Math.ceil(articles.length / visibleCards))
              .fill()
              .map((_, slideIndex) => (
                <div key={slideIndex} className="slide-group">
                  {articles
                    .slice(slideIndex * visibleCards, slideIndex * visibleCards + visibleCards)
                    .map((article, articleIndex) => (
                      <div 
                        key={articleIndex} 
                        className="news-card"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        <img 
                          src={article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
                          alt={article.title}
                        />
                        <div className="news-content">
                          <h3>{article.title}</h3>
                          <p>{article.description?.substring(0, 100)}...</p>
                          <div className="news-footer">
                            <span>{article.source.name}</span>
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read More
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
        
        <button className="arrow-btn next" onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
}