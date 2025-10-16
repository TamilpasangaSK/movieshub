// src/components/TelegramButton.jsx
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "../styles/telegramButton.css";

export default function TelegramButton() {
  return (
    <div className="telegram-section">
      <a
        href="https://t.me/YourChannelLink"
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-btn"
      >
        <FaTelegramPlane className="icon" />
        Join Our Telegram
      </a>
    </div>
  );
}
