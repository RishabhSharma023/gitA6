import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext.jsx";
import "./CartView.css";

function CartView() {
    const { cart, removeFromCart } = useContext(UserContext);

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                cart.map((movie) => (
                    <div key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <button onClick={() => removeFromCart(movie.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartView;