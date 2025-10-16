import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

// Helper function to get a color class based on rating
const getRatingClass = (rating) => {
  if (rating >= 7.5) return "rating-good";
  if (rating >= 5) return "rating-mid";
  return "rating-bad";
};

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="card-link">
        <div className="card-poster">
          <img src={movie.poster} alt={movie.title} loading="lazy" />
          <div className="card-overlay">
            <button className="btn-view-details">View Details</button>
          </div>
          <span className={`card-rating ${getRatingClass(movie.rating)}`}>
            ★ {movie.rating.toFixed(1)}
          </span>
          {/* FIX #1: Access the .quality property of the object */}
          <span className="card-quality">
            {movie.qualities[movie.qualities.length - 1].quality}
          </span>
        </div>
        <div className="card-body">
          <h3 className="card-title">{movie.title}</h3>
          <div className="card-meta">
            <span>{movie.year}</span>
            <span>{movie.duration} min</span>
          </div>
          <div className="card-genres">
            {movie.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
          <div className="card-qualities">
            {/* FIX #2: Map over the object and display its .quality property */}
            {movie.qualities.slice(0, 4).map((qualityObj) => (
              <span key={qualityObj.quality} className="quality-tag">
                {qualityObj.quality}
              </span>
            ))}
            {movie.qualities.length > 4 && (
              <span className="quality-tag more">+{movie.qualities.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;