import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>LOGO</h4>
          <p>The easy way to create stunning videos, add subtitles and grow your audience.</p>
        </div>
        <div className="footer-column">
          <h4>Video Editor</h4>
          <ul>
            <li>Add Music</li>
            <li>Add Subtitles</li>
            <li>Video Compressor</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>AI Tools</h4>
          <ul>
            <li>AI Avatars</li>
            <li>AI Video Generator</li>
            <li>Video Background Remover</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>Blog</li>
            <li>Guides</li>
            <li>Webinars</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>Jobs</li>
            <li>Privacy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © Copyright 2025
      </div>
    </footer>
  );
};

export default Footer;
