import React, { useState } from 'react';
import { FiFacebook, FiInstagram, FiStar } from 'react-icons/fi';
import DashboardLayout from '../../dashboard/DashboardLayout';
import './Templates.css';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'facebook', 'instagram'];

  const renderTemplates = () => (
    <div className="template-section active">
      {[...Array(6)].map((_, i) => (
        <div key={`template-${i}`} className="template-card">
          <div className="template-preview">Template {i + 1}</div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="templates-container">
        <div className="templates-header">
          <h1>
            <FiStar size={24} className="header-icon" />
            Templates
          </h1>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FiFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FiInstagram size={20} />
            </a>
          </div>
        </div>

        <div className="templates-toggle-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`view-option ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="template-content">
          <h2>
            {activeCategory === 'all'
              ? 'All Templates'
              : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Templates`}
          </h2>
          {renderTemplates()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
