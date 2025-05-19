import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const MOVIE_DB_API_KEY = "YOUR_API_KEY";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [choice,setChoice] = useState("movie")

    const fetchMovies = async (searchQuery = "") => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/${choice}/popular?api_key=${MOVIE_DB_API_KEY}`;
        if (searchQuery) {
          if (!isNaN(searchQuery)) {
            url = `https://api.themoviedb.org/3/discover/${choice}?api_key=${MOVIE_DB_API_KEY}&with_genres=${searchQuery}`;
          } else {
            url = `https://api.themoviedb.org/3/search/${choice}?api_key=${MOVIE_DB_API_KEY}&query=${searchQuery}`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
          setMovies(data.results);
          setIsError({ show: false, msg: "" });
        } else {
          setMovies([]);
          setIsError({ show: true, msg: "No movies found!" });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsError({ show: true, msg: "Something went wrong!" });
      }
      setLoading(false);
    };

    useEffect(() => {fetchMovies();
  }, [query,choice]);

  return (
    <MovieContext.Provider value={{ movies, loading, query, setQuery, isError, fetchMovies,choice,setChoice }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useGlobalContext = () => useContext(MovieContext);
