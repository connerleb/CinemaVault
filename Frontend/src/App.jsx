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

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/friends" element={<Friends />}></Route>
                  <Route path="/search" element={<Search />}></Route>
                  <Route path="/post" element={<Post />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>

              </Routes>
              <NavBar />
          </div>
      </Router>
  );
}

export default App
