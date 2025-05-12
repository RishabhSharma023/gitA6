import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext.jsx';

function Header() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    function handleSignOut() {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
        window.location.reload(); // Reload to reset the header state
    }

    return (
        <header className="header">
            <div className="logo-container">
                <div className="logo">Amazin' Prime Video</div>
                <img className="logoImg" src="/amazingprimeVid.png" alt="Logo" />
            </div>
            <div className="login-container">
                {isLoggedIn ? (
                    <>
                        <span className="welcome-message">Hello {user?.firstName}!</span>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="search-box"
                        />
                        <button className="button" onClick={() => navigate('/cart')}>Cart</button>
                        <button className="button" onClick={() => navigate('/settings')}>Settings</button>
                        <button className="button" onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button className="button" onClick={() => navigate('/login')}>Login</button>
                        <button className="button" onClick={() => navigate('/register')}>Register</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;