import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar'
import Hero from './components/Hero'

function App() {

  return (
    <>
      <NavBar>
        <Hero />
      </NavBar>
    </>
  )
}

export default App
