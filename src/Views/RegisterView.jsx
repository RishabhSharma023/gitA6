import "./RegisterView.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import { UserContext } from "../Contexts/UserContext.jsx";

const genresList = [
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

function RegisterView() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    function handleGenreChange(genreId) {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!firstName || !lastName || !email || !password || !rePassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== rePassword) {
            alert("Passwords do not match.");
            return;
        }

        if (selectedGenres.length < 5) {
            alert("Please select at least 5 genres.");
            return;
        }

        // Store user information in context
        setUser({
            firstName,
            lastName,
            email,
            selectedGenres,
        });

        // Set login state in localStorage
        localStorage.setItem("isLoggedIn", "true");

        alert("Registration successful!");
        navigate(`/movies/genre/${selectedGenres[0]}`);
    }

    return (
        <div>
            <Header />
            <div className="formContainerReg">
                <h1 className="formTitleReg">Register</h1>
                <form className="formReg" onSubmit={handleSubmit}>
                    <label className="boxLabelsReg">First Name:</label>
                    <input
                        required
                        className="infoBoxesReg"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label className="boxLabelsReg">Last Name:</label>
                    <input
                        required
                        className="infoBoxesReg"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label className="boxLabelsReg">Email:</label>
                    <input
                        required
                        className="infoBoxesReg"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label className="boxLabelsReg">Password:</label>
                    <input
                        required
                        className="infoBoxesReg"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <label className="boxLabelsReg">Re-enter Password:</label>
                    <input
                        required
                        className="infoBoxesReg"
                        type="password"
                        value={rePassword}
                        onChange={(event) => setRePassword(event.target.value)}
                    />
                    <label className="boxLabelsReg">Select Genres (at least 5):</label>
                    <div className="genresCheckboxes">
                        {genresList.map((genre) => (
                            <div key={genre.id}>
                                <input
                                    type="checkbox"
                                    id={`genre-${genre.id}`}
                                    value={genre.id}
                                    onChange={() => handleGenreChange(genre.id)}
                                />
                                <label htmlFor={`genre-${genre.id}`}>{genre.genre}</label>
                            </div>
                        ))}
                    </div>
                    <input className="registerButtonReg" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}

export default RegisterView;