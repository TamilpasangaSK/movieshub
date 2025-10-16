import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/movies.js";
import "../styles/slider.css";

// --- NEW: SVG Icons for the slider arrows ---
const ChevronLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);


// Automatically get the 5 most recent movies and format them
const recentMovies = movies.slice(0, 5).map(movie => ({
    id: movie.id,
    title: movie.title,
    subtitle: `${movie.year} • ${movie.views || 'New'} views`,
    desc: movie.description ? `${movie.description.substring(0, 120)}...` : "A new exciting movie available to watch now.",
    poster: movie.poster,
    quality: movie.genres || [],
}));

export default function RecentSlider({
    autoPlay = true,
    autoPlayInterval = 5000,
}) {
    const slides = recentMovies;
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        const startAutoplay = () => {
            if (!autoPlay) return;
            stopAutoplay();
            timerRef.current = setInterval(() => {
                setIndex((i) => (i + 1) % slides.length);
            }, autoPlayInterval);
        };
        const stopAutoplay = () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        startAutoplay();
        return stopAutoplay;
    }, [index, autoPlay, autoPlayInterval, slides.length]);
    
    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);
    const goTo = (i) => setIndex(i);

    return (
        <div
            className="recent-slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Recent uploads"
        >
            <div
                className="slides"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slides.map((s, i) => (
                    <div
                        key={s.id}
                        className={`slide ${i === index ? "active" : ""}`}
                        style={{ backgroundImage: `url(${s.poster})` }}
                        aria-hidden={i !== index}
                    >
                        <div className="slide-overlay" />
                        <div className="slide-content">
                            <div className="slide-meta">{s.subtitle}</div>
                            <h2 className="slide-title">{s.title}</h2>
                            <p className="slide-desc">{s.desc}</p>
                            <div className="slide-actions">
                                <Link to={`/movie/${s.id}`} className="btn btn-primary">
                                    ▶ Watch Now
                                </Link>
                                <Link to={`/movie/${s.id}`} className="btn btn-ghost">
                                    ℹ More Info
                                </Link>
                            </div>
                            <div className="slide-tags">
                                {s.quality.map((q) => (
                                    <span key={q} className="tag">{q}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* UPDATED: Buttons now use the SVG icon components */}
            <button className="arrow arrow-left" onClick={prev} aria-label="Previous slide">
                <ChevronLeftIcon />
            </button>
            <button className="arrow arrow-right" onClick={next} aria-label="Next slide">
                <ChevronRightIcon />
            </button>

            <div className="slider-footer">
                <div className="dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="counter">{index + 1}/{slides.length}</div>
        </div>
    );
}