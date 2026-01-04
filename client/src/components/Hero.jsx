import React from 'react'
import { profile } from '../data/resume'

export default function Hero() {
  return (
    <div className="card pad hero">
      <div className="hero-content">
        <p className="mono" style={{opacity:.8, marginBottom: '8px'}}>Welcome to my portfolio</p>
        <h1 className="hero-title">
          Hi, I'm <span style={{color:'var(--accent)'}}>{profile.name}</span>
        </h1>
        <div className="hero-sub">Software Development Engineer at LifeGuru</div>
        <p className="hero-description">{profile.summary}</p>
        <div className="hero-cta">
          <a className="btn primary" href="#projects">View Projects</a>
          <a className="btn" href="#contact">Get In Touch</a>
        </div>
      </div>

      <div className="avatar-wrap">
        <img src="/profile.jpeg" alt={`${profile.name} profile`} />
      </div>
    </div>
  )
}
