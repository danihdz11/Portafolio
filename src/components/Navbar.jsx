import "./NavBar.css"
import { NavLink } from "react-router-dom"

const linkClass = ({ isActive }) =>
  isActive ? "nav-link nav-link--active" : "nav-link"

const GITHUB_HREF = "https://github.com/danihdz11"
const LINKEDIN_HREF = "https://www.linkedin.com/in/daniel-hernandez-gutierrez/"

const socialIcons = [
  {
    href: GITHUB_HREF,
    src: "/images/github_logo.webp",
    label: "GitHub",
  },
  {
    href: LINKEDIN_HREF,
    src: "/images/linkedin_logo.webp",
    label: "LinkedIn",
  },
]

const NavBar = ({ children }) => {
  return (
    <>
      <header className="site-header">
        <div className="container-navbar">
          <div className="navbar-brand-wrap">
            <img
              src="/images/dev_logo.webp"
              alt=""
              className="navbar-brand-logo"
              width={32}
              height={32}
              decoding="async"
            />
            <span className="navbar-brand">Daniel</span>
          </div>

          <nav className="nav-links" aria-label="Main">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/aboutme" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/skills" className={linkClass}>
              Skills
            </NavLink>
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/experience" className={linkClass}>
              Experience
            </NavLink>
            <NavLink to="/contactme" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="navbar-trailing">
            <div className="navbar-social" aria-label="Social links">
              {socialIcons.map(({ href, src, label }) => (
                <a
                  key={label}
                  href={href}
                  className="navbar-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={src}
                    alt=""
                    className="navbar-social-icon"
                    width={28}
                    height={28}
                    decoding="async"
                  />
                  <span className="visually-hidden">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}

export default NavBar;
