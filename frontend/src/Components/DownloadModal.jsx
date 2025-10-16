import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/DownloadModal.css';

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-1.02.18-1.25l14.93-5.78c.7-.27 1.3.17 1.1.92l-2.67 12.21c-.22.99-1.21 1.22-1.87.73l-4.1-3.41-1.95 1.89c-.21.21-.39.39-.71.39z"/>
    </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


const DownloadModal = ({ movie, quality, fileSize, onClose, downloadLink }) => {
  if (!movie) return null;

  return ReactDOM.createPortal(
    <div className="download-modal-overlay" onClick={onClose}>
      <div className="download-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="download-modal-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="modal-header">
          <div className="download-icon-wrapper">
            <DownloadIcon />
          </div>
          <h2>Download Ready</h2>
          <p>Your movie download is prepared</p>
        </div>

        <div className="movie-summary-card">
          <img src={movie.poster} alt={movie.title} className="summary-poster" />
          <div className="summary-info">
            <h3>{movie.title}</h3>
            <p><strong>Quality:</strong> {quality}</p>
            <p><strong>Size:</strong> {fileSize}</p>
          </div>
        </div>

        <div className="file-description-card">
          <p>File Description</p>
          <span>{movie.fileDescription}</span>
        </div>

        <a href={downloadLink} download className="btn-start-download" onClick={onClose}>
          <DownloadIcon /> Start Download
        </a>

        <a href="https://t.me/your_telegram_channel" target="_blank" rel="noopener noreferrer" className="btn-telegram">
          <TelegramIcon /> Telegram @TMB_Rips
        </a>
      </div>
    </div>,
    document.body
  );
};

export default DownloadModal;