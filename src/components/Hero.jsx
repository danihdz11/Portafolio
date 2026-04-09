import { Link } from "react-router-dom";
import "./Hero.css";

const CalendarIcon = () => (
  <svg
    className="hero__cta-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__grid-bg" aria-hidden />

      <div className="hero__inner">
        <div className="hero__photo-bg" aria-hidden>
          <img
            className="hero__photo hero__photo--layer"
            src="/images/me_2.webp"
            alt=""
            width={780}
            height={1020}
            decoding="async"
          />
        </div>

        <nav className="hero__nav" aria-label="Section shortcuts">
          <Link to="/projects" className="hero__nav-link">
            Works
          </Link>
          <Link to="/skills" className="hero__nav-link">
            Services
          </Link>
          <Link to="/contactme" className="hero__nav-link">
            Contact
          </Link>
        </nav>

        <div className="hero__left">
          <div className="hero__social-proof">
            <div className="hero__avatars" aria-hidden>
              <span className="hero__avatar hero__avatar--a" />
              <span className="hero__avatar hero__avatar--b" />
              <span className="hero__avatar hero__avatar--c" />
            </div>
            <div className="hero__proof-text">
              <span className="hero__proof-count">25+</span>
              <span className="hero__proof-label">Collaborations &amp; reviews</span>
            </div>
          </div>

          <h1 id="hero-heading" className="hero__title">
            <span className="hero__title-line hero__title-line--plain">It&apos;s me</span>
            <span className="hero__title-line hero__title-line--accent">Daniel</span>
          </h1>

          <p className="hero__lead">
            Full-stack developer focused on clear UX and reliable code—shipping web
            products end to end, from APIs to polished interfaces.
          </p>

          <dl className="hero__stats">
            <div className="hero__stat">
              <dt className="visually-hidden">Projects</dt>
              <dd>
                <span className="hero__stat-value">15+</span>
                <span className="hero__stat-label">Projects shipped</span>
              </dd>
            </div>
            <div className="hero__stat">
              <dt className="visually-hidden">Technologies</dt>
              <dd>
                <span className="hero__stat-value">100+</span>
                <span className="hero__stat-label">Commits &amp; iterations</span>
              </dd>
            </div>
            <div className="hero__stat">
              <dt className="visually-hidden">Experience</dt>
              <dd>
                <span className="hero__stat-value">3+</span>
                <span className="hero__stat-label">Years building</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <Link to="/contactme" className="hero__cta-pill">
            <CalendarIcon />
            Schedule a call
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
