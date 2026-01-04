import React from 'react'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <div className="experience-grid">
      {experience.map((exp, i) => (
        <article key={i} className="experience-card">
          <header className="experience-header">
            <div className="experience-title-section">
              <h3 className="experience-role">{exp.role}</h3>
              <h4 className="experience-company">{exp.company}</h4>
            </div>
            <div className="experience-duration">
              <span className="duration-text">{exp.start} — {exp.end}</span>
            </div>
          </header>
          <div className="experience-content">
            <ul className="experience-bullets">
              {exp.bullets.map((b, j) => (
                <li key={j} className="experience-bullet">{b}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}
