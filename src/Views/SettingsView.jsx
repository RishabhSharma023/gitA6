import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext.jsx";

function SettingsView() {
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [preferredGenre, setPreferredGenre] = useState(user?.preferredGenre || "");

    function handleSave() {
        setUser({ ...user, firstName, lastName, preferredGenre });
        alert("Settings updated!");
    }

    return (
        <div>
            <h1>Settings</h1>
            <label>First Name:</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name:</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label>Preferred Genre:</label>
            <input value={preferredGenre} onChange={(e) => setPreferredGenre(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default SettingsView;