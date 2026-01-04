import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h4 className="footer-name">Sourabh Gupta</h4>
            <p className="footer-tagline">Software Development Engineer</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h5 className="footer-section-title">Navigation</h5>
              <ul className="footer-list">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h5 className="footer-section-title">Connect</h5>
              <ul className="footer-list">
                <li><a href="https://github.com/username" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:your.email@example.com">Email</a></li>
                <li><a href="/resume.pdf" download>Resume</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p className="footer-motto">Building the future, one line of code at a time.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
