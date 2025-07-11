import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function ChangePassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }
    }, [navigate]);

    const passwordChange = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!password || !confirmPassword || !oldPassword) {
            alert("Please enter all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const username = localStorage.getItem('username');

        try{
            const verifyResponse = await fetch('/verify-password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,password: oldPassword}),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.valid) {
                alert("Current password is incorrect");
                return;
            }

            const updatedResponse = await fetch(`/userinfo/${username}/change-password`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newPassword: password}),
            });

            if (!updatedResponse.ok) {
                alert("Failed to change password");
                return;
            }

            setLoading(false);
            alert("Password changed successfully");
            navigate('/profile');
        } catch(err) {
            alert("Error updating password")
        }
    };

    return (
        <div className="change-password">
            <form className="loginBox" onSubmit={passwordChange}>
                <h1 className="loginTitle">Log In</h1>
                <input className="oldPass"
                       placeholder="current password"
                       value={oldPassword}
                       onChange={(e) => setOldPassword(e.target.value.trim())}
                ></input>
                <br/>
                <input className="newPass"
                       placeholder="new password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value.trim())}
                ></input>
                <br/>
                <input className="newPass2"
                       placeholder="confirm new password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value.trim())}
                ></input>
                <br/>
                <br/>
                <button type="submit" disabled={loading}>{loading ? "Changing Password..." : "Change Password"}</button>

            </form>
        </div>
    );
}

export default ChangePassword;