import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'
import { CgAddR, CgHome, CgSearch, CgProfile, CgUserList } from "react-icons/cg";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            <title>Cinema Vault</title>
            <img src={logo} alt="Cinema Vault Logo" />
            <p>Welcome to the home of all of your movie and tv show reviews all in one place!
            </p>
        </div>

        <nav className={"navBar"}>
            <button><CgHome size={24}/></button>
            <button><CgUserList size={24}/></button>
            <button><CgAddR size={24}/></button>
            <button><CgSearch size={24}/></button>
            <button><CgProfile size={24}/></button>
        </nav>
    </>
  )
}

export default App
