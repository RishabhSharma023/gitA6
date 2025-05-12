import { useState, useEffect } from "react";
import axios from "axios";

function SearchView() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                axios
                    .get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&page=${page}`
                    )
                    .then((response) => {
                        setResults(response.data.results);
                        console.log("Results:", response.data.results); // Debugging
                    })
                    .catch((error) => {
                        console.error("Error fetching search results:", error);
                    });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, page]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    console.log("Query:", e.target.value); // Debugging
                }}
            />
            <div>
                {results.length > 0 ? (
                    results.map((movie) => (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                Prev
            </button>
            <button onClick={() => setPage((p) => p + 1)}>
                Next
            </button>
        </div>
    );
}

export default SearchView;