// client/src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "917023159912"; // Replace with your number (with country code)
  const message = "Hi Sourabh, I visited your portfolio and want to connect!";
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} />
      <span>Let's Talk</span>
    </a>
  );
}
