import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout'; // Import the layout
import './Templates.css';

const Templates = () => {
  return (
    <DashboardLayout>
      <div className="templates-page">
        <h1>Templates</h1>

        {/* All Templates Section */}
        <div className="template-section">
          <div className="section-header">
            <h2>All</h2>
            <Link to="/templates/all" className="see-all">See All</Link>
          </div>
          <div className="template-grid">
            {[...Array(4)].map((_, i) => (
              <div key={`all-${i}`} className="template-card"></div>
            ))}
          </div>
        </div>

        {/* Facebook Templates Section */}
        <div className="template-section">
          <div className="section-header">
            <h2>Facebook</h2>
            <Link to="/templates/facebook" className="see-all">See All</Link>
          </div>
          <div className="template-grid">
            {[...Array(4)].map((_, i) => (
              <div key={`fb-${i}`} className="template-card"></div>
            ))}
          </div>
        </div>

        {/* Instagram Templates Section */}
        <div className="template-section">
          <div className="section-header">
            <h2>Instagram</h2>
            <Link to="/templates/instagram" className="see-all">See All</Link>
          </div>
          <div className="template-grid">
            {[...Array(4)].map((_, i) => (
              <div key={`ig-${i}`} className="template-card"></div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
