import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../MovieContext';

const SearchResults = () => {
  const { query } = useParams();
  const genreId = isNaN(query) ? null : query;
  const {fetchMovies, setQuery,choice } = useGlobalContext();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'cb6880b44b0babc8471884ed9d653463';

  useEffect(() => {
    const fetchSearchResults = async () => {
      let url = '';
      if (!query && !genreId) return;

    if (genreId) {
      url = `https://api.themoviedb.org/3/discover/${choice}?api_key=${API_KEY}&with_genres=${genreId}`;
    } else {
      url = `https://api.themoviedb.org/3/search/${choice}?api_key=${API_KEY}&query=${query}`;
    }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query, genreId]);

  const handleBackToHome = () => {
    setQuery("");  
    fetchMovies(); 
    navigate('/'); 
  };

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="movies-grid">
      <button onClick={handleBackToHome} className="back-button">
        ⬅ Back to Home
      </button>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}?query=${query}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <h3>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </h3>
            <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
          </div>
        ))
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
