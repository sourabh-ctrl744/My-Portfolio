import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <p>I'm always up for a chat or a call! Feel free to reach out.</p>

      <div className="contact-buttons">
        {/* Email Button */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=guptasourabh744@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item email-btn"
        >
          <FaEnvelope />
          <span>guptasourabh744@gmail.com</span>
        </a>

        {/* Phone Button */}
        <a href="tel:+917023159912" className="contact-item phone-btn">
          <FaPhoneAlt />
          <span>+91 7023159912</span>
        </a>
      </div>

      <p className="coffee-text">Or catch up over a coffee ☕</p>
    </div>
  );
}
