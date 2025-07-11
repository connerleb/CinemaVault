import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function Profile({setUser}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [accountInfo, setAccountInfo] = useState("");

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        async function getUserInfo(){
            const user = localStorage.getItem('username');
            const response = await fetch(`/userinfo/${user}`);
            if (!response.ok) {
                return console.error(response);
            }

            const data = await response.json();
            setUsername(data.username);
            setAccountInfo(data);
        }
        getUserInfo();
    }, []);



    const logout = () => {
        localStorage.removeItem('username');
        setUser(null);
        navigate('/login');
    }

    const userNav = () => {
        navigate('/changeUsername');
    }

    const passNav = () => {
        navigate('/changePassword');
    }

    const deleteNav = () => {
        navigate('/deleteAccount');
    }
    return (
        <div className="profile">
            <p>User: {username}</p>
            <p>Role: {accountInfo.role}</p>
            <button onClick={logout}>Log Out</button>
            <button onClick={userNav}>Change Username</button>
            <button onClick={passNav}>Change Password</button>
            <button onClick={deleteNav}>Delete Account</button>
        </div>
    );
}

export default Profile;