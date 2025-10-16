import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../data/movies';
import DownloadModal from '../Components/DownloadModal';
import TrailerModal from '../Components/TrailerModal';
import '../styles/MovieDetails.css';

// --- SVG Icons ---
const StarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const ClockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const ViewsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const DownloadIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const FilmIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>;
const FourKIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12V8m0 8v-4m0 4h3m-3-4h2.5a1.5 1.5 0 0 1 0 3H9m3 4v-8l3 4 3-4v8"></path></svg>;


const MovieDetails = () => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === parseInt(movieId));

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(null);

  if (!movie) {
    return <div className="movie-not-found"><h2>404 - Movie Not Found</h2><Link to="/">Go back to Home</Link></div>;
  }

  const handleDownloadClick = (qualityObj) => {
    setSelectedQuality(qualityObj);
    setShowDownloadModal(true);
  };

  const estimatedFileSize = (qualityName) => {
    if (qualityName.includes("4K")) return "~14.7 GB";
    if (qualityName.includes("1080p")) return "~5.2 GB";
    if (qualityName.includes("720p")) return "~3.1 GB";
    if (qualityName.includes("480p")) return "~1.4 GB";
    return "~?.? GB";
  };

  const getQualityIcon = (qualityName) => {
    if (qualityName.includes("4K")) return <FourKIcon />;
    return <FilmIcon />;
  };

  return (
    <div className="movie-details-page">
      {/* --- Hero Section --- */}
      <div className="hero-section" style={{ backgroundImage: `url(${movie.poster})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-poster-wrapper">
            <img src={movie.poster} alt={movie.title} className="hero-poster-img" />
            {movie.trailerLink && (
              <button className="btn-watch-trailer-hero" onClick={() => setShowTrailer(true)}>
                ▶ Watch Trailer
              </button>
            )}
          </div>
          <div className="hero-info">
            <Link to="/" className="back-link">&larr; Back to Movies</Link>
            <h1>{movie.title}</h1>
            <div className="meta-bar">
              <span className="meta-item rating"><StarIcon />{movie.rating.toFixed(1)} / 10</span>
              <span className="meta-item"><CalendarIcon />{movie.year}</span>
              <span className="meta-item"><ClockIcon />{movie.duration} min</span>
              <span className="meta-item"><ViewsIcon />{movie.views} views</span>
            </div>
            <div className="genres-bar">
              {movie.genres.map(g => <span key={g} className="genre-pill">{g}</span>)}
            </div>
            <p className="description">{movie.description}</p>
            <div className="starring">
              <strong>Starring:</strong>
              <div className="actors">
                {movie.starring.map(actor => <span key={actor} className="actor-pill">{actor}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Download Section --- */}
      <div className="download-section">
        <h2>Download Options</h2>
        <p className="subtitle">Choose your preferred quality and start downloading</p>
        <div className="options-grid">
          {movie.qualities.map((qualityObj) => (
            <div key={qualityObj.quality} className="download-card">
              <div className="card-icon-wrapper">
                {getQualityIcon(qualityObj.quality)}
              </div>
              <h4>{qualityObj.quality}</h4>
              {qualityObj.quality.includes('4K') && <span className="quality-badge">4K DV</span>}
              <p className="file-size-label">File Size</p>
              <p className="file-size-value">{estimatedFileSize(qualityObj.quality)}</p>
              <button className="download-button" onClick={() => handleDownloadClick(qualityObj)}>
                <DownloadIcon />Download {qualityObj.quality}
              </button>
            </div>
          ))}
        </div>
      </div>

       {/* --- Instructions Section --- */}
      <div className="instructions-section">
          <h2>Download Instructions</h2>
          <div className="steps-grid">
              <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Choose Quality</h3>
                  <p>Select your preferred video quality based on your device and storage.</p>
              </div>
              <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Click Download</h3>
                  <p>Click the download button and wait for the download to start.</p>
              </div>
              <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Enjoy Movie</h3>
                  <p>Once downloaded, enjoy watching the movie offline anytime.</p>
              </div>
          </div>
      </div>

      {/* --- Modals --- */}
      {showTrailer && (
        <TrailerModal
          trailerUrl={movie.trailerLink}
          onClose={() => setShowTrailer(false)}
        />
      )}
      {showDownloadModal && (
        <DownloadModal
          movie={movie}
          quality={selectedQuality.quality}
          fileSize={estimatedFileSize(selectedQuality.quality)}
          onClose={() => setShowDownloadModal(false)}
          downloadLink={selectedQuality.url}
        />
      )}
    </div>
  );
};

export default MovieDetails;