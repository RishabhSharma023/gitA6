import { useState, useEffect } from "react";
import axios from "axios";

function SearchView() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                fetchMovies();
            } else {
                setResults([]);
            }
        }, 500); // Debounce delay of 500ms

        return () => clearTimeout(delayDebounceFn);
    }, [query, page]);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&page=${page}`
            );
            setResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setPage(1); // Reset to the first page on a new search
            fetchMovies();
        }
    };

    return (
        <div>
            <h1>Search Movies</h1>
            <input
                type="text"
                placeholder="Enter movie name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
            />
            <div>
                {results.length > 0 ? (
                    results.map((movie) => (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            <div>
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SearchView;