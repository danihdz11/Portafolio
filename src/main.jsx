import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import { BrowserRouter, Routes, Route } from "react-router";
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import ContactMe from './pages/ContactMe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contactme" element={<ContactMe />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
