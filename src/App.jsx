import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import NavBar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import ContactMe from './pages/ContactMe'

function Layout() {
  return (
    <NavBar>
      <Outlet />
    </NavBar>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Hero />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contactme" element={<ContactMe />} />
      </Route>
    </Routes>
  )
}

export default App
