import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function Signup({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const signup = (e) => {
        e.preventDefault(); // prevent the browser reload
        setLoading(true);
        setError(false);

        // create the user by using fetch to post the new user
        fetch('https://cinemavault-b2jo.onrender.com/postuser',
            {
                method: 'POST',
                body: JSON.stringify({username: username, password: password}),
                headers: {'Content-type': 'application/json'}
            })
            .then (response => {
                if (!response.ok){
                    throw new Error('Failed to sign up');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("username", username); // save username locally
                onLogin(username); // save the username in the app
                navigate("/home");
            })
            .catch(error => {
                setError(true);
                console.error("Error creating user: " + error);
            })
    }
    return (
        <div className="bgBox">
            {error && (
                <p className="error">{error}</p>
            )}
            <form className="signupBox" onSubmit={signup}>
                <h1 className="signupTitle">Sign Up</h1>
                <input className="username"
                       placeholder="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br/>
                <input className="password"
                       placeholder="password"
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br/>
                <br/>
                <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</button>

                <p>Already have an account?
                    <br />
                    <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;