import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext.jsx";
import "./GenreView.css";

const genres = [
  { genre: "Action", id: 28 },
  { genre: "Adventure", id: 12 },
  { genre: "Animation", id: 16 },
  { genre: "Comedy", id: 35 },
  { genre: "Family", id: 10751 },
  { genre: "Fantasy", id: 14 },
  { genre: "History", id: 36 },
  { genre: "Horror", id: 27 },
  { genre: "Sci-Fi", id: 878 },
  { genre: "Thriller", id: 53 },
];

function GenreView() {
  const { genre_id } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { cart, addToCart, removeFromCart } = useContext(UserContext);

  const selectedGenre = genres.find((genre) => genre.id === parseInt(genre_id));
  const genreName = selectedGenre ? selectedGenre.genre : "Movies in Genre";

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genre_id}&page=${page}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, [genre_id, page]);

  function isInCart(movieId) {
    return cart.some((movie) => movie.id === movieId);
  }

  return (
    <div className="hero">
      <h2>{genreName}</h2>
      <div className="genre-view-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="genre-view-item">
              <Link to={`/movies/details/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="genre-view-image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </Link>
              <h3>{movie.title}</h3>
              <button
                onClick={() =>
                  isInCart(movie.id)
                    ? removeFromCart(movie.id)
                    : addToCart(movie)
                }
              >
                {isInCart(movie.id) ? "Added" : "Buy"}
              </button>
            </div>
          ))
        ) : (
          <p>No movies available for this genre.</p>
        )}
      </div>
      <div className="genre-view-pagination-container">
        <button
          className="genre-view-pagination-button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <span className="genre-view-pagination-number">Page {page}</span>
        <button
          className="genre-view-pagination-button"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GenreView;