import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function ChangeUsername() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [loading, setLoading] = useState(false);

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }

        setUsername(user);
    }, [navigate]);

    const usernameChange = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !newUsername) {
            alert("Please enter all fields");
            return;
        }

        if (username === newUsername) {
            alert("You must enter a new username");
            return;
        }

        try {
            const response = await fetch(`/userinfo/${username}/change-username`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newUsername}),
            });

            if (!response.ok) {
                alert("Failed to change username");
                return;
            }

            localStorage.setItem("username", newUsername);
            alert("Successfully changed username");
            navigate('/profile');
        } catch (error) {
            alert("Failed to change username");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-username">
            <form className="changeUsernameBox" onSubmit={usernameChange}>
                <h1 className="changeUsernameTitle">Log In</h1>
                <input className="oldUsername"
                       placeholder="current username"
                       value={username}
                       readOnly
                ></input>
                <br/>
                <input className="newUsername"
                       placeholder="new username"
                       value={newUsername}
                       onChange={(e) => setNewUsername(e.target.value.trim())}
                ></input>
                <br/>
                <br/>
                <button type="submit" disabled={loading}>{loading ? "Changing Username..." : "Change Username"}</button>

            </form>
        </div>
    );
}

export default ChangeUsername;