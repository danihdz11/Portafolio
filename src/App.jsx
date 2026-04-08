import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import AboutMe from './pages/AboutMe'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import ContactMe from './pages/ContactMe'

function Layout() {
  return (
    <NavBar>
      <Outlet />
      <Footer />
    </NavBar>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contactme" element={<ContactMe />} />
      </Route>
    </Routes>
  )
}

export default App
