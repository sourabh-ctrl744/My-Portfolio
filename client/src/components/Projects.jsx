import React from "react";

export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Vite. Features a clean design, smooth animations, and fully responsive layout that works perfectly across all devices.",
      image: "/projects/portfolio-preview.gif",
      tech: ["React", "Vite", "CSS3", "JavaScript"],
      github: "https://github.com/username/portfolio",
      live: "https://yourportfolio.com",
      featured: true
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application built with the MERN stack. Includes user authentication, product management, shopping cart, and payment integration with Stripe.",
      image: "/projects/ecommerce-preview.gif",
      tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      github: "https://github.com/username/ecommerce",
      live: "https://yourecommerce.com",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/projects/task-app-preview.gif",
      tech: ["React", "Socket.io", "PostgreSQL", "Node.js"],
      github: "https://github.com/username/task-app",
      live: "https://yourtaskapp.com",
      featured: false
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that provides current weather conditions, forecasts, and interactive maps for multiple locations worldwide.",
      image: "/projects/weather-preview.gif",
      tech: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/username/weather-app",
      live: "https://yourweatherapp.com",
      featured: false
    }
  ];

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h3 className="projects-title">Featured Projects</h3>
        <p className="projects-subtitle">
          Here are some of my recent projects that showcase my skills in full-stack development, 
          modern web technologies, and user experience design.
        </p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              {project.featured && (
                <div className="featured-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                  </svg>
                  Featured
                </div>
              )}
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
              
              <div className="project-buttons">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn github"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn demo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
