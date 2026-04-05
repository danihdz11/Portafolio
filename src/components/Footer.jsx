import "./Footer.css"
import { useLocation } from "react-router-dom"

const GITHUB_HREF = "https://github.com/danihdz11"
const LINKEDIN_HREF = "https://www.linkedin.com/in/daniel-hernandez-gutierrez/"

const socialIcons = [
  {
    href: GITHUB_HREF,
    src: "/images/github_logo.png",
    label: "GitHub",
  },
  {
    href: LINKEDIN_HREF,
    src: "/images/linkedin_logo.png",
    label: "LinkedIn",
  },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const isProjectsPage = pathname === "/projects"

  return (
    <footer
      className={`site-footer${isProjectsPage ? " site-footer--projects" : ""}`}
    >
      <div className="footer-inner">
        <div className="footer-brand-wrap">
          <img
            src="/images/dev_logo.png"
            alt=""
            className="footer-brand-logo"
            width={32}
            height={32}
            decoding="async"
          />
          <span className="footer-brand">Daniel</span>
        </div>

        <p className="footer-copyright">
          © {year} Daniel | All Rights Reserved
        </p>

        <div className="footer-social" aria-label="Social links">
          {socialIcons.map(({ href, src, label }) => (
            <a
              key={label}
              href={href}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <img
                src={src}
                alt=""
                className="footer-social-icon"
                width={28}
                height={28}
                decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
