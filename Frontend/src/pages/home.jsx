import logo from "../assets/logo.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }
    }, []);
    return (
        <div>
            <img src={logo} alt="Cinema Vault Logo" />
            <p>Welcome to the home of all of your movie and tv show reviews all in one place!</p>
        </div>
    );
}
export default Home;