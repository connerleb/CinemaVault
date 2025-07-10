import {useState} from "react";
import {Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault(); // prevent the browser reload

        // add sql query to see if account exists
    }
    return (
        <div className="bgBox">
            <form className="loginBox" onSubmit={login}>
                <h1 className="loginTitle">Log In</h1>
                <input className="email"
                       placeholder="username/email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
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