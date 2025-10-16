// src/components/TrailerModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/TrailerModal.css'; // You'll create this CSS

const TrailerModal = ({ trailerUrl, onClose }) => {
  return ReactDOM.createPortal(
    <div className="trailer-modal-overlay" onClick={onClose}>
      <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-modal-close" onClick={onClose}>&times;</button>
        <div className="trailer-video-container">
          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>,
    document.body // Portals to the body so it's above everything
  );
};

export default TrailerModal;