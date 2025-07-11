import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault(); // prevent the browser reload

        // attempt to login using the username and password
        fetch('https://cinemavault-b2jo.onrender.com/login',
            {
                method: 'POST',
                body: JSON.stringify({username: username, password: password}),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.json())
            .then(result => {
                // if the username exists
                if (result.username) {
                   localStorage.setItem('username', username); // save the username in local storage
                   onLogin(username); // update the username in the app
                   navigate('/home'); // navigate home
                }

            })
            .catch(error => alert("Please enter a valid username & password"));
    }
    return (
        <div className="bgBox">
            <form className="loginBox" onSubmit={login}>
                <h1 className="loginTitle">Log In</h1>
                <input className="username"
                       placeholder="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br/>
                <input className="password"
                       placeholder="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br/>
                <br/>
                <button type="submit">Log In</button>

                <p>Don't have an account?
                <br />
                <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;