import React from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import "../styles/MovieGrid.css";

const MovieGrid = ({ movies = [], currentPage, totalPages, onPageChange }) => {
  if (movies.length === 0) {
    return <p className="no-movies-found">No movies found. Try adjusting your filters.</p>;
  }

  return (
    <div className="movie-grid-container">
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MovieGrid;