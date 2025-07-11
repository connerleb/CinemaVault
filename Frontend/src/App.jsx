import './App.css'
import { CgAddR, CgHome, CgSearch, CgProfile, CgUserList } from "react-icons/cg";
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from "react-router-dom";

import Home from './pages/home.jsx'
import Friends from './pages/friends.jsx';
import Search from './pages/search.jsx';
import Post from './pages/post.jsx';
import Profile from './pages/profile.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import {useEffect, useState} from "react";

// verify the user is logged in and ensure the user cannot visit
// any other pages without logging in
function VerifyLogin({user, children}) {
    if (user){
        return children;
    }
    else{
        return <Navigate to="/login" replace/>
    }
}
function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className={"navBar"}>
            <button onClick={() => navigate('/home')}><CgHome size={24}/></button>
            <button onClick={() => navigate('/friends')}><CgUserList size={24}/></button>
            <button onClick={() => navigate('/post')}><CgAddR size={24}/></button>
            <button onClick={() => navigate('/search')} ><CgSearch size={24}/></button>
            <button onClick={() => navigate('/profile')}><CgProfile size={24}/></button>
        </nav>
    );
}

function App() {
    const [user, setUser] = useState(null); // keep track of the logged-in user
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loggedUser = localStorage.getItem("username");
        if (loggedUser) {
            setUser(loggedUser);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>
            <p>Loading...</p>
        </div>
    }

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />}></Route>

                  <Route path="/home"
                         element={<VerifyLogin user={user}>
                             <Home />
                             </VerifyLogin>

                  } />

                  <Route path="/friends"
                         element={<VerifyLogin user={user}>
                             <Friends />
                         </VerifyLogin>

                         } />

                  <Route path="/search"
                         element={<VerifyLogin user={user}>
                             <Search />
                         </VerifyLogin>

                         } />

                  <Route path="/post"
                         element={<VerifyLogin user={user}>
                             <Post />
                         </VerifyLogin>
                         } />

                  <Route path="/profile"
                         element={<VerifyLogin user={user}>
                             <Profile />
                         </VerifyLogin>

                         } />

                  <Route path="/login" element={<Login onLogin={setUser} />}></Route>
                  <Route path="/signup" element={<Signup onLogin={setUser} />}></Route>
              </Routes>
              {user && <NavBar />}
          </div>
      </Router>
  );
}

export default App
