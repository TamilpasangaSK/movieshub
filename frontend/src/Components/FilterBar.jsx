// src/components/FilterBar.jsx
import React, { useMemo } from "react";
import "../styles/filterbar.css";

// Try to import genres from src/data/movies if available; otherwise fallback.
let importedGenres = null;
try {
  // If you have a file at src/data/movies.js exporting `genres`, this will use it.
  // Example export in src/data/movies.js: export const genres = ['Action','Drama','Comedy'];
  // The try/catch avoids crashes if the file doesn't exist.
  // Note: Vite may still fail static analysis on certain build setups; remove try/catch if it causes issues.
  // eslint-disable-next-line
  importedGenres = require("../data/movies").genres;
} catch (e) {
  importedGenres = null;
}

const defaultGenres = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Sci-Fi",
  "Horror",
  "Documentary",
];

const FilterBar = ({ filters = {}, onFilterChange = () => {} }) => {
  const genres = importedGenres && Array.isArray(importedGenres)
    ? importedGenres
    : defaultGenres;

  const qualities = ["480p", "720p", "1080p", "4K"];
  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => (current - i).toString());
  }, []);

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFilterChange({
      search: filters.search || "",
      genre: "",
      year: "",
      quality: "",
      sortBy: "title",
    });
  };

  return (
    <div className="filterbar-root">
      <div className="filterbar-inner">
        <div className="filterbar-heading">
          <FilterIcon />
          <h3>Filters</h3>
        </div>

        <div className="filterbar-grid">
          {/* Genre */}
          <div className="filter-field">
            <label>Genre</label>
            <select
              value={filters.genre || ""}
              onChange={(e) => handleFilterChange("genre", e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="filter-field">
            <label>Year</label>
            <select
              value={filters.year || ""}
              onChange={(e) => handleFilterChange("year", e.target.value)}
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Quality */}
          <div className="filter-field">
            <label>Quality</label>
            <select
              value={filters.quality || ""}
              onChange={(e) => handleFilterChange("quality", e.target.value)}
            >
              <option value="">All Qualities</option>
              {qualities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-field">
            <label>Sort By</label>
            <select
              value={filters.sortBy || "uploadDate"}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
              <option value="uploadDate">Upload Date</option>
            </select>
          </div>

          {/* Clear / Action button */}
          <div className="filter-field filter-action">
            <button type="button" className="clear-btn" onClick={clearAll}>
              <SortIcon />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

/* Inline SVG icons so no extra package is needed */
function FilterIcon() {
  return (
    <svg className="icon-filter" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SortIcon() {
  return (
    <svg className="icon-sort" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6-6 6 6M18 15l-6 6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}
