import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function DeleteAccount({userInfo}) {
    const navigate = useNavigate();

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }
    }, []);
    return (
        0
    );
}

export default DeleteAccount;