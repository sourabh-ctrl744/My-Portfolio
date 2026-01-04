import React from 'react'
import { profile, tech } from '../data/resume'

export default function About() {
  return (
    <div className="card pad about-section">
      <div className="about-header">
        <h3 className="about-title">About Me</h3>
        <p className="about-description">
          Hello! I'm {profile.name}, a passionate Software Development Engineer at LifeGuru. 
          I enjoy creating innovative solutions for the web and building scalable applications 
          that make a real impact. My expertise lies in backend development with focus on 
          modern technologies and best practices.
        </p>
      </div>

      {/* Technologies section */}
      <div className="tech-section">
        <h4 className="tech-title">Technologies & Skills</h4>
        <div className="badges">
          {tech.map((t, i) => (
            <span className="badge" key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* Resume download button */}
      <div className="resume-section">
        <a
          href="/resume.pdf"
          download
          className="resume-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Resume
        </a>
      </div>
    </div>
  )
}
