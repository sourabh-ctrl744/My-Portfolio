import React from "react";
import dhruvImg from "../assets/testimonials/dhruv.jpg";
import VibudhImg from "../assets/testimonials/vibudh.jpg";
import SatyaImg from "../assets/testimonials/satya.jpg";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dhruv Maurya",
      role: "Senior Frontend Web Developer at LifeGuru",
      feedback: "Sourabh is an exceptional developer with great problem-solving skills. Working with him was a pleasure.",
      avatar: dhruvImg
    },
    {
      name: "Vibudh Shukla",
      role: "App Developer at LifeGuru",
      feedback: "He understands frontend needs quickly and delivers high-quality work ahead of deadlines.",
      avatar: VibudhImg
    },
    {
      name: "Satyendra Singh",
      role: "Co-founder at LifeGuru",
      feedback: "Sourabh's attention to detail and creativity set him apart. Highly recommended!",
      avatar: SatyaImg
    }
  ];

  return (
    <div className="testimonials-grid">
      {testimonials.map((t, index) => (
        <div key={index} className="testimonial-card">
          <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
          <p className="testimonial-feedback">"{t.feedback}"</p>
          <h4 className="testimonial-name">{t.name}</h4>
          <small className="testimonial-role">{t.role}</small>
        </div>
      ))}
    </div>
  );
}
