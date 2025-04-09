import React from 'react'
import './Features.css'

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2>Features</h2>
        <p>Here are some reasons why you should choose our product</p>
        <div className="feature-boxes">
          <div className="feature-box">Feature 1</div>
          <div className="feature-box">Feature 2</div>
          <div className="feature-box">Feature 3</div>
          <div className="feature-box">Feature 4</div>
        </div>
      </div>
    </section>
  )
}

export default Features