import {Link} from "react-router-dom";
import {useState} from "react";

function signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = (e) => {
        e.preventDefault(); // prevent the browser reload

        // add sql query to create account
    }
    return (
        <div className="bgBox">
            <form className="signupBox" onSubmit={signup}>
                <h1 className="signupTitle">Sign Up</h1>
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
                <button type="submit">Sign Up</button>

                <p>Already have an account?
                    <br />
                    <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default signup;