import React from 'react';

export default function Education() {
  const educationData = [
    {
      school: "BITS Pilani",
      degree: "Bachelor of Technology (B.Tech)",
      duration: "2021 - 2025",
      description: "8+ CGPA in Electronics Engineering",
      icon: "🎓"
    },
    {
      school: "Pallavan Senior Secondary School",
      degree: "Class 12th (Higher Secondary)",
      duration: "2021",
      description: "96% in PCM (Physics, Chemistry, Mathematics)",
      icon: "📚"
    },
    {
      school: "Pallavan Senior Secondary School",
      degree: "Class 10th (Secondary)",
      duration: "2019",
      description: "96.8% Overall",
      icon: "📖"
    }
  ];

  return (
    <div className="education-section">
      <h3 className="education-title">Education</h3>
      <div className="education-grid">
        {educationData.map((edu, index) => (
          <div key={index} className="education-card">
            <div className="education-icon">{edu.icon}</div>
            <div className="education-content">
              <h4 className="education-school">{edu.school}</h4>
              <p className="education-degree">{edu.degree}</p>
              <div className="education-duration">
                <span className="duration-badge">{edu.duration}</span>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
