import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecentSlider from "./Components/RecentSlider";
import TelegramButton from "./Components/TelegramButton";
import FilterBar from "./Components/FilterBar";
import MovieGrid from "./components/MovieGrid";
import { movies as allMovies } from "./data/movies"; // ensure this exports `movies` array
import "./styles/slider.css";
import "./styles/filterbar.css";
import "./styles/Home.css";
export default function Home(props) {
  const location = useLocation();
  const navigate = useNavigate();

  // If parent passed filters & handler, use them (controlled). Otherwise local state (uncontrolled).
  const isControlled = !!props.filters && typeof props.onFilterChange === "function";

  const [localFilters, setLocalFilters] = useState({
    search: "",
    genre: "",
    year: "",
    quality: "",
    sortBy: "uploadDate",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  // Pick effective filters (from parent if controlled, else local)
  const effectiveFilters = isControlled ? props.filters : localFilters;
  const setEffectiveFilters = (newFilters) => {
    if (isControlled) {
      props.onFilterChange(newFilters);
    } else {
      setLocalFilters(newFilters);
    }
  };

  // Read query params and apply into filters on mount and when location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qGenre = params.get("genre") || "";
    const qYear = params.get("year") || "";
    const qQuality = params.get("quality") || "";
    const qSearch = params.get("search") || "";
    const qSortBy = params.get("sortBy") || (effectiveFilters.sortBy ?? "uploadDate");

    // merge with existing effective filters
    const merged = {
      ...effectiveFilters,
      genre: qGenre || "",
      year: qYear || "",
      quality: qQuality || "",
      search: qSearch || "",
      sortBy: qSortBy,
    };

    // only update if something differs (avoid infinite loops)
    const same =
      (effectiveFilters.genre || "") === (merged.genre || "") &&
      String(effectiveFilters.year || "") === String(merged.year || "") &&
      (effectiveFilters.quality || "") === (merged.quality || "") &&
      (effectiveFilters.search || "") === (merged.search || "") &&
      (effectiveFilters.sortBy || "") === (merged.sortBy || "");

    if (!same) {
      setEffectiveFilters(merged);
      // reset page to 1
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // only when URL query changes

  // Filter + sort logic
  const processedMovies = useMemo(() => {
    let newMovies = Array.isArray(allMovies) ? [...allMovies] : [];

    const f = effectiveFilters || {};

    // Search
    if (f.search && f.search.trim() !== "") {
      const q = f.search.toLowerCase();
      newMovies = newMovies.filter((m) =>
        (m.title || "").toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q) ||
        (m.cast || []).join(" ").toLowerCase().includes(q)
      );
    }

    // Genre (movie may have .genre or .genres)
    if (f.genre) {
      newMovies = newMovies.filter((m) => {
        const g = m.genres || m.genre || [];
        return Array.isArray(g) && g.includes(f.genre);
      });
    }

    // Year
    if (f.year) {
      const target = parseInt(f.year, 10);
      if (!Number.isNaN(target)) {
        newMovies = newMovies.filter((m) => Number(m.year) === target);
      }
    }

    // Quality (movie may have quality as array/strings)
    if (f.quality) {
      newMovies = newMovies.filter((m) => {
        const q = m.qualities || m.quality || [];
        if (typeof q === "string") return q.includes(f.quality);
        if (Array.isArray(q)) {
          return q.some((item) => {
            if (!item) return false;
            if (typeof item === "string") return item.includes(f.quality);
            if (typeof item === "object") return (item.format || item.quality || "").toString().includes(f.quality);
            return false;
          });
        }
        if (typeof q === "object") return (q.format || q.quality || "").toString().includes(f.quality);
        return false;
      });
    }

    // Sorting
    switch (f.sortBy) {
      case "title":
        newMovies.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "year":
        newMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "rating":
        newMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "views":
        newMovies.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "uploadDate":
      default:
        // default assume data is ordered by id ascending, so newest highest id -> show newest first
        newMovies.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
    }

    return newMovies;
  }, [allMovies, effectiveFilters]);

  // Page calculations & paginated slice
  const totalPages = Math.max(1, Math.ceil(processedMovies.length / moviesPerPage));
  useEffect(() => {
    // ensure currentPage is valid after processedMovies changes
    if (currentPage > totalPages) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const paginatedMovies = processedMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // handler used by FilterBar -> update filters (keeps local or controlled behavior)
  const handleFilterChange = (newFilters) => {
    setEffectiveFilters(newFilters);
    setCurrentPage(1); // reset to first page on filter change

    // also sync URL query params so category links/bookmarks work
    const params = new URLSearchParams();
    if (newFilters.genre) params.set("genre", newFilters.genre);
    if (newFilters.year) params.set("year", newFilters.year);
    if (newFilters.quality) params.set("quality", newFilters.quality);
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.sortBy) params.set("sortBy", newFilters.sortBy);
    // push to URL without reloading - uses history API
    navigate({ pathname: "/", search: params.toString() }, { replace: true });
  };

  return (
    <div className="hm-page">
      <div className="hm-container">
        <RecentSlider />
        <TelegramButton />

        {/* Pass filters + handler into FilterBar (it will control UI) */}
        <FilterBar filters={effectiveFilters} onFilterChange={handleFilterChange} />

        {/* MovieGrid receives current page slice and pagination callbacks */}
        <MovieGrid
          movies={paginatedMovies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
