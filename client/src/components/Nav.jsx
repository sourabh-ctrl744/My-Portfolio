import React, { useState, useEffect } from 'react'
import { profile } from '../data/resume'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    closeMenu()
  }

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="header">
      <div className="nav">
        <a className="brand" href="#home" onClick={handleLinkClick}>
          {profile.name}
        </a>
        
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close mobile menu"
          >
            ×
          </button>
          
          <div className="mobile-nav-content">
            <a href="#about" onClick={handleLinkClick}>About</a>
            <a href="#experience" onClick={handleLinkClick}>Experience</a>
            <a href="#projects" onClick={handleLinkClick}>Projects</a>
            <a href="#education" onClick={handleLinkClick}>Education</a>
            <a href="#blogs" onClick={handleLinkClick}>Blogs</a>
            <a href="#contact" className="pill" onClick={handleLinkClick}>Contact</a>
          </div>
        </nav>
      </div>
      
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay active" 
          onClick={closeMenu}
        ></div>
      )}
    </header>
  )
}
