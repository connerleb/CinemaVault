import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

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

    </>
  )
}

export default App
