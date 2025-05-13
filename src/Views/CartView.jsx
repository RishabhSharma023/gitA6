import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext.jsx";
import "./CartView.css";

function CartView() {
    const { cart, removeFromCart } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // Paginate the cart items
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCart = cart.slice(startIndex, endIndex);

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <>
                    <div className="cart-grid">
                        {paginatedCart.map((movie) => (
                            <div key={movie.id} className="cart-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3>{movie.title}</h3>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(movie.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-container">
                        <button
                            className="pagination-button"
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span className="pagination-number">
                            Page {page} of {Math.ceil(cart.length / itemsPerPage)}
                        </span>
                        <button
                            className="pagination-button"
                            onClick={() =>
                                setPage((p) =>
                                    p < Math.ceil(cart.length / itemsPerPage) ? p + 1 : p
                                )
                            }
                            disabled={page === Math.ceil(cart.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartView;