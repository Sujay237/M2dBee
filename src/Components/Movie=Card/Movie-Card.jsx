import React from 'react';
import './Movie-Card.css';
import { useGlobalContext } from '../../MovieContext';
import { Link } from 'react-router-dom';

const MovieCard = () => {
  const { movies, loading } = useGlobalContext();

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="movies-grid">
        <Link to="/" className="back-button">⬅ Back to Home</Link>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;